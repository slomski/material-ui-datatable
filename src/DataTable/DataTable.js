import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { FormattedMessage, injectIntl } from 'react-intl';
import LoadingOverlay from 'react-loading-overlay';
import orderBy from 'lodash-es/orderBy';
import DataTableHead from './DataTableHead';
import DataTableToolbar from './DataTableToolbar';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  flexContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

class DataTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { options, columns, data } = this.props;

    this.state = {
      selected: options.selectedRowsId || [],
      showSearchRow: true,
      columns,
      data: data,
      filters: [],
      page: { totalElements: data.length, size: 5, number: 0 },
      sort: { by: columns[0].id, dir: 'asc' },
    };
  }

  clearSelected = () => {
    this.setState({ selected: [] });
  };

  handleColumnSelection = id => {
    const { columns } = this.state;
    const newColumns = columns.map(
      col => (col.id === id ? { ...col, visible: !col.visible } : { ...col })
    );
    this.setState({ columns: newColumns });
  };

  handleSelectAllClick = (event, checked) => {
    const { data } = this.props;
    if (checked) {
      this.setState({ selected: data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
    // if (options.onRowSelect) {
    //   options.onRowSelect(newSelected);
    // }
  };

  handleShowSearchClick = () => {
    const { showSearchRow } = this.state;
    this.setState({
      showSearchRow: !showSearchRow,
    });
  };

  handleSortChange = (by, dir) => {
    const { data } = this.state;
    const newData = orderBy(data, by, dir);
    this.setState({
      sort: { by, dir },
      data: newData,
    });
  };

  handlePageChange = (event, pageNumber) => {
    const { page } = this.state;
    this.setState({
      page: { ...page, number: pageNumber },
    });
  };

  handleRowsPerPageChange = event => {
    const { page } = this.state;
    this.setState({
      page: { ...page, size: event.target.value },
    });
  };

  handleLocalFiltering = filters => {
    this.setState({ filters });
  };

  filterData = () => {
    const { data, filters } = this.state;
    if (filters.length === 0) {
      return data;
    }
    const filtersObject = {};
    filters.forEach(filter => {
      const key = Object.keys(filter)[0];
      filtersObject[key] = filter[key];
    });
    const filteredData = data.filter(item => {
      for (let key in filtersObject) {
        const haystack = ('' + item[key]).toLowerCase();
        const needle = '' + filtersObject[key].toLowerCase();
        if (item[key] !== undefined && haystack.includes(needle)) return true;
      }
      return false;
    });
    return filteredData;
  };

  isSelected = id => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  render() {
    const { classes, title, options, loading } = this.props;
    const {
      onClickNew,
      onSearch,
      // onChangeRowsPerPage,
      // onChangePage,
      // onHandleDelete,
      // sort,
      // onSortChange,
      actions,
      extraButtons,
      onFilter,
      filterType,
      elevation = 2,
      showToolbar = true,
      showCheckbox = false,
    } = options;
    const {
      selected,
      columns,
      page,
      // filters,
      // data,
      // originalData,
      sort,
    } = this.state;

    const data = this.filterData();

    return (
      <Paper elevation={elevation}>
        {showToolbar && (
          <DataTableToolbar
            numSelected={selected.length}
            title={title}
            onClickNew={onClickNew}
            onSearch={onSearch}
            selected={selected}
            // handleDelete={onHandleDelete}
            extraButtons={extraButtons}
            onSearchClick={this.handleShowSearchClick}
            columns={columns}
            handleColumnsSelection={this.handleColumnSelection}
            onFilter={filterType === 'local' ? this.handleLocalFiltering : onFilter}
            filterType={filterType}
            actions={actions && actions.renderMultipleActions}
            clearSelected={this.clearSelected}
          />
        )}

        <LoadingOverlay
          active={loading}
          spinner
          background="rgba(250,250,250)"
          color="#7c1f8c"
          style={{ width: '100%' }}
        >
          <div className={classes.tableWrapper}>
            <Table>
              <DataTableHead
                numSelected={selected.length}
                orderDir={sort.dir}
                orderBy={sort.by}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleSortChange}
                rowCount={data.length}
                columnData={columns}
                onFilter={onFilter}
                showCheckbox={showCheckbox}
              />
              <TableBody>
                {data.slice(page.number * page.size, page.size * (page.number + 1)).map(row => {
                  const isSelected = this.isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected}
                    >
                      {showCheckbox && (
                        <TableCell padding="dense">
                          <Checkbox
                            checked={isSelected}
                            onClick={event => this.handleClick(event, row.id)}
                          />
                        </TableCell>
                      )}
                      {columns.map(col => {
                        if (col.visible) {
                          return col.id === 'actions' ? (
                            <TableCell
                              key={col.id}
                              padding="dense"
                              numeric={col.numeric}
                              style={{
                                whiteSpace: 'nowrap',
                                paddingTop: 0,
                                paddingBottom: 0,
                              }}
                            >
                              {actions.renderActions(row.id)}
                            </TableCell>
                          ) : (
                            <TableCell
                              onClick={
                                showCheckbox ? event => this.handleClick(event, row.id) : () => null
                              }
                              key={col.id}
                              style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                whiteSpace: col.noWrap ? 'nowrap' : 'normal',
                              }}
                              numeric={col.numeric}
                            >
                              {// eslint-disable-next-line
                              col.render
                                ? col.render(row)
                                : typeof row[col.id] === 'boolean'
                                  ? `${row[col.id]}`
                                  : row[col.id]}
                            </TableCell>
                          );
                        }
                        return <React.Fragment key={col.id} />;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </LoadingOverlay>
        <TablePagination
          component="div"
          count={page.totalElements}
          rowsPerPage={page.size}
          page={page.number}
          labelDisplayedRows={({ from, to, count }) =>
            this.props.intl.formatMessage(
              {
                id: 'dt.page.of',
                defaultMessage: `${from}-${to} dupa ${count}`,
              },
              { from, to, count }
            )
          }
          backIconButtonProps={{
            'aria-label': <FormattedMessage id="dt.page.prev" defaultMessage="Previous page" />,
          }}
          nextIconButtonProps={{
            'aria-label': <FormattedMessage id="dt.page.next" defaultMessage="Next page" />,
          }}
          onChangePage={this.handlePageChange}
          onChangeRowsPerPage={this.handleRowsPerPageChange}
          labelRowsPerPage={<FormattedMessage id="dt.page.size" defaultMessage="Page size:" />}
        />
      </Paper>
    );
  }
}

DataTable.defaultProps = {
  loading: false,
};

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  // page: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool,
};

export default injectIntl(withStyles(styles)(DataTable));

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import LoadingOverlay from "react-loading-overlay";
import { filter } from "lodash-es";
import DataTableHead from "./DataTableHead";
import DataTableToolbar from "./DataTableToolbar";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  tableWrapper: {
    overflowX: "auto"
  },
  flexContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  }
});

class DataTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    const { options, columns } = this.props;

    this.state = {
      selected: options.selectedRowsId || [],
      showSearchRow: true,
      columns,
      filteredData: [],
      filters: []
    };
  }

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
    const { options } = this.props;
    let newSelected = [];
    if (selected.length === 0) newSelected.push(id);
    else if (selected[0] === id) newSelected = [];
    else if (selected[0] !== id) newSelected[0] = id;

    // const { selected } = this.state;
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];
    //
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }

    this.setState({ selected: newSelected });
    if (options.onRowSelect) {
      options.onRowSelect(newSelected);
    }
  };

  handleShowSearchClick = () => {
    const { showSearchRow } = this.state;
    this.setState({
      showSearchRow: !showSearchRow
    });
  };

  handleLocalFiltering = filters => {
    if (!filters) {
      this.setState({ filteredData: [], filters });
      return;
    }
    const { data } = this.props;
    const filtersObject = {};
    filters.forEach(filter => {
      const key = Object.keys(filter)[0];
      filtersObject[key] = filter[key];
    });
    const filteredData = data.filter(item => {
      for (let key in filtersObject) {
        const haystack = ("" + item[key]).toLowerCase();
        const needle = "" + filtersObject[key].toLowerCase();
        if (item[key] !== undefined && haystack.includes(needle)) return true;
      }
      return false;
    });
    this.setState({ filteredData, filters });
  };

  isSelected = id => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  render() {
    const { classes, data, title, page, options, loading } = this.props;
    const {
      onClickNew,
      onSearch,
      onChangeRowsPerPage,
      onChangePage,
      onHandleDelete,
      sort,
      onSortChange,
      actions,
      extraButtons,
      onFilter,
      filterType,
      elevation = 2,
      showToolbar = true,
      showCheckbox = false
    } = options;
    const { selected, columns, filters, filteredData } = this.state;
    // const emptyRows = page.size - Math.min(page.size, data.length);

    // console.log(this.state);
    // console.log(this.props);

    const dataToShow = filters.length > 1 ? filteredData : data;

    return (
      <Paper elevation={elevation}>
        {showToolbar && (
          <DataTableToolbar
            numSelected={selected.length}
            title={title}
            onClickNew={onClickNew}
            onSearch={onSearch}
            selected={selected}
            handleDelete={onHandleDelete}
            extraButtons={extraButtons}
            onSearchClick={this.handleShowSearchClick}
            columns={columns}
            handleColumnsSelection={this.handleColumnSelection}
            onFilter={
              filterType === "local" ? this.handleLocalFiltering : onFilter
            }
            filterType={filterType}
          />
        )}

        <LoadingOverlay
          active={loading}
          spinner
          background="rgba(250,250,250)"
          color="#7c1f8c"
          style={{ width: "100%" }}
        >
          <div className={classes.tableWrapper}>
            <Table>
              <DataTableHead
                numSelected={selected.length}
                orderDir={sort.dir}
                orderBy={sort.by}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={onSortChange}
                rowCount={data.length}
                columnData={columns}
                onFilter={onFilter}
                showCheckbox={showCheckbox}
              />
              <TableBody>
                {dataToShow.map(row => {
                  const isSelected = this.isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected}
                      // style={{ minHeight: 48 }}
                    >
                      {showCheckbox && (
                        <TableCell
                          padding="dense"
                          style={{ paddingTop: 0, paddingBottom: 0 }}
                        >
                          <Checkbox
                            style={{ height: 32, width: 32 }}
                            checked={isSelected}
                            onClick={event => this.handleClick(event, row.id)}
                          />
                        </TableCell>
                      )}
                      {columns.map(col => {
                        if (col.visible) {
                          /* const padding = col.id === 'id' ? false : col.disablePadding ? 'dense' : 'default'; */
                          return col.id === "actions" ? (
                            <TableCell
                              key={col.id}
                              padding="dense"
                              numeric={col.numeric}
                              style={{
                                whiteSpace: "nowrap",
                                paddingTop: 0,
                                paddingBottom: 0
                              }}
                            >
                              {actions.renderActions(row.id)}
                            </TableCell>
                          ) : (
                            <TableCell
                              key={col.id}
                              style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                // paddingRight: 10,
                                whiteSpace: col.noWrap ? "nowrap" : "normal"
                              }}
                              numeric={col.numeric}
                            >
                              {// eslint-disable-next-line
                              col.render
                                ? col.render(row)
                                : typeof row[col.id] === "boolean"
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
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          labelRowsPerPage="Page size:"
        />
      </Paper>
    );
  }
}

DataTable.defaultProps = {
  loading: false
};

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  page: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool
};

export default withStyles(styles)(DataTable);

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash-es/debounce';
import Grid from '@material-ui/core/Grid';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import SearchBar from './SearchBar';
import ColumnChooser from './ColumnChooser';
import FilterChooser from './FilterChooser';
import ToolbarButtons from './ToolbarButtons';
import RenderFilterChips from './RenderFilterChips';

const toolbarStyles = theme => ({
  root: {
    padding: 10,
    paddingLeft: 20,
  },
  spacer: {
    flex: 1,
  },
  title: {
    flex: '0 0 auto',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.grey[200],
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
});

class DataTableToolbar extends React.Component {
  state = {
    showSearchField: false,
    filters: [],
    filtersForChips: [],
  };

  callFilterHandlerNoDebounce = debounce(query => {
    this.callFilterHandler(query);
  }, 50);

  callFilterHandlerDebounce = debounce(query => {
    this.callFilterHandler(query);
  }, 500);

  handleSearchClick = () => {
    this.setState({
      showSearchField: true,
    });
  };
  hideSearchBar = () => {
    this.setState({
      showSearchField: false,
    });
  };
  handleColumnVisibility = event => {
    this.setState({ anchorElColumns: event.currentTarget });
  };
  handleFilterVisibility = event => {
    this.setState({ anchorElFilter: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorElFilter: null, anchorElColumns: null });
  };

  clearFilters = () => {
    const { onFilter } = this.props;
    this.setState(
      {
        filters: [],
        filtersForChips: [],
      },
      onFilter('')
    );
  };

  handleFilterType = (filter, del = false) => {
    const { filters } = this.state;
    const { value, name, labelForField, labelForValue } = filter;
    const newFilters = [
      ...filters.filter(item => !item[name]),
      ...(value !== '' ? [{ [name]: value, labelForField, labelForValue }] : []),
    ];
    this.setState({
      filters: newFilters,
    });
    let query = '';
    newFilters.forEach(item => {
      const key = Object.keys(item)[0];
      query += `&${key}=${item[key]}`;
    });
    if (del) this.callFilterHandlerNoDebounce(query);
    else this.callFilterHandlerDebounce(query);
  };

  callFilterHandler = query => {
    const { onFilter, filterType } = this.props;
    const { filters } = this.state;
    this.setState({ filtersForChips: filters });
    filterType === 'query' ? onFilter(query) : onFilter(filters);
  };

  render() {
    const {
      numSelected,
      classes,
      title,
      onClickNew,
      onSearch,
      selected,
      // handleDelete,
      extraButtons,
      columns,
      handleColumnsSelection,
      // handleFilterSettings,
      onFilter,
      // filterType
      actions,
      clearSelected,
    } = this.props;
    const {
      showSearchField,
      anchorElFilter,
      anchorElColumns,
      filters,
      filtersForChips,
    } = this.state;
    // console.log(filterType);
    const showTitleOrInfo = () => {
      return numSelected > 0 ? (
        <Typography variant="subheading">
          <FormattedMessage
            id="dt.selected"
            defaultMessage={`{numSelected, number} {numSelected, plural, one {row selected} other {rows selected} }`}
            values={{ numSelected }}
          />
        </Typography>
      ) : (
        <Typography variant="headline">{title}</Typography>
      );
    };

    return (
      <React.Fragment>
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          <div className="title">
            {!showSearchField ? (
              showTitleOrInfo()
            ) : (
              <SearchBar hideSearchBar={this.hideSearchBar} onSearch={onSearch} />
            )}
          </div>
          <div className={classes.spacer} />
          <div>
            {numSelected > 0 ? (
              actions(selected, clearSelected)
            ) : (
              <ToolbarButtons
                handleSearchClick={this.handleSearchClick}
                handleColumnVisibility={this.handleColumnVisibility}
                handleFilterVisibility={this.handleFilterVisibility}
                extraButtons={extraButtons}
                onClickNew={onClickNew}
                onFilter={onFilter}
                onSearch={onSearch}
              />
            )}
          </div>
        </Toolbar>
        {filters.length > 0 && (
          <Toolbar>
            <Grid container alignItems="center">
              <Grid>
                <RenderFilterChips
                  filters={filtersForChips}
                  handleFilterType={this.handleFilterType}
                />
              </Grid>
            </Grid>
          </Toolbar>
        )}

        <ColumnChooser
          columns={columns}
          handleClose={this.handleClose}
          handleColumnsSelection={handleColumnsSelection}
          anchorEl={anchorElColumns}
        />
        <FilterChooser
          columns={columns}
          handleClose={this.handleClose}
          handleFilterSettings={this.handleFilterType}
          anchorEl={anchorElFilter}
          onFilter={this.handleFilterType}
          filters={filters}
          clearFilters={this.clearFilters}
        />
      </React.Fragment>
    );
  }
}

DataTableToolbar.defaultProps = {
  onClickNew: undefined,
  onSearch: undefined,
  selected: [],
  actions: undefined,
  extraButtons: undefined,
  onFilter: undefined,
  filterType: 'local',
};

DataTableToolbar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClickNew: PropTypes.func,
  onSearch: PropTypes.func,
  selected: PropTypes.instanceOf(Array),
  actions: PropTypes.func,
  clearSelected: PropTypes.func.isRequired,
  extraButtons: PropTypes.func,
  columns: PropTypes.instanceOf(Array).isRequired,
  handleColumnsSelection: PropTypes.func.isRequired,
  onFilter: PropTypes.func,
  filterType: PropTypes.string,
};

export default withStyles(toolbarStyles)(DataTableToolbar);

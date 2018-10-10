import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormattedMessage } from "react-intl";
import debounce from "lodash-es/debounce";
import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import ColumnChooser from "./ColumnChooser";
import FilterChooser from "./FilterChooser";
import ToolbarButtons from "./ToolbarButtons";
import RenderFilterChips from "./RenderFilterChips";

const toolbarStyles = theme => ({
  root: {
    padding: 20
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.grey[200],
          backgroundColor: theme.palette.secondary.light
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  deleteButtonColor: {
    color: theme.palette.grey[200]
  }
});

class DataTableToolbar extends React.Component {
  state = {
    showSearchField: false,
    anchorEl: null,
    filters: [],
    filtersForChips: []
  };
  handleSearchClick = () => {
    this.setState({
      showSearchField: true
    });
  };
  hideSearchBar = () => {
    this.setState({
      showSearchField: false
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
        filtersForChips: []
      },
      onFilter("")
    );
  };

  handleFilterType = (filter, del = false) => {
    const { filters } = this.state;
    const { value, name, labelForField, labelForValue } = filter;
    const newFilters = [
      ...filters.filter(item => !item[name]),
      ...(value !== "" ? [{ [name]: value, labelForField, labelForValue }] : [])
    ];
    this.setState({
      filters: newFilters
    });
    let query = "";
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
    filterType === "query" ? onFilter(query) : onFilter(filters);
  };

  callFilterHandlerNoDebounce = debounce(query => {
    this.callFilterHandler(query);
  }, 50);

  callFilterHandlerDebounce = debounce(query => {
    this.callFilterHandler(query);
  }, 500);

  render() {
    const {
      numSelected,
      classes,
      title,
      onClickNew,
      onSearch,
      selected,
      handleDelete,
      extraButtons,
      columns,
      handleColumnsSelection,
      handleFilterSettings,
      onFilter,
      filterType
    } = this.props;
    const { showSearchField, anchorElFilter, anchorElColumns } = this.state;
    // console.log(filterType);
    const showTitleOrInfo = () => {
      return numSelected > 0 ? (
        <Typography color="inherit" variant="subheading">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="headline" id="tableTitle">
          {title}
        </Typography>
      );
    };

    return (
      <React.Fragment>
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0
          })}
        >
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6}>
              {!showSearchField ? (
                showTitleOrInfo()
              ) : (
                <SearchBar
                  hideSearchBar={this.hideSearchBar}
                  onSearch={onSearch}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {numSelected > 0 ? (
                <Tooltip title={<FormattedMessage id="buttons.delete" />}>
                  <IconButton
                    onClick={() => handleDelete(selected)}
                    className={classes.deleteButtonColor}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
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
            </Grid>
          </Grid>
        </Toolbar>
        {this.state.filters.length > 0 && (
          <Toolbar>
            <Grid container alignItems="center">
              <Grid>
                <RenderFilterChips
                  filters={this.state.filtersForChips}
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
          filters={this.state.filters}
          clearFilters={this.clearFilters}
        />
      </React.Fragment>
    );
  }
}

DataTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClickNew: PropTypes.func,
  onSearch: PropTypes.func,
  selected: PropTypes.array,
  handleDelete: PropTypes.func,
  extraButtons: PropTypes.func,
  columns: PropTypes.array.isRequired,
  handleColumnsSelection: PropTypes.func.isRequired,
  onFilter: PropTypes.func
};

export default withStyles(toolbarStyles)(DataTableToolbar);

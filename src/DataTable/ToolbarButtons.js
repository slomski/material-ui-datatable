import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Search from '@material-ui/icons/Search';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FilterIcon from '@material-ui/icons/FilterList';
import AddNewIcon from '@material-ui/icons/AddBox';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';

const ToolbarButtons = props => {
  const {
    handleSearchClick,
    handleColumnVisibility,
    handleFilterVisibility,
    extraButtons,
    onClickNew,
    onFilter,
    onSearch
  } = props;
  return (
    <Grid container alignItems="center" justify="flex-end">
      {onSearch && (
        <Grid item>
          <Tooltip title={<FormattedMessage id="buttons.search" />}>
            <IconButton size="small" onClick={handleSearchClick}>
              <Search color="primary" />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {onFilter && (
        <Grid item>
          <Tooltip title={<FormattedMessage id="buttons.filter" />}>
            <IconButton size="small" onClick={handleFilterVisibility}>
              <FilterIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      <Grid item>
        <Tooltip title={<FormattedMessage id="buttons.columns" />}>
          <IconButton size="small" onClick={handleColumnVisibility}>
            <ViewColumnIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Grid>
      {extraButtons &&
        extraButtons().map((e, idx) => (
          // eslint-disable-next-line
          <Grid key={idx} item>
            {e.button}
          </Grid>
        ))}
      {onClickNew && (
        <Grid item>
          <Tooltip title={<FormattedMessage id="buttons.new" defaultMessage="New" />}>
            <IconButton size="small" onClick={onClickNew}>
              <AddNewIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};

ToolbarButtons.defaultProps = {
  handleSearchClick: undefined,
  handleColumnVisibility: undefined,
  handleFilterVisibility: undefined,
  extraButtons: undefined,
  onClickNew: undefined,
  onFilter: undefined,
  onSearch: undefined
};

ToolbarButtons.propTypes = {
  handleSearchClick: PropTypes.func,
  handleColumnVisibility: PropTypes.func,
  handleFilterVisibility: PropTypes.func,
  extraButtons: PropTypes.func,
  onClickNew: PropTypes.func,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func
};

export default ToolbarButtons;

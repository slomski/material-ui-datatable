import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { FormattedMessage } from 'react-intl';
import Close from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/ClearAll';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import FilterField from './FilterField';

const styles = () => ({
  popoverPaper: {
    width: 300,
    maxHeight: 600,
    flexGrow: 1,
  },
  appbar: {
    height: 48,
    minHeight: 48,
  },
  flex: {
    flex: 1,
  },
});

const FilterChooser = props => {
  const handleFilter = filter => {
    const { handleFilterSettings } = props;
    handleFilterSettings(filter);
  };

  const { columns, handleClose, anchorEl, classes, filters, clearFilters } = props;
  // add default allowFilter flag set to true if absent on columns object
  const defaultColumns = columns.map(col => ({
    ...col,
    allowFilter: col.allowFilter === undefined ? true : col.allowFilter,
  }));
  const cols = defaultColumns
    .filter(col => col.visible)
    .filter(col => col.allowFilter)
    .filter(col => col.id !== 'actions')
    .map(col => {
      const filterValue = filters.find(e => {
        const key = Object.keys(e)[0];
        return key === col.id;
      });
      const value = filterValue ? Object.values(filterValue)[0] : '';
      return (
        <Grid item xs key={col.id}>
          <FilterField column={col} value={value} handleFilter={handleFilter} />
        </Grid>
      );
    });
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Paper className={classes.popoverPaper} elevation={0}>
        <AppBar position="sticky" color="default" className={classes.appbar} elevation={0}>
          <Toolbar className={classes.appbar}>
            <Typography className={classes.flex} variant="title" style={{ fontSize: '1em' }}>
              <FormattedMessage id="buttons.filter" defaultMessage="Filter" />
            </Typography>
            <Tooltip title={<FormattedMessage id="buttons.clear" defaultMessage="Clear" />}>
              <IconButton onClick={clearFilters}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={<FormattedMessage id="buttons.close" defaultMessage="Close" />}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Divider />
        <div style={{ padding: 20 }}>{cols}</div>
      </Paper>
    </Popover>
  );
};

FilterChooser.defaultProps = {
  anchorEl: null,
};

FilterChooser.propTypes = {
  handleFilterSettings: PropTypes.func.isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object).isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default withStyles(styles)(FilterChooser);

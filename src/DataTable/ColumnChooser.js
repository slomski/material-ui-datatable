import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import { FormattedMessage } from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const styles = () => ({
  popoverPaper: {
    width: 250,
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

const ColumnChooser = props => {
  const { columns, handleClose, handleColumnsSelection, anchorEl, classes } = props;
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
              <FormattedMessage id="buttons.columns" />
            </Typography>
            <Tooltip title={<FormattedMessage id="buttons.close" defaultMessage="Close" />}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Divider />
        {columns.filter(column => column.id !== 'actions').map(column => (
          <MenuItem
            dense
            key={column.id}
            value={column.label}
            onClick={() => handleColumnsSelection(column.id)}
          >
            <Checkbox checked={column.visible} />
            <ListItemText primary={column.label} />
          </MenuItem>
        ))}
      </Paper>
    </Popover>
  );
};

ColumnChooser.defaultProps = {
  anchorEl: null,
};

ColumnChooser.propTypes = {
  columns: PropTypes.instanceOf(Array).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleColumnsSelection: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(ColumnChooser);

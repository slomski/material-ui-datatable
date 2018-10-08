import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";

const styles = () => ({
  popoverPaper: {
    width: 250,
    maxHeight: 600,
    flexGrow: 1
  },
  appbar: {
    height: 48,
    minHeight: 48
  },
  flex: {
    flex: 1
  }
});

const ColumnChooser = props => {
  const {
    columns,
    handleClose,
    handleColumnsSelection,
    anchorEl,
    classes
  } = props;
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <Paper className={classes.popoverPaper} elevation={0}>
        <AppBar
          position="sticky"
          color="default"
          className={classes.appbar}
          elevation={0}
        >
          <Toolbar className={classes.appbar}>
            <Typography
              className={classes.flex}
              variant="title"
              style={{ fontSize: "1em" }}
            >
              <FormattedMessage id="buttons.columns" />
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Divider />
        {columns.filter(column => column.id !== "actions").map(column => (
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

export default withStyles(styles)(ColumnChooser);

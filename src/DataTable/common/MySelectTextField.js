import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    width: "100%"
  }
});

const MySelectTextField = props => {
  const { classes, label, myStyle, selectedField } = props;

  return (
    <TextField
      fullWidth
      select
      label={label}
      className={classes.textField}
      value={selectedField}
      onChange={props.handleChangeSelected}
      SelectProps={{
        MenuProps: {
          className: classes.menu
        }
      }}
      margin="dense"
      style={myStyle}
      id={props.id}
    >
      {props.fields.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

MySelectTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeSelected: PropTypes.func.isRequired,
  label: PropTypes.object.isRequired,
  selectedField: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  myStyle: PropTypes.object,
  id: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(MySelectTextField);

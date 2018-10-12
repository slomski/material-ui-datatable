import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const SelectWrapper = props => {
  const { label, fields, selectedField, handleChangeSelected } = props;

  return (
    <TextField
      fullWidth
      select
      label={label}
      value={selectedField}
      onChange={handleChangeSelected}
      margin="dense"
    >
      {fields.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectWrapper.propTypes = {
  handleChangeSelected: PropTypes.func.isRequired,
  label: PropTypes.instanceOf(Object).isRequired,
  selectedField: PropTypes.string.isRequired,
  fields: PropTypes.instanceOf(Array).isRequired
};

export default SelectWrapper;

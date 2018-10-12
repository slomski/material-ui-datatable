import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'material-ui-pickers';
import { format } from 'date-fns';
import MySelectTextField from './common/SelectWrapper';

class FilterField extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.column.forFilter) {
      return { [nextProps.column.id]: nextProps.value || null };
    }
    return { [nextProps.column.id]: nextProps.value || '' };
  }

  state = {
    // eslint-disable-next-line
    [this.props.column.id]: this.props.value || ''
  };

  handleChange = name => event => {
    const { handleFilter, column } = this.props;
    const value =
      // externalize date format
      event.constructor.name === 'Date' ? format(event, 'YYYY-MM-dd') : event.target.value;
    const state = { [name]: value };
    handleFilter({
      name,
      value,
      labelForField: column.label,
      labelForValue: column.filterOptions
        ? column.filterOptions.filter(item => item.value === value)[0].name
        : value
    });
    this.setState(state);
  };

  render() {
    const { column } = this.props;
    // const fieldWidth = column.label.length > 14 ? '100%' : 140;
    if (column.forFilter) {
      return (
        <DatePicker
          keyboard
          label={column.label}
          format="YYYY-MM-dd"
          // eslint-disable-next-line
          value={this.state[column.id]}
          onChange={this.handleChange(column.id)}
          style={{ width: '100%' }}
          autoOk
        />
      );
    } else if (column.filterOptions) {
      return (
        <MySelectTextField
          fields={column.filterOptions}
          label={column.label}
          // eslint-disable-next-line
          selectedField={this.state[column.id]}
          handleChangeSelected={this.handleChange(column.id)}
        />
      );
    }
    return (
      <TextField
        fullWidth
        label={column.label}
        // eslint-disable-next-line
        value={this.state[column.id]}
        onChange={this.handleChange(column.id)}
      />
    );
  }
}

FilterField.propTypes = {
  handleFilter: PropTypes.func.isRequired
};

export default FilterField;

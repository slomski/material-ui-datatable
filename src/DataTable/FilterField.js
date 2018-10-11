import React from "react";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";
import { format } from "date-fns";
import MySelectTextField from "./common/MySelectTextField";
import DatePicker from "./common/DatePicker";

class FilterField extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.column.forFilter) {
      return { [nextProps.column.id]: nextProps.value || null };
    }
    return { [nextProps.column.id]: nextProps.value || "" };
  }

  state = {
    [this.props.column.id]: this.props.value || ""
  };

  handleChange = name => event => {
    // console.log(event.constructor.name);
    const value =
      event.constructor.name === "Date"
        ? format(event, "YYYY-MM-dd")
        : event.target.value;
    const state = { [name]: value };
    this.props.handleFilter({
      name,
      value,
      labelForField: this.props.column.label,
      labelForValue: this.props.column.filterOptions
        ? this.props.column.filterOptions.filter(
            item => item.value === value
          )[0].name
        : value
    });
    this.setState(state);
  };

  render() {
    const { column } = this.props;
    const fieldWidth = column.label.length > 14 ? "100%" : 140;
    if (column.forFilter) {
      return (
        <DatePicker
          handleChangeDate={this.handleChange(column.id)}
          selectedDate={this.state[column.id]}
          label={column.label}
        />
      );
    } else if (column.filterOptions) {
      return (
        <MySelectTextField
          fields={column.filterOptions}
          label={column.label}
          selectedField={this.state[column.id]}
          handleChangeSelected={this.handleChange(column.id)}
        />
      );
    }
    return (
      <TextField
        fullWidth
        label={column.label}
        value={this.state[column.id]}
        onChange={this.handleChange(column.id)}
      />
    );
  }
}

export default FilterField;

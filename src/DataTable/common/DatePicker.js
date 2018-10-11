import React, { Fragment } from "react";
import { DatePicker } from "material-ui-pickers";
import { PropTypes } from "prop-types";

const DatePic = props => {
  const { label, selectedDate, handleChangeDate } = props;

  return (
    <Fragment>
      <div className="picker">
        <DatePicker
          keyboard
          label={label}
          format="YYYY-MM-dd"
          value={selectedDate}
          onChange={handleChangeDate}
          style={{ width: "100%" }}
          autoOk
        />
      </div>
    </Fragment>
  );
};

DatePic.propTypes = {
  selectedDate: PropTypes.string,
  label: PropTypes.object,
  handleChangeDate: PropTypes.func
};

export default DatePic;

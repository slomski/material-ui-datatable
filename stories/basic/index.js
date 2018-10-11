import React from "react";
import PropTypes from "prop-types";
import Datatable from "../../src/DataTable";
import columns from "../columns";
import data from "../data";

class SimpleTable extends React.Component {
  handleClickNew = () => {
    alert("new button clicked");
  };

  render() {
    const { showToolbar, elevation } = this.props;
    const options = {
      filterType: "local",
      showToolbar,
      elevation,
      onClickNew: this.handleClickNew
    };
    return (
      <Datatable
        title="Basic Table"
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

SimpleTable.defaultProps = {
  showToolbar: true,
  elevation: 2
};

SimpleTable.propTypes = {
  showToolbar: PropTypes.bool,
  elevation: PropTypes.number
};

export default SimpleTable;

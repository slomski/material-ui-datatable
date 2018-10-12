import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Datatable from "../../src/DataTable";
import columns from "../columns";
import data from "../data";
import theme from "../../src/theme";

class SimpleTable extends React.Component {
  handleClickNew = () => {
    alert("new button clicked");
  };

  render() {
    const { showToolbar, elevation, showCheckbox } = this.props;
    const options = {
      filterType: "local",
      showToolbar,
      elevation,
      onClickNew: this.handleClickNew,
      showCheckbox
    };
    return (
      <MuiThemeProvider theme={theme}>
        <Datatable
          title="Basic Table"
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

SimpleTable.defaultProps = {
  showToolbar: true,
  elevation: 2,
  showCheckbox: false
};

SimpleTable.propTypes = {
  showToolbar: PropTypes.bool,
  elevation: PropTypes.number,
  showCheckbox: PropTypes.bool
};

export default SimpleTable;

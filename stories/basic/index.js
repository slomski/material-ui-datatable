import React from "react";
import PropTypes from "prop-types";
import orderBy from "lodash-es/orderBy";
import Datatable from "../../src/DataTable";
import columns from "../columns";
import data from "../data";

class SimpleTable extends React.Component {
  state = {
    page: { totalElements: data.length, size: 5, number: 0 },
    sort: { by: "desert", dir: "asc" },
    data
  };
  handleSortChange = (by, dir) => {
    const { data } = this.state;
    const newData = orderBy(data, by, dir);
    this.setState({
      sort: { by, dir },
      data: newData
    });
  };

  handlePageChange = (event, pageNumber) => {
    const { page } = this.state;
    this.setState({
      page: { ...page, number: pageNumber }
    });
  };

  handleRowsPerPageChange = event => {
    const { page } = this.state;
    this.setState({
      page: { ...page, size: event.target.value }
    });
  };

  handleFiltering = filter => {
    console.log(filter);
  };

  render() {
    const { sort, page, data } = this.state;
    const { showToolbar, elevation } = this.props;
    const options = {
      sort,
      onSortChange: this.handleSortChange,
      onChangePage: this.handlePageChange,
      onChangeRowsPerPage: this.handleRowsPerPageChange,
      onFilter: this.handleFiltering,
      filterType: "local",
      showToolbar,
      elevation
    };
    const pagedData = data.slice(
      page.number * page.size,
      page.size * (page.number + 1)
    );
    return (
      <Datatable
        title="Basic Table"
        data={pagedData}
        columns={columns}
        page={page}
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

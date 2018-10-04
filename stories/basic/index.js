import React from "react";
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
    this.setState({ sort: { by, dir } });
  };

  render() {
    const { sort, page, data } = this.state;
    const options = { sort, onHandleSortChange: this.handleSortChange };
    console.log(data);

    return (
      <Datatable
        title="Basic Table"
        data={data}
        columns={columns}
        page={page}
        options={options}
      />
    );
  }
}

export default SimpleTable;

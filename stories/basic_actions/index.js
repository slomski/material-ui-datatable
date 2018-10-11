import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Datatable from "../../src/DataTable";
import columns from "../columns_actions";
import columnsCustomRender from "../columns_actions_custom";
import data from "../data";

class SimpleTableActions extends React.Component {
  handleClickNew = () => {
    alert("new button clicked");
  };

  handleEdit = id => {
    alert(`edit action on row with id: ${id}`);
  };

  handleDelete = id => {
    alert(`delete action on row with id: ${id}`);
  };

  renderActions = id => {
    return (
      <React.Fragment>
        <IconButton
          onClick={() => {
            this.handleEdit(id);
          }}
        >
          <EditIcon color="primary" />
        </IconButton>
        <IconButton
          onClick={() => {
            this.handleDelete(id);
          }}
        >
          <DeleteIcon color="primary" />
        </IconButton>
      </React.Fragment>
    );
  };

  render() {
    const { showToolbar, elevation, customRender } = this.props;
    const options = {
      filterType: "local",
      showToolbar,
      elevation,
      onClickNew: this.handleClickNew,
      actions: { renderActions: this.renderActions }
    };
    return (
      <Datatable
        title="Basic Table"
        data={data}
        columns={customRender ? columnsCustomRender : columns}
        options={options}
      />
    );
  }
}

SimpleTableActions.defaultProps = {
  showToolbar: true,
  elevation: 2,
  customRender: false
};

SimpleTableActions.propTypes = {
  showToolbar: PropTypes.bool,
  elevation: PropTypes.number,
  customRender: PropTypes.bool
};

export default SimpleTableActions;

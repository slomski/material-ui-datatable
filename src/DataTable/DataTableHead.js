import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";

class DataTableHead extends React.Component {
  state = {};

  createSortHandler = (property, direction) => () => {
    const { onRequestSort } = this.props;
    onRequestSort(property, direction === "asc" ? "desc" : "asc");
  };

  render() {
    const {
      onSelectAllClick,
      orderDir,
      orderBy,
      numSelected,
      rowCount,
      columnData,
      showCheckbox,
      onFilter
    } = this.props;
    return (
      <TableHead style={{ display: "table-header-group" }}>
        <TableRow>
          {showCheckbox && (
            <TableCell
              padding="dense"
              style={{
                borderBottom: "1px solid rgba(224, 224, 224, 1)"
              }}
            >
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          )}
          {columnData.map(column => {
            if (column.visible) {
              return (
                <TableCell
                  style={{
                    whiteSpace: "nowrap",
                    borderBottom: !onFilter
                      ? "1px solid rgba(224, 224, 224, 1)"
                      : 0
                  }}
                  key={column.id}
                  numeric={column.numeric}
                  // padding={column.disablePadding ? "dense" : "default"}
                >
                  {column.allowSort ? (
                    <Tooltip
                      title="Sort"
                      placement={column.numeric ? "bottom-end" : "bottom-start"}
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderDir}
                        onClick={this.createSortHandler(column.id, orderDir)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </Tooltip>
                  ) : (
                    column.label
                  )}
                </TableCell>
              );
            }
            return <React.Fragment key={column.id} />;
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

DataTableHead.defaultProps = {
  onFilter: null
};

DataTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  showCheckbox: PropTypes.bool.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  orderDir: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnData: PropTypes.instanceOf(Array).isRequired,
  onFilter: PropTypes.func
};

export default DataTableHead;

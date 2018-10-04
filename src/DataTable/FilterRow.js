import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles/index';

const styles = ({ theme }) => ({
  flexContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

const FilterRow = (props) => {
  const { showCheckbox, columnData, handleFilterType, classes } = props;
  return (

    <TableRow>
      { showCheckbox && <TableCell padding="checkbox">&nbsp;</TableCell> }
      { columnData.map(column => {
        if (column.visible) {
          return column.id !== 'actions' ?
            <TableCell
              key={column.id}
              padding={column.disablePadding ? 'dense' : 'default'}
              // style={{ width: column.width }}
            >
              <div className={classes.flexContainer}>
                <Input
                  // fullWidth
                  placeholder="filter..."
                  onChange={handleFilterType(column.id)}
                  // style={{ fontSize: '0.8125rem', fontWeight: 400 }}
                />
              </div>
            </TableCell>
            : <TableCell key={column.id}>&nbsp;</TableCell>;
        }
        return <React.Fragment key={column.id} />;
      })
      }
    </TableRow>
  );
};

export default withStyles(styles)(FilterRow);

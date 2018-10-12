// import React from 'react';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
// import Input from '@material-ui/core/Input';
// import { withStyles } from '@material-ui/core/styles/index';

// const styles = () => ({
//   flexContainer: {
//     width: '100%',
//     display: 'flex',
//     alignItems: 'center'
//   }
// });

// const FilterRow = props => {
//   const { showCheckbox, columnData, handleFilterType, classes } = props;
//   return (
//     <TableRow>
//       {showCheckbox && <TableCell padding="checkbox">&nbsp;</TableCell>}
//       {columnData.map(column => {
//         if (column.visible) {
//           return column.id !== 'actions' ? (
//             <TableCell key={column.id} padding={column.disablePadding ? 'dense' : 'default'}>
//               <div className={classes.flexContainer}>
//                 <Input placeholder="filter..." onChange={handleFilterType(column.id)} />
//               </div>
//             </TableCell>
//           ) : (
//             <TableCell key={column.id}>&nbsp;</TableCell>
//           );
//         }
//         return <React.Fragment key={column.id} />;
//       })}
//     </TableRow>
//   );
// };

// export default withStyles(styles)(FilterRow);

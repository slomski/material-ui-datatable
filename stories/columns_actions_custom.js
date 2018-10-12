import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import columns from './columns';

const customRender = row => {
  return (
    <Tooltip title={row.desert}>
      <Button color="secondary">row: {row.id}</Button>
    </Tooltip>
  );
};

const columnsCustomRender = [
  ...columns,
  {
    id: 'anyid',
    numeric: false,
    label: 'Custom column',
    allowSort: false,
    visible: true,
    render: row => customRender(row)
  },
  {
    id: 'actions',
    numeric: true,
    label: 'Actions',
    allowSort: false,
    visible: true
  }
];

export default columnsCustomRender;

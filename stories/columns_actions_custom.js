import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import columns from './columns';

const columnsCustomRender = [
  ...columns,
  {
    id: 'anyid',
    numeric: false,
    label: 'Custom column',
    allowSort: false,
    visible: true,
    render: row => {
      <Tooltip title={row.desert}>
        <Button color="secondary">row: {row.id}</Button>
      </Tooltip>;
    }
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

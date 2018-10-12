import React from 'react';
import { storiesOf } from '@storybook/react';
import BasicTable from './basic';
import BasicTableActions from './basic_actions';

storiesOf('Table with local data source', module)
  .add('no toolbar', () => <BasicTable showToolbar={false} />)
  .add('no toolbar, no elevation', () => <BasicTable showToolbar={false} elevation={0} />)
  .add('with toolbar', () => <BasicTable />)
  .add('with toolbar, row actions', () => <BasicTableActions />)
  .add('with toolbar, row actions, custom render', () => <BasicTableActions customRender />)
  .add('with toolbar, checkboxes, multi row actions', () => <BasicTable showCheckbox />)
  .add('with toolbar, checkboxes, multi row actions, search action, custom actions', () => (
    <BasicTable showCheckbox showSearch showExtraActions />
  ));

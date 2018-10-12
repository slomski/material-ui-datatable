import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { FormattedMessage } from 'react-intl';
import Datatable from '../../src/DataTable';
import columns from '../columns_actions';
import columnsCustomRender from '../columns_actions_custom';
import data from '../data';
import theme from '../../src/theme';

class SimpleTableActions extends React.Component {
  handleClickNew = () => {
    alert('new button clicked');
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
        <Tooltip title={<FormattedMessage id="buttons.import" />}>
          <IconButton
            onClick={() => {
              this.handleEdit(id);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="buttons.delete" />}>
          <IconButton
            onClick={() => {
              this.handleDelete(id);
            }}
          >
            <DeleteIcon color="primary" />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  render() {
    const { showToolbar, elevation, customRender } = this.props;
    const options = {
      filterType: 'local',
      showToolbar,
      elevation,
      onClickNew: this.handleClickNew,
      actions: {
        renderActions: this.renderActions,
      },
    };
    return (
      <MuiThemeProvider theme={theme}>
        <Datatable
          title="Local data table"
          data={data}
          columns={customRender ? columnsCustomRender : columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

SimpleTableActions.defaultProps = {
  showToolbar: true,
  elevation: 2,
  customRender: false,
};

SimpleTableActions.propTypes = {
  showToolbar: PropTypes.bool,
  elevation: PropTypes.number,
  customRender: PropTypes.bool,
};

export default SimpleTableActions;

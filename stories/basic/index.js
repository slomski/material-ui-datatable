import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import Datatable from '../../src/DataTable';
import columns from '../columns';
import data from '../data';
import theme from '../../src/theme';

class SimpleTable extends React.Component {
  handleClickNew = () => {
    alert('new button clicked');
  };
  handleSearch = searchString => {
    console.log(searchString);
  };

  handleExportMulti = ids => {
    const rows = ids.join(',');
    alert(`Exporting rows with id: ${rows}`);
  };

  handleDeleteMulti = ids => {
    const rows = ids.join(',');
    alert(`Deleting rows with id: ${rows}`);
  };

  extraButtons = () => {
    return [
      {
        button: (
          <Tooltip title={<FormattedMessage id="buttons.import" />}>
            <IconButton onClick={() => alert('Custom action Import Export')}>
              <ImportExportIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        button: (
          <Tooltip title={<FormattedMessage id="buttons.download" />}>
            <IconButton onClick={() => alert('Custom action Download')}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ];
  };

  renderMultipleActions = ids => {
    return (
      <React.Fragment>
        <Tooltip title={<FormattedMessage id="buttons.export" />}>
          <IconButton
            onClick={() => {
              this.handleExportMulti(ids);
            }}
          >
            <ImportExportIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="buttons.delete" />}>
          <IconButton
            onClick={() => {
              this.handleDeleteMulti(ids);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  render() {
    const { showToolbar, elevation, showCheckbox, showSearch, showExtraActions } = this.props;
    const options = {
      filterType: 'local',
      showToolbar,
      elevation,
      onClickNew: this.handleClickNew,
      showCheckbox,
      onSearch: showSearch ? this.handleSearch : undefined,
      extraButtons: showExtraActions ? this.extraButtons : undefined,
      actions: {
        renderMultipleActions: this.renderMultipleActions,
      },
    };
    return (
      <MuiThemeProvider theme={theme}>
        <Datatable title="Local data table" data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    );
  }
}

SimpleTable.defaultProps = {
  showToolbar: true,
  elevation: 2,
  showCheckbox: false,
  showSearch: false,
  showExtraActions: false,
};

SimpleTable.propTypes = {
  showToolbar: PropTypes.bool,
  elevation: PropTypes.number,
  showCheckbox: PropTypes.bool,
  showSearch: PropTypes.bool,
  showExtraActions: PropTypes.bool,
};

export default SimpleTable;

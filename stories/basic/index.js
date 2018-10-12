import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DownloadIcon from '@material-ui/icons/Save';
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

  extraButtons = () => {
    return [
      {
        button: (
          <Tooltip title={<FormattedMessage id="buttons.import" />}>
            <IconButton>
              <ImportExportIcon />
            </IconButton>
          </Tooltip>
        )
      },
      {
        button: (
          <Tooltip title={<FormattedMessage id="buttons.download" />}>
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        )
      }
    ];
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
      extraButtons: showExtraActions ? this.extraButtons : undefined
    };
    return (
      <MuiThemeProvider theme={theme}>
        <Datatable title="Basic Table" data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    );
  }
}

SimpleTable.defaultProps = {
  showToolbar: true,
  elevation: 2,
  showCheckbox: false,
  showSearch: false,
  showExtraActions: false
};

SimpleTable.propTypes = {
  showToolbar: PropTypes.bool,
  elevation: PropTypes.number,
  showCheckbox: PropTypes.bool,
  showSearch: PropTypes.bool,
  showExtraActions: PropTypes.bool
};

export default SimpleTable;

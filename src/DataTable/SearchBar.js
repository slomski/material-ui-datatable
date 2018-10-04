import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';


class SearchBar extends React.Component {
  state = {
    search: '',
  };
  onSearch = debounce((searchString) => this.props.onSearch(searchString), 500);
  handleChange = name => event => {
    const searchString = event.target.value;
    this.setState({ [name]: searchString }, this.onSearch(searchString));
  };

  render() {
    const { hideSearchBar } = this.props;
    const { search } = this.state;
    return (
      <React.Fragment>

        <TextField
          value={search}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={this.handleChange('search')}
        />
        <Tooltip title={<FormattedMessage id="buttons.close" />}>
          <IconButton onClick={hideSearchBar}>
            <CloseIcon color="primary" />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  hideSearchBar: PropTypes.func,
};

export default SearchBar;

import React from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class RenderFilterChips extends React.Component {
  state ={};

  handleDelete = key => {
    console.log(key);
    this.props.handleFilterType({ name: [key], value: '' }, true);
  };

  render() {
    const { filters, classes } = this.props;
    const chips = filters.map((filter, index) => {
      const key = Object.keys(filter)[0];
      const label = <div>{filters[index].labelForField}: {filters[index].labelForValue}</div>;
      return (<Chip
        key={key}
        // label={`${key} : ${filter[key]}`}
        label={label}
        onDelete={() => this.handleDelete(key)}
        className={classes.chip}
      />);
    });
    return (
      <React.Fragment>
        { chips }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(RenderFilterChips);

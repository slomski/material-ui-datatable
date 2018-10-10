import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import FilterIcon from "@material-ui/icons/FilterList";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";

const ToolbarButtons = props => {
  const {
    handleSearchClick,
    handleColumnVisibility,
    handleFilterVisibility,
    extraButtons,
    onClickNew,
    onFilter,
    onSearch
  } = props;
  return (
    <Grid container alignItems="center" justify="flex-end">
      {onSearch && (
        <Grid item>
          <Tooltip title={<FormattedMessage id="buttons.search" />}>
            <IconButton
              size="small"
              onClick={handleSearchClick}
              color="primary"
            >
              <Search />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {onFilter && (
        <Grid item>
          <Tooltip title={<FormattedMessage id="buttons.filter" />}>
            <Button
              size="small"
              onClick={handleFilterVisibility}
              color="primary"
            >
              <FormattedMessage id="buttons.filter" />
            </Button>
          </Tooltip>
        </Grid>
      )}
      <Grid item>
        <Tooltip title={<FormattedMessage id="buttons.columns" />}>
          <Button size="small" onClick={handleColumnVisibility} color="primary">
            <FormattedMessage id="buttons.columns" />
          </Button>
        </Tooltip>
      </Grid>
      {extraButtons &&
        extraButtons().map((e, idx) => (
          <Grid key={idx} item>
            {e.button}
          </Grid>
        ))}
      {onClickNew && (
        <Grid item>
          <Tooltip title={<FormattedMessage id="buttons.add.new" />}>
            <Button size="small" color="primary" onClick={onClickNew}>
              <FormattedMessage id="buttons.new" />
            </Button>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
};

export default ToolbarButtons;

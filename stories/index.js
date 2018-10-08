import React from "react";
import { storiesOf } from "@storybook/react";
import BasicTable from "./basic";

storiesOf("Simple table, local data", module)
  .add("no toolbar", () => <BasicTable showToolbar={false} />)
  .add("no toolbar, no elevation", () => (
    <BasicTable showToolbar={false} elevation={0} />
  ))
  .add("with toolbar", () => <BasicTable />);

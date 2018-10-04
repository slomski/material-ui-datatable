import React from "react";
import { storiesOf } from "@storybook/react";
import BasicTable from "./basic";

storiesOf("Simple table", module).add("basic", () => <BasicTable />);

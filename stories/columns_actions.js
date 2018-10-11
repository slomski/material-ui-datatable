import columns from "./columns";

export default [
  ...columns,
  {
    id: "actions",
    numeric: true,
    label: "Actions",
    allowSort: false,
    visible: true
  }
];

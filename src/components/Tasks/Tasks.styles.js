import { createUseStyles } from "react-jss";

export const useTasksStyle = createUseStyles({
  parent: {
    width: "100%",
    minHeight: "800px",
    background: "#333333",
    color: "white",
  },
  menu: {
    width: "100%",
    minHeight: "50px",
    position: "fixed",
    zIndex: "10",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#535353",
  },

  table: {
    position: "relative",
    top: "120px",
    width: "70%",
    textAlign: "center",
    margin: "auto",
    "& td": {
      textAlign: "center",
      padding: "16px",
    },
    "& td:last-child": {
      position: "relative",
    },
    "& td:last-child button": {
      position: "absolute",
      top: 12,
      right: 100,
    },
    "& tr:nth-child(even) ": {
      backgroundColor: "gray",
      color: "black",
    },
  },
});

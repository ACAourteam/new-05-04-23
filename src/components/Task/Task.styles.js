import { createUseStyles } from "react-jss";

export const useTaskStyles = createUseStyles({
  parent: {
    width: "100%",
    minHeight: "800px",
    background: "#333333",
    color: "white",
  },
  task: {
    maxWidth: "700px",
    height: "300px",
    background: "#A76C00FF",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 4fr",
    padding: "20px",
    borderRadius: "40px",
    columnGap: "30px",
  },
  taskName: {
    background: "#333333",
    borderRadius: 10,
    textAlign: "center",
  },
  typeTask: {
    border: "1px solid white",
    marginTop: 10,
    borderRadius: 10,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },

  taskDescription: {
    height: 150,
    border: "3px solid #76675FFF",
    borderRadius: 10,
    textAlign: "center",
  },
  buttons: {
    textAlign: "center",
    top: 180,
    marginTop: 20,
  },
  downArrowIcon: {
    width: "20px",
    height: "20px",
  },
});

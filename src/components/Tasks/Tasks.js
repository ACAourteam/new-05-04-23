import { Button } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BUSINESS_MANAGMENT,
  FINANCE_MANAGEMENT,
  SIGN_IN,
  SOFTWARE_DEVELOPMENT,
  SYSTEM_ADMIN_ENGINEER,
  TASKS,
} from "../../constants/auth";
import { tasksRef } from "../../firebase";
import { useTasksStyle } from "./Tasks.styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAuth } from "../../context/Context";

function Tasks() {
  const styles = useTasksStyle();
  const [allTasks, setAllTasks] = useState([]);
  const [category, setCategory] = useState("");
  const [taskFiltered, setTaskFiltered] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const tasks = [];
    async function getData() {
      const snapshot = await getDocs(tasksRef);
      snapshot.forEach((doc) => tasks.push({ ...doc.data(), id: doc.id }));
      setAllTasks(tasks);
    }
    getData();
  }, []);

  const signOutClick = () => {
    logout();
    navigate(TASKS);
  };

  const onOpenClick = (id) => {
    navigate(`/task/${id}`);
  };
  return (
    <div className={styles.parent}>
      <div className={styles.menu}>
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 120 }}
          style={{
            background: "white",
          }}
        >
          <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setTaskFiltered(
                allTasks.filter((task) => task.typeTask == e.target.value)
              );
            }}
          >
            <MenuItem value={SOFTWARE_DEVELOPMENT}>
              {SOFTWARE_DEVELOPMENT}
            </MenuItem>
            <MenuItem value={FINANCE_MANAGEMENT}>{FINANCE_MANAGEMENT}</MenuItem>
            <MenuItem value={BUSINESS_MANAGMENT}>{BUSINESS_MANAGMENT}</MenuItem>
            <MenuItem value={SYSTEM_ADMIN_ENGINEER}>
              {SYSTEM_ADMIN_ENGINEER}
            </MenuItem>
          </Select>
        </FormControl>
        {user ? (
          <Button
            onClick={signOutClick}
            style={{
              marginRight: 30,
            }}
          >
            Sign Out
          </Button>
        ) : (
          <NavLink
            to={SIGN_IN}
            style={{
              textDecoration: "none",
              marginRight: 30,
            }}
          >
            <Button variant="contained">Sign In</Button>
          </NavLink>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User Avatar</th>
            <th>Added By</th>
            <th>Task Name</th>
            <th>Type Of Task</th>
          </tr>
        </thead>
        <tbody>
          {!taskFiltered
            ? allTasks.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>
                      <div
                        style={{
                          backgroundImage: `url(${task.userPhotoUrl})`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                        }}
                      ></div>
                    </td>
                    <td>
                      {task.userName} {task.userSurname}
                    </td>
                    <td>{task.taskName}</td>
                    <td>
                      {task.typeTask}{" "}
                      <Button onClick={() => onOpenClick(task.id)}>open</Button>
                    </td>
                  </tr>
                );
              })
            : taskFiltered.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>
                      <div
                        style={{
                          backgroundImage: `url(${task.userPhotoUrl})`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                        }}
                      ></div>
                    </td>
                    <td>
                      {task.userName} {task.userSurname}
                    </td>
                    <td>{task.taskName}</td>
                    <td>{task.typeTask}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
export default Tasks;

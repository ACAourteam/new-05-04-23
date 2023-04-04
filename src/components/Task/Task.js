import { Button } from "@mui/material";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { tasksRef } from "../../firebase";
import { useTaskStyles } from "./Task.styles";
import downArrowIcon from "../../assets/images/downArrowIcon.png";
import Responses from "../Responses/Responses";
import Comments from "../Comments/Comments";
import { PROFILE, SIGN_IN } from "../../constants/auth";
import { useAuth } from "../../context/Context";

function Task() {
  const params = useParams();
  const [task, setTask] = useState(null);
  const styles = useTaskStyles();
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [showCommentsDialog, setShowCommentsDialog] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const tasks = [];
    async function getData() {
      const snapshot = await getDocs(tasksRef);
      snapshot.forEach((doc) => tasks.push({ ...doc.data(), id: doc.id }));
      setTask(tasks.find((task) => task.id === params.id));
    }
    getData();
  }, [showCommentsDialog, showResponseDialog]);

  const signOutClick = (id) => {
    logout();
    navigate(`/task/${id}`);
  };

  const onMyProfileClick = () => {
    navigate(PROFILE);
  };
  return (
    <div className={styles.parent}>
      {user ? (
        <div
          style={{
            position: "absolute",
            right: "20px",
          }}
        >
          <Button onClick={() => signOutClick(task.id)}>Sign Out</Button>
          <Button onClick={onMyProfileClick}>My Profile</Button>
        </div>
      ) : (
        <NavLink
          to={SIGN_IN}
          style={{
            textDecoration: "none",
            position: "absolute",
            right: "20px",
            top: 10,
          }}
        >
          <Button variant="contained">Sign In</Button>
        </NavLink>
      )}
      <div className={styles.task}>
        <div>
          <div
            style={{
              backgroundImage: `url(${task?.userPhotoUrl})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: 120,
              height: 150,
              borderRadius: "10px",
            }}
          ></div>
          <h2>{task?.userName}</h2>
          <h2>{task?.userSurname}</h2>
        </div>
        <div>
          <div className={styles.taskName}>{task?.taskName}</div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <div>Type</div>
            <img src={downArrowIcon} className={styles.downArrowIcon} />
          </div>
          <div className={styles.typeTask}>{task?.typeTask}</div>
        </div>
        <div className={styles.description}>
          <div className={styles.taskDescription}>{task?.taskDescription}</div>
          <div className={styles.buttons}>
            <Button
              color="info"
              variant="contained"
              style={{ background: "#76675FFF" }}
              onClick={() => setShowCommentsDialog(true)}
            >
              Comments
            </Button>
            <Button
              color="info"
              variant="contained"
              style={{ background: "#14BDADFF", marginLeft: "10px" }}
              onClick={() => setShowResponseDialog(true)}
            >
              Response
            </Button>
            {showResponseDialog && (
              <Responses
                setShowResponseDialog={setShowResponseDialog}
                task={task}
              />
            )}
            {showCommentsDialog && (
              <Comments
                setShowCommentsDialog={setShowCommentsDialog}
                task={task}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Task;

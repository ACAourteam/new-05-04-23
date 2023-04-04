import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { auth, db, tasksRef, usersRef } from "../../firebase";
import { useAuth } from "../../context/Context";
import { doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { HOME, SIGN_IN, TASKS } from "../../constants/auth";
import AddTask from "../AddTask/AddTask";
import { useProfileStyles } from "./Profile.styles";
import ChangeDescription from "../ChangeDescription/ChangeDescription";
import { v4 as uuidv4 } from "uuid";
import AddCategory from "../AddCategory/AddCategory";

function Profile() {
  const [logedUser, setLogedUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showAddTask, setShowAddTask] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const [showChangeDescription, setShowChangeDescription] = useState(false);
  const [logedUserDescription, setLogedUserDescription] = useState("");
  const styles = useProfileStyles();
  const [category, setCategory] = useState("");
  const [update, setUpdate] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setGoogleUser(user);
    const users = [];
    async function getData() {
      const snapshot = await getDocs(usersRef);
      snapshot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }));
      const result = users.find((elem) => elem.email === user?.email);
      setLogedUserDescription(result?.description);
      setLogedUser(result);
    }
    getData();
  }, [user, category]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const tasks = [];
    async function getData() {
      const snapshot = await getDocs(tasksRef);
      snapshot.forEach((doc) => tasks.push({ ...doc.data(), id: doc.id }));
      const result = tasks
        .filter((elem) => elem.email === user?.email)
        .sort((a, b) => b.time - a.time);
      setUserTasks(result);
    }
    getData();
  }, [showAddTask, update]);

  const onDeleteTaskClick = (id) => {
    deleteDoc(doc(db, "tasks", id));
    setUpdate(!update);
  };

  const logOut = async () => {
    try {
      await logout();
      navigate(HOME);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onAddTaskClick = () => {
    setShowAddTask(true);
  };

  const onChangeMyDescriptionClick = () => {
    setShowChangeDescription(true);
  };

  const onDeleteCategory = async (index) => {
    logedUser?.myCategories.splice(index, 1);
    await updateDoc(doc(db, "users", logedUser.id), {
      myCategories: [...logedUser?.myCategories],
    });
    setUpdate(!update);
  };

  const onAddCategoryClick = () => {
    setShowAddCategory(true);
  };

  {
    if (auth.currentUser) {
      return (
        <div className={styles.parent}>
          <div className={styles.menu}>
            <div className={styles.menuRight}>
              <div
                style={{
                  backgroundImage: `url(
                    "${logedUser?.photoURL} || ${googleUser?.photoURL}"
                  )`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                }}
              ></div>
              <div>
                <h1 className={styles.userName}>
                  {logedUser?.name} {logedUser?.surname}{" "}
                  {googleUser?.displayName}
                </h1>
              </div>
            </div>
            <div className={styles.menuLeft}>
              <div>
                <Button
                  onClick={onAddTaskClick}
                  variant="contained"
                  color="success"
                >
                  Add task
                </Button>
              </div>
              <div>
                {" "}
                <Button
                  onClick={onChangeMyDescriptionClick}
                  variant="contained"
                  color="info"
                >
                  Change Description
                </Button>
              </div>
              <div>
                <Button onClick={onAddCategoryClick}>Add Category</Button>
                {showAddCategory && (
                  <AddCategory
                    setShowAddCategory={setShowAddCategory}
                    setCategory={setCategory}
                    category={category}
                    logedUser={logedUser}
                  />
                )}
              </div>
              <div>
                <Button onClick={logOut}>Sign Out</Button>
              </div>
              <div>
                <NavLink to={TASKS} style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="success">
                    All Tasks
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className={styles.descriptionCategory}>
            <div className={styles.description}>
              <p>{logedUserDescription}</p>
              {showChangeDescription && (
                <ChangeDescription
                  setShowChangeDescription={setShowChangeDescription}
                  logedUser={logedUser}
                  setLogedUserDescription={setLogedUserDescription}
                />
              )}
            </div>
            <div className={styles.categories}>
              <h3 className={styles.myCategories}>My Categories</h3>
              {logedUser?.myCategories?.map((category, index) => {
                return (
                  <div key={uuidv4()} style={{ color: "white" }}>
                    <p>
                      {category}
                      <button
                        className={styles.deleteCategoryTask}
                        onClick={() => onDeleteCategory(index)}
                      >
                        x
                      </button>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.tasks}>
            {showAddTask && (
              <AddTask setShowAddTask={setShowAddTask} logedUser={logedUser} />
            )}
            <h1 className={styles.myTasks}>
              <span>My Tasks</span>
            </h1>
            {userTasks.map((task, index) => {
              console.log(task);
              return (
                <div key={task.id}>
                  <div className={styles.task}>
                    <div>
                      <p style={{ margin: "auto" }}>No:{index + 1}</p>
                      <p>{task.taskName}</p>
                    </div>

                    <p>description - {task.taskDescription} </p>
                    <p>
                      <button
                        className={styles.deleteCategoryTask}
                        onClick={() => onDeleteTaskClick(task.id)}
                      >
                        x
                      </button>
                    </p>
                  </div>
                  <div className={styles.commentsResponses}>
                    <div className={styles.comments}>
                      {task?.comments.map((comment) => (
                        <div key={uuidv4()}>
                          <p className={styles.commentValue}>
                            {comment.commentValue}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className={styles.responses}>
                      {task?.responses.map((response) => (
                        <div key={uuidv4()}>
                          <p>{response.aboutPerson}</p>
                          <p>{response.contactNumber}</p>
                          <p>{response.email}</p>
                          <p>{response.nameSurname}</p>
                          <p>{response.suggest}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return <Navigate to={SIGN_IN} />;
  }
}
export default Profile;

import { createUseStyles } from "react-jss";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import {
  COMMENTS,
  HOME,
  NOTFOUND,
  PROFILE,
  SIGN_IN,
  SIGN_UP,
  TASK,
  TASKS,
} from "./constants/auth";
import { AuthProvider } from "./context/Context";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Tasks from "./components/Tasks/Tasks";
import Comments from "./components/Comments/Comments";
import Task from "./components/Task/Task";

const useStyles = createUseStyles({
  app: {
    width: "100%",
    height: "100%",
  },
});
function App() {
  const styles = useStyles();
  return (
    <AuthProvider className={styles.app}>
      <Routes>
        <Route path={HOME} element={<Home />}></Route>
        <Route path={PROFILE} element={<Profile />}></Route>
        <Route path={SIGN_UP} element={<SignUp />}></Route>
        <Route path={SIGN_IN} element={<SignIn />}></Route>
        <Route path={TASKS} element={<Tasks />}></Route>
        <Route path={COMMENTS} element={<Comments />}></Route>
        <Route path={COMMENTS} element={<Comments />}></Route>
        <Route path={TASK} element={<Task />}></Route>

        <Route path={NOTFOUND} element={<NotFound />}></Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;

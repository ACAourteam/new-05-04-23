import { Button, TextField } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import { useHomeStyles } from "./Home.styles";
import downArrowIcon from "../../assets/images/downArrowIcon.png";
import {
  BUSINESS_MANAGMENT,
  FINANCE_MANAGEMENT,
  SOFTWARE_DEVELOPMENT,
  SYSTEM_ADMIN_ENGINEER,
  SIGN_IN,
  SIGN_UP,
  TASKS,
  PROFILE,
  HOME,
} from "../../constants/auth";
import { useAuth } from "../../context/Context";

function Home() {
  const styles = useHomeStyles();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onMyProfileClick = () => {
    navigate(PROFILE);
  };
  return (
    <div className={styles.parent}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div>
            <TextField
              className={styles.search}
              label="Search"
              variant="filled"
            />
          </div>
          <div className={styles.types}>
            <span>Types</span>
          </div>
          <div>
            <img src={downArrowIcon} className={styles.downArrowIcon} />
          </div>

          <div className={styles.type}>
            <div>{SOFTWARE_DEVELOPMENT}</div>
            <div>{FINANCE_MANAGEMENT}</div>
            <div>{BUSINESS_MANAGMENT}</div>
            <div>{SYSTEM_ADMIN_ENGINEER}</div>
          </div>
          <div className={styles.description}>
            Welcome to our site! We're platform dedicated to helping you develop
            your ideas and grow your business. Whever you are looking to connect
            with talented individuals to fill specific roles, or seeking to
            improve your own skills and productivy, we're here to support you
            every step of the way. With our user-friendly tools and resources,
            you'll be able to effectively tackle any job with confidence and
            precision. Join our community today and unlock your full potential!
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.logRegister}>
            {user ? (
              <div>
                <NavLink to={PROFILE} style={{ textDecoration: "none" }}>
                  <Button variant="contained" onClick={onMyProfileClick}>
                    My Profile
                  </Button>
                </NavLink>
                <NavLink to={HOME} style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    className={styles.register}
                    onClick={() => logout()}
                  >
                    Sign Out
                  </Button>
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink to={SIGN_IN} style={{ textDecoration: "none" }}>
                  <Button variant="contained">Sign In</Button>
                </NavLink>
                <NavLink to={SIGN_UP} style={{ textDecoration: "none" }}>
                  <Button variant="outlined" className={styles.register}>
                    Sign Up
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
          <div className={styles.tasks}>
            <div className={styles.label}>
              <span>
                <Button>
                  <NavLink to={TASKS} style={{ textDecoration: "none" }}>
                    Tasks
                  </NavLink>
                </Button>
              </span>
            </div>
            <div className={styles.tasksExamples}>
              <div className={styles.example}>
                <div className={styles.taskImage}></div>
                <div className={styles.open}>
                  Title-UserName-Type
                  <span>
                    <Button>Open</Button>
                  </span>
                </div>
              </div>
              <div className={styles.example}>
                <div className={styles.taskImage}></div>
                <div className={styles.open}>
                  Title-UserName-Type
                  <span>
                    <Button>Open</Button>
                  </span>
                </div>
              </div>
              <div className={styles.example}>
                <div className={styles.taskImage}></div>
                <div className={styles.open}>
                  Title-UserName-Type
                  <span>
                    <Button>Open</Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <h5>
            <span>.</span> Contact Information
          </h5>
          <h5>
            <span>.</span> Terms of Use
          </h5>
        </div>
        <div>
          <h5>Example:@ 2023 [Step One]</h5>
        </div>
      </div>
    </div>
  );
}
export default Home;

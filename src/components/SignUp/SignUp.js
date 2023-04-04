import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@mui/material";
import { addDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useMemo, useRef, useState } from "react";
import { imageListRef, storage, usersRef } from "../../firebase";
import { useSignUpStyles } from "./SignUp.styles.js";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Context";
import { PROFILE, SIGN_IN } from "../../constants/auth";

function SignUp() {
  const styles = useSignUpStyles();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { createUser, logout, user } = useAuth();

  const uuid = useMemo(() => {
    return uuidv4();
  }, []);

  const onAddAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const downloadImage = () => {
    inputRef.current.click();
  };

  const onRegisterClick = async () => {
    const imageRef = ref(storage, `avatars/${avatar?.name + uuid}`);
    await uploadBytes(imageRef, avatar);
    const response = await listAll(imageListRef);
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        if (url.includes(uuid)) {
          const user = {
            email,
            password,
            name,
            surname,
            photoURL: url,
            myCategories: [],
          };
          addDoc(usersRef, user);
          createUser(email, password)
            .then(() => {})
            .catch((error) => {
              console.log(error.message);
            });
        }
      });
    });
  };
  {
    if (user) {
      return <Navigate to={PROFILE} />;
    }
    return (
      <div className={styles.parent}>
        <div className={styles.form}>
          <span>
            <TextField
              required
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span>
            <TextField
              required
              label="Surname"
              variant="outlined"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </span>
          <span>
            <TextField
              required
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span>
            <TextField
              required
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <span>
            <Button variant="contained" onClick={downloadImage}>
              Add Avatar
            </Button>
            <input
              accept="image/*"
              type="file"
              onChange={onAddAvatarChange}
              style={{ display: "none" }}
              ref={inputRef}
            />
          </span>
          <span>
            <Button variant="contained" onClick={onRegisterClick}>
              Sign Up
            </Button>
          </span>
          <NavLink to={SIGN_IN}>Sign In</NavLink>
        </div>
      </div>
    );
  }
}
export default SignUp;

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { addDoc } from "firebase/firestore";
import { auth, tasksRef } from "../../firebase";
import {
  BUSINESS_MANAGMENT,
  FINANCE_MANAGEMENT,
  SOFTWARE_DEVELOPMENT,
  SYSTEM_ADMIN_ENGINEER,
} from "../../constants/auth";

function AddTask({ setShowAddTask, logedUser }) {
  const [typeTask, setTypeTask] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleClose = () => {
    setShowAddTask(false);
  };
  const handleAddTask = () => {
    const task = {
      typeTask,
      taskName,
      taskDescription,
      email: auth.currentUser.email,
      time: Date.now(),
      userName: logedUser.name,
      userSurname: logedUser.surname,
      userPhotoUrl: logedUser.photoURL,
      responses: [],
      comments: [],
    };
    addDoc(tasksRef, task);
    setShowAddTask(false);
  };
  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <TextField
            value={taskName}
            margin="dense"
            label="Task Name"
            fullWidth
            variant="standard"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextareaAutosize
            value={taskDescription}
            aria-label="maximum height"
            placeholder="Task Description"
            style={{ width: 535, height: 80, resize: "none" }}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Task Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value={SOFTWARE_DEVELOPMENT}
                  control={<Radio />}
                  label={SOFTWARE_DEVELOPMENT}
                  onChange={(e) => setTypeTask(e.target.value)}
                />
                <FormControlLabel
                  value={FINANCE_MANAGEMENT}
                  control={<Radio />}
                  label={FINANCE_MANAGEMENT}
                  onChange={(e) => setTypeTask(e.target.value)}
                />
                <FormControlLabel
                  value={BUSINESS_MANAGMENT}
                  control={<Radio />}
                  label={BUSINESS_MANAGMENT}
                  onChange={(e) => setTypeTask(e.target.value)}
                />
                <FormControlLabel
                  value={SYSTEM_ADMIN_ENGINEER}
                  control={<Radio />}
                  label={SYSTEM_ADMIN_ENGINEER}
                  onChange={(e) => setTypeTask(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddTask;

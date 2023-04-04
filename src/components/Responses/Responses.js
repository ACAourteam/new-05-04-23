import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Responses({ setShowResponseDialog, task }) {
  const [nameSurname, setNameSurname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [suggest, setSuggest] = useState("");
  const [aboutPerson, setAboutPerson] = useState("");

  const handleSend = () => {
    const response = {
      nameSurname,
      email,
      contactNumber,
      suggest,
      aboutPerson,
      time: Date.now(),
    };

    updateDoc(doc(db, "tasks", task.id), {
      responses: [...task.responses, response],
    });

    setShowResponseDialog(false);
  };

  const handleClose = () => {
    setShowResponseDialog(false);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Responses</DialogTitle>
        <DialogContent>
          <TextField
            value={nameSurname}
            onChange={(e) => setNameSurname(e.target.value)}
            autoFocus
            label="Name Surname"
            fullWidth
            variant="standard"
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            margin="dense"
            label="Contact Number"
            fullWidth
            variant="standard"
          />
          <TextareaAutosize
            value={suggest}
            onChange={(e) => setSuggest(e.target.value)}
            aria-label="maximum height"
            placeholder="I suggest"
            style={{ width: 552, height: 80, resize: "none" }}
          />
          <TextField
            value={aboutPerson}
            onChange={(e) => setAboutPerson(e.target.value)}
            label="About Person"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Responses;

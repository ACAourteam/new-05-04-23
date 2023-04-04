import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ChangeDescription({
  setShowChangeDescription,
  logedUser,
  setLogedUserDescription,
}) {
  const [description, setDescription] = useState("");

  const handleChange = () => {
    updateDoc(doc(db, "users", logedUser.id), {
      description: description,
    });
    setLogedUserDescription(description);
    setShowChangeDescription(false);
  };

  const handleClose = () => {
    setShowChangeDescription(false);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Change My Description</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxRows={4}
            aria-label="maximum height"
            placeholder="Description..."
            style={{ width: 300, height: 70, resize: "none" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChange}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

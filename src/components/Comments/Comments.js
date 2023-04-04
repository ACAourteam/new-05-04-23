import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Comments({ setShowCommentsDialog, task }) {
  const [commentValue, setCommentValue] = useState("");

  const handleSend = () => {
    const comment = {
      commentValue,
      time: Date.now(),
    };

    updateDoc(doc(db, "tasks", task.id), {
      comments: [...task.comments, comment],
    });

    setShowCommentsDialog(false);
  };

  const handleClose = () => {
    setShowCommentsDialog(false);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            aria-label="maximum height"
            placeholder="I suggest"
            style={{ width: 300, height: 80, resize: "none" }}
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
export default Comments;

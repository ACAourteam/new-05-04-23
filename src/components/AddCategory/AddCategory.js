import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { doc, updateDoc } from "firebase/firestore";
import {
  BUSINESS_MANAGMENT,
  FINANCE_MANAGEMENT,
  SOFTWARE_DEVELOPMENT,
  SYSTEM_ADMIN_ENGINEER,
} from "../../constants/auth";
import { db } from "../../firebase";

function AddCategory({ setShowAddCategory, setCategory, category, logedUser }) {
  const onSelectChange = (e) => {
    setCategory(e.target.value);
  };

  const handleClose = () => {
    setShowAddCategory(false);
  };
  const handleAddCategory = () => {
    if (category && !logedUser?.myCategories.includes(category)) {
      updateDoc(doc(db, "users", logedUser.id), {
        myCategories: [...logedUser?.myCategories, category],
      });
      setCategory("");
    }
    setShowAddCategory(false);
  };
  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent style={{ width: 320, textAlign: "center" }}>
          <FormControl variant="filled" sx={{ minWidth: 250 }}>
            <InputLabel>Add Category</InputLabel>
            <Select value={category} onChange={onSelectChange}>
              <MenuItem value={SOFTWARE_DEVELOPMENT}>
                {SOFTWARE_DEVELOPMENT}
              </MenuItem>
              <MenuItem value={FINANCE_MANAGEMENT}>
                {FINANCE_MANAGEMENT}
              </MenuItem>
              <MenuItem value={BUSINESS_MANAGMENT}>
                {BUSINESS_MANAGMENT}
              </MenuItem>
              <MenuItem value={SYSTEM_ADMIN_ENGINEER}>
                {SYSTEM_ADMIN_ENGINEER}
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddCategory}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddCategory;

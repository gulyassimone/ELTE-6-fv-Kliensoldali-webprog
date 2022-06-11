import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/state/authSlice";
import { Dropdown } from "semantic-ui-react";
import { useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";

export function Menu() {
  const user = useSelector(selectCurrentUser);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  console.log(user)
  const handleOpenProfileModal = () =>
    setProfileModalOpen(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };
  return (<><nav className="ui secondary menu">
      <NavLink to="/" className="item">
        <i className="home icon" /> TaskApp
      </NavLink>
      <NavLink to="/tasklist" className="item">
        <i className="tasks icon" /> Tasklist
      </NavLink>
      {user ? <><NavLink to="/myTrack" className="item">
        <i className="file alternate outline icon" /> My Tasks
      </NavLink>
        <NavLink to="/editTask" className="item">
          <i className="edit icon" /> Edit Task continue
        </NavLink>
        <div className="ui right">
          <i className="user icon" />
          <Dropdown text={user.fullname}>
            <Dropdown.Menu>
              <Dropdown.Item text="Profile" onClick={handleOpenProfileModal}/>
              <Dropdown.Item text="Logout" />
            </Dropdown.Menu>
          </Dropdown></div>
      </> : <></>}
    </nav>
  {user?
    <Modal
      open={profileModalOpen}
      onClose={() => setProfileModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="field">
          <label>Username: </label>
          <div className="ui left icon input">
            {user.email}
          </div>
        </div>
        <div className="field">
          <label>Fullname: </label><b />
          <div className="ui left icon input">
            {user.fullname}
          </div>
        </div>
        <div className="field">
          <label>Registered date: </label>
          <div className="ui left icon input">
            {user.createdAt}
          </div>
        </div>

      </Box>
    </Modal>:<></>}</>
  );
}
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials, unsetCredentials } from "../auth/state/authSlice";
import { Dropdown } from "semantic-ui-react";
import { useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { useGetAllTaskListsQuery } from "../tasklists/state/tasklistSlice";

export function Menu(props) {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetAllTaskListsQuery();
  const { editedTaskList } = props
  const dispatch = useDispatch();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

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
  return (<>
      <nav className="ui secondary menu">
        <NavLink to="/" className="item">
          <i className="home icon" /> TaskApp
        </NavLink>
        <NavLink to="/tasks" className="item">
          <i className="tasks icon" /> Tasks
        </NavLink>
        {user ? <><NavLink to="/tasklists" className="item">
          <i className="file alternate outline icon" /> My Tasks
        </NavLink>
          {editedTaskList ? <NavLink to="/editedTaskList" className="item">
            <i className="edit icon" /> Edit Task continue
          </NavLink> : <></>}
          <div className="ui right">
            <i className="user icon" />
            <Dropdown text={user.fullname}>
              <Dropdown.Menu>
                <Dropdown.Item text="Profile" onClick={handleOpenProfileModal} />
                <Dropdown.Item text="Logout" onClick={() => {
                  console.log(user);
                  dispatch(unsetCredentials());
                }} />
              </Dropdown.Menu>
            </Dropdown></div>
        </> : <></>}
      </nav>
      {user ?
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
              <label>Tasklists: </label>
              <div className="ui left icon input">
                {data? data.filter((elem)=> user.id === elem.userId).length :0}
              </div>
            </div>
          </Box>
        </Modal> : <></>}</>
  );
}
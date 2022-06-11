import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/state/authSlice";
import { Dropdown } from "semantic-ui-react";

export function Menu() {
  const user = useSelector(selectCurrentUser);

  return (<nav className="ui secondary menu">
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
              <Dropdown.Item text="Profile" />
              <Dropdown.Item text="Logout" />
            </Dropdown.Menu>
          </Dropdown></div>
      </> : <></>}
    </nav>
  );
}

import { NavLink } from "react-router-dom";

export function Menu() {
    return (
        <nav className="ui secondary menu">
            <NavLink to="/" className="item">
                <i className="home icon"/> TaskApp
            </NavLink>
            <NavLink to="/tasklist" className="item">
                <i className="headphones icon"/> Tasklist
            </NavLink>
          { /*  <NavLink to="/myTrack" className="item">
                <i className="music icon"/> My Tasks
            </NavLink>
            <NavLink to="/search" className="item">
                <i className="search icon"/> Edit Task continue
            </NavLink>
            <div className="ui right dropdown item">
                John Doe
                <i className="dropdown icon"/>
                <div className="menu">
                    <div className="item"><i className="user icon"/> Profile</div>
                    <div className="item"><i className="sign out icon"/>Log out</div>
                </div>
            </div>*/}
        </nav>
    );
}
import {Menu} from "./Menu";

export function  Layout(props){
    return(
      <div className="ui container">
          <Menu editedTaskList={props.editedTaskList}/>
          { props.children }
      </div>
    );
}
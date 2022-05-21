import { useContext } from "react";
import { TodosContext } from "../../todo-context";
import "./todo-results.css";

export const TodoResults = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const calculateChecked = () => {
    return todos.filter((elem) => elem.checked===true).length
  };

  return (
    <div className="todo-results">
      Készen:
      {calculateChecked()}
    </div>
  );
};

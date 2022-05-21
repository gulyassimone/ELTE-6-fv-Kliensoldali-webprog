import { useState, useContext } from "react";
import { TodosContext } from "../../todo-context";
import "./todo-form.css";

export const TodoForm = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [task, setTask] = useState("");
console.log(todos)

  const handleAddTodo = () => {
      setTodos([...todos, {id:todos[todos.length-1].id+1, label:task, checked:false}])
  };

  const handleKeyUp = (e) => {
      setTask(e.target.value)
      console.log(e.target.value)
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Új teendő"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Teendő hozzáadása
      </button>
    </div>
  );
};

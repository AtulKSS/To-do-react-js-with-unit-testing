import React, { useState } from "react";

function TodoInput(props) {
  const [inputText, setInputText] = useState(""); //created state to store tasks on runtime.
  const [todo, setTodo] = useState({ value: "", error: "" });

  const handleAddClick = () => {
    if (!inputText || inputText.length < 3) {
      setTodo({ ...todo, error: "Please Enter a valid To-Do" });
      return;
    } else {
      setTodo({ ...todo, error: "" }); // clear the error message
    }
    props.addList(inputText);
    setInputText("");
    //To clear the task written in text container
  };

  //UI
  return (
    <div className="input-container" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          className="input-box-todo"
          placeholder="Enter your todo here"
          value={inputText}
          onChange={(e) => {
            //Target
            setInputText(e.target.value);
          }}
        />
        <button className="add-btn" onClick={handleAddClick}>
          Add Task
        </button>
      </div>
      {todo.error && (
        <div className="error" style={{ color: "red" }}>
          {todo.error}
        </div>
      )}
    </div>
  );
}

export default TodoInput;

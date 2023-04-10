import React,{useState} from "react";

function TodoInput(props) {
    const [inputText,setInputText] = useState(''); //created state to store tasks on runtime.
    
    //UI
  return (
    <div className="input-container" >
      <input
        type="text"
        className="input-box-todo"
        placeholder="Enter your todo here"
        value={inputText}
        onChange={e=>{                     //Target 
            setInputText(e.target.value)
        }}
      />
      <button className="add-btn" 
      onClick={()=>{            //Target for adding list
        props.addList(inputText)
        setInputText("")        //To clear the task written in text container
      }}>Add Task</button>
    </div>
  );
}

export default TodoInput;

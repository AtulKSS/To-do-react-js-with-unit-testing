import React, { useState } from 'react'

function Todolist(props) {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(props.item);
  const [todo, settodo] = useState({ value: '', error: '', });

  const handleInputChange = (event) => {  //updates the newValue state to the current value of the input field, helps us to see what we are tying
    setNewValue(event.target.value); //event.target.value expression retrieves the current value of the input field
  };

  const handleEditClick = () => { //This function is called when the user clicks edit button, This sets the editmode state to true.
    setEditMode(true);
  };

  const handleSaveClick = () => {
    if (!newValue || newValue.length < 3) {
      settodo({ ...todo, error: 'Please Enter a valid To-Do' });
      return;
    } else {
      settodo({ ...todo, error: '' }); // clear the error message
    }
    props.editList(props.index, newValue);
    setEditMode(false);
  };

  return (
    <li className="list-item" style={{ position: 'relative', marginBottom: '10px' }}>
    {!editMode && (
      <>
        {props.item}
        <span className="icons">
          <i
            className="fa-solid fa-trash-can icon-delete"
            onClick={() => props.deleteItem(props.index)}
          ></i>
        </span>
        <span className="iconss">
          <i className="fa-solid fa-pen-to-square" onClick={handleEditClick}></i>
        </span>
        {todo.error && (
          <div className="error" style={{ position: 'absolute', top: '100%' }}>
            {todo.error}
          </div>
        )}
      </>
    )}
    {editMode && (
      <>
        <input type="text" value={newValue} onChange={handleInputChange} />
        <span className="icons">
          <i className="fa-solid fa-check" onClick={handleSaveClick}></i>
        </span>
        {todo.error && (
          <div className="error" style={{ position: 'absolute', top: '100%' }}>
            {todo.error}
          </div>
        )}
      </>
    )}
  </li>


  )
}

export default Todolist
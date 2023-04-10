import React, { useState } from 'react'

function Todolist(props) {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(props.item);

  const handleInputChange = (event) => {  //updates the newValue state to the current value of the input field, helps us to see what we are tying
    setNewValue(event.target.value); //event.target.value expression retrieves the current value of the input field
  };

  const handleEditClick = () => { //This function is called when the user clicks edit button, This sets the editmode state to true.
    setEditMode(true);
  };

  const handleSaveClick = () => {
    if (!newValue || newValue.length < 3) { // check if the new value is empty or has less than 3 characters
      alert('Please enter valid to-do with at least 3 characters.'); // show an alert message if the validation fails
      return; // return without saving the changes
    }
    props.editList(props.index, newValue);
    setEditMode(false);
  };

  return (
    <li className="list-item">
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
          <i
            className="fa-solid fa-pen-to-square"
            onClick={handleEditClick}
          ></i>
        </span>
      </>
    )}
    {editMode && (
      <>
        <input
          type="text"
          value={newValue}
          onChange={(e) => handleInputChange(e)} //Handled impu change.
        />
        <span className="icons">
          <i className="fa-solid fa-check" onClick={handleSaveClick}></i>
        </span>
      </>
    )}
  </li>
  )
}

export default Todolist
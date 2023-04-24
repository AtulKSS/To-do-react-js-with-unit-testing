import React, { useState } from 'react'

function Todolist(props) {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(props.item);
  const [todo, settodo] = useState({ value: '', error: '', });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);

  const handleInputChange = (event) => {  //updates the newValue state to the current value of the input field, helps us to see what we are tying
    //setNewValue(event.target.value); //event.target.value expression retrieves the current value of the input field
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    props.deleteItem(props.index);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEditClick = () => {
    setShowEditConfirmation(true);
  };

  const handleEditConfirm = () => {
    setEditMode(true);
    setShowEditConfirmation(false);
  };

  const handleEditCancel = () => {
    setShowEditConfirmation(false);
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
    <li className="list-item" data-testid="click-on-box" style={{ position: 'relative', marginBottom: '10px' }}>
      {!editMode && (
        <>
          {props.item}
          <span className="icons">
            <i className="fa-solid fa-trash-can icon-delete" data-testid="delete-icon" onClick={handleDeleteClick}></i>
          </span>
          <span className="iconss">
            <i className="fa-solid fa-pen-to-square" data-testid="edit-icon" onClick={handleEditClick}></i>
          </span>
          {todo.error && (
            <div className="error" style={{ position: 'absolute', top: '100%' }}>
              {todo.error}
            </div>
          )}
        </>
      )}
      {editMode && (
        <li> 
          <input type="text" value={newValue} data-testid="edit-input-check" onChange={handleInputChange} />
          <span className="icons">
            <i className="fa-solid fa-check"  onClick={handleSaveClick}></i>
          </span>
          {todo.error && (
            <div className="error" style={{ position: 'absolute', top: '100%' }}>
              {todo.error}
            </div>
          )}
        </li>
      )}
      {showDeleteConfirmation && (
        <div className="delete-confirmation" data-testid="delete-confirmation">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this item?</p>
            <div className="confirmation-buttons">
              <button onClick={handleDeleteConfirm} data-testid="delete-confirmation-yes" >Yes</button>
              <button onClick={handleDeleteCancel} data-testid="delete-confirmation-no" >No</button>
            </div>
          </div>
        </div>
      )}
      {showEditConfirmation && (
        <div className="confirmation-overlay">
          <div className="edit-confirmation" data-testid="edit-confirmation">
            <div className="confirmation-box">
              <p>Are you sure you want to edit this item?</p>
              <div className="confirmation-buttons">
                <button onClick={handleEditConfirm} data-testid="edit-confirmation-yes" >Yes</button>
                <button onClick={handleEditCancel} data-testid="edit-confirmation-no" >No</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </li>
  )
}

export default Todolist
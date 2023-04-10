import React, { useState } from 'react'
import "./App.css"
import TodoInput from './components/TodoInput'
import Todolist from './components/TodoList'

function App() {
 
  const [listTodo,setListTodo]=useState([]);  //List initiated by Blank array
  let addList = (inputText)=>{
    if(inputText!==''&& inputText.trim().length >= 3){
      setListTodo([...listTodo,inputText]); //add input text to the list
    }
    else{
      alert("Please enter valid to-do with at least 3 characters"); //alert shows an message if input is invalid
    }
  }

  const deleteListItem = (key)=>{
    let newListTodo = [...listTodo];
    newListTodo.splice(key,1) //splice is a method used to remove an item from an array by its index.
    setListTodo([...newListTodo])
  }

  const EditListItem = (key, newValue)=>{
    let newListTodo = [...listTodo];
    newListTodo[key]=newValue;
    setListTodo([...newListTodo])
  }

  return (
    <div className="main-container">
      <div className="center-container">
      {/* //Add list property added here */}
        <TodoInput addList={addList}/> 
        <hr/>
        {listTodo.map((listItem,i)=>{         //Map function to show list on page
          return (
            <Todolist key={i} index={i} item={listItem} deleteItem={deleteListItem} editList={EditListItem} />
          )
        })}
      </div>
    </div>
  )
}

export default App
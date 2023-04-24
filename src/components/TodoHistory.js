import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () =>{

 const [data, setData] = useState([]);
 const [showModal, setShowModal] = useState(false);
 const [itemId, setItemId] = useState(null);

function getData(){
  axios.get('https://6433e738582420e2316e849e.mockapi.io/crud')
  .then((res)=> {
    setData(res.data);
  });
}

useEffect(() => {
  getData();
  const interval = setInterval(() => {
    getData();
  }, 2000); // refresh every 2 seconds
  return () => clearInterval(interval);
}, []);

function handleDelete(id){
  setItemId(id);
  setShowModal(true);
}

function confirmDelete() {
  axios.delete(`https://6433e738582420e2316e849e.mockapi.io/crud/${itemId}`)
  .then(()=>{
    getData();
    setShowModal(false);
  });
}

function cancelDelete() {
  setShowModal(false);
  setItemId(null);
}

  return (
    <div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">To-Do History</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      {
        data.map((eachData)=>{
          return (
            <tbody key={eachData.id}>
              <tr>
                <th scope="row">{eachData.id}</th>
                <td>{eachData.text}</td>
                <td>
                  <button className='btn-danger' onClick={()=> handleDelete(eachData.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          )
        })
      }
    </table>
    {showModal && (
  <div className="delete-confirmation">
    <div className="confirmation-box">
      <p>Are you sure you want to delete this item?</p>
      <div className="confirmation-buttons">
        <button onClick={confirmDelete}>Yes</button>
        <button onClick={cancelDelete}>No</button>
      </div>
    </div>
  </div>
)}
  </div>
  );
}

export default Home;
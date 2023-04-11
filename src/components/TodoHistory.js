import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () =>{

 const [data, setData] = useState([]);

function getData(){
  axios.get('https://6433e738582420e2316e849e.mockapi.io/crud')
  .then((res)=> {
    console.log(res.data);
    setData(res.data);
  });
}

  useEffect(() => {
    getData();
  }, []);

  function handleDelete(id){
    axios.delete(`https://6433e738582420e2316e849e.mockapi.io/crud/${id}`)
    .then(()=>{
      getData();
    })
  }

  return (
    <div>
      <table class="table">
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
        <>
        <tbody>
    <tr>
      <th scope="row">{eachData.id}</th>
      <td>{eachData.text}</td>
    
      <td>
        <button className='btn-danger'onClick={()=> handleDelete(eachData.id)} >Delete</button>
      </td>
    </tr>
  </tbody>
        </>
      )

    })
  }
</table>
    </div>
  );
}

export default Home;
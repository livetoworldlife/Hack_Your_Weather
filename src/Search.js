// import React, { useEffect, useState } from 'react';

// const useFetch = url => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);
//     fetch(url)
//       .then(res => res.json())
//       .then(data => setData(data.message))
//       .catch(err => setErrorMessage(err.message))
//       .finally(() => setIsLoading(false));
//   }, [url]);

//   return { isLoading, data, errorMessage };
// };

// export default function DogImage() {
//   const { isLoading, data, errorMessage } = useFetch('https://dog.ceo/api/breeds/image/random');

//   console.log(data);
//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }
//   if (errorMessage) {
//     return <div>{errorMessage}</div>;
//   }
//   return (
//     <div>
//       {data && <img src={data} alt='dog' width="200" />}
//     </div>
//   )
// }














import React, { useState, useEffect } from 'react'
import axios from 'axios'

const URL = 'https://jsonplaceholder.typicode.com/users'

const Table = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    const response = await axios.get(URL)
    setEmployees(response.data)
  }

  const removeData = (id) => {

    axios.delete(`${URL}/${id}`).then(res => {
      const del = employees.filter(employee => id !== employee.id)
      setEmployees(del)
    })
  }

  const renderHeader = () => {
    let headerElement = ['id', 'name', 'email', 'phone', 'operation']

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return employees && employees.map(({ id, name, email, phone }) => {
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone}</td>
          <td className='opration'>
            <button className='button' onClick={() => removeData(id)}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <h1 id='title'>React Table</h1>
      <table id='employee'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>
          {renderBody()}
        </tbody>
      </table>
    </>
  )
}


export default Table;








const listReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [listData, dispatchListData] = React.useReducer(listReducer, {
    list: initialList,
    isShowList: true,
  });

  function handleRemove(id) {
    dispatchListData({ type: 'REMOVE_ITEM', id });
  }

  if (!listData.isShowList) {
    return null;
  }

  return <List list={listData.list} onRemove={handleRemove} />;
};

const List = ({ list, onRemove }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} onRemove={onRemove} />
    ))}
  </ul>
);

const Item = ({ item, onRemove }) => (
  <li>
    <span>{item.firstname}</span>
    <span>{item.lastname}</span>
    <span>{item.year}</span>
    <button type="button" onClick={() => onRemove(item.id)}>
      Remove
    </button>
  </li>
);


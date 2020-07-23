import React, { useState, useEffect } from 'react';
import NameForm from './WeatherForm';

export default function GetCityData({ dataState }) {
  //let initialList = dataState;
  console.log(dataState);
  const [listData, setListData] = useState({
    list: null,
    isShowList: false,
  });
  useEffect(() => {
    setListData({
      list: dataState,
      isShowList: true,
    });

  }, [dataState])

  //console.log(listData);
  function handleRemove(id) {
    const newList = listData.list.filter((item) => item.id !== id);
    console.log(newList);
    setListData({ ...listData, list: newList });
  }

  if (!listData.isShowList) {
    return null;
  }

  return (
    <List list={listData.list} onRemove={handleRemove} />);
}

const List = ({ list, onRemove }) => (
  <div>
    {list.map((item) => (
      <Item key={item.id} item={item} onRemove={onRemove} />
    ))}
  </div>
);

const Item = ({ item, onRemove }) => (
  // <div key={item.id}>
  <div>
    <div className='card'>
      <div className="close" >
        <button onClick={() => {
          onRemove(item.id);

        }}>X</button>
      </div>
      <h4>
        <a href={item.id}>
          {item.name},{item.country}
        </a>
      </h4>
      <h6>{item.main}</h6>
      <p>{item.description}</p>
      <p>min temp: {(item.temp_min - 273.15).toFixed(1)}</p>
      <p>max temp: {(item.temp_max - 273.15).toFixed(1)}</p>
      <p>location: {item.lat}, {item.lon}</p>
    </div>
  </div>
);

// const newData = dataState.map(data => {
//   const { id, name, country, main, description, temp_min, temp_max, lat, lon } = data;
//   return (
//     <div key={id}>
//       <div className='card'>
//         <div className="close" >
//           <button onClick={() => removeData(id)}>X</button>
//         </div>
//         <h4>
//           <a href={id}>
//             {name},{country}
//           </a>
//         </h4>
//         <h6>{main}</h6>
//         <p>{description}</p>
//         <p>min temp: {(temp_min - 273.15).toFixed(1)}</p>
//         <p>max temp: {(temp_max - 273.15).toFixed(1)}</p>
//         <p>location: {lat}, {lon}</p>
//       </div>
//     </div>
//   );
// });
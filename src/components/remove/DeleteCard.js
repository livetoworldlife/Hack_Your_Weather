import React from 'react'

export default function DeleteCard({ removedId }) {
  //const [stateRemovedId, setStateRemovedId] = useState(null);
  return (
    <div className="close" >
      <button onClick={() => removeData(removedId)}>X</button>
    </div>
  );
}

export const removeData = (removedId) => {
  return removedId;
}
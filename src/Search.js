import React, { useEffect, useState } from 'react';

const useFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { isLoading, data, errorMessage };
};

export default function DogImage() {
  const { isLoading, data, errorMessage } = useFetch('https://dog.ceo/api/breeds/image/random');

  console.log(data);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return (
    <div>
      {data && <img src={data} alt='dog' width="200" />}
    </div>
  )
}

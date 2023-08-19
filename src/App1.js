import './App.css';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function App1() {
  // 接資料可以用swr取代，就不用處理下面邏輯

  const [count, setCount] = useState(1);
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/todos/${count}`,
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="App" onClick={() => setCount(count + 1)}>
      {data ? (
        <article>
          <p>userId:{data.userId}</p>
          <p>id:{data.id}</p>
          <p>title:{data.title}</p>
          <p>completed:{data.completed ? 'true' : 'false'}</p>
        </article>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default App1;

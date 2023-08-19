import './App.css';
// 有生命周期的component
import { useEffect, useState } from 'react';

function App() {
  // 接資料可以用swr取代，就不用處理下面邏輯

  const [todo, setTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then((response) => response.json())
      .then((json) => setTodoList(json));
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((json) => setTodo(json));

    return () => {
      console.log('second');
    };
  }, [id]);

  return (
    <div className="App">
      {todo ? (
        <article>
          <p>userId:{todo.userId}</p>
          <p>id:{todo.id}</p>
          <p>title:{todo.title}</p>
          <p>completed:{todo.completed ? 'true' : 'false'}</p>
        </article>
      ) : (
        <p>loading...</p>
      )}

      <ul>
        {todoList.map((item) => (
          <li key={item.id} onClick={() => setId(item.id)}>
            <article>
              <p>userId:{item.name}</p>
              <p>id:{item.id}</p>
              <p>title:{item.title}</p>
              <p>completed:{item.completed ? '是' : '否'}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

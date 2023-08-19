import './App.css';

// 基礎render的時候不會被更新，跨組件不會被重建
// useMemo 存值 ex 購物車qty，amount加總
// useCallback 存function
// 任何hook都是在function外面開地方存

// useReducer 也可以不用一直傳props，利用type判斷要做什麼事，重要，小規模用
// useContext 可以不用一直傳props，重要，包在最外層App，常用

// 有生命周期的component
import { useEffect, useState } from 'react';

function App() {
  // 接資料可以用swr取代，就不用處理下面邏輯

  const [count, setCount] = useState(1);
  const [todo, setTodo] = useState(null);

  useEffect(
    () => {
      fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then((res) => res.json())
        // .then((json) => console.log(json))
        .then((json) => setTodo(json));

      // init會做的事
      console.log('init');

      return () => {
        // destroy會做的事，但這邊的destroy是模擬
        console.log('second');
      };
    },
    [count], // 依賴項，只要傳入的值有變動，就會重新render
  );

  console.log('render');

  // 點選div的時候，會觸發setCount
  // 因為count有變動，所以會觸發useEffect render
  // useEffect render會觸發fetch
  // fetch會觸發setTodo
  // setTodo會觸發畫面重新render
  return (
    <div className="App" onClick={() => setCount(count + 1)}>
      {/* hook test{count} */}
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
    </div>
  );
}

export default App;

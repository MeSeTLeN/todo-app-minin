import React, { lazy, Suspense, useEffect, useState } from "react";
import Modal from "./Components/Modal";
import TodoList from "./Components/TodoList";
import Context from "./context";
import Loader from "./Loader";

const AddTodo = lazy(() => import("./Components/AddTodo"));

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todoList) => {
        setTodoList(todoList);
        setLoading(false);
      });
  }, []);

  function changeCompletedFunc(id) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function addTodoFunc(title) {
    setTodoList(
      todoList.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        <Modal />
        <Suspense fallback={<Loader />}>
          <AddTodo onCreateMethod={addTodoFunc} />
        </Suspense>
        {loading && <Loader />}
        {todoList.length ? (
          <TodoList
            todos={todoList}
            changeCompletedMethodList={changeCompletedFunc}
          />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;

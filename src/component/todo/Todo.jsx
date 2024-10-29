import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TiDelete } from "react-icons/ti";
import "./Todo.scss";
// hook

const Todo = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  // Load TODOs from local storage on app startup
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setData(storedTodos);
    }
  }, []);

  // Update local storage whenever TODOs change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      return null;
    }
    let date = new Date();
    let newTodos = {
      id: uuidv4(),
      text,
      time: `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`,
    };
    setData([...data, newTodos]);
    setText("");
    console.log(data);
  };
  const delete__list = (id) => {
    console.log(id);
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="flex items-center justify-center  mt-8">
        <h1 className=" text-[30px] font-extrabold">Todol list</h1>
      </div>
      <div className="w-[500px] p-4  mx-auto mt-8">
        <form
          onSubmit={handleSubmit}
          action=""
          className="h-[80px] flex justify-between items-center"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className=" rounded-xl p-3 w-[360px]"
            placeholder="Create new todo"
          />
          {text.trim() && (
            <button className=" bg-blue-500 hover:bg-blue-800 p-2 rounded-xl font-bold text-white">
              Create
            </button>
          )}
        </form>
        <div className="todoLists">
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between align-text-bottom border-b border-slate-500 todoItem"
            >
              <b className="text-[25px] text-xl w-[300px]">{item.text}</b>
              <div className="todoItem__left flex items-baseline gap-2.5">
                <span className="text-[10px]">{item.time}</span>
                <button onClick={() => delete__list(item.id)}>
                  <TiDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
console.log("salom");

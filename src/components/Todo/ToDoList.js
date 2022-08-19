import React, { useState, useEffect } from "react";
import "./ToDo.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import bg from "../../assets/img/bg.png";
import "react-toastify/dist/ReactToastify.css";
const ToDoList = () => {
  const [taskList, settaskList] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    getTaskList();
  }, []);
  const getTaskList = () => {
    let promise = axios.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask");
    promise.then((res) => {
      settaskList(res.data);
    });
  };
  const addTask = () => {
    console.log(taskList);
    console.log(value);
    console.log(taskList.indexOf(value));
    if (
      taskList.findIndex((item) => item.taskName === value) !== -1 ||
      value.trim() === ""
    ) {
      toast.error(`Task ${value} already exists`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      axios
        .post("http://svcy.myclass.vn/api/ToDoList/AddTask", {
          taskName: value,
        })
        .then((res) => {
          if (res.data) {
            toast.success("Add task is success...", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setValue("");
          return settaskList([...taskList, res.data]);
        });
    }
  };
  const handleDeleteTask = (taskName) => {
    console.log(taskName);
    axios
      .delete(
        `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`
      )
      .then((res) => {
        toast.error(`Task ${taskName} deleted`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getTaskList();
      });
  };
  const handleDoneTask = (taskName) => {
    axios
      .put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`)
      .then((res) => {
        toast.success(`Done task ${taskName}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getTaskList();
      });
  };
  const handleRejectTask = (taskName) => {
    axios
      .put(
        `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`
      )
      .then((res) => getTaskList());
  };
  const renderTaskList = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index + item.taskName}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  handleDeleteTask(item.taskName);
                }}
                className="remove"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                onClick={() => {
                  handleDoneTask(item.taskName);
                }}
                className="complete"
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  const renderTaskListDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index + item.taskName}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  handleDeleteTask(item.taskName);
                }}
                className="remove"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                onClick={() => {
                  handleRejectTask(item.taskName);
                }}
                className="complete"
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="card">
      <div className="card__header">
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      {/* <h2>hello!</h2> */}
      <div className="card__body">
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>{new Date(Date.now()).toDateString()}</p>
          </div>
          <div className="card__add">
            <input
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
              value={value}
              onChange={handleChange}
            />
            <button onClick={addTask} id="addItem">
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskList()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskListDone()}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ToDoList;

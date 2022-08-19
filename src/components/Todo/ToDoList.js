import React, { useState, useEffect } from "react";
import "./ToDo.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addTaskApi,
  deleteTaskApi,
  doneTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/ToDoListAction";
const ToDoList = () => {
  // const [taskList, settaskList] = useState([]);
  const { taskList } = useSelector((state) => state.ToDoListReducer);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  useEffect(() => {
    getTaskList();
  }, []);
  const getTaskList = () => {
    dispatch(getTaskListApi());
  };
  const addTask = () => {
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
      dispatch(addTaskApi(value));
    }
  };
  const handleDeleteTask = (taskName) => {
    console.log(taskName);
    dispatch(deleteTaskApi(taskName));
  };
  const handleDoneTask = (taskName) => {
    dispatch(doneTaskApi(taskName));
  };
  const handleRejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
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
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
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

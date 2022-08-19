import axios from "axios";
import { GET_TASK_API } from "../contants/ToDoListConst";
import { ToastContainer, toast } from "react-toastify";

export const getTaskApi = (payload) => ({
  type: GET_TASK_API,
  payload,
});

export const getTaskListApi = () => {
  return (dispatch) => {
    let promise = axios.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask");
    promise.then((res) => {
      dispatch(getTaskApi(res.data));
    });
  };
};

export const addTaskApi = (payload) => {
  return (dispatch) => {
    axios
      .post("http://svcy.myclass.vn/api/ToDoList/AddTask", {
        taskName: payload,
      })
      .then((res) => {
        toast.success("Add task is success...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        dispatch(getTaskListApi());
      });
  };
};

export const deleteTaskApi = (payload) => {
  return (dispatch) => {
    axios
      .delete(
        `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${payload}`
      )
      .then((res) => {
        toast.error(`Task ${payload} deleted`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(getTaskListApi());
      });
  };
};

export const doneTaskApi = (payload) => {
  return (dispatch) => {
    axios
      .put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${payload}`)
      .then((res) => {
        toast.success(`Done task ${payload}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(getTaskListApi());
      });
  };
};
export const rejectTaskApi = (payload) => {
  return (dispatch) => {
    axios
      .put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${payload}`)
      .then((res) => {
        toast.success(`Done task ${payload}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(getTaskListApi());
      });
  };
};

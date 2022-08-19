import { GET_TASK_API } from "../contants/ToDoListConst";

const initialState = {
  taskList: [],
};

const ToDoListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASK_API:
      state.taskList = payload;
      return { ...state };

    default:
      return state;
  }
};
export default ToDoListReducer;

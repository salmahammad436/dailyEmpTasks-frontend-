import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance/APIconfigrations";
import { Task, TasksState } from "./TasksTypes";
import { nanoid } from "@reduxjs/toolkit";
// Initial state
const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async action to fetch all tasks
export const fetchAllTasks = createAsyncThunk("tasks/fetchAll", async () => {
  try {
    const response = await axiosInstance.get("/task/all");
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.message || "Something went wrong");
  }
});

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasksByEmployeeAndDate",
  async ({ employeeId, date }: { employeeId: string; date: string }) => {
    const response = await axiosInstance.get(
      `/task/summary/${employeeId}/${date}`
    );
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: Task, { rejectWithValue }) => {
    try {
      const taskWithId = { ...taskData, id: nanoid() };
      const response = await axiosInstance.post("/task/", taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    taskData: {
      taskId: number;
      description: string;
      start_time: string;
      end_time: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/task/${taskData.taskId}`,
        taskData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/task/${taskId}`);
      return { deletedTaskId: taskId };
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Slice creation
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create task";
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.deletedTaskId
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete task";
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "Failed to update task");
      });
  },
});

export default taskSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tareaService from "./tareaService";

const initialState = {
    tareas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Creat Tarea
export const createTarea = createAsyncThunk("tareas/create", async (tareaData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await tareaService.createTarea(tareaData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Mostrar las tareas del usuario
export const getTareas = createAsyncThunk("tareas/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await tareaService.getTareas(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Borrar tarea
export const borrarTareas = createAsyncThunk("tareas/borrar", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await tareaService.borrarTareas(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const tareaSlice = createSlice({
    name: "tarea",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTarea.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTarea.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tareas.push(action.payload);
            })
            .addCase(createTarea.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTareas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTareas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tareas = action.payload;
            })
            .addCase(getTareas.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(borrarTareas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(borrarTareas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tareas = state.tareas.filter((tarea) => tarea._id !== action.payload.id);
            })
            .addCase(borrarTareas.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = tareaSlice.actions;
export default tareaSlice.reducer;

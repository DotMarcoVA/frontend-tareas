import axios from "axios";

const API_URL = "https://fancy-purse-jay.cyclic.app/api/tareas/";

// Crear Tarea
const createTarea = async (tareaData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, tareaData, config);
    return response.data;
};

// get Tareas
const getTareas = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

//borrar tarea
const borrarTareas = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + id, config);
    return response;
};
const tareaService = {
    createTarea,
    getTareas,
    borrarTareas,
};

export default tareaService;

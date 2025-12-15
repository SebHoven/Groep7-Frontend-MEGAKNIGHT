import { PUBLIC_API_URL } from '$env/static/public';
import { getData, postData, putData, deleteData } from './ajaxhelper.js';

export const getTasks = () => getData(`https://groep7-backend-megaknight-ewi7.onrender.com/tasks`);
export const getTaskById = (/** @type {any} */ id) => getData(`https://groep7-backend-megaknight-ewi7.onrender.com/tasks/${id}`);
export const createTask = (/** @type {any} */ data) => postData(`https://groep7-backend-megaknight-ewi7.onrender.com/tasks`, data);
export const updateTask = (/** @type {any} */ id, /** @type {any} */ data) => putData(`https://groep7-backend-megaknight-ewi7.onrender.com/tasks/${id}`, data);
export const deleteTask = (/** @type {any} */ id) => deleteData(`https://groep7-backend-megaknight-ewi7.onrender.com/tasks/${id}`);
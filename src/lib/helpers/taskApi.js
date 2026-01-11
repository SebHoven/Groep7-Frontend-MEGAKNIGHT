import { PUBLIC_API_URL } from '$env/static/public';
import { getData, postData, putData, deleteData } from './ajaxhelper.js';

export const getTasks = () => getData(`${PUBLIC_API_URL}/tasks`);
export const getTaskById = (/** @type {any} */ id) => getData(`${PUBLIC_API_URL}/tasks/${id}`);
export const createTask = (/** @type {any} */ data) => postData(`${PUBLIC_API_URL}/tasks`, data);
export const updateTask = (/** @type {any} */ id, /** @type {any} */ data) => putData(`${PUBLIC_API_URL}/tasks/${id}`, data);
export const deleteTask = (/** @type {any} */ id) => deleteData(`${PUBLIC_API_URL}/tasks/${id}`);
export const completeTask = (/** @type {any} */ id) => putData(`${PUBLIC_API_URL}/tasks/${id}/complete`);

export const toggleTaskStep = (/** @type {any} */ id) => putData(`${PUBLIC_API_URL}/tasksteps/${id}/toggle`);

export const assignStudentsToTask = (/** @type {any} */ taskId, /** @type {any} */ studentIds) => 
  postData(`${PUBLIC_API_URL}/tasks/${taskId}/students`, { studentIds });

export const removeStudentFromTask = (/** @type {any} */ taskId, /** @type {any} */ studentId) => 
  deleteData(`${PUBLIC_API_URL}/tasks/${taskId}/students/${studentId}`);
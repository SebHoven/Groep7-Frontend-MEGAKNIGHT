import { PUBLIC_API_URL } from '$env/static/public';
import { getData, postData, putData, deleteData } from './ajaxhelper.js';

export const getGroups = () => getData(`${PUBLIC_API_URL}/groups`);
export const getGroupById = (/** @type {any} */ id) => getData(`${PUBLIC_API_URL}/groups/${id}`);
export const createGroup = (/** @type {any} */ data) => postData(`${PUBLIC_API_URL}/groups`, data);
export const updateGroup = (/** @type {any} */ id, /** @type {any} */ data) => putData(`${PUBLIC_API_URL}/groups/${id}`, data);
export const deleteGroup = (/** @type {any} */ id) => deleteData(`${PUBLIC_API_URL}/groups/${id}`);
export const getUnassignedStudents = () => getData(`${PUBLIC_API_URL}/studentsUa`);

// Get students in a specific group
export const getGroupStudents = (/** @type {any} */ id) => getData(`${PUBLIC_API_URL}/groups/${id}/students`);

// Get groups by teacher
export const getGroupsByTeacher = (/** @type {any} */ teacherId) => getData(`${PUBLIC_API_URL}/groups/teacher/${teacherId}`);

// Add student to group - studentId is now in the URL
export const addStudentToGroup = (/** @type {any} */ groupId, /** @type {any} */ studentId) => 
  postData(`${PUBLIC_API_URL}/groups/${groupId}/students/${studentId}`, {});

// Remove student from group
export const removeStudentFromGroup = (/** @type {any} */ groupId, /** @type {any} */ studentId) => 
  deleteData(`${PUBLIC_API_URL}/groups/${groupId}/students/${studentId}`);

export const getTeacherByUserId = (/** @type {any} */ userId) => 
  getData(`${PUBLIC_API_URL}/teachers/user/${userId}`);
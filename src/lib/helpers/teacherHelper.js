import { getTeacherByUserId } from './groupApi.js';

/**
 * Get the teacher ID from groups service for the logged-in teacher
 * @returns {Promise<number|null>} The teacher ID from groups service, or null if not found
 */
export async function getLoggedInTeacherId() {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      console.error('No user found in localStorage');
      return null;
    }

    const user = JSON.parse(userStr);
    if (!user.id) {
      console.error('User has no ID');
      return null;
    }

    // Fetch teacher from groups service using auth userId
    const teacherResponse = await getTeacherByUserId(user.id);
    if (teacherResponse.success && teacherResponse.data) {
      return teacherResponse.data.id;
    } else {
      console.error('Teacher not found in groups service. User may need to re-login to sync.');
      return null;
    }
  } catch (error) {
    console.error('Error getting teacher ID:', error);
    return null;
  }
}

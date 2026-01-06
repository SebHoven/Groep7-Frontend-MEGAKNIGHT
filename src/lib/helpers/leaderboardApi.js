import { PUBLIC_API_URL } from '$env/static/public';
import { getData, postData, putData, deleteData } from './ajaxhelper.js';

export const getLeaderboard = () => getData(`${PUBLIC_API_URL}/leaderboard`);
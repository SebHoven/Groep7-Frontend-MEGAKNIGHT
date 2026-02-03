import { postData, getData } from './ajaxhelper';

const API_URL = 'http://localhost:3000/api/avatar';

export async function getAvatar(studentId: number) {
    return getData(`${API_URL}/student/${studentId}`);
}

export async function saveAvatar(studentId: number, avatarData: {
    hairColor: string;
    skinColor: string;
    shirtColor: string;
    pantsColor: string;
    shoeColor: string;
}) {
    return postData(`${API_URL}/student/${studentId}`, avatarData);
}

import { PUBLIC_API_URL } from "$env/static/public";


const allPetsAPI = `${PUBLIC_API_URL}/tasks`;

/**
 * Function to load appointments
 * @returns {Promise<{ appointments: any[]; } | { error: any; }>}
 */
export const load = async ({ fetch }) => {
  try {
    const allPetsResponse = await fetch(allPetsAPI);
    const json = await allPetsResponse.json();
    console.log('Raw response from API:', json);

    // If the API returns { data: [...] } use json.data, otherwise just json
    const tasks = Array.isArray(json) ? json : json.data;

    if (!Array.isArray(tasks)) {
      throw new Error('Expected an array of pets, got: ' + JSON.stringify(json));
    }

    return { tasks };
  } catch (error) {
    console.error('Error loading pets:', error);
    return { tasks: [], error: error.message };
  }
};
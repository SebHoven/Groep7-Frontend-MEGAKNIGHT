/**
     * This function fetches the data from the API
     * @param url
     */
export const getData = async (url) => {
    try {
        const response = await fetch(url);
        const items = await response.json();
        return items;
    } catch (error) {
        return error;
    }
};

/**
 * Handle multiple Promises (used for batch fetching)
 */
export const getPromisesData = async (/** @type {any} */ urls) => {
    try {
        return await Promise.all(urls);
    } catch (error) {
        return { error };
    }
};

/**
 * POST request (Create)
 */
export const postData = async (/** @type {RequestInfo | URL} */ url, /** @type {any} */ data) => {
    try {
        console.log('postData - URL:', url);
        console.log('postData - Data being stringified:', data);
        console.log('postData - JSON stringified:', JSON.stringify(data));
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        console.log('postData - Response:', result);
        
        return result;
    } catch (error) {
        console.error('postData - Error:', error);
        return { error };
    }
};

/**
 * PUT request (Update)
 */
export const putData = async (/** @type {RequestInfo | URL} */ url, /** @type {any} */ data) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        return { error };
    }
};

/**
 * DELETE request (Delete)
 */
export const deleteData = async (/** @type {RequestInfo | URL} */ url) => {
    try {
        const response = await fetch(url, { method: 'DELETE' });
        return await response.json(); // or return response.status
    } catch (error) {
        return { error };
    }
};
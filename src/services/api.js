/**
 * API service for communicating with the backend
 */

// In Docker, nginx proxies /api to backend, so we use relative path
// In development, we use the full URL to the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper to get the full API URL
function getApiUrl(endpoint) {
    // If API_BASE_URL starts with '/', it's a relative path (Docker/nginx)
    // Otherwise, it's an absolute URL (local development)
    return `${API_BASE_URL}${endpoint}`;
}

/**
 * Fetch all todos from the backend
 * @returns {Promise<Array>}
 */
export async function fetchAllTodos() {
    const response = await fetch(getApiUrl('/todos'));
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}

/**
 * Create a new todo
 * @param {string} text - The todo text
 * @returns {Promise<Object>}
 */
export async function createTodo(text) {
    const response = await fetch(getApiUrl('/todos'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, completed: false }),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return response.json();
}

/**
 * Update a todo's status
 * @param {number} id - The todo ID
 * @param {boolean} completed - The new completion status
 * @returns {Promise<Object>}
 */
export async function updateTodoStatus(id, completed) {
    const response = await fetch(getApiUrl(`/todos/${id}`), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    return response.json();
}

/**
 * Delete a todo
 * @param {number} id - The todo ID
 * @returns {Promise<Object>}
 */
export async function deleteTodo(id) {
    const response = await fetch(getApiUrl(`/todos/${id}`), {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
    return response.json();
}


import update from 'immutability-helper';
import { fetchAllTodos, createTodo, updateTodoStatus, deleteTodo } from './api';

/**
 * Get the list of todo items from the API.
 * @return {Promise<Array>}
 */
export async function getAll() {
    try {
        return await fetchAllTodos();
    } catch (error) {
        console.error('Error fetching todos:', error);
        // Return empty array as fallback
        return [];
    }
}

/**
 * Get initial empty list (for sync initialization)
 * @return {Array}
 */
export function getInitialList() {
    return [];
}

export function getItemById(items, itemId) {
    return items.find(item => item.id === itemId);
}

/**
 * Update status locally (for optimistic updates)
 */
export function updateStatusLocal(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    if (index === -1) return items;

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            completed: {$set: completed}
        }
    });
}

/**
 * Update todo status via API
 * @param {number} itemId
 * @param {boolean} completed
 * @return {Promise<Object>}
 */
export async function updateStatus(itemId, completed) {
    return await updateTodoStatus(itemId, completed);
}

/**
 * Add a new todo via API
 * @param {string} text
 * @return {Promise<Object>}
 */
export async function addTodo(text) {
    return await createTodo(text);
}

/**
 * Adds a new item to the list locally (for optimistic updates)
 *
 * @param {Array} list
 * @param {Object} item
 * @return {Array}
 */
export function addToList(list, item) {
    return list.concat([item]);
}

/**
 * Remove a todo via API
 * @param {number} id
 * @return {Promise<Object>}
 */
export async function removeTodo(id) {
    return await deleteTodo(id);
}

/**
 * Remove item from list locally
 * @param {Array} list
 * @param {number} itemId
 * @return {Array}
 */
export function removeFromList(list, itemId) {
    return list.filter(item => item.id !== itemId);
}

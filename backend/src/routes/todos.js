const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/todos - Fetch all todos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, text, completed, created_at FROM todos ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// POST /api/todos - Create a new todo
router.post('/', async (req, res) => {
    try {
        const { text, completed = false } = req.body;
        
        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'Text is required' });
        }

        const result = await pool.query(
            'INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING id, text, completed, created_at',
            [text.trim(), completed]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// PATCH /api/todos/:id - Update a todo's completion status
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { completed, text } = req.body;
        
        // Build dynamic update query
        const updates = [];
        const values = [];
        let paramCount = 1;

        if (completed !== undefined) {
            updates.push(`completed = $${paramCount}`);
            values.push(completed);
            paramCount++;
        }

        if (text !== undefined) {
            updates.push(`text = $${paramCount}`);
            values.push(text.trim());
            paramCount++;
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }

        values.push(id);
        const query = `UPDATE todos SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, text, completed, created_at`;
        
        const result = await pool.query(query, values);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 RETURNING id',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        res.json({ message: 'Todo deleted successfully', id: parseInt(id) });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

module.exports = router;


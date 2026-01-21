-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data only if table is empty
INSERT INTO todos (text, completed)
SELECT 'Learn Javascript', false
WHERE NOT EXISTS (SELECT 1 FROM todos);

INSERT INTO todos (text, completed)
SELECT 'Learn React', false
WHERE NOT EXISTS (SELECT 1 FROM todos WHERE text = 'Learn React');

INSERT INTO todos (text, completed)
SELECT 'Build a React App', false
WHERE NOT EXISTS (SELECT 1 FROM todos WHERE text = 'Build a React App');


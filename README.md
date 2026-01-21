# React Todo App

A full-stack React todo application with PostgreSQL database persistence.

## Quick Start with Docker

The easiest way to run the application is using Docker Compose:

```bash
# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove all data (fresh start)
docker-compose down -v
```

Once running, access the app at **http://localhost:3000**

### Services

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | React UI served by Nginx |
| Backend API | http://localhost:3002/api/todos | Express.js REST API |
| PostgreSQL | localhost:5433 | Database (internal) |

## Local Development

### Prerequisites
- [Node.js](https://nodejs.org/en/) & npm
- PostgreSQL (or use Docker for the database only)

### Frontend Setup
```bash
npm install
npm start
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Environment Variables
Copy the example files and configure:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

## Steps
Each step is a branch. Check out to the step you want to test.

```bash
$ git checkout <step-number>    # eg: git checkout step-1
```
* [step-0](https://github.com/kabirbaidhya/react-todo-app/commits/step-0) - Setup app using `create-react-app`.
* [step-1](https://github.com/kabirbaidhya/react-todo-app/commits/step-1) - React Hello World.
* [step-2](https://github.com/kabirbaidhya/react-todo-app/commits/step-2) - Add some JSX for the todoapp.
* [step-3](https://github.com/kabirbaidhya/react-todo-app/commits/step-3) - List todo items dynamically.
* [step-4](https://github.com/kabirbaidhya/react-todo-app/commits/step-4) - Create `TodoList` component.
* [step-5](https://github.com/kabirbaidhya/react-todo-app/commits/step-5) - Extract more components: `TodoItem`, & `Header`.
* [step-6](https://github.com/kabirbaidhya/react-todo-app/commits/step-6) - Add `Footer` component to display count.
* [step-7](https://github.com/kabirbaidhya/react-todo-app/commits/step-7) - Add `InputBox` component.
* [step-8](https://github.com/kabirbaidhya/react-todo-app/commits/step-8) - Convert to stateful components.
* [step-9](https://github.com/kabirbaidhya/react-todo-app/commits/step-9) - Add new todo item.
* [step-10](https://github.com/kabirbaidhya/react-todo-app/commits/step-10) - Add todo list filter.
* [step-11](https://github.com/kabirbaidhya/react-todo-app/commits/step-11) - Refactor code by moving logic to services.
* [step-12](https://github.com/kabirbaidhya/react-todo-app/commits/step-12) - Make check/uncheck change the todo item status to completed/pending.
* [step-13](https://github.com/kabirbaidhya/react-todo-app/commits/step-13) - Refactor code and design improvements.
* [step-14](https://github.com/kabirbaidhya/react-todo-app/commits/step-14) - Refactor and separate UI & stateful components.
* [step-15](https://github.com/kabirbaidhya/react-todo-app/commits/step-15) - Finalization of TodoApp.

# Notes App

A simple notes management application with a REST API backend and static HTML frontend.

## 🌐 Live Demo

**Public URL:** https://ec8d-2a02-4780-59-8a70-00-1.ngrok-free.app

---

## 📁 Project Structure

```
notes-app/
├── backend/          # Express.js REST API
│   ├── server.js     # Main server file
│   ├── notes.json    # Data persistence
│   ├── dist/         # Static frontend files
│   │   └── index.html
│   └── package.json
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18+ (v20 recommended)
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

The backend runs on **http://localhost:8005** by default.

### Frontend

The frontend is a static HTML/CSS/JavaScript application served directly from the backend's `./dist` folder. No separate setup required.

To access the frontend, open your browser to:
```
http://localhost:8005
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8005
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/notes` | Get all notes |
| `POST` | `/notes` | Create a new note |
| `DELETE` | `/notes/:id` | Delete a note by ID |
| `GET` | `/health` | Health check endpoint |

### Request/Response Examples

#### Get All Notes
```bash
GET /notes
```
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Meeting Notes",
      "content": "Discuss Q1 goals...",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Create Note
```bash
POST /notes
Content-Type: application/json

{
  "title": "Shopping List",
  "content": "Milk, eggs, bread"
}
```
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Shopping List",
    "content": "Milk, eggs, bread",
    "createdAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### Delete Note
```bash
DELETE /notes/1
```
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Meeting Notes",
    "content": "Discuss Q1 goals...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Health Check
```bash
GET /health
```
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "service": "notes-api"
}
```

---

## 🐳 Deployment

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8005` | Server port |

### Production Deployment Steps

1. **Install dependencies:**
   ```bash
   cd backend
   npm install --production
   ```

2. **Deploy the backend:**
   - Deploy to a cloud provider (Heroku, Railway, Render, etc.)
   - The backend serves both API and static files

3. **Set environment variables:**
   - `PORT`: Configure the port for your hosting provider

### Docker Deployment (Optional)

Create a `Dockerfile` in the backend folder:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8005

ENV PORT=8005

CMD ["node", "server.js"]
```

Then build and run:

```bash
cd backend
docker build -t notes-app .
docker run -d -p 8005:8005 --name notes notes-app
```

### ngrok Tunnel (Development)

To expose your local server publicly during development:

```bash
# Install ngrok if not already installed
npm install -g ngrok

# Expose the backend
ngrok http 8005
```

The current public URL is: **https://ec8d-2a02-4780-59-8a70-00-1.ngrok-free.app**

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **CORS:** Enabled for cross-origin requests
- **Data Storage:** JSON file persistence (`notes.json`)

### Frontend
- **HTML5** with embedded CSS
- **Vanilla JavaScript** for API interactions
- **Responsive design** for mobile and desktop

---

## 📝 Features

- ✅ Create notes with title and content
- ✅ View all notes in a list
- ✅ Delete notes
- ✅ Persistent storage (JSON file)
- ✅ Clean, responsive UI
- ✅ RESTful API design
- ✅ Health check endpoint for monitoring
- ✅ Static file serving from backend

---

## 🔧 Development

### Running the Server

```bash
cd backend
npm run dev
```

Access the app at: **http://localhost:8005**

### Testing the API

```bash
# Get all notes
curl http://localhost:8005/notes

# Create a note
curl -X POST http://localhost:8005/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"This is a test"}'

# Delete a note
curl -X DELETE http://localhost:8005/notes/1

# Health check
curl http://localhost:8005/health
```

---

## 📦 GitHub Repository

**Repository:** https://github.com/Mlutfi12/notes-app

---

## 📄 License

MIT

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ using Express + Vanilla JS**

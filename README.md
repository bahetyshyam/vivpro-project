# Music Tracks View Application

This is a full-stack web application that allows users to view and rate music tracks. The application consists of a React frontend and a Django backend, with PostgreSQL as the database.

## Live Demo

The application is available at: https://vivpro.shyambahety.com/

### Using the Live Demo

1. Register with a new username and password
2. **Important**: The first login/register API call might take about 50 seconds as the backend server needs to wake up from idle mode
3. Once logged in, you can explore and rate various music tracks

### Note
- Please avoid load testing the application as it's running on free-tier services
- Frontend is deployed on Netlify
- Backend and PostgreSQL database are hosted on Render.com (free tier)

## Features

- User authentication (login/register)
- View music tracks and their attributes
- Rate tracks on a scale
- Interactive dashboard with music track statistics
- Session-based authentication for security

## Project Structure

The project is divided into two main components:

- [`frontend/`](frontend/README.md) - React + TypeScript + Vite application
- [`backendv2/`](backendv2/README.md) - Django REST API with PostgreSQL

## Getting Started

1. First, set up the backend by following the [Backend Setup Guide](backendv2/README.md)
2. Then, set up the frontend by following the [Frontend Setup Guide](frontend/README.md)

## System Requirements

- Python 3.x
- Node.js
- PostgreSQL
- Web browser with cookies enabled

## Architecture

- Frontend: React + TypeScript + Vite
- Backend: Django + Django REST Framework
- Database: PostgreSQL
- Authentication: Session-based authentication

## Development

For detailed setup and development instructions:
- Backend setup: See [backend documentation](backendv2/README.md)
- Frontend setup: See [frontend documentation](frontend/README.md)

Make sure to follow the setup instructions in order (backend first, then frontend) to ensure all components work together properly.
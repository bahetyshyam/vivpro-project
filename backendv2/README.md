# Backend Setup Guide

This guide will help you set up and run the backend server locally.

## Prerequisites

1. Python 3.x installed on your computer
   - To check if Python is installed, run `python --version` or `python3 --version` in your terminal
   - If not installed, download and install from [Python's official website](https://www.python.org/downloads/)

2. PostgreSQL installed and running on your system
   - Download from [PostgreSQL's official website](https://www.postgresql.org/download/)
   - Make sure the PostgreSQL service is running

## Setup Instructions

### 1. Virtual Environment Setup

Create and activate a virtual environment:

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows:
venv\Scripts\activate
# For macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

Install required packages using pip:

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

1. Create a `.env` file in the backendv2 directory
2. Add the following configuration (replace with your PostgreSQL database details):

```
DB_NAME="some_db_name"
DB_USER="some_db_user"
DB_PASSWORD="some_db_password"
DB_HOST="some_db_host"
DB_PORT="5432"
```

### 4. Database Setup

1. Make sure your PostgreSQL server is running
2. Run database migrations:

```bash
python manage.py migrate
```

### 5. Seed Initial Data

Populate the database with initial track data:

```bash
python manage.py seed_tracks
```

After running this command, you can verify the data in your database using any PostgreSQL client tool of your choice (e.g., pgAdmin, DBeaver, or TablePlus).

### 6. Run the Server

Start the development server:

```bash
python manage.py runserver
```

The server will start running at `http://127.0.0.1:8000/`.

## Verification

1. The server should be running without any errors
2. You can access the API endpoints at `http://127.0.0.1:8000/api/`
3. Check if the database has been properly seeded by:
   - Using a PostgreSQL client to inspect the tables
   - Accessing the tracks endpoint at `http://127.0.0.1:8000/api/tracks`

## Troubleshooting

If you encounter any issues:

1. Ensure PostgreSQL is running
2. Verify your database credentials in the `.env` file
3. Make sure all migrations have been applied
4. Check if the virtual environment is activated
5. Ensure all dependencies are installed correctly
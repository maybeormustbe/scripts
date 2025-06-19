# Full-Stack Web Application

A complete web application built with Flask (backend), Angular (frontend), SQLite (database), JWT authentication, and Docker deployment.

## Architecture

- **Backend**: Python Flask with SQLAlchemy ORM
- **Frontend**: Angular 16 with TypeScript and Bootstrap 5
- **Database**: SQLite with SQLAlchemy
- **Authentication**: JWT tokens with secure password hashing
- **Deployment**: Docker & Docker Compose

## Features

- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Protected routes with authentication guards
- ✅ Responsive Bootstrap UI
- ✅ RESTful API endpoints
- ✅ Docker containerization
- ✅ Production-ready configuration

## Quick Start

### Development with Docker (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd scripts

# Start both frontend and backend
docker-compose up --build

# Access the application
# Frontend: http://localhost:4200
# Backend API: http://localhost:5000
```

### Manual Development Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

### Production Deployment
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Users
- `GET /api/users` - List all users (protected)

### Health Check
- `GET /api/health` - API health status

## Default Credentials

A default admin user is created automatically:
- **Email**: admin@example.com
- **Password**: admin123

## Project Structure

```
scripts/
├── backend/                 # Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile         # Backend container config
│   └── .env               # Environment variables
├── frontend/               # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── components/ # UI components
│   │   │   ├── guards/    # Route guards
│   │   │   ├── models/    # TypeScript interfaces
│   │   │   └── services/  # Angular services
│   │   ├── assets/        # Static assets
│   │   └── styles.scss    # Global styles
│   ├── package.json       # Node.js dependencies
│   ├── angular.json       # Angular configuration
│   ├── Dockerfile         # Frontend container config
│   └── nginx.conf         # Nginx configuration
├── docker-compose.yml      # Development setup
├── docker-compose.prod.yml # Production setup
└── README.md              # This file
```

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key-change-in-production
JWT_SECRET_KEY=your-jwt-secret-key-change-in-production
DATABASE_URL=sqlite:///app.db
FLASK_ENV=development
```

### Production
Set these environment variables for production:
- `SECRET_KEY` - Flask secret key
- `JWT_SECRET_KEY` - JWT signing key

## Testing

### Backend Testing
```bash
cd backend
# Test health endpoint
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","first_name":"Test","last_name":"User"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 4200 and 5000 are available
2. **Docker issues**: Run `docker-compose down` and `docker-compose up --build`
3. **Database issues**: Delete the SQLite database file to reset
4. **CORS errors**: Ensure backend CORS is properly configured

### Development Tips

- Backend auto-reloads on file changes in development mode
- Frontend auto-reloads with `ng serve`
- Use browser developer tools to debug API calls
- Check Docker logs: `docker-compose logs backend` or `docker-compose logs frontend`

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is for demonstration purposes.

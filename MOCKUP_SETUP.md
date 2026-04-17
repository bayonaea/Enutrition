# E-Nutrition Mockup Setup

This project is configured to run as a complete mockup with both frontend and backend running concurrently.

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

Dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### Running the Mockup

**Option 1: Run both Frontend and Backend together**
```bash
npm start
# or
npm run dev:all
```

**Option 2: Run them separately**

Terminal 1 - Start the backend:
```bash
npm run backend
```

Terminal 2 - Start the frontend:
```bash
npm run dev
```

### What Gets Started

When you run `npm start`, two servers will start:

1. **Frontend Server** - React + Vite
   - URL: `http://localhost:5173`
   - Port: 5173
   - Auto-reload on code changes

2. **Backend Server** - Express Mock API
   - URL: `http://localhost:5000`
   - Port: 5000
   - Serves mock data from `backend/data/` JSON files

## Available Mock API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password

### Dashboard
- `GET /api/dashboard` - Get dashboard summary and recent activity

### Users & Management
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get specific user

### Nutrition Data
- `GET /api/nutrition` - Get all nutrition records
- `GET /api/nutrition/:userId` - Get nutrition data for specific user

### Analytics
- `GET /api/analytics` - Get analytics trends and reports

### Announcements
- `GET /api/announcements` - Get all announcements

### Reports
- `GET /api/reports` - List all reports
- `POST /api/reports/generate` - Generate a new report

### AI Insights
- `GET /api/ai-insights` - Get personalized nutrition insights

### Data Collection
- `POST /api/data-collection/upload` - Upload nutrition data
- `GET /api/data-collection/status/:uploadId` - Check upload status

### Data Warehouse
- `GET /api/data-warehouse` - Query warehouse with filters

### Integrations
- `GET /api/integrations` - List available integrations

### Training
- `GET /api/training` - Get training courses

### Public Portal
- `GET /api/public-portal/info` - Get public portal information

### Health Check
- `GET /api/health` - Backend health status

## Mock Data

All mock data is stored in JSON files in the `backend/data/` directory:

- `users.json` - User profiles
- `dashboard.json` - Dashboard summary data
- `nutrition.json` - Nutrition tracking data
- `analytics.json` - Analytics trends
- `announcements.json` - System announcements
- `reports.json` - Generated reports
- `aiinsights.json` - AI-powered insights

You can edit these files to change what the API returns.

## Frontend Configuration

The frontend is configured to connect to the mock backend via the API client in `src/lib/api.ts`.

Environment variables:
- `VITE_API_URL` - Base URL for API calls (default: `http://localhost:5000/api`)

## Directory Structure

```
.
├── src/                          # Frontend source code
│   ├── app/                      # React application
│   │   ├── pages/               # Page components
│   │   ├── components/          # Reusable components
│   │   └── routes.tsx           # Route definitions
│   └── lib/
│       └── api.ts               # API client configuration
├── backend/                      # Mock backend server
│   ├── server.mjs               # Express server
│   └── data/                    # Mock data files
│       ├── users.json
│       ├── dashboard.json
│       ├── nutrition.json
│       ├── analytics.json
│       ├── announcements.json
│       ├── reports.json
│       └── aiinsights.json
├── package.json                 # Project configuration
├── vite.config.ts              # Vite configuration
└── .env.development            # Development environment variables
```

## Testing the Mockup

1. Open your browser to `http://localhost:5173`
2. The login page should appear
3. Use any email/password to login (the mock backend accepts all)
4. Navigate through different pages to see the mock data
5. All API calls will be served from the mock backend

## Stopping the Servers

When running with `npm start`:
- Press `Ctrl+C` in the terminal to stop both servers
- The frontend might continue running; press `Ctrl+C` again if needed

When running separately:
- Stop frontend: `Ctrl+C` in the frontend terminal
- Stop backend: `Ctrl+C` in the backend terminal

## Modifying Mock Data

To customize the mock data:

1. Navigate to `backend/data/`
2. Edit the relevant `.json` file
3. The backend will automatically serve the updated data
4. Refresh your browser to see changes

## Troubleshooting

### Port Already in Use
- Frontend (5173): `npx kill-port 5173`
- Backend (5000): `npx kill-port 5000`

### CORS Errors
- The backend is configured with CORS enabled
- Ensure the frontend is calling the correct API URL
- Check that both servers are running

### API Not Responding
- Verify the backend is running: `curl http://localhost:5000/api/health`
- Check the terminal output for any error messages
- Ensure all ports are available

## Next Steps

Once the mockup is running successfully:
1. Test all pages and features
2. Verify the UI integrates properly with the mock data
3. Customize mock data as needed for testing
4. When ready for real data, replace API endpoints with production server URLs

Happy testing! 🚀

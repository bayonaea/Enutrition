import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to load mock data
const loadMockData = (filename) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Mock Auth endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Mock successful login
  res.json({
    success: true,
    user: {
      id: 1,
      name: 'Admin User',
      email: email,
      role: 'admin',
      token: 'mock-jwt-token-' + Date.now()
    }
  });
});

// Dashboard endpoint
app.get('/api/dashboard', (req, res) => {
  const data = loadMockData('dashboard');
  res.json(data);
});

// Users endpoint
app.get('/api/users', (req, res) => {
  const users = loadMockData('users');
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const users = loadMockData('users');
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Nutrition data endpoint
app.get('/api/nutrition', (req, res) => {
  const nutrition = loadMockData('nutrition');
  res.json(nutrition);
});

app.get('/api/nutrition/:userId', (req, res) => {
  const nutrition = loadMockData('nutrition');
  const userNutrition = nutrition.find(n => n.userId === req.params.userId);
  if (!userNutrition) {
    return res.status(404).json({ error: 'No nutrition data found' });
  }
  res.json(userNutrition);
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  const analytics = loadMockData('analytics');
  res.json(analytics);
});

// Announcements endpoint
app.get('/api/announcements', (req, res) => {
  const announcements = loadMockData('announcements');
  res.json(announcements);
});

// Reports endpoint
app.get('/api/reports', (req, res) => {
  const reports = loadMockData('reports');
  res.json(reports);
});

app.post('/api/reports/generate', (req, res) => {
  const { reportType, format } = req.body;
  res.json({
    success: true,
    message: `Report '${reportType}' generated in ${format} format`,
    reportId: 'report-' + Date.now(),
    downloadUrl: `/api/reports/download/${Date.now()}`
  });
});

// AI Insights endpoint
app.get('/api/ai-insights', (req, res) => {
  const insights = loadMockData('aiinsights');
  res.json(insights);
});

// Data Collection endpoint
app.post('/api/data-collection/upload', (req, res) => {
  const { fileName, records } = req.body;
  res.json({
    success: true,
    message: `File '${fileName}' uploaded with ${records || 0} records`,
    uploadId: 'upload-' + Date.now()
  });
});

app.get('/api/data-collection/status/:uploadId', (req, res) => {
  res.json({
    uploadId: req.params.uploadId,
    status: 'completed',
    recordsProcessed: 234,
    recordsSuccessful: 220,
    recordsFailed: 14,
    timestamp: new Date().toISOString()
  });
});

// Data Warehouse endpoint
app.get('/api/data-warehouse', (req, res) => {
  const { startDate, endDate, userId } = req.query;
  res.json({
    query: { startDate, endDate, userId },
    recordsFound: 1250,
    status: 'success',
    data: loadMockData('nutrition').slice(0, 2)
  });
});

// API Integration endpoint
app.get('/api/integrations', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Fitbit Integration',
      status: 'active',
      lastSync: '2026-04-17T08:30:00Z',
      recordsSynced: 450
    },
    {
      id: 2,
      name: 'MyFitnessPal Integration',
      status: 'active',
      lastSync: '2026-04-16T15:45:00Z',
      recordsSynced: 230
    },
    {
      id: 3,
      name: 'Apple Health Integration',
      status: 'inactive',
      lastSync: '2026-04-10T12:00:00Z',
      recordsSynced: 150
    }
  ]);
});

// Training endpoint
app.get('/api/training', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Nutrition Basics',
      description: 'Learn the fundamentals of nutrition science',
      instructor: 'Dr. John Smith',
      duration: '4 weeks',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Advanced Analytics',
      description: 'Master data analysis techniques',
      instructor: 'Jane Doe',
      duration: '6 weeks',
      status: 'in_progress',
      progress: 65
    },
    {
      id: 3,
      title: 'AI in Nutrition',
      description: 'Explore AI applications in nutrition',
      instructor: 'Dr. Mike Johnson',
      duration: '8 weeks',
      status: 'not_started'
    }
  ]);
});

// Public Portal endpoint
app.get('/api/public-portal/info', (req, res) => {
  res.json({
    title: 'E-Nutrition Public Portal',
    description: 'Access nutrition information and resources',
    statistics: {
      totalUsers: 1542,
      activeCampaigns: 12,
      resourcesAvailable: 245
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   POST   http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET    http://localhost:${PORT}/api/dashboard`);
  console.log(`   GET    http://localhost:${PORT}/api/users`);
  console.log(`   GET    http://localhost:${PORT}/api/nutrition`);
  console.log(`   GET    http://localhost:${PORT}/api/analytics`);
  console.log(`   GET    http://localhost:${PORT}/api/announcements`);
  console.log(`   GET    http://localhost:${PORT}/api/reports`);
  console.log(`   GET    http://localhost:${PORT}/api/ai-insights`);
  console.log(`   GET    http://localhost:${PORT}/api/data-warehouse`);
  console.log(`   GET    http://localhost:${PORT}/api/integrations`);
  console.log(`   GET    http://localhost:${PORT}/api/training`);
  console.log(`   GET    http://localhost:${PORT}/api/public-portal/info`);
  console.log(`   GET    http://localhost:${PORT}/api/health`);
});

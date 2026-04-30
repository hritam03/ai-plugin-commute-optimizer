# Quick Reference - PG Optimizer React Frontend Generation

## 🚀 One-Page Generation Prompt

### Application: PG Optimizer Commute Application
Create a **React + Axios** frontend for a PG (Paying Guest) recommendation system. Users can browse PG listings, add new listings, and get AI-driven recommendations based on office location and budget.

---

## 📌 Quick Setup
- **Framework**: React 18 with Vite
- **API Client**: Axios
- **Styling**: Tailwind CSS
- **Backend URL**: http://localhost:8080
- **Frontend URL**: http://localhost:5173
- **Database**: PostgreSQL with Bangalore PG listings

---

## 🔗 API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/pgs` | Create new PG listing |
| GET | `/pgs/getAllPgs?page=0&size=5&area=X&maxRent=Y` | Get all PGs with pagination/filters |
| GET | `/pgs/{id}` | Get specific PG details |
| POST | `/recommendations` | Get PG recommendations (send JSON) |

---

## 📋 Request/Response Formats

### Create PG (POST /pgs)
```json
REQUEST:
{
  "name": "Comfort PG",
  "area": "Whitefield",
  "roomType": "Shared",
  "rent": 8000,
  "foodIncluded": true,
  "latitude": 13.0845,
  "longitude": 77.6033
}

RESPONSE (200):
{
  "success": true,
  "message": "PG created successfully",
  "data": {
    "id": 1,
    "name": "Comfort PG",
    "area": "Whitefield",
    "roomType": "Shared",
    "rent": 8000,
    "foodIncluded": true
  },
  "timestamp": "2026-05-01T12:34:56.789"
}
```

### Get PGs (GET /pgs/getAllPgs)
```json
QUERY PARAMS: page=0&size=5&area=Whitefield&maxRent=15000

RESPONSE (200):
{
  "success": true,
  "message": "PGs fetched successfully",
  "data": {
    "content": [
      {"id": 1, "name": "...", "area": "...", "roomType": "...", "rent": ..., "foodIncluded": ...}
    ],
    "pageNumber": 0,
    "pageSize": 5,
    "totalElements": 15,
    "totalPages": 3,
    "last": false
  },
  "timestamp": "2026-05-01T12:34:56.789"
}
```

### Get Recommendations (POST /recommendations)
```json
REQUEST:
{
  "officeLocation": "Ecospace",
  "preferredArea": "Whitefield",
  "budget": 15000
}

RESPONSE (200) - Returns array of recommendations:
[
  {
    "id": 1,
    "name": "Comfort PG",
    "area": "Whitefield",
    "roomType": "Shared",
    "rent": 8000,
    "distance": 5.2,
    "score": 92,
    "budgetFit": "WITHIN_BUDGET",
    "commuteBurden": "LOW",
    "trafficInsight": "Moderate traffic",
    "lifestyleFit": "Great lifestyle options",
    "recommendationReason": "Excellent choice...",
    "overallRecommendation": "Highly recommended",
    "labels": ["BEST_COMMUTE_CHOICE", "PREFERRED_AREA_MATCH", "BEST_BUDGET_CHOICE"]
  }
]

OFFICE LOCATIONS (Required):
- Ecospace (12.9279°N, 77.6808°E)
- Manyata Tech Park (13.0480°N, 77.6200°E)
- Bagmane Tech Park (12.9784°N, 77.6634°E)

RECOMMENDATION LABELS:
- BEST_BUDGET_CHOICE
- BEST_LIFESTYLE_CHOICE
- BEST_COMMUTE_CHOICE
- TRAFFIC_HEAVY_AREA
- PREFERRED_AREA_MATCH
```

---

## 🏗️ Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PGCard.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Pagination.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── BrowsePGs.jsx
│   │   ├── AddPG.jsx
│   │   ├── Recommendations.jsx
│   │   └── PGDetails.jsx
│   ├── services/
│   │   └── api.js (axios config + all API calls)
│   ├── context/
│   │   └── AppContext.js
│   ├── hooks/
│   │   ├── useFetch.js
│   │   └── useForm.js
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css (Tailwind)
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 💻 Key Implementation Details

### Axios Service Setup
```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
});

export const pgApi = {
  createPg: (data) => api.post('/pgs', data),
  getAllPgs: (page=0, size=5, area=null, maxRent=null) => 
    api.get('/pgs/getAllPgs', { params: { page, size, ...(area && { area }), ...(maxRent && { maxRent }) } }),
  getPgById: (id) => api.get(`/pgs/${id}`),
  getRecommendations: (officeLocation, preferredArea, budget) =>
    api.post('/recommendations', { officeLocation, preferredArea, budget })
};

export default api;
```

### Error Handling Pattern
```javascript
try {
  const response = await pgApi.getAllPgs(0, 5);
  // response.data = { success, message, data: {...}, timestamp }
  if (response.data.success) {
    const pgs = response.data.data.content;
    // Process pgs
  }
} catch (error) {
  const message = error.response?.data?.message || 'Something went wrong';
  // Show error to user
}
```

---

## 📱 Pages to Create

1. **Home** - Welcome page with quick actions
2. **Browse PGs** - List all PGs with pagination, filters (area, rent)
3. **Add PG** - Form to create new PG with location coordinates
4. **Recommendations** - Smart recommendations based on office location + budget
5. **PG Details** - View full PG information with map (optional)

---

## 🎨 UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Pagination for PG listings
- Filters: area, rent range
- Loading states and error messages
- Toast notifications
- Form validation
- PG cards in grid layout
- Recommendation scores and labels display

---

## 📦 NPM Dependencies
```
react@18
react-dom@18
react-router-dom@6
axios@1.4+
tailwindcss@3.3+
react-icons@4.8+
```

---

## ✅ CORS & Security
- CORS enabled for: `http://localhost:5173`
- All endpoints except `/recommendations` return wrapped response format
- Validation errors: HTTP 400
- Not found: HTTP 404
- All timestamps in ISO 8601 format

---

## 🧪 Sample Test Requests
```javascript
// Test adding a PG
await pgApi.createPg({
  name: "Test PG",
  area: "Whitefield",
  roomType: "Shared",
  rent: 9000,
  foodIncluded: true,
  latitude: 13.0845,
  longitude: 77.6033
});

// Test getting all PGs with filters
await pgApi.getAllPgs(0, 10, "Whitefield", 15000);

// Test getting recommendations
await pgApi.getRecommendations("Ecospace", "Whitefield", 15000);
```

---

**🎯 You can now paste this entire document + the detailed version (FRONTEND_GENERATION_PROMPT.md) into any AI code generator to create a complete React frontend!**


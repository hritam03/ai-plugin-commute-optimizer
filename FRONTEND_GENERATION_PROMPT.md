# PG Optimizer Frontend - React with Axios - Generation Prompt

## Project Overview
Create a modern, responsive React frontend for the **PG Optimizer Commute Application**. This application helps users find optimal Paying Guest (PG) accommodations based on their office location, budget, preferred area, and commute optimization criteria. The backend is a Spring Boot REST API running on `http://localhost:8080`.

---

## Core Features to Implement

### 1. **PG Browse & Search**
   - Display all available PG listings with pagination
   - Filter by area and maximum rent
   - Show PG card with: name, area, room type, rent, food included status
   - View detailed PG information by clicking on a PG card

### 2. **Add New PG Listing**
   - Form to create new PG listings
   - Fields: name, area, room type, rent, food included (toggle), latitude, longitude
   - Location picker/map integration (Google Maps recommended)
   - Form validation before submission
   - Success/error notifications

### 3. **Smart Recommendation Engine**
   - Input form for: office location, preferred area (optional), budget
   - Generate AI-driven recommendations based on:
     - Distance from office
     - Budget fit analysis
     - Commute burden assessment
     - Traffic insights for the area
     - Lifestyle fit rating
     - Overall recommendation score
   - Display recommendation labels: BEST_BUDGET_CHOICE, BEST_LIFESTYLE_CHOICE, BEST_COMMUTE_CHOICE, TRAFFIC_HEAVY_AREA, PREFERRED_AREA_MATCH

### 4. **User Interface Components**
   - Navigation bar with links to Browse PGs, Add PG, and Get Recommendations sections
   - Responsive layout (mobile, tablet, desktop)
   - Loading states and error handling
   - Toast/notification system for user feedback
   - Pagination controls for PG listings

---

## Backend API Endpoints

### Base URL
```
http://localhost:8080
```

### CORS Configuration
- Origin: `http://localhost:5173` (Vite default)
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Credentials: Allowed
- Max Age: 3600 seconds

### 1. **PG Management Endpoints**

#### Create PG Listing
```
POST /pgs
Content-Type: application/json

Request Body:
{
  "name": "string (required)",
  "area": "string (required)",
  "roomType": "string (required)",
  "rent": "number (required)",
  "foodIncluded": "boolean (required)",
  "latitude": "number (required)",
  "longitude": "number (required)"
}

Response (200 - Success):
{
  "success": true,
  "message": "PG created successfully",
  "data": {
    "id": "number",
    "name": "string",
    "area": "string",
    "roomType": "string",
    "rent": "number",
    "foodIncluded": "boolean"
  },
  "timestamp": "2026-05-01T12:34:56.789"
}

Error Response (400 - Validation Error):
{
  "success": false,
  "message": "Field validation error message",
  "data": null,
  "timestamp": "2026-05-01T12:34:56.789"
}
```

#### Get All PGs with Pagination & Filters
```
GET /pgs/getAllPgs?page=0&size=5&area=Whitefield&maxRent=15000

Query Parameters:
- page: "number (default: 0)" - zero-indexed page number
- size: "number (default: 5)" - items per page
- area: "string (optional)" - filter by area name
- maxRent: "number (optional)" - filter by maximum rent

Response (200 - Success):
{
  "success": true,
  "message": "PGs fetched successfully",
  "data": {
    "content": [
      {
        "id": "number",
        "name": "string",
        "area": "string",
        "roomType": "string",
        "rent": "number",
        "foodIncluded": "boolean"
      },
      ...more PGs...
    ],
    "pageNumber": "number",
    "pageSize": "number",
    "totalElements": "number",
    "totalPages": "number",
    "last": "boolean"
  },
  "timestamp": "2026-05-01T12:34:56.789"
}
```

#### Get PG by ID
```
GET /pgs/{id}

Path Parameters:
- id: "number" - unique PG identifier

Response (200 - Success):
{
  "success": true,
  "message": "PG fetched successfully",
  "data": {
    "id": "number",
    "name": "string",
    "area": "string",
    "roomType": "string",
    "rent": "number",
    "foodIncluded": "boolean"
  },
  "timestamp": "2026-05-01T12:34:56.789"
}

Error Response (404 - Not Found):
{
  "success": false,
  "message": "PG not found",
  "data": null,
  "timestamp": "2026-05-01T12:34:56.789"
}
```

### 2. **Recommendation Engine Endpoint**

#### Get PG Recommendations
```
POST /recommendations
Content-Type: application/json

Request Body:
{
  "officeLocation": "string (required) - one of: Ecospace, Manyata Tech Park, Bagmane Tech Park",
  "preferredArea": "string (optional) - specific area preference",
  "budget": "number (required)"
}

Response (200 - Success) - Array of recommendations:
[
  {
    "id": "number",
    "name": "string",
    "area": "string",
    "roomType": "string",
    "rent": "number",
    "distance": "number (km from office)",
    "score": "number (0-100 recommendation score)",
    "budgetFit": "string (e.g., 'PERFECT_FIT', 'ABOVE_BUDGET', 'WITHIN_BUDGET')",
    "commuteBurden": "string (e.g., 'LOW', 'MODERATE', 'HIGH')",
    "trafficInsight": "string (traffic condition description)",
    "lifestyleFit": "string (lifestyle suitability assessment)",
    "recommendationReason": "string (detailed reason for recommendation)",
    "overallRecommendation": "string (summary recommendation)",
    "labels": [
      "BEST_BUDGET_CHOICE",
      "BEST_COMMUTE_CHOICE",
      "PREFERRED_AREA_MATCH",
      "TRAFFIC_HEAVY_AREA",
      "BEST_LIFESTYLE_CHOICE"
    ]
  },
  ...more recommendations...
]

Error Response (400 - Bad Request):
{
  "success": false,
  "message": "Error message describing the issue",
  "data": null,
  "timestamp": "2026-05-01T12:34:56.789"
}

Error Response (404 - Office Location Not Found):
{
  "success": false,
  "message": "Office location not found or not supported",
  "data": null,
  "timestamp": "2026-05-01T12:34:56.789"
}
```

---

## Supported Office Locations
The system supports the following office locations in Bangalore:
1. **Ecospace** - Coordinates: 12.9279°N, 77.6808°E
2. **Manyata Tech Park** - Coordinates: 13.0480°N, 77.6200°E
3. **Bagmane Tech Park** - Coordinates: 12.9784°N, 77.6634°E

---

## Data Models & Structures

### PG Listing Model
```javascript
{
  id: Number,                    // Unique identifier
  name: String,                  // PG name/title
  area: String,                  // Area in Bangalore
  roomType: String,              // e.g., "Shared", "Single", "Double"
  rent: Number,                  // Monthly rent in INR
  foodIncluded: Boolean,         // Whether meals are included
  latitude: Number,              // Geographic latitude
  longitude: Number              // Geographic longitude
}
```

### API Response Wrapper
All API responses follow a standard wrapper:
```javascript
{
  success: Boolean,              // true/false
  message: String,               // Descriptive message
  data: Any,                     // Response payload (can be null)
  timestamp: DateTime            // ISO 8601 timestamp
}
```

### Recommendation Model
```javascript
{
  id: Number,
  name: String,
  area: String,
  roomType: String,
  rent: Number,
  distance: Number,              // Distance from office in km
  score: Number,                 // 0-100 recommendation score
  budgetFit: String,             // Budget analysis
  commuteBurden: String,         // Commute difficulty assessment
  trafficInsight: String,        // Area traffic conditions
  lifestyleFit: String,          // Lifestyle compatibility
  recommendationReason: String,  // Detailed explanation
  overallRecommendation: String, // Summary recommendation
  labels: Array<String>          // Recommendation tags
}
```

### Recommendation Labels
- `BEST_BUDGET_CHOICE` - Most affordable option
- `BEST_LIFESTYLE_CHOICE` - Best lifestyle compatibility
- `BEST_COMMUTE_CHOICE` - Shortest/best commute
- `TRAFFIC_HEAVY_AREA` - Warning label for traffic-prone areas
- `PREFERRED_AREA_MATCH` - Matches user's preferred area

---

## UI/UX Requirements

### Pages/Views to Create

1. **Home/Landing Page**
   - Welcome section
   - Quick action buttons: "Browse PGs", "Get Recommendations", "Add PG"
   - Brief application description

2. **Browse PGs Page**
   - PG listing cards in grid layout
   - Filters panel (area, rent range)
   - Pagination controls
   - Search functionality
   - Click card to view full details (modal or dedicated page)

3. **Add PG Page**
   - Form with fields: name, area, room type, rent, food included toggle
   - Location picker (integrate with Google Maps API or similar)
   - Form validation with error messages
   - Success notification on submission
   - Clear form button

4. **Recommendations Page**
   - Input form for: office location (dropdown), preferred area (text), budget (number)
   - "Get Recommendations" button
   - Display results as sorted list/cards
   - Show recommendation score, labels, and insights for each PG
   - Display detailed breakdown for each recommendation

5. **PG Details Page/Modal**
   - Complete PG information
   - Location map view (Google Maps recommended)
   - Room type, rent, food status
   - Option to get recommendations specifically for this PG

### Design System
- Use a modern UI framework: **Tailwind CSS** (recommended) or Material-UI
- Color scheme: Professional (blues, greens for tech focus)
- Responsive breakpoints: mobile (320px), tablet (768px), desktop (1024px+)
- Font: Clean, modern sans-serif (e.g., Inter, Poppins)
- Icons: Use a library like Lucide React or React Icons

### State Management
- Use React Context API or Redux for global state (API responses, filters)
- Local component state for form inputs, loading states

### Error Handling
- Display user-friendly error messages
- Implement retry logic for failed API calls
- Validation on both frontend (UX) and backend (security)
- Handle network timeout scenarios

### Performance Optimization
- Implement pagination for large PG lists
- Lazy load images
- Code splitting for route-based components
- Debounce search/filter inputs

---

## Technical Stack Requirements

### Required Libraries
- **axios**: ^1.4.0 - HTTP client for API calls
- **react**: ^18.0.0 - UI framework
- **react-dom**: ^18.0.0 - React DOM rendering
- **react-router-dom**: ^6.0.0 - Client-side routing
- **tailwindcss**: ^3.3.0 - Utility-first CSS (recommended)
- **react-icons**: ^4.8.0 - Icon library (optional but recommended)

### Development Setup
- Use **Vite** as build tool (recommended for faster development)
- **Node.js**: 16.x or higher
- **npm** or **yarn** for package management

### Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PGCard.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Pagination.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Toast/Notification.jsx
│   │   └── ... other components
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── BrowsePGs.jsx
│   │   ├── AddPG.jsx
│   │   ├── Recommendations.jsx
│   │   └── PGDetails.jsx
│   ├── services/
│   │   └── api.js (axios instance and API calls)
│   ├── context/
│   │   └── AppContext.js (global state management)
│   ├── hooks/
│   │   ├── useFetch.js
│   │   ├── useForm.js
│   │   └── ... custom hooks
│   ├── utils/
│   │   └── constants.js (API URLs, office locations, etc.)
│   ├── App.jsx
│   ├── App.css/tailwind.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## API Integration Guidelines

### Axios Configuration
```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const pgApi = {
  // PG endpoints
  createPg: (data) => axiosInstance.post('/pgs', data),
  getAllPgs: (page = 0, size = 5, area = null, maxRent = null) => {
    const params = { page, size };
    if (area) params.area = area;
    if (maxRent) params.maxRent = maxRent;
    return axiosInstance.get('/pgs/getAllPgs', { params });
  },
  getPgById: (id) => axiosInstance.get(`/pgs/${id}`),
  
  // Recommendation endpoints
  getRecommendations: (officeLocation, preferredArea, budget) => 
    axiosInstance.post('/recommendations', {
      officeLocation,
      preferredArea,
      budget,
    }),
};

export default axiosInstance;
```

### Error Handling Pattern
```javascript
// Consistent error handling across all API calls
try {
  const response = await pgApi.getAllPgs(page, size, area, maxRent);
  // Handle successful response
  return response.data; // Response has .success, .message, .data, .timestamp
} catch (error) {
  if (error.response?.data?.message) {
    // Backend returned error message
    throw new Error(error.response.data.message);
  } else if (error.response?.status === 404) {
    throw new Error('Resource not found');
  } else if (error.message === 'Network Error') {
    throw new Error('Network error. Please check your connection.');
  } else {
    throw new Error('Something went wrong. Please try again.');
  }
}
```

### Success Response Handling
```javascript
// All responses follow this structure
{
  success: boolean,
  message: string,
  data: any,              // Actual payload
  timestamp: string       // ISO 8601
}

// Extract data accordingly
const response = await pgApi.getPgById(1);
if (response.success) {
  const pgData = response.data;  // This is the actual PG object
}
```

---

## Feature Implementation Priority

### Phase 1 (MVP)
1. Setup React project with Vite + Tailwind CSS
2. Create basic page layout and navigation
3. Implement Browse PGs page with listing and pagination
4. Implement Add PG form page

### Phase 2 (Core Features)
1. Implement Recommendations engine page
2. Add PG details view/modal
3. Implement filtering and search

### Phase 3 (Enhancement)
1. Map integration for location visualization
2. Advanced filtering and sorting options
3. User preferences/favorites (localStorage-based)
4. Responsive mobile optimization

---

## Notes for Developer

1. **CORS is enabled** for `http://localhost:5173` - frontend development URL
2. **Backend server** runs on port 8080
3. **Database**: PostgreSQL (Bangalore PG listings database)
4. **All API responses** wrap data in consistent format with success/message/data/timestamp
5. **Validation errors** return 400 status with validation message
6. **Not found errors** return 404 status
7. **Recommendation endpoint returns array directly** (not wrapped in response object like other endpoints)
8. **Office locations** are predefined - Ecospace, Manyata Tech Park, Bagmane Tech Park
9. **Distance calculations** are performed server-side using haversine formula
10. **Recommendation scores** (0-100) are generated based on multiple factors: budget fit, commute distance, area preferences, traffic patterns
11. **All timestamps** are in ISO 8601 format

---

## Testing Scenarios

### Test Data - PG Listings
```json
{
  "name": "Comfort PG",
  "area": "Whitefield",
  "roomType": "Shared",
  "rent": 8000,
  "foodIncluded": true,
  "latitude": 13.0845,
  "longitude": 77.6033
}
```

### Test Scenarios for Recommendations
1. Office: Ecospace, Budget: 15000, Preferred Area: Whitefield
2. Office: Manyata Tech Park, Budget: 10000, No preferred area
3. Office: Bagmane Tech Park, Budget: 12000, Preferred Area: Indiranagar

---

## Deployment Considerations

- Frontend runs on `localhost:5173` (Vite dev server) or build to static files
- Backend runs on `localhost:8080` in development
- Update `API_BASE_URL` in production to match deployed backend URL
- Build command: `npm run build`
- Production serve: Build outputs to `dist/` folder

---

## Additional Resources

- **Swagger UI**: `http://localhost:8080/swagger-ui.html` - Interactive API documentation
- **OpenAPI Spec**: `http://localhost:8080/v3/api-docs` - Machine-readable API specification
- **Postman Collection**: Available in project root as `PG_Optimizer_API.postman_collection.json`

---

This prompt provides all necessary context, API specifications, data models, and requirements for generating a complete React frontend with Axios integration for the PG Optimizer application. You can copy-paste this entire prompt into any LLM or code generation tool to create a production-ready frontend application.


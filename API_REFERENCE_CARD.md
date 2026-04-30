# PG Optimizer Frontend - Visual API Reference Card

## 🎯 At a Glance

```
┌─────────────────────────────────────────────────────────────┐
│              PG OPTIMIZER FRONTEND GENERATION               │
│                   React + Axios Setup Guide                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔌 API ENDPOINTS QUICK MAP

```
BACKEND: http://localhost:8080
FRONTEND: http://localhost:5173

┌─────────────────────────────────────────────────────────────┐
│ PG MANAGEMENT ENDPOINTS                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ POST /pgs                                                   │
│ ├─ Create new PG listing                                   │
│ ├─ Body: name, area, roomType, rent, foodIncluded,         │
│ │         latitude, longitude                              │
│ └─ Returns: PgResponseDTO wrapped in ApiResponse           │
│                                                             │
│ GET /pgs/getAllPgs                                          │
│ ├─ Get all PGs with pagination & filters                   │
│ ├─ Query: page, size, area (optional), maxRent (optional)  │
│ └─ Returns: PagedResponse with content[], pagination info  │
│                                                             │
│ GET /pgs/{id}                                               │
│ ├─ Get specific PG by ID                                   │
│ ├─ Path: id                                                │
│ └─ Returns: Single PgResponseDTO wrapped in ApiResponse    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ RECOMMENDATIONS ENDPOINT                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ POST /recommendations                                       │
│ ├─ Get smart PG recommendations                            │
│ ├─ Body: officeLocation (required),                        │
│ │         preferredArea (optional),                        │
│ │         budget (required)                                │
│ └─ Returns: Array<RecommendationResponseDTO>               │
│    (Note: Direct array, NOT wrapped in ApiResponse)        │
│                                                             │
│ Office Locations (use exact string):                       │
│ • "Ecospace"                                                │
│ • "Manyata Tech Park"                                       │
│ • "Bagmane Tech Park"                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 DATA STRUCTURES

```
┌─────────────────────────────────────────────────────────────┐
│ PgResponseDTO (What you get back)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    id: number,                                              │
│    name: string,                                            │
│    area: string,                                            │
│    roomType: string,                                        │
│    rent: number,                                            │
│    foodIncluded: boolean                                    │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ RecommendationResponseDTO (Full details)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    id: number,                                              │
│    name: string,                                            │
│    area: string,                                            │
│    roomType: string,                                        │
│    rent: number,                                            │
│    distance: number (km),                  ← KEY METRIC    │
│    score: number (0-100),                  ← KEY METRIC    │
│    budgetFit: string,                                       │
│    commuteBurden: string,                                   │
│    trafficInsight: string,                                  │
│    lifestyleFit: string,                                    │
│    recommendationReason: string,                            │
│    overallRecommendation: string,                           │
│    labels: [                                                │
│      "BEST_BUDGET_CHOICE",                                  │
│      "BEST_LIFESTYLE_CHOICE",                               │
│      "BEST_COMMUTE_CHOICE",                                 │
│      "TRAFFIC_HEAVY_AREA",                                  │
│      "PREFERRED_AREA_MATCH"                                 │
│    ]                                                        │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Standard ApiResponse (Wrapper format)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    success: boolean,                                        │
│    message: string,                                         │
│    data: any,              ← Actual data here               │
│    timestamp: string (ISO 8601)                             │
│  }                                                          │
│                                                             │
│  NOTE: /recommendations endpoint returns array directly!   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PagedResponse (For list endpoints)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    content: Array<PgResponseDTO>,                           │
│    pageNumber: number,                                      │
│    pageSize: number,                                        │
│    totalElements: number,                                   │
│    totalPages: number,                                      │
│    last: boolean                                            │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ AXIOS SETUP TEMPLATE

```javascript
// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
});

export const API_ENDPOINTS = {
  PG: {
    CREATE: '/pgs',
    GET_ALL: '/pgs/getAllPgs',
    GET_BY_ID: (id) => `/pgs/${id}`
  },
  RECOMMENDATIONS: '/recommendations'
};

export default API;
```

---

## 📱 PAGE STRUCTURE

```
┌─────────────────────────────────────────┐
│          App Routes Map                  │
├─────────────────────────────────────────┤
│                                         │
│ / (Home)                                │
│ ├─ Welcome section                      │
│ ├─ Quick action buttons                 │
│ └─ Statistics display                   │
│                                         │
│ /browse (Browse PGs)                    │
│ ├─ PG grid with cards                   │
│ ├─ Filter sidebar                       │
│ ├─ Pagination controls                  │
│ └─ Click → /pg/:id                      │
│                                         │
│ /add-pg (Add New PG)                    │
│ ├─ Form inputs                          │
│ ├─ Location picker                      │
│ ├─ Validation errors                    │
│ └─ Success notification                 │
│                                         │
│ /recommendations (Get Recommendations)  │
│ ├─ Input form                           │
│ ├─ Office location dropdown             │
│ ├─ Results display                      │
│ ├─ Score & labels                       │
│ └─ Insights panel                       │
│                                         │
│ /pg/:id (PG Details)                    │
│ ├─ Full PG info                         │
│ ├─ Map view (optional)                  │
│ └─ Related actions                      │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✅ COMPONENT CHECKLIST

```
Components to Build:

Layout Components:
  ☐ Navbar
  ☐ Footer (optional)
  ☐ Sidebar (filters)
  ☐ Layout wrapper

Page Components:
  ☐ Home
  ☐ BrowsePGs
  ☐ AddPG
  ☐ Recommendations
  ☐ PGDetails
  ☐ NotFound

Reusable Components:
  ☐ PGCard (display PG in list/grid)
  ☐ PGForm (form for adding/editing)
  ☐ FilterPanel (area + rent filters)
  ☐ Pagination (page navigation)
  ☐ RecommendationCard (recommendation display)
  ☐ LoadingSpinner
  ☐ Toast/Notification
  ☐ Badge (for labels/tags)
  ☐ ScoreBar (visual score display)

Custom Hooks:
  ☐ useFetch (data fetching)
  ☐ useForm (form state management)
  ☐ useToast (notifications)
  ☐ useDebounce (search/filter)

Utilities:
  ☐ api.js (Axios setup + endpoints)
  ☐ constants.js (offices, room types, labels)
  ☐ formatters.js (number, currency formatting)
```

---

## 🎨 STYLING GUIDE

```
Tailwind Color Scheme:
├─ Primary: Blue (#3B82F6 / blue-500)
├─ Secondary: Green (#10B981 / green-500)
├─ Accent: Orange (#F59E0B / amber-500)
├─ Background: Light gray (#F9FAFB / gray-50)
├─ Text: Dark gray (#1F2937 / gray-800)
├─ Success: Green (#10B981 / green-500)
├─ Error: Red (#EF4444 / red-500)
└─ Warning: Yellow (#F59E0B / amber-500)

Typography:
├─ H1: text-4xl font-bold
├─ H2: text-3xl font-bold
├─ H3: text-2xl font-semibold
├─ Body: text-base font-normal
└─ Small: text-sm font-normal

Spacing:
├─ Padding: p-4 (base), p-6 (large cards)
├─ Margin: m-4, m-6, m-8
├─ Gap: gap-4 (grid/flex)
└─ Rounded: rounded-lg (cards), rounded-full (buttons)
```

---

## 🔄 TYPICAL FLOW

```
User Journey - Browse & Recommend:

1. Visit http://localhost:5173
   ↓
2. Click "Browse PGs"
   ↓
3. Page loads: GET /pgs/getAllPgs?page=0&size=5
   ├─ Receive PagedResponse with content[]
   └─ Display as grid of PGCards
   ↓
4. User applies filters: area=Whitefield, maxRent=15000
   ↓
5. Page refetches: GET /pgs/getAllPgs?page=0&size=5&area=Whitefield&maxRent=15000
   └─ Display filtered results
   ↓
6. User clicks "Get Recommendations"
   ↓
7. Fill form: office=Ecospace, budget=15000
   ↓
8. Submit: POST /recommendations with body
   ├─ Receive array of RecommendationResponseDTO[]
   └─ Display sorted by score, show labels & insights
   ↓
9. User clicks on recommended PG
   ↓
10. Navigate to: GET /pgs/{id}
    └─ Display full PG details with map
```

---

## 🧪 TEST API CALLS

```bash
# Test creating a PG
curl -X POST http://localhost:8080/pgs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test PG",
    "area": "Whitefield",
    "roomType": "Shared",
    "rent": 9000,
    "foodIncluded": true,
    "latitude": 13.0845,
    "longitude": 77.6033
  }'

# Test getting all PGs
curl http://localhost:8080/pgs/getAllPgs?page=0&size=5

# Test getting recommendations
curl -X POST http://localhost:8080/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "officeLocation": "Ecospace",
    "preferredArea": "Whitefield",
    "budget": 15000
  }'
```

---

## 🚀 QUICK START COMMANDS

```bash
# Step 1: Generate frontend using prompt
# (Copy FRONTEND_GENERATION_COMPLETE_PROMPT.txt into Claude/ChatGPT)

# Step 2: Setup project
cd pg-optimizer-frontend
npm install

# Step 3: Start development
npm run dev
# Frontend runs at: http://localhost:5173

# Step 4: In another terminal, start backend
cd ../
./mvnw spring-boot:run
# Backend runs at: http://localhost:8080

# Step 5: Visit in browser
# http://localhost:5173
```

---

## 📊 PAGINATION EXAMPLE

```javascript
// Using pagination in Browse PGs
const [page, setPage] = useState(0);
const [size, setSize] = useState(5);

const fetchPGs = async () => {
  try {
    const response = await api.get('/pgs/getAllPgs', {
      params: { page, size }
    });
    
    const { data } = response.data;
    setPGs(data.content);
    setTotalPages(data.totalPages);
    setTotalElements(data.totalElements);
  } catch (error) {
    setError(error.message);
  }
};

// Pagination buttons
<button onClick={() => setPage(page - 1)} disabled={page === 0}>
  Previous
</button>

<span>Page {page + 1} of {totalPages}</span>

<button onClick={() => setPage(page + 1)} disabled={data.last}>
  Next
</button>
```

---

## 🎯 RESPONSE HANDLING PATTERN

```javascript
// Correct way to handle API responses

try {
  const response = await api.post('/pgs', pgData);
  
  // Check response structure
  if (response.data.success) {
    const pgData = response.data.data;  // Actual PG object
    showToast('PG created successfully', 'success');
  } else {
    showToast(response.data.message, 'error');
  }
} catch (error) {
  // Handle errors
  const errorMessage = 
    error.response?.data?.message || 
    error.message || 
    'Something went wrong';
  showToast(errorMessage, 'error');
}

// Special handling for recommendations (returns array directly)
try {
  const recommendations = await api.post('/recommendations', {
    officeLocation,
    preferredArea,
    budget
  });
  
  // recommendations.data is already an array!
  // No need to access .data.data
  setRecommendations(recommendations.data);
} catch (error) {
  // Handle error
}
```

---

## 📝 ENVIRONMENT SETUP

```
Create .env file:
────────────────────────────────────────
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=PG Optimizer
────────────────────────────────────────

Use in code:
import.meta.env.VITE_API_BASE_URL
import.meta.env.VITE_APP_NAME
```

---

## ✨ KEY FEATURES SUMMARY

| Feature | Status | Complexity |
|---------|--------|-----------|
| Browse PGs | Core | ⭐⭐ |
| Pagination | Core | ⭐⭐⭐ |
| Filters | Core | ⭐⭐⭐ |
| Add PG | Core | ⭐⭐⭐ |
| Form Validation | Core | ⭐⭐ |
| Recommendations | Core | ⭐⭐⭐⭐ |
| Details View | Core | ⭐⭐ |
| Responsive Design | Core | ⭐⭐⭐ |
| Error Handling | Core | ⭐⭐ |
| Map Integration | Optional | ⭐⭐⭐⭐ |
| User Favorites | Optional | ⭐⭐⭐ |
| Advanced Filters | Optional | ⭐⭐⭐ |

---

## 🎉 YOU'RE READY!

**Three prompt files created:**
1. ✅ FRONTEND_GENERATION_COMPLETE_PROMPT.txt (USE THIS!)
2. ✅ FRONTEND_GENERATION_PROMPT.md (Reference)
3. ✅ FRONTEND_QUICK_REFERENCE.md (Quick lookup)

**Next Action:**
→ Copy FRONTEND_GENERATION_COMPLETE_PROMPT.txt
→ Paste into Claude/ChatGPT
→ Generate React frontend
→ `npm install` and `npm run dev`
→ Enjoy your app!

---

Generated: May 1, 2026
For: PG Optimizer Commute Application
Status: ✅ Ready for Generation


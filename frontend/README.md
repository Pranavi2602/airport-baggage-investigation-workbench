# Airport Baggage Misroute Investigation Workbench (CAP-05) — Frontend

Modern, responsive React frontend for the **Airport Baggage Misroute Investigation Workbench**, integrated with the Spring Boot REST API (`http://localhost:8081`).

## Architecture

```
CSV datasets → Python Data Engineering Pipeline → PostgreSQL → Spring Boot REST APIs → React Frontend
```

The frontend communicates exclusively with the Spring Boot REST APIs and does not connect directly to PostgreSQL or perform ETL processing.

## Technology Stack

- **React 19** & **JavaScript (ES6+)**
- **Vite** (dev server & production bundler)
- **React Router** (`react-router-dom`) for navigation
- **Lucide React** (`lucide-react`) for icons
- **Recharts** (`recharts`) for operational charts
- **CSS3** custom properties & responsive grid layout

## Project Structure

```
frontend/
├── .env                          # Configurable backend URL (VITE_API_BASE_URL)
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── api/
    │   ├── apiClient.js          # Centralized Fetch wrapper & error handling
    │   ├── baggageApi.js         # Health check & baggage investigation endpoints
    │   └── dashboardApi.js       # Dashboard summary endpoint
    ├── components/
    │   ├── dashboard/
    │   │   ├── InvestigationStatusChart.jsx
    │   │   ├── JourneyTypeChart.jsx
    │   │   └── MetricCard.jsx
    │   ├── investigation/
    │   │   ├── AssignmentTable.jsx
    │   │   ├── BaggageDetails.jsx
    │   │   ├── BaggageSearch.jsx
    │   │   ├── InvestigationStatus.jsx
    │   │   └── ScanTimeline.jsx
    │   └── layout/
    │       ├── MainLayout.jsx
    │       ├── Sidebar.jsx
    │       └── Topbar.jsx
    ├── hooks/
    │   ├── useBaggageInvestigation.js
    │   ├── useDashboard.js
    │   └── useHealthCheck.js
    ├── pages/
    │   ├── BaggageInvestigation.jsx
    │   └── Dashboard.jsx
    ├── styles/
    │   ├── dashboard.css
    │   ├── global.css
    │   └── investigation.css
    ├── utils/
    │   ├── formatDate.js
    │   └── statusConfig.js
    ├── App.jsx
    └── main.jsx
```

## Features

- **Executive Dashboard (`/`)**:
  - Six live KPI cards populated from `GET /api/dashboard/summary`
  - **Investigation Status Distribution** donut chart (`No Issue Detected`, `Event Pattern Review`, `Timing Inconsistency`)
  - **Journey Type Distribution** bar chart (`Direct` vs `Connecting`)
  - Compact operational insights derived from the summary metrics
- **Baggage Investigation (`/investigation`)**:
  - Search by Baggage ID (e.g., `BAG00501`) via `GET /api/baggage/{bagId}/investigation`
  - Baggage identification card (`Bag ID`, `Tag Number`, `Booking Reference`, `Passenger Reference`)
  - Journey type & investigation status badges
  - Chronologically sorted flight assignments table
  - Chronological vertical scan event timeline with event-specific icons
- **Live Backend Health Indicator**:
  - Top navigation bar polls `GET /api/health` and reflects live API availability
- **Error, Empty & Loading States**:
  - Skeleton loading cards, empty search prompt, HTTP 404 handling, and backend unavailable messages

## Configuration

Update `.env` if the Spring Boot backend runs on a different host or port:

```env
VITE_API_BASE_URL=http://localhost:8081
```

## Installation & Running

### 1. Start the Spring Boot Backend

```bash
cd ../baggage-investigation-api
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
cd ..\baggage-investigation-api
.\mvnw.cmd spring-boot:run
```

Verify backend health at `http://localhost:8081/api/health`.

### 2. Install Frontend Dependencies & Start Dev Server

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

### 3. Production Build

```bash
npm run build
npm run preview
```

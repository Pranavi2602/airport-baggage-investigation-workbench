\# Airport Baggage Misroute Investigation Workbench



An end-to-end data engineering and investigation platform designed to reconstruct baggage journeys, identify potential baggage handling exceptions, manage investigations, and provide operational analytics.



\## Project Overview



The Airport Baggage Misroute Investigation Workbench analyzes baggage movement across airport operations.



It processes baggage, flight, assignment, and scan-event datasets to reconstruct baggage journeys and identify potential inconsistencies.



The platform provides:

\- Data ingestion, validation, cleaning, and transformation.

\- Baggage journey reconstruction.

\- Misroute and exception detection.

\- Exception lifecycle management.

\- Analytical data warehousing using Snowflake.

\- Interactive Power BI dashboards.

\- REST APIs and a React-based investigation interface.



\*\*Important:\*\* The current implementation uses CSV datasets. Live airport system integrations and real-time event ingestion are not implemented.



\## Architecture



```mermaid

flowchart TD

&#x20;   A\[Source CSV Datasets] --> B\[Python Data Engineering]

&#x20;   B --> C\[Data Validation and Cleaning]

&#x20;   C --> D\[Journey Reconstruction]

&#x20;   D --> E\[Misroute Detection]

&#x20;   E --> F\[PostgreSQL Operational Database]

&#x20;   F --> G\[Spring Boot REST APIs]

&#x20;   G --> H\[React Investigation Interface]

&#x20;   F --> I\[Python Analytics and ETL]

&#x20;   I --> J\[Snowflake Data Warehouse]

&#x20;   J --> K\[Bronze Layer]

&#x20;   K --> L\[Silver Layer]

&#x20;   L --> M\[Gold Layer]

&#x20;   M --> N\[Power BI Dashboards]

```



\## Technology Stack



| Area | Technologies |

|---|---|

| Data Engineering | Python, Pandas, Jupyter Notebook |

| Operational Database | PostgreSQL |

| Data Warehouse | Snowflake |

| Backend | Java 21, Spring Boot, Spring Data JPA |

| Frontend | React, JavaScript, Vite |

| Analytics | Power BI |

| Containerization | Docker, Docker Compose |

| Version Control | Git, GitHub |



\## Data Engineering Pipeline



The data engineering workflow includes:



1\. \*\*Data Ingestion\*\* – Load baggage, flight, baggage assignment, and scan-event CSV datasets.

2\. \*\*Data Quality Profiling\*\* – Analyze missing values, duplicates, data types, relationships, and event sequences.

3\. \*\*Data Cleaning\*\* – Normalize values and timestamps while preserving legitimate missing information.

4\. \*\*Journey Reconstruction\*\* – Reconstruct expected and actual baggage journeys.

5\. \*\*Misroute Detection\*\* – Apply detection rules to identify timing inconsistencies and missing event patterns.

6\. \*\*Exception Management\*\* – Generate exception records and track investigation status.

7\. \*\*Advanced Analytics\*\* – Generate journey, airport, flight, connection, exception, and dwell-time analytics.

8\. \*\*Data Warehousing\*\* – Load analytical datasets into Snowflake Bronze, Silver, and Gold layers.

9\. \*\*Visualization\*\* – Present operational and analytical insights through Power BI.



\## Key Dataset Findings



Based on the current project datasets:



| Metric | Result |

|---|---:|

| Total Baggage | 1,000 |

| Direct Journeys | 500 |

| Connecting Journeys | 500 |

| Scan Events | 9,000 |

| Flight Records | 250 |

| Timing Inconsistencies | 185 |

| Event Pattern Reviews | 315 |

| No Issue Detected | 500 |



These are dataset-based investigation findings. They do not establish that physical baggage misroutes were confirmed.



\## Application Features



\### React Frontend



\- Executive Dashboard

\- Baggage Investigation

\- Exception Management

\- Exception filtering and pagination

\- Investigator assignment

\- Exception status lifecycle management



\### Spring Boot Backend



\- Health check API

\- Dashboard summary API

\- Baggage investigation API

\- Exception listing and filtering APIs

\- Exception detail API

\- Exception status update API



\### Snowflake



\- Bronze, Silver, and Gold data layers

\- Advanced analytical datasets

\- SQL-based transformations

\- Data validation through row-count checks



\### Power BI



\- Executive Dashboard

\- Operational Analytics

\- Baggage Investigation



\## Repository Structure



```text

Capstone/

│

├── Airport\_Baggage\_Baseline\_Datasets/

│   ├── notebooks/

│   ├── documentation/

│   └── README.md

│

├── baggage-investigation-api/

│   ├── src/

│   ├── Dockerfile

│   └── pom.xml

│

├── frontend/

│   ├── src/

│   ├── Dockerfile

│   └── package.json

│

├── docker-compose.yml

├── .gitignore

└── README.md

```



Raw and processed data files, virtual environments, build outputs, and Power BI binary reports are excluded from this Git repository.



\## Running the Application Locally



\### Prerequisites



\- Docker Desktop

\- PostgreSQL with the project database and tables already configured

\- Git



\### 1. Clone the repository



```bash

git clone https://github.com/Pranavi2602/airport-baggage-investigation-workbench.git

cd airport-baggage-investigation-workbench

```



\### 2. Configure the database password



The application expects the PostgreSQL database to be available on port `5433`, with database name `airport\_baggage\_db`.



In PowerShell, enter your database password securely:



```powershell

$secure = Read-Host "Enter PostgreSQL password" -AsSecureString

$bstr = \[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)

$env:DB\_PASSWORD = \[Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)

\[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)

$secure.Dispose()

Remove-Variable bstr, secure

```



Do not commit or share your database password.



\### 3. Start the application



```bash

docker compose up -d --build

```



\### 4. Verify the containers



```bash

docker compose ps

```



\### 5. Access the application



| Component | URL |

|---|---|

| React Frontend | http://localhost:5173 |

| Spring Boot Health API | http://localhost:8081/api/health |

| Dashboard Summary API | http://localhost:8081/api/dashboard/summary |



To stop the containers:



```bash

docker compose down

```



\*\*Note:\*\* Docker Compose starts the frontend and backend. PostgreSQL is an external prerequisite in this setup; the database and its existing tables must be available before starting the application.



\## Example API Endpoints



| Method | Endpoint | Purpose |

|---|---|---|

| GET | `/api/health` | Backend health check |

| GET | `/api/dashboard/summary` | Dashboard metrics |

| GET | `/api/baggage/{bagId}/investigation` | Baggage investigation |

| GET | `/api/exceptions` | List and filter exceptions |

| GET | `/api/exceptions/{exceptionId}` | Exception details |

| PUT | `/api/exceptions/{exceptionId}/status` | Update exception status |



\## Future Enhancements



\- Automated and scheduled data ingestion.

\- Integration with external baggage and flight data sources.

\- Cloud infrastructure and application deployment.

\- CI/CD using GitHub Actions.

\- Enhanced operational monitoring and scalability.



\## Project Status



The core data engineering pipeline, PostgreSQL integration, Spring Boot APIs, React investigation interface, Snowflake advanced analytics, and initial Docker deployment setup have been implemented.



Cloud deployment and CI/CD are planned next.



\---



\*\*Project:\*\* Airport Baggage Misroute Investigation Workbench  

\*\*Repository:\*\* https://github.com/Pranavi2602/airport-baggage-investigation-workbench


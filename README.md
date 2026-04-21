CS 465 Full Stack Web Application – Portfolio README
Course: CS 465 Full Stack Development with MEAN
Project: Travlr Getaways – Full Stack Travel Booking Application

Architecture
Frontend Development Comparison: Express HTML, JavaScript, and SPA
This project employed multiple frontend development approaches, each serving a distinct purpose within the overall application architecture.
Express HTML was used for the customer-facing side of the application. Pages were rendered server-side using the Handlebars (HBS) templating engine, where the Express server dynamically injected data into HTML templates before sending the completed page to the client's browser. This approach is straightforward and SEO-friendly, but each user interaction that requires new data triggers a full page reload, which can feel slower compared to modern application experiences.
JavaScript served as the foundation across all layers of the application. On the customer-facing side, it powered dynamic behaviors within the Express-rendered pages. On the admin side, it was the language of the Angular SPA framework. JavaScript also powered the entire Node.js/Express backend and was used to define Mongoose schemas and interact with MongoDB — making it a truly end-to-end language for the project.
The Single-Page Application (SPA), built with Angular, was used exclusively for the administrative interface. Unlike the Express HTML approach, the SPA loads once and dynamically updates content by making API calls to the backend and re-rendering only the components that change. This creates a much faster, app-like user experience. The Angular SPA communicates with the REST API via HTTP requests, decoupling the frontend presentation layer entirely from the backend data layer.
FeatureExpress HTML (Customer)Angular SPA (Admin)RenderingServer-sideClient-sidePage ReloadsFull reload on navigationNo reload; component updatesData FetchingServer injects data into templateAsync HTTP calls to REST APIUse CasePublic-facing contentAuthenticated admin dashboard
Why MongoDB (NoSQL)?
The backend uses a NoSQL MongoDB database for several compelling reasons suited to this application. MongoDB stores data as JSON-like BSON documents, which aligns naturally with the JavaScript/Node.js stack — data flows seamlessly from the database to the API to the frontend without needing complex transformations between formats.
NoSQL databases like MongoDB also offer flexible schema design. In a travel application where trip data (destinations, descriptions, pricing, availability) may vary in structure or evolve over time, a document model allows fields to be added or adjusted without requiring disruptive schema migrations the way a relational SQL database would. Additionally, MongoDB scales horizontally well and integrates tightly with Mongoose, which provided a structured ODM (Object Data Modeling) layer to enforce consistency while retaining flexibility.

Functionality
JSON vs. JavaScript, and the Frontend-Backend Bridge
JavaScript is a full programming language — it handles logic, control flow, functions, and object manipulation. JSON (JavaScript Object Notation) is a lightweight data format derived from JavaScript object syntax, but it is language-agnostic and used purely for structuring and transmitting data.
JSON acts as the universal contract between the frontend and backend in this application. When the Angular SPA requests trip data, the Express REST API queries MongoDB, serializes the result into JSON, and sends it over HTTP. Angular receives the JSON response, deserializes it into JavaScript objects, and binds the data to UI components. This cycle — Angular → HTTP request → Express API → MongoDB → JSON response → Angular — is repeated for every CRUD operation. JSON's simplicity and universal support make it the ideal "language" both sides of the stack can speak fluently.
Code Refactoring and Reusable UI Components
Several meaningful refactoring efforts improved the application over the course of development:

Extracting Trip Data into MongoDB: Early iterations of the customer-facing site used a static trips.json file hardcoded in the project. Refactoring to fetch trip data from MongoDB via the REST API removed this static dependency, enabling the admin to manage trips dynamically without any code changes.
Handlebars Partials: On the Express side, repeated page elements like the header and navigation bar were extracted into Handlebars partials (header.hbs, navigation.hbs). This eliminated duplicated markup across every page template, meaning a single change to the partial propagated everywhere.
Angular Reusable Components: In the SPA, components like the trip listing card and the trip edit form were built as reusable Angular components. This meant the same component handled both "add trip" and "edit trip" workflows by accepting different inputs — reducing code duplication and making future changes easier to manage in a single place.

The primary benefit of reusable UI components is maintainability. When a component's behavior or appearance needs to change, the update happens in one place and is reflected everywhere that component is used. This also reduces the surface area for bugs introduced by inconsistent duplicate logic.

Testing
Methods, Endpoints, and Security in a Full Stack Application
Methods and Endpoints:
A REST API is tested at the level of its HTTP methods and endpoints. Each combination represents a specific operation:

GET /api/trips — Retrieve all trips (read)
GET /api/trips/:tripCode — Retrieve a single trip by code
POST /api/trips — Create a new trip (write)
PUT /api/trips/:tripCode — Update an existing trip (write)

Testing these endpoints means verifying that each returns the correct HTTP status code (200 OK, 201 Created, 404 Not Found, 401 Unauthorized, etc.), the expected response payload structure, and appropriate error handling for malformed requests.
Security and Authentication Complexity:
Adding JWT (JSON Web Token) authentication introduced significant testing complexity. Endpoints that require authentication must be tested in two states: once without a valid token (expecting a 401 Unauthorized response) and once with a valid token (expecting the successful response). This doubles the number of test cases for every protected route.
Testing the login flow itself requires verifying that valid credentials return a JWT, that invalid credentials are rejected, and that the token is correctly validated on subsequent requests. Tools like Postman were invaluable for manually testing API endpoints — allowing headers like Authorization: Bearer <token> to be set per-request to simulate authenticated sessions. In a more mature testing setup, automated integration tests using a framework like Jest or Mocha would mock authentication middleware to isolate endpoint logic from security logic during unit testing.

Reflection
Professional Growth and Marketable Skills
This course has significantly advanced my readiness for a career in software development, particularly in web application roles. Working through the full MEAN stack — MongoDB, Express, Angular, and Node.js — gave me hands-on experience with the entire lifecycle of a modern web application, from database design to REST API development to a dynamic client-side SPA.
Several skills stand out as particularly marketable:

Full Stack Thinking: I can now reason about how changes in one layer (e.g., a schema change in MongoDB) ripple through the API contract and into the frontend. This end-to-end perspective is highly valued in smaller teams where developers are expected to work across the stack.
RESTful API Design: Designing and implementing a REST API with proper HTTP semantics, JSON data exchange, and route structure is a foundational skill for virtually any web development role.
Security Implementation: Implementing JWT-based authentication — including password hashing with bcrypt, token generation, and protected route middleware — gave me practical experience with authentication patterns that are standard in production applications.
Angular and Component Architecture: Building a SPA with Angular reinforced component-based thinking, which transfers directly to other modern frameworks like React and Vue.
Version Control with Git/GitHub: Maintaining a repository throughout the project, using it to track progress and produce a professional portfolio artifact, prepared me for collaborative development workflows in a professional environment.

This course moved me from understanding web concepts theoretically to implementing them in a working, multi-layered application — a transition that is essential for entering the workforce as a competent full stack developer.

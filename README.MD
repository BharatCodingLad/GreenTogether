\## 🏗️ Architecture



The project follows a modern full-stack architecture:



\- \*Frontend\*: React.js application with component-based architecture

\- \*Backend\*: Node.js/Express.js REST API with JWT authentication

\- \*AI Integration\*: Local LM Studio integration for environmental AI assistance

\- \*Database\*: MongoDB with Mongoose ODM



\## 📁 Project Structure





greentogether/

├── backend/                 # Node.js/Express backend

│   ├── src/                # Source code

│   ├── .env               # Environment configuration

│   └── package.json       # Backend dependencies

├── frontend/              # React frontend

│   ├── src/              # React components and pages

│   ├── public/           # Static assets

│   └── package.json      # Frontend dependencies

└── README.md             # This file





\## 🚀 Getting Started



\### Prerequisites



\- Node.js (v14 or higher)

\- npm or yarn

\- MongoDB (local or cloud instance)

\- LM Studio (for AI features)



\### Installation



1\. \*Clone the repository\*

&nbsp;  bash

&nbsp;  git clone <repository-url>

&nbsp;  cd greentogether

&nbsp;  



2\. \*Install backend dependencies\*

&nbsp;  bash

&nbsp;  cd backend

&nbsp;  npm install

&nbsp;  



3\. \*Install frontend dependencies\*

&nbsp;  bash

&nbsp;  cd ../frontend

&nbsp;  npm install

&nbsp;  



4\. \*Configure environment variables\*

&nbsp;  

&nbsp;  Backend configuration (backend/.env):

&nbsp;  env

&nbsp;  PORT=4000

&nbsp;  NODE\_ENV=development

&nbsp;  JWT\_SECRET=your-jwt-secret-key

&nbsp;  JWT\_EXPIRE=24h

&nbsp;  FRONTEND\_URL=http://localhost:3000

&nbsp;  



\### Running the Application



\#### Development Mode (Full Stack)

bash

cd backend

npm run dev:full



This command starts both the backend server and frontend development server concurrently.



\#### Individual Services



\*Backend only:\*

bash

cd backend

npm run dev





\*Frontend only:\*

bash

cd frontend

npm start





\*Production build:\*

bash

cd backend

npm run build

npm start





\## 🔧 Available Scripts



\### Backend Scripts

\- npm start - Start production server

\- npm run dev - Start development server with nodemon

\- npm test - Run Jest tests

\- npm run build - Build frontend for production

\- npm run dev:full - Start both backend and frontend concurrently



\### Frontend Scripts

\- npm start - Start development server

\- npm run build - Build for production

\- npm test - Run tests



\## 🌟 Key Features



\### Authentication \& User Management

\- JWT-based authentication system

\- User profile management

\- Secure password handling with bcryptjs



\### AI Integration (GreenieAI)

\- Local LM Studio integration for environmental AI chat

\- RESTful API endpoint at /api/greenieai/chat

\- Configurable AI parameters (temperature, max\_tokens)



\### Environmental Initiatives

\- Community initiative tracking

\- User engagement features

\- Plant management system



\### Frontend Components

\- Responsive React components

\- Video logo with animations

\- Social media integration

\- Contact information display



\## 🔌 API Endpoints



\### Authentication

\- POST /api/auth/login - User login

\- POST /api/auth/register - User registration



\### User Management

\- GET /api/users/profile - Get user profile (authenticated)

\- PUT /api/users/profile - Update user profile (authenticated)



\### AI Chat

\- POST /api/greenieai/chat - Chat with GreenieAI



\### Initiatives

\- GET /api/initiatives - Get environmental initiatives



\## 🛠️ Technology Stack



\### Backend

\- \*Express.js\* - Web framework

\- \*MongoDB/Mongoose\* - Database and ODM

\- \*JWT\* - Authentication

\- \*bcryptjs\* - Password hashing

\- \*CORS\* - Cross-origin resource sharing

\- \*dotenv\* - Environment configuration

\- \*express-validator\* - Input validation



\### Frontend

\- \*React.js\* - UI framework

\- \*CSS3\* - Styling with custom components

\- \*Font Awesome\* - Icons for social links



\### Development Tools

\- \*nodemon\* - Development server auto-restart

\- \*concurrently\* - Run multiple commands

\- \*Jest\* - Testing framework



\## 🌐 Environment Configuration



The application uses environment variables for configuration:



\- PORT - Backend server port (default: 4000)

\- NODE\_ENV - Environment mode

\- JWT\_SECRET - Secret key for JWT tokens

\- JWT\_EXPIRE - JWT token expiration time

\- FRONTEND\_URL - Frontend URL for CORS



\## 🤖 AI Integration Setup



To use the GreenieAI features:



1\. Install and configure LM Studio

2\. Start LM Studio server on http://localhost:1234

3\. Ensure the AI model is loaded and accessible

4\. The backend will automatically connect to LM Studio via the /v1/chat/completions endpoint



\## 🧪 Testing



Run tests for the backend:

bash

cd backend

npm test





\## 🚀 Deployment



1\. Build the frontend:

&nbsp;  bash

&nbsp;  cd backend

&nbsp;  npm run build

&nbsp;  



2\. Start the production server:

&nbsp;  bash

&nbsp;  npm start

&nbsp;  



\## 🤝 Contributing



1\. Fork the repository

2\. Create a feature branch

3\. Make your changes

4\. Add tests if applicable

5\. Submit a pull request



\## 📄 License



This project is licensed under the MIT License - see the LICENSE file for details.



---



\*GreenTogether\* - Building a sustainable future, one initiative at a time. 🌍💚


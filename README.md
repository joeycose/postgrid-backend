# PostGrid Letter Creation Backend

This project is an Express.js backend server that integrates with the PostGrid Print & Mail API to create and send letters programmatically.

## Getting Started

Navigate to the project directory:
```
cd postgrid-backend
```

Install the required npm packages:
```
npm install
```

Create a .env file in the root of the project with your PostGrid API keys and other configuration:
```
POSTGRID_MAIL_API_KEY=your_mail_api_key_here
POSTGRID_ADDR_API_KEY=your_addr_api_key_here
PORT=3000
```

Start the development server:
```
npm run dev
```

## Libraries:
- Express.js - Fast, unopinionated, minimalist web framework for Node.js.
- CORS - Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- dotenv - Module that loads environment variables from a .env file into process.env.
- PostGrid Node Client - The official PostGrid Node.js client library for interacting with the PostGrid Print & Mail API.
- TypeScript - A superset of JavaScript that compiles to clean JavaScript output.
- nodemon - A tool that helps develop Node.js based applications by automatically restarting the node application when file changes are detected.
- ts-node - TypeScript execution engine and REPL for Node.js.


### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
```sh
git clone https://github.com/your-username/postgrid-backend.git

# React Post Management Application

## Instructions to Run the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KarimMagdy96/next-dinamo.git
   cd next-dinamo
   ```

2.Install Dependencies: Ensure you have Node.js and npm installed. Run the following command to install the necessary packages:

```bash
  npm install
```

3.Run the Development Server: To start the application locally, run:

```bash
npm start

```

This will launch the app in your browser at http://localhost:3000.

4.Build the Application for Production: If you're ready to deploy or create a production build, run:

```bash

npm run build
```

Notes on Assumptions Made or Challenges Faced
Assumptions:

- 1.The API used for post management (jsonplaceholder.typicode.com) is publicly accessible and does not require authentication.
- 2.The application is designed to be a simple CRUD interface with state management via React (Next js) useState and minimal API handling.
- 3.The use of Ant Design components (such as Modal, Table, and Button) is integrated to provide a polished UI.

Challenges:

- Ensuring seamless UI behavior, such as toggling between creating and updating posts in the modal, while keeping the form data intact, proved to be challenging.
- Managing asynchronous data fetching (POST, PUT, DELETE requests) with error handling and displaying notifications required careful attention to API responses and user feedback.

Approximate Time Spent on the Assignment

- Planning and Setup: 1 hour
- Component Development: 4 hours
- Bug Fixes and Final Adjustments: 2 hours
- Total Time Spent: Approximately 7 hours

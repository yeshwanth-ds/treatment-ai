
# Treatment AI Project 🧠💉

Welcome to the **Treatment AI Project**! This application leverages **Gemini AI API** to assist healthcare professionals in predicting treatment outcomes, recommending personalized treatment plans, and improving patient care efficiency without the need for complex machine learning model setup.

## 🛠️ Features

- **Predictive Analytics**: Utilize the Gemini AI API to forecast treatment success rates and possible outcomes.
- **Personalized Treatment Plans**: Generate customized treatment recommendations based on patient data via the Gemini AI API.
- **Patient Data Management**: Securely manage and analyze patient health records.
- **Protected Routes**: Safeguard sensitive patient and healthcare data.
- **Admin Dashboard**: Provide healthcare professionals with a comprehensive dashboard for monitoring patient treatment.

## 📁 Project Structure

The project is structured as follows:

```
/treatment-ai-project
├── /backend          # Server-side code
│   ├── /config       # Configuration files
│   ├── /controllers  # Business logic for routes
│   ├── /models       # Database models
│   ├── /routes       # API endpoints
│   └── /utils        # Utility functions
│
├── /frontend         # Client-side code
│   ├── /public       # Public assets
│   ├── /src          # React source files
│   │   ├── /components # Reusable components
│   │   ├── /pages      # Page components (Patient info, Treatment plans, etc.)
│   │   └── /store      # State management (e.g., Zustand, Redux)
│   └── package.json    # Project metadata and dependencies
│
├── /gemini-api       # Gemini AI API integration for treatment predictions
│   └── gemini.js     # API request and response handling logic
│
├── .env              # Environment variables
└── README.md         # Project documentation
```

## 📁 Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/treatment-ai-project.git
   cd treatment-ai-project
   ```

2. **Create a `.env` file** in your root directory and add the following environment variables:

   ```plaintext
   MONGO_URI=your_mongo_uri
   PORT=5000
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   GEMINI_API_KEY=your_gemini_api_key
   CLIENT_URL=http://localhost:5173
   ```

3. **Install dependencies**:

   ```bash
   # Navigate to the backend directory and install dependencies
   cd backend
   npm install

   # Navigate to the frontend directory and install dependencies
   cd ../frontend
   npm install
   ```

4. **Run the backend server**:

   ```bash
   cd backend
   npm run start
   ```

5. **Run the frontend application**:

   ```bash
   cd ../frontend
   npm run start
   ```


## 🚀 Usage

- Visit `http://localhost:5173` in your browser to access the application.
- Healthcare professionals can log in to view and manage patient data, predict treatment outcomes, and generate reports via the Gemini AI API integration.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or API enhancements, feel free to open an issue or submit a pull request.

---

Thank you for checking out the **Treatment AI Project**! If you have any questions or need assistance, feel free to reach out.

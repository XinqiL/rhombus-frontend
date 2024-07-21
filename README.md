# Regex Replacement Project - Frontend

This README provides a comprehensive guide for setting up a React application powered by Vite, integrated seamlessly with Firebase, including Firebase Storage.

## Prerequisites

Before beginning, ensure you have installed:

- Node.js (preferably the latest LTS version)

# Setup Instructions

## Step 1: Clone and Install Dependencies

Clone the repository and install the required npm packages:
`git clone git@github.com:XinqiL/rhombus-frontend.git`
`cd rhombus-frontend`
`npm install`

## Step 2: Create a Firebase Project

1. Visit Firebase Console https://console.firebase.google.com/u/0/.
2. Click on “Add project” and follow the on-screen instructions.
3. After creating your project, go to "Project settings".
4. In the "Your apps" section, click on the web icon (</>) to register your app.
5. Follow the prompts to register your app and receive your Firebase configuration object, which looks like this:

```javascript
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};
```

6. Initialize Firebase Storage:

In the Firebase Console, navigate to the "Storage" section.
Click on "Get started" to set up Cloud Storage for your project.

## Step3: Configure Environment Variables

1. Rename the provided `.env.example` file to `.env`.
   `mv .env.example .env`

2. Open the .env file and fill it with your Firebase credentials:

```javascript
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id_here
VITE_FIREBASE_APP_ID=your_firebase_app_id_here`
```

These values can be found in your Firebase project settings under the "General" tab and then under "Your apps" section.

## Step4: Run the Development Server

`npm run dev`

The application will be available at http://localhost:5173

## Additional Resources

The video demo can be viewed at https://drive.google.com/file/d/1OFHw1FyMgj65MYzobKUSPih0PViWGpho/view?usp=drive_link

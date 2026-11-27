
# 📸 PICYFI – Social Media Web Application

PICYFI is a full-stack social media web application where users can connect with others, share pictures, explore posts, and interact through likes, comments, and follows.

Built using the MERN stack, PICYFI provides a responsive interface and interactive social networking features.

## 🌐 Live Project Links

| Component | Link |
|---|---|
| Frontend Application | [PICYFI – Live Demo](https://picyfi-app.vercel.app/) |
| Backend API | [PICYFI Backend](https://picyfibackend.onrender.com) |

## ✨ Features

- **User Authentication:** Register and log in securely.
- **User Profiles:** Create and manage personal profiles with profile pictures and bios.
- **Create Posts:** Upload images with captions.
- **Home Feed:** Explore posts shared by users.
- **Like & Unlike Posts:** Interact with posts using the like functionality.
- **Comment System:** Add comments and view comments with the commenter's username and profile picture.
- **Follow & Unfollow:** Connect with other users.
- **Followers & Following:** View your followers and the accounts you follow.
- **User Search:** Search for users by username.
- **Post Management:** Delete your own posts.
- **Cloud Image Storage:** Upload and manage images using Cloudinary.
- **Responsive UI:** Clean and interactive interface built with Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Multer

### Deployment & Services
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary

## 🚀 How to Use PICYFI

1. Visit [PICYFI](https://picyfi-app.vercel.app/).
2. Register a new account or log in.
3. Explore the home feed to view posts shared by users.
4. Upload an image and add a caption to create your own post.
5. Like posts and interact with other users through comments.
6. Use the search bar to discover other users.
7. Visit user profiles and follow accounts.
8. View your followers and following lists.
9. Manage your profile and delete your own posts whenever required.

## ⚙️ Installation & Local Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd PICYFI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend:

```bash
npm start
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Configure your backend URL in the frontend:

```javascript
const url = "http://localhost:5000";
```

Start the frontend:

```bash
npm run dev
```

Open the local URL provided by Vite.

## 📁 Project Structure

```text
PICYFI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔒 Environment Variables

Keep your MongoDB credentials, JWT secret, and Cloudinary API credentials private.

**Never upload your `.env` file to GitHub.**

## 👨‍💻 Developer

Developed as a full-stack MERN project to explore real-world social media functionalities, REST API development, database relationships, authentication, and cloud-based image management.

---

## 🔗 Explore PICYFI

**[Visit PICYFI – Live Application](https://picyfi-app.vercel.app/)**

*Connect. Share. Interact.*

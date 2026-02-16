# 🎵 Music Streaming Backend - Role-Based Authentication

A robust RESTful API backend for a music streaming platform with role-based access control. Artists can upload music and create albums, while regular users can browse and listen to content.

## 🚀 Features

- **Role-Based Authentication**: Separate permissions for artists and regular users
- **JWT Token Management**: Secure authentication with HTTP-only cookies
- **Music Upload**: Artists can upload music files to cloud storage
- **Album Management**: Create and manage music albums with multiple tracks
- **User Management**: Registration, login, and logout functionality
- **Secure Password Storage**: bcrypt hashing for password security
- **Cloud Storage**: Music files stored securely using ImageKit
- **Relationship Management**: MongoDB references between users, music, and albums

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Cloud Storage**: ImageKit
- **File Upload**: Multer
- **Environment Management**: dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- ImageKit account for cloud storage

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/music-streaming-backend.git
   cd music-streaming-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`

## 🔐 User Roles

### **Artist**
- Can upload music tracks
- Can create albums
- Can manage their own content

### **User (Regular)**
- Can view all music
- Can browse albums
- Can view album details

## 📡 API Endpoints

### **Authentication Routes** (Public)

#### **POST** `/api/auth/register`
Register a new user (artist or regular user)

**Request Body:**
```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "user"  // or "artist"
}
```

**Response:**
```json
{
  "message": "User created",
  "user": {
    "_id": "...",
    "userName": "john_doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

#### **POST** `/api/auth/login`
Login with existing credentials

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successfull",
  "user": {
    "_id": "...",
    "userName": "john_doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

#### **POST** `/api/auth/logout`
Logout current user

**Response:**
```json
{
  "message": "User Logged Out"
}
```

---

### **Music Routes** (Artist Only - Requires Authentication)

#### **POST** `/api/music/create`
Upload a new music track

**Headers:**
- Cookie: token (JWT)

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `music` (file): Music file
  - `title` (string): Track title

**Response:**
```json
{
  "message": "Music added",
  "music": {
    "_id": "...",
    "uri": "https://...",
    "title": "Song Title",
    "artist": "artist_id"
  }
}
```

---

#### **POST** `/api/music/create-album`
Create a new album

**Headers:**
- Cookie: token (JWT)

**Request Body:**
```json
{
  "title": "Album Name",
  "musics": ["music_id_1", "music_id_2", "music_id_3"]
}
```

**Response:**
```json
{
  "message": "album created successfully",
  "title": "Album Name",
  "musics": ["music_id_1", "music_id_2"],
  "artist": "artist_id"
}
```

---

### **Music Routes** (User Only - Requires Authentication)

#### **GET** `/api/music/view-music`
Get all music tracks (limited to 2 for demo)

**Headers:**
- Cookie: token (JWT)

**Response:**
```json
{
  "message": "Got all music successfully",
  "musics": [
    {
      "_id": "...",
      "uri": "https://...",
      "title": "Song Title",
      "artist": {
        "_id": "...",
        "userName": "artist_name"
      }
    }
  ]
}
```

---

#### **GET** `/api/music/view-albums`
Get all albums

**Headers:**
- Cookie: token (JWT)

**Response:**
```json
{
  "message": "Albums fetched successfully",
  "albums": [
    {
      "_id": "...",
      "title": "Album Name",
      "artist": {
        "_id": "...",
        "userName": "artist_name"
      }
    }
  ]
}
```

---

#### **GET** `/api/music/view-album/:id`
Get album details by ID

**Headers:**
- Cookie: token (JWT)

**Parameters:**
- `id` (string): Album ID

**Response:**
```json
{
  "message": "Fetched album",
  "album": {
    "_id": "...",
    "title": "Album Name",
    "artist": {
      "userName": "artist_name",
      "email": "artist@example.com"
    },
    "musics": [
      {
        "_id": "...",
        "title": "Song 1",
        "uri": "https://..."
      }
    ]
  }
}
```

## 📁 Project Structure

```
music-streaming-backend/
├── src/
│   ├── controller/
│   │   ├── auth.controller.js      # Authentication logic
│   │   └── music.controller.js     # Music & album logic
│   ├── middleware/
│   │   └── auth.middleware.js      # JWT verification & role check
│   ├── models/
│   │   ├── user.model.js           # User schema
│   │   ├── music.model.js          # Music schema
│   │   └── album.model.js          # Album schema
│   ├── routes/
│   │   ├── auth.route.js           # Auth endpoints
│   │   └── music.route.js          # Music endpoints
│   ├── services/
│   │   └── storage.service.js      # ImageKit integration
│   ├── db/
│   │   └── db.js                   # Database connection
│   └── app.js                      # Express app configuration
├── server.js                       # Server entry point
├── .env                            # Environment variables (not committed)
├── .gitignore                      # Git ignore rules
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Tokens**: Secure authentication with HTTP-only cookies
- **Role-Based Access Control**: Middleware to enforce role permissions
- **Input Validation**: Checks for existing users during registration
- **Secure Cookie Configuration**: HTTP-only cookies prevent XSS attacks

## 🧪 Testing the API

You can test the API using tools like:
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/)
- [Insomnia](https://insomnia.rest/)

### Example Flow:

1. **Register as Artist**
   ```bash
   POST http://localhost:3000/api/auth/register
   Body: { "userName": "artist1", "email": "artist@test.com", "password": "pass123", "role": "artist" }
   ```

2. **Login**
   ```bash
   POST http://localhost:3000/api/auth/login
   Body: { "email": "artist@test.com", "password": "pass123" }
   ```

3. **Upload Music** (as Artist)
   ```bash
   POST http://localhost:3000/api/music/create
   Form-data: music (file), title: "My Song"
   ```

4. **Create Album** (as Artist)
   ```bash
   POST http://localhost:3000/api/music/create-album
   Body: { "title": "My Album", "musics": ["music_id_here"] }
   ```

5. **Register as User**
   ```bash
   POST http://localhost:3000/api/auth/register
   Body: { "userName": "user1", "email": "user@test.com", "password": "pass123", "role": "user" }
   ```

6. **View Music** (as User)
   ```bash
   GET http://localhost:3000/api/music/view-music
   ```

## 🚀 Deployment

This application can be deployed on platforms like:
- **Render** (Recommended)
- **Railway**
- **Heroku**
- **AWS EC2**

### Deployment Steps (Render):

1. Push code to GitHub
2. Connect repository to Render
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables in Render dashboard:
   - `MONGO_URI`
   - `IMAGEKIT_PRIVATE_KEY`
   - `JWT_SECRET`
5. Deploy!

**Live API:** `https://your-app.onrender.com`

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Server port (default: 3000) | No |

## 🐛 Known Issues & Future Improvements

### Current Limitations:
- Music listing limited to 2 tracks (demo purpose)
- No pagination implemented
- No search functionality
- No music file format validation

### Planned Features:
- [ ] Pagination for music and albums
- [ ] Search and filter functionality
- [ ] User playlists
- [ ] Music recommendations
- [ ] Artist profile management
- [ ] Like/favorite system
- [ ] Comments on albums
- [ ] File format validation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).





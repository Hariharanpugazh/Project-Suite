# Project Suite

**Project Suite** is a comprehensive portfolio management application designed to showcase your projects in a structured and visually appealing manner. The application features a **React-based frontend**, a **Django-based backend**, and **MongoDB Atlas** as the database. This tool is ideal for developers, organizations, or teams looking to present their projects with detailed information, key features, and visual assets.

---

## Features

- **User-Friendly Form**: Add project details, including name, description, tech stack, and more.
- **Dynamic Display Page**: View all saved projects in a structured and visually appealing format.
- **File Upload**: Attach images, presentations (PPTs), and demo links to projects.
- **Unique Project Identification**: Each project is assigned a randomly generated 5-digit Product ID.
- **MongoDB Integration**: Secure storage and retrieval of project data.

---

## Technologies Used

### Frontend
- React.js
- Tailwind CSS

### Backend
- Django (Python)
- pymongo for MongoDB integration

### Database
- MongoDB Atlas

---

## Features in Detail

1. **Frontend**:
   - A form to collect project details:
     - Project Name
     - Tagline
     - Description
     - Key Features
     - Domain
     - Tech Stack
     - GitHub URL
     - Image Upload
     - PPT Upload
     - Demo (YouTube URL)
   - Responsive and visually appealing design.

2. **Backend**:
   - Save and retrieve project details.
   - Assign unique IDs for each project.
   - API integration with MongoDB Atlas.

3. **Database**:
   - Store project metadata in MongoDB Atlas.
   - Collections for project data.

---

## Installation Guide

### Prerequisites
- Node.js (v14 or higher)
- Python (3.10 or higher)
- MongoDB Atlas account and cluster setup

---

### Clone the Repository

```bash
git clone https://github.com/Hariharanpugazh/Project-Suite.git
cd Project-Suite
```

---

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

---

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

4. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

5. Set up MongoDB connection:
   - Log in to MongoDB Atlas.
   - Create a database named `project_suite`.
   - Update the `settings.py` file with your MongoDB connection string.

6. Apply database migrations:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. Start the backend server:

   ```bash
   python manage.py runserver
   ```

   The backend will run on `http://127.0.0.1:8000`.

---

## Running the Application

1. Ensure both the frontend and backend servers are running.
2. Open the frontend in your browser (`http://localhost:3000`).
3. Start adding and managing your projects.

---

## File Structure

```
Project-Suite/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── project_suite/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## Future Enhancements

- Add user authentication for personalized project portfolios.
- Implement advanced search and filter options.
- Enhance UI with additional animations and themes.
- Enable project sharing via unique links.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m "Add your message here"`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Notes

- For MongoDB setup, refer to [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/).
- For React and Django documentation:
  - [React Docs](https://reactjs.org/docs/getting-started.html)
  - [Django Docs](https://docs.djangoproject.com/en/stable/)

--- 

Feel free to customize this further based on your preferences!

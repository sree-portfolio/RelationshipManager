# RelationshipManager

A web application for managing relationships, built using Django and React.

## Technologies Used

- Django: Backend framework for building the API and handling data storage.
- React: Frontend library for creating interactive user interfaces.
- PostgreSQL: Database for storing user data and relationships.
- Axios: HTTP client for making API requests between frontend and backend.
- Bootstrap: CSS framework for styling and responsiveness.
- react-graph-vis for graph

## To run the project inside Docker container

1. Install Docker:
  If you don't have Docker already installed on your system.

2. Clone Your Repository:
  Clone the "RelationshipManager" repository:
  git clone https://github.com/your-username/RelationshipManager.git
  cd RelationshipManager
3. Build and Run Docker Containers:
    Inside RelationshipManager directory,
    docker-compose up --build
If all successfully done we can access
Django Backend: Access the Django backend by opening your web browser and navigating to http://localhost:8000.
React Frontend: Access the React frontend by opening your web browser and navigating to http://localhost:3000.

## To run the project without Docker container
If you want to run your Django project without using Docker containers :
1. Download the Git Repositories:
git clone https://github.com/your-username/RelationshipManager.git
  cd RelationshipManager
2. Go to backend
cd relationship_manager_server
3. Install the required Python packages using pip:
pip install -r requirements.txt
4. Apply database migrations:
python manage.py migrate
5. Create a superuser if needed:
python manage.py createsuperuser
6. Start the Django development server:
python manage.py runserver

Setup the Frontend (React):
7.Navigate to the frontend directory:
cd relationship_manager_client
8. Install the required Node.js packages:
npm install
9. Start the frontend development server:

npm start
The frontend development server will be accessible at http://localhost:3000/.
The Django development server will be accessible at http://localhost:8000/.



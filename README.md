# Northcoders Nutshell

Final project for northcoders coding bootcamp.

A student portal SPA designed for use by northcoders students.

The backend: https://github.com/northcoders/student-portal-api  
Try the app: https://northcoders-nutshell.herokuapp.com/

## Installation Instructions

1. Clone the project into your desired folder
2. Make sure you have node and npm installed
3. Install all dependencies:  
   `$ npm i`  
4. To serve the code, run one of the two servers;    
   Run the webpack dev server (served to localhost:8080);  
   `$ npm run dev`  
   Or use the express production server (served to localhost:3000);  
   `$ npm run build`  
   `$ npm start`
5. Run the tests or the linting;  
   `$ npm test`  
   `$ npm run lint`  


## The concept

Our app is a student portal designed for use by future northcoder students and tutors.

It is designed as a ‘single source of truth’ for the course, to allow students to access all their needed resources in one place.  Importantly, to reduce cognitive overheads, resources will be curated and well organised to promote easy access.

The key features will be a timetable view that gathers all resources for a particular sprint or lecture in one place, and a resource collection view (bookmarks) that groups resources by topic, and can be filtered by importance (eg core vs further reading)

Other features may involve slack integration, task tracking and communication tools.

## Technologies Used

* React
* Redux
* React Router
* Amazon s3 client-side upload
* Material-ui
* React-big-calendar
* Markdown parsing
* mocha / chai

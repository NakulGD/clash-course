# Clash Course

## Introduction
Welcome to **Clash Course**, an intuitive web application designed for UBC students to easily manage their course schedules. This application allows users to add courses from UBC, create checklists, and visualize worklists on a weekly timetable in a clean, intuitive, and easy-to-navigate manner. 

## Features
- **Course Search and Selection:** Users can search for UBC courses by course names and add them to their checklist.
- **Conflict Detection:** The application highlights conflicting course sections in red, allowing users to quickly identify and resolve scheduling conflicts.
- **Timetable Visualization:** Users can view their selected courses on a weekly timetable, providing a clear overview of their weekly class schedule.
- **Responsive Design:** Designed to work on both desktop and mobile devices, offering a seamless experience across various platforms.

## Technology Stack
Clash Course is built using the following technologies:
- **Frontend:** React.js for a dynamic and responsive user interface.
- **Backend:** Node.js with Express for server-side logic, including course data scraping from UBC's official course schedule website.
- **Data Scraping:** Cheerio.js and Axios for backend data scraping, enabling real-time course information retrieval.
- **Styling:** CSS for custom styling and layout.
- **Package Management:** npm for managing project dependencies.

## Architecture Overview

The application's structure is divided into several key components for modularity and ease of development:

- **Server (server/index.js):** Handles course data scraping and API requests.
- **App Component (src/App.js):** Serves as the root component that integrates different parts of the application.
- **Components:**
  - **CourseList:** Displays the list of selected courses.
  - **CourseItem:** Represents individual course items in the checklist.
  - **TimeTable:** Visualizes the weekly course schedule.
  - **CheckedCoursesContext:** Manages the state of checked (selected) courses across the application.
- **Styles** (src/Components/Styling): Contains CSS files for styling individual components.

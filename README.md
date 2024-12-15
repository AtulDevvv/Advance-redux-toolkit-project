# Advance-redux-toolkit-project
# Advanced Redux Toolkit Blog Post App 📘

An advanced blog post application built using **Redux Toolkit**, featuring CRUD operations powered by `redux-thunk` and `redux-entity`. This project uses a JSON placeholder API for learning and experimentation with state management concepts.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview
This project is a blog post application designed to explore advanced Redux Toolkit concepts. It integrates:
- `redux-thunk` for managing side effects.
- `redux-entity` for efficient state normalization.
- JSON placeholder API for fetching, adding, and deleting posts.

---

## Features
- 🗂 **CRUD Operations**:
  - Fetch all blog posts from a JSON demo API.
  - Add new blog posts.
  - Delete existing blog posts.
- 🔄 **State Normalization**: Efficiently manage entities with `redux-entity`.
- 🚀 **Redux Thunks**: Asynchronous operations for API calls.
- 🛠 **Local Development**: Runs seamlessly on your local machine for testing and experimentation.

---

## Tech Stack
- **React**: For building the user interface.
- **Redux Toolkit**: Advanced state management.
- **Redux Thunk**: For handling asynchronous actions.
- **Redux Entity**: For normalized state handling.
- **JSON Placeholder API**: Mock backend for data fetching.

---

## Installation
Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/redux-toolkit-blog-post-app.git
   
cd redux-toolkit-blog-post-app

npm install

http://localhost:3000


Project structure

src/
├── components/          # UI components for the app
├── features/            # Redux slices for blog posts
│   ├── postsSlice.js    # Posts reducer and actions
│   ├── postsThunks.js   # Thunks for async operations
│   └── postsEntity.js   # Entity adapter for normalization
├── services/            # API service for interacting with JSON Placeholder
├── App.js               # Main app component
└── index.js             # Entry point for the React app

Contributing

Contributions are welcome! 🎉

    Fork the repository.
    Create a new feature branch:

git checkout -b feature/awesome-feature

Commit your changes:

git commit -m "Add awesome feature"

Push the branch:

    git push origin feature/awesome-feature

    Open a pull request.

License

This project is licensed under the MIT License.
Contact

Maintainer: Atul Mishra
Email: atulkmishra858@gmail.com
GitHub: github.com/AtulDevvv


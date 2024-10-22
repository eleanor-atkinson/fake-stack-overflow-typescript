# Fake Stack Overflow - CS4530 Project

This repository contains my solutions for Individual Project 2 for **CS4530: Fundamentals of Software Engineering** (Fall 2024) at Northeastern University. As part of this project, I contributed to a pre-existing Stack Overflow-like web application by implementing new features, refactoring code, and writing unit tests.

## Project Overview

This project simulates the experience of contributing to a large codebase, enhancing both frontend and backend aspects of a full-stack application. The goal was to explore the challenges of understanding and building upon an unfamiliar repository.

The application is a simplified clone of Stack Overflow, where users can post and answer questions, upvote/downvote responses, and now (with my implementation) add comments and interact in real-time using **Socket.IO**.

## Technologies Used
- **TypeScript**
- **React**
- **Node.js**
- **MongoDB**
- **Socket.IO**
- **Jest** for testing

## Assignment Overview

### Task 1: Refactor Main Components Using React Custom Hooks
- **Objective**: Improve the separation of concerns and reuse logic in components.
- **Actions**: Created custom React hooks such as `useAnswerForm`, `useHeader`, and `useVoteStatus` to handle logic separately from the UI components.
- **Key Files**:
  - `src/hooks/`
  - `src/components/main/`

### Task 2: Implement Comment Feature
- **Objective**: Add the ability to comment on questions and answers.
- **Actions**:
  - Developed the **Comment** schema and implemented comment functionality on both frontend and backend.
  - Modified the UI to allow users to add and view comments on posts.
- **Key Files**:
  - `server/models/comment.ts`
  - `client/src/components/main/commentSection/index.tsx`

### Task 3: Implement Real-time Communication with Socket.IO
- **Objective**: Implement real-time updates for votes and comments.
- **Actions**: Integrated Socket.IO to enable live updates for votes and comments, allowing changes to reflect immediately across all connected clients.
- **Key Files**:
  - `client/src/hooks/useVoteStatus.ts`
  - `server/controller/question.ts`
  - `client/src/components/main/answerPage/index.tsx`

## What I Learned

This project provided valuable learning in:
1. **Navigating a large, pre-existing codebase**: Starting with little knowledge of the project's inner workings, I quickly had to understand its architecture and workflows.
2. **TypeScript**: I deepened my knowledge of TypeScript, learning how to handle types effectively across both the frontend and backend.
3. **Custom React hooks**: Refactoring code to create reusable hooks improved the structure and maintainability of the codebase.
4. **Real-time applications**: Implementing real-time features using Socket.IO gave me valuable experience in handling real-time updates in a web application.
5. **Writing tests**: I utilized mocks, spies, and integration tests with Jest to ensure my new features worked correctly.

## Running the Application

To run the application locally, follow these steps:

### 1. Clone this repository:
   ```bash
   git clone https://github.com/eleanor-atkinson/fake-stackoverflow.git
   cd fake-stackoverflow
   ```

### 2. Install client and server dependencies

    cd client
    npm install

    cd ../server
    npm install

### 3. Set Up Environment Variables

In a `.env` file in the client: 

    REACT_APP_SERVER_URL=http://localhost:8000

In a `.env` file in the server: 

    MONGODB_URI=mongodb://127.0.0.1:27017
    CLIENT_URL=http://localhost:3000
    PORT=8000

### 3. Run the applicaiton

    cd server
    npm start

    cd ../client
    npm start


Access the app at http://localhost:3000.

## Conclusion

This project allowed me to apply my skills in TypeScript, React, and full-stack development while working within a pre-existing repository. I am proud of my contributions and the experience of working in a collaborative, structured environment. Check the repository to explore my solutions and the journey through this project.

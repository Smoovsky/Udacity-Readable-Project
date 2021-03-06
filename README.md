# Overview
My solution of Udacity's Readable project.

Application's state is managed by Redux, and could only be updated if asynchronous call with mock server is successful.

# Update since last code review
1. 404 error is now handled.
2. Modal will be automatically closed upon submission.
3. Comment count is now correctly displayed.
4. Input field of editing is now filled with previously entered data.

# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* Install all dependencies and run dev server
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

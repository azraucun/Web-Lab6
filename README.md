# Assignment 6 - Post Dashboard

This is a simple React app. It gets posts from an API and shows them on the page. You can also search posts by their title.

## How to Run

npm install
npm run dev

## File Organization

- `src/api/postsApi.js` → Gets the posts from the API. There is no React code in this file.
- `src/reducer/postsReducer.js` → The reducer. It changes the state when loading starts, when data comes, or when there is an error.
- `src/components/Post.jsx` → Shows one post (title and body).
- `src/components/PostList.jsx` → Shows all the posts using map.
- `src/components/FilterForm.jsx` → The search input.
- `src/App.jsx` → The main component. It fetches the data and connects everything.
- `src/main.jsx` → Starts the app.

## Challenges I Faced

- This was my first time using React, so understanding useEffect and the dependency array was hard at first.
- I tried to make the useEffect function async, but it is not allowed. I learned to write an async function inside it and call it.
- I didn't understand the difference between useState and useReducer at the beginning. The reducer made more sense after I saw that all the state changes are in one place.
- I had to be careful with the order of the if statements. If I checked "no posts" before "loading", it showed "No posts found." while the posts were still loading.
- At first I wanted to save the filtered posts in state, but I learned that I should calculate them during render instead.
- I learned that fetch doesn't give an error when the server returns an error, so I had to check response.ok myself.
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3002/api" });

// Function to get user profile from local storage
const getUserProfile = () => {
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(profile) : null;
};

API.interceptors.request.use((req) => {
  req.headers.authorization=`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NTEwMzY5OSwiZXhwIjoxNjk1MTA3Mjk5fQ.9sBe7XEKl6Ew6dSH806ZU2lq-lERIamKUS9SQXzicuc`
  // const userProfile = getUserProfile();
  // if (userProfile && userProfile.token) {
  //   req.headers.authorization = `Bearer ${userProfile.token}`;
  // }
  // console.log("Request with Authorization:", req);
  return req;
});
// Axios request error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios request error:", error);
    throw error; // Rethrow the error to be caught by the calling code
  }
);
// Function to get user profile from local storage

export const fetchNotes = () => API.get(`/notes`);

export const signIn = (formData) => API.post("/users/login", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

// src/api.js
const backendMode = parseInt(localStorage.getItem("backendMode") || "1");

export const baseURL =
  backendMode === 1
    ? "https://notebook-hub-backend.onrender.com"
    : "http://localhost:9092";

console.log(baseURL);

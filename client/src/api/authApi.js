import axios from "axios";

const API = "http://localhost:5001/api/auth";

export const signup = (user) => axios.post(`${API}/signup`, user);
export const login = (user) => axios.post(`${API}/login`, user);

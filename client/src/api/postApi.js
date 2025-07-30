import axios from "axios";

const API = "http://localhost:5001/api/posts";

export const getPosts = () => axios.get(API);
export const getPost = (id) => axios.get(`${API}/${id}`);
export const createPost = (post) => axios.post(API, post);
export const deletePost = (id) => axios.delete(`${API}/${id}`);
export const updatePost = (id, post) => axios.put(`${API}/${id}`, post);

export const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

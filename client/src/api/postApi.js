// 📁 src/api/postApi.js
import axios from "axios";

const API = "http://localhost:5001/api/posts";

// 게시글 목록 가져오기
export const getPosts = () => axios.get(API);

// 단일 게시글 가져오기
export const getPost = (id) => axios.get(`${API}/${id}`);

// 게시글 작성
export const createPost = (post) => axios.post(API, post);

// 게시글 삭제
export const deletePost = (id) => axios.delete(`${API}/${id}`);

// 게시글 수정
export const updatePost = (id, post) => axios.put(`${API}/${id}`, post);

import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const PostsContext = createContext();

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts는 PostsProvider 내에서 사용되어야 합니다');
  }
  return context;
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 모든 게시글 조회
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/api/posts');
      if (response.data.success) {
        setPosts(response.data.data);
        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || '게시글을 불러오는데 실패했습니다';
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 특정 게시글 조회
  const fetchPost = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/posts/${id}`);
      if (response.data.success) {
        setCurrentPost(response.data.data);
        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || '게시글을 불러오는데 실패했습니다';
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 게시글 작성
  const createPost = useCallback(async (title, content) => {
    try {
      const response = await axios.post('http://localhost:5001/api/posts', {
        title,
        content
      });
      
      if (response.data.success) {
        // 새 게시글을 목록 맨 앞에 추가
        setPosts(prevPosts => [response.data.data, ...prevPosts]);
        return { success: true, data: response.data.data, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || '게시글 작성에 실패했습니다';
      return { success: false, message };
    }
  }, []);

  // 게시글 수정
  const updatePost = useCallback(async (id, title, content) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/posts/${id}`, {
        title,
        content
      });
      
      if (response.data.success) {
        // 게시글 목록에서 해당 게시글 업데이트
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === parseInt(id) ? { ...post, title, content } : post
          )
        );
        
        // 현재 게시글 업데이트
        if (currentPost && currentPost.id === parseInt(id)) {
          setCurrentPost(prevPost => ({ ...prevPost, title, content }));
        }
        
        return { success: true, data: response.data.data, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || '게시글 수정에 실패했습니다';
      return { success: false, message };
    }
  }, [currentPost]);

  // 게시글 삭제
  const deletePost = useCallback(async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/posts/${id}`);
      
      if (response.data.success) {
        // 게시글 목록에서 해당 게시글 제거
        setPosts(prevPosts => prevPosts.filter(post => post.id !== parseInt(id)));
        
        // 현재 게시글이 삭제된 게시글이면 초기화
        if (currentPost && currentPost.id === parseInt(id)) {
          setCurrentPost(null);
        }
        
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || '게시글 삭제에 실패했습니다';
      return { success: false, message };
    }
  }, [currentPost]);

  // 현재 게시글 초기화
  const clearCurrentPost = useCallback(() => {
    setCurrentPost(null);
  }, []);

  const value = {
    posts,
    currentPost,
    isLoading,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    clearCurrentPost
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
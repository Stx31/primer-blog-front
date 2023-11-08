import React, { useState } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1>My Blog</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const content = e.target.elements.content.value;
        addPost({ id: posts.length + 1, title, content });
        e.target.elements.title.value = '';
        e.target.elements.content.value = '';
      }}>
        <label>Title:</label>
        <input type="text" name="title" />
        <label>Content:</label>
        <textarea name="content" />
        <button type="submit">Add Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete Post</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
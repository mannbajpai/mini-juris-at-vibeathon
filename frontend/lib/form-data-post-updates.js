// Local storage for post updates data
export let postUpdates = [];

// Function to add new post
export function addPost(content) {
  const newPost = {
    id: Date.now(),
    content: content,
    timestamp: new Date().toLocaleString(),
    createdAt: Date.now()
  };
  postUpdates.unshift(newPost); // Add to beginning for latest first
  return newPost;
}

// Function to get all posts
export function getAllPosts() {
  return postUpdates;
}

// Function to delete a post
export function deletePost(id) {
  postUpdates = postUpdates.filter(post => post.id !== id);
}
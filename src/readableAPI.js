const api = 'http://localhost:3001/';
const headers = { 'Authorization': 'whatever-you-want' };

export const getCategories = () => {
  return fetch(`${api}categories`,{headers})
  .then((res) => res.json());
};

export const getPostsByCategories = (category) => {
  return fetch(`${api}${category}/posts`,{ headers })
  .then((res) => res.json());
}

export const getAllPosts = () => {
  return fetch(`${api}posts`, { headers })
  .then(res => res.json());
};

export const newPost = (post) => {
  return fetch(`${api}posts`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(post)
  }).then(res => res.json())
}

export const getPost = (id) => {
  return fetch(`${api}posts/${id}`,{ headers })
  .then(res => res.json());
}

export const votePost = (id, vote) => {
  return fetch(`${api}posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(res => res.json());
}

export const editPost = (id, edit) => {
  return fetch(`${api}posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(edit)
  }).then(res => res.json());
}

export const deletePost = (id) => {
  return fetch(`${api}posts/${id}`, {
    method: 'delete' ,
    headers
  }).then(res => res.json());
}

export const getCommentsByPost = (id) => {
  return fetch(`${api}posts/${id}/comments`, { headers })
  .then(res => res.json());
}

export const newComment = (comment) => {
  return fetch(`${api}comments`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(comment)
  }).then(res => res.json());
}

export const getComment = (id) => {
  return fetch(`${api}comments/${id}`, { headers })
  .then(res => res.json());
}

export const voteComment = (id, vote) => {
  return fetch(`${api}comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(res => res.json());
}

export const editComment = (id, edit) => {
  return fetch(`${api}comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(edit)
  }).then(res => res.json());
}

export const deleteComment = (id) => {
  return fetch(`${api}comments/${id}`, {
    method: 'delete' ,
    headers
  }).then(res => res.json());
}

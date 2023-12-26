document.addEventListener("DOMContentLoaded", function () {
    // Fetch users from an API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const userList = document.querySelector('.user-list');
        users.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = `${user.name} - ${user.email}`;
          listItem.addEventListener('click', () => {
            // When a user is clicked, fetch their posts
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
              .then(response => response.json())
              .then(posts => {
                const postInfo = document.querySelector('.post-info');
                postInfo.innerHTML = ''; // Clear previous posts
                posts.forEach(post => {
                  const postElement = document.createElement('div');
                  postElement.classList.add('post');
                  postElement.innerHTML = `
                    <h4>${post.title}</h4>
                    <p>${post.body}</p>
                  `;
                  postInfo.appendChild(postElement);
                });
              })
              .catch(error => console.error('Error fetching posts:', error));
          });
          userList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  });
  
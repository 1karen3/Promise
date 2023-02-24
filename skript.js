const input = document.querySelector('input');
const btn = document.querySelector('button');
const div = document.querySelector('div');

btn.addEventListener('click', () => {
  const id = input.value;
  if (id < 1 || id > 100) {
    alert('ID must be between 1 and 100');
    return;
  }

  getPost(id)
    .then(post => {
      div.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
    })
    .catch(err => console.log(err));
});

function getPost(id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      const post = JSON.parse(text);
      return post;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
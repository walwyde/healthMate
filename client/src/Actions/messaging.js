import { add_message, delete_message } from './types';

function addMessageToBackend(userId, message) {
  const url = '/api/messages/add'; // Replace with your backend endpoint

  const data = {
    userId: userId,
    message: message,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Handle the response from the backend
    })
    .catch((error) => {
      console.error(error); // Handle any errors that occur during the request
    });
}

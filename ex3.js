const submitBtn = document.querySelector('.submit');
const geolocationBtn = document.querySelector('.geolocation');
const inputMessage = document.getElementById('message');
const messages = document.getElementById('messages');


const chatSocket = new WebSocket('wss://echo-ws-service.herokuapp.com/');

chatSocket.onopen = function(event) {
	console.log('WebSocket connection opened');
}
chatSocket.onmessage = function(event) {
	console.log('Received message:', event.data);
	// выводим полученное сообщение в чат
	appendMessage(event.data);
}

chatSocket.onclose = function(event) {
	console.log('WebSocket connection closed');
};

// функция для добавления сообщения в чат
function appendMessage(message) {
	const p = document.createElement('p');
	p.innerHTML = message;
	messages.appendChild(p);
}

submitBtn.addEventListener('click', function () {
  const message = inputMessage.value;
	if (message) {
		chatSocket.send(message);
		appendMessage(message);
		inputMessage.value = '';
  }
});

geolocationBtn.addEventListener('click', function(){
  if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(position => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			const url = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
			appendMessage(`<a href="${url}" target="_blank">Моя геолокация</a>`);
			chatSocket.send(`Моя геолокация: ${url}`);
		}, error => {
			console.error(error);
			appendMessage('Не удалось получить вашу геолокацию');
		});
	} else {
		appendMessage('Геолокация не поддерживается вашим браузером');
	}
})

  
	


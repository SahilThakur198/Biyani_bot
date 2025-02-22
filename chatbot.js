document.getElementById('chatButton').addEventListener('click', function() {
    const userMessage = document.getElementById('userInput').value;
    
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('chatOutput').innerText = data.response;
    })
    .catch(error => console.error('Error:', error));
});
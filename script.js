document.getElementById('emailForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const emails = document.getElementById('emails').value.split(',').map(email => email.trim());

    const response = await fetch('/send-emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, message, emails })
    });

    const result = await response.json();
    document.getElementById('response').innerText = result.message;
});

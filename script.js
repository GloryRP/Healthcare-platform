document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example validation - replace with actual authentication logic
    if (username && password) {
        // Replace this with actual authentication logic
        console.log('Username:', username);
        console.log('Password:', password);

        // Redirect to med.html after successful login
        window.location.href = 'med.html';
    } else {
        alert('Please enter both username and password.');
    }
});

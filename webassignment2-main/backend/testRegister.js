const fetch = global.fetch || require('node-fetch');

(async () => {
    const randomStr = Math.random().toString(36).substring(7);
    const user = {
        name: `Test User ${randomStr}`,
        email: `test${randomStr}@example.com`,
        password: 'password123',
        username: `user${randomStr}`
    };

    try {
        const res = await fetch('http://localhost:5002/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', data);
    } catch (err) {
        console.error('Error:', err.message);
    }
})();

import http from 'http';
import fs from 'fs';

const data = JSON.stringify({ email: 'admin@example.com', password: 'password123' });

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => fs.writeFileSync('output.json', body));
});

req.on('error', (e) => console.error('Error:', e));
req.write(data);
req.end();

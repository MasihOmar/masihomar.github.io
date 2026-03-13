const fs = require('fs');
const http = require('http');

const boundary = '----WebKitFormBoundary7pLn5d6v8UBGupAR';
const payload = `--${boundary}\r\nContent-Disposition: form-data; name="name"\r\n\r\nTest User\r\n--${boundary}\r\nContent-Disposition: form-data; name="email"\r\n\r\ntest@example.com\r\n--${boundary}\r\nContent-Disposition: form-data; name="message"\r\n\r\nHello World\r\n--${boundary}--`;

const options = {
  hostname: 'forminit.com',
  port: 80, // fallback
  path: '/f/3nei5xqixsk',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': Buffer.byteLength(payload),
    'Accept': 'application/json'
  }
};

try {
  const req = require('https').request({
    ...options,
    port: 443
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Response:', res.statusCode, data));
  });
  req.on('error', e => console.error(e));
  req.write(payload);
  req.end();
} catch (e) {
  console.log(e);
}

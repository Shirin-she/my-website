const https = require("https");
const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const parts = [
  Buffer.from('--' + boundary + '\r\n'),
  Buffer.from('Content-Disposition: form-data; name="name"\r\n\r\nTest Product\r\n'),
  Buffer.from('--' + boundary + '\r\n'),
  Buffer.from('Content-Disposition: form-data; name="price"\r\n\r\n100\r\n'),
  Buffer.from('--' + boundary + '\r\n'),
  Buffer.from('Content-Disposition: form-data; name="category"\r\n\r\nTest\r\n'),
  Buffer.from('--' + boundary + '\r\n'),
  Buffer.from('Content-Disposition: form-data; name="description"\r\n\r\nDesc\r\n'),
  Buffer.from('--' + boundary + '\r\n'),
  Buffer.from('Content-Disposition: form-data; name="stock"\r\n\r\n10\r\n'),
  Buffer.from('--' + boundary + '\r\n'),
  Buffer.from('Content-Disposition: form-data; name="image"; filename="test.png"\r\nContent-Type: image/png\r\n\r\nPNGDATA\r\n'),
  Buffer.from('--' + boundary + '--\r\n')
];
const postData = Buffer.concat(parts);
const req = https.request({
  hostname: 'sample-e-1.onrender.com',
  path: '/product/addproduct',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': postData.length,
  },
}, (res) => {
  console.log('status', res.statusCode);
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
});
req.on('error', (err) => console.error('err', err.message));
req.write(postData);
req.end();

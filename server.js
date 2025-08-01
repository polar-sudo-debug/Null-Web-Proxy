const express = require('express');
const proxyMiddleware = require('./proxy');

const app = express();
const PORT = process.env.PORT || 3000;

// Use the proxy middleware
app.use('/proxy', proxyMiddleware);

// Serve the HTML file
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});

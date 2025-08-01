const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy middleware options
const options = {
    target: 'https://discord.com/', // Change this to the target website
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // Modify headers if needed
        proxyReq.setHeader('origin', 'null');
        proxyReq.setHeader('x-requested-with', 'XMLHttpRequest');
    },
    onProxyRes: (proxyRes, req, res) => {
        // Modify response headers if needed
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    onError: (err, req, res) => {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
    }
};

// Create the proxy
const exampleProxy = createProxyMiddleware(options);

// Use the proxy
app.use('/proxy', exampleProxy);

// Serve the HTML file
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});

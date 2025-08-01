const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyOptions = {
    target: 'https://discord.com', // Change this to the target website
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

module.exports = createProxyMiddleware(proxyOptions);

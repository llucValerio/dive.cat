const PROXY_CONFIG = [
    {
        context: [
            "/auth/*",
            "/dive/*",
            "/dive/user/*"
        ],
        target: "http://localhost:5015",
        secure: false,
        "logLevel": "debug"
    }
]

module.exports = PROXY_CONFIG;
module.exports = {
    apps: [{
        name: "zipurl",
        script: "./bin/www",
        env_development: {
            NODE_ENV: "development",
            LOG_LEVEL: "debug",
        },
        env_production: {
            NODE_ENV: "production",
            LOG_LEVEL: "http",
        },
    }]
}

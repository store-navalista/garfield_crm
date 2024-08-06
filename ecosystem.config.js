module.exports = {
  apps: [{
    name: "crm_frontend",
    script: "./build/main.js",
    cwd: "/var/apps/garfield_crm",
    watch: false,
    env: {
      NODE_ENV: "production",
    }
  }]
};

const path = require('path');

module.exports = {
  // Other configuration options...
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Make sure we include our custom 404 page in the build
      config.resolve.alias['next/error'] = path.join(__dirname, 'pages/_error.tsx');
    }
    return config;
  },
};
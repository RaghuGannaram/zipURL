function getEnvironment() {
  return process.env.NODE_ENV || 'development';
}

module.exports = getEnvironment;
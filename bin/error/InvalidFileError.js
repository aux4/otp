class InvalidFileError extends Error {
  constructor(path) {
    super(`Invalid file: ${path}`);
  }
}

module.exports = InvalidFileError;

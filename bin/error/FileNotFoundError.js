class FileNotFoundError extends Error {
  constructor(path) {
    super(`File not found: ${path}`);
  }
}

module.exports = FileNotFoundError;

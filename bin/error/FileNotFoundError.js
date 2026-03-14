class FileNotFoundError extends Error {
  constructor(path) {
    super(`File not found: ${path}`);
  }
}

export default FileNotFoundError;

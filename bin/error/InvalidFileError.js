class InvalidFileError extends Error {
  constructor(path) {
    super(`Invalid file: ${path}`);
  }
}

export default InvalidFileError;

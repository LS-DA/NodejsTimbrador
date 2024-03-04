function getFilePath(file) {
  const filePath = file.path;
  const fileSplit = filePath.split("/");

  return `${fileSplit[fileSplit.length - 2]}/${
    fileSplit[fileSplit.length - 1]
  }`;
}

module.exports = {
  getFilePath,
};

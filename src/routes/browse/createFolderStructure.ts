export function separateFilesFromPaths(data) {
  return new Promise((resolve) => {
    if (data) {
      const paths = [];
      data.forEach((el) => {
        el.path = el.path.split('/').filter(String);
        paths.push(el.path.toString());
      });
      const uniquePaths = [...new Set(paths)];
      resolve(uniquePaths);
    }
  });
}

export function createFolderStructure(paths) {
  return new Promise((resolve) => {
    const folderStructure = [];
    const pathsToArray = paths.map((el) => el.split(','));
    // Main folders
    const mainFolderPaths = pathsToArray.map((el) => {
      return el.length > 0 && el.slice(0, 1).toString();
    });
    const uniqueMainFolderPaths = [...new Set(mainFolderPaths)];
    const mainFolderPathsToArray = uniqueMainFolderPaths.map((el) => (el as string).split(','));

    mainFolderPathsToArray.forEach(
      (el) =>
        el.length === 1 &&
        folderStructure.push({
          id: folderStructure.length,
          folderName: el,
          folders: [],
          files: [],
        })
    );
    // Second level folders
    const secondLevelPaths = pathsToArray.map((el) => {
      return el.length > 1 && el.slice(0, 2).toString();
    });
    const uniqueSecondLevelPaths = [...new Set(secondLevelPaths)].filter(function (el) {
      return el !== false;
    });
    const secondLevelPathsToArray = uniqueSecondLevelPaths.map((el) => (el as string).split(','));
    secondLevelPathsToArray.forEach((el) => {
      if (el.length > 1) {
        const index = folderStructure.findIndex((element) => element.folderName.toString() === el[0]);
        index > -1 &&
          folderStructure[index].folders.push({
            id: folderStructure[index].folders.length,
            folderName: el[1],
            folders: [],
            files: [],
          });
      }
    });
    // Third level folders
    pathsToArray.forEach((el) => {
      if (el.length === 3) {
        const mainFolderIndex = folderStructure.findIndex((element) => element.folderName.toString() === el[0]);
        const secondLevelFolderIndex = folderStructure[mainFolderIndex].folders.findIndex(
          (element) => element.folderName.toString() === el[1]
        );
        mainFolderIndex > -1 &&
          folderStructure[mainFolderIndex].folders[secondLevelFolderIndex].folders.push({
            id: folderStructure[mainFolderIndex].folders[secondLevelFolderIndex].folders.length,
            folderName: el[2],
            folders: [],
            files: [],
          });
      }
    });
    resolve(folderStructure);
  });
}

export function sortFiles(response, folderStructure) {
  return new Promise((resolve) => {
    // Push files to main folders
    response.forEach((el) => {
      if (el.path.length === 1) {
        const index = folderStructure.findIndex((element) => element.folderName.toString() === el.path.toString());
        folderStructure[index].files.push({
          createdAt: el.createdAt,
          id: el.id,
          name: el.name,
          size: el.size,
          path: el.path.toString(),
        });
      }
    });
    // Push files to second level folders
    response.forEach((el) => {
      if (el.path.length === 2) {
        const mainFolderIndex = folderStructure.findIndex((element) => element.folderName.toString() === el.path[0]);
        const secondLevelFolderIndex = folderStructure[mainFolderIndex].folders.findIndex(
          (element) => element.folderName.toString() === el.path[1]
        );
        folderStructure[mainFolderIndex].folders[secondLevelFolderIndex].files.push({
          createdAt: el.createdAt,
          id: el.id,
          name: el.name,
          size: el.size,
          path: el.path.toString(),
        });
      }
    });
    // Push files to third level folders
    response.forEach((el) => {
      if (el.path.length === 3) {
        const mainFolderIndex = folderStructure.findIndex((element) => element.folderName.toString() === el.path[0]);
        const secondLevelFolderIndex = folderStructure[mainFolderIndex].folders.findIndex(
          (element) => element.folderName.toString() === el.path[1]
        );
        const thirdLevelFolderIndex = folderStructure[mainFolderIndex].folders[
          secondLevelFolderIndex
        ].folders.findIndex((element) => element.folderName.toString() === el.path[2]);
        folderStructure[mainFolderIndex].folders[secondLevelFolderIndex].folders[thirdLevelFolderIndex].files.push({
          createdAt: el.createdAt,
          id: el.id,
          name: el.name,
          size: el.size,
          path: el.path.toString(),
        });
      }
    });
    resolve(folderStructure);
  });
}

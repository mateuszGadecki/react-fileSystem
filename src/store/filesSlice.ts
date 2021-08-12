import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFiles = createAsyncThunk('files/getFiles', async () => {
  return fetch('https://60c9caa8772a760017204706.mockapi.io/api/v1/files').then((response) => response.json());
});

const initialState = {
  files: [],
  uniquePaths: [],
  folderStructure: [],
  folderStructureWithFiles: [],
  loading: false,
};

const filesSlice = createSlice({
  name: 'files',
  initialState: initialState,
  reducers: {
    separateFilesFromPaths(state) {
      if (state.files) {
        const files = state.files;
        const paths = [];
        files.forEach((el) => {
          el.path = el.path.split('/').filter(String);
          paths.push(el.path.toString());
        });
        const uniquePaths = [...new Set(paths)];
        state.uniquePaths = uniquePaths;
        filesSlice.caseReducers.createFolderStructure(state);
      }
    },
    createFolderStructure(state) {
      const paths = state.uniquePaths;
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
      state.folderStructure = folderStructure;
      filesSlice.caseReducers.sortFiles(state);
    },
    sortFiles(state) {
      const files = state.files;
      const folderStructure = state.folderStructure;
      // Push files to main folders
      files.forEach((el) => {
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
      files.forEach((el) => {
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
      files.forEach((el) => {
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
      state.folderStructureWithFiles = folderStructure;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFiles.fulfilled, (state, { payload }) => {
      state.files = payload;
      filesSlice.caseReducers.separateFilesFromPaths(state);
    });
    builder.addCase(getFiles.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default filesSlice.reducer;

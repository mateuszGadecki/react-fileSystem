import { useState, useEffect, useCallback } from 'react';

import Layout from '../../components/layout/layout.component';
import classes from './browse.module.css';

const BrowseRoute = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [folderTree, setFolderTree] = useState(null);
  const separateFilesFromPaths = useCallback((data) => {
    if (data) {
      const paths = [];
      data.forEach((el) => {
        el.path = el.path.split('/').filter(String);
        paths.push(el.path.toString());
      });
      const uniquePaths = [...new Set(paths)];
      createFolderStructure(uniquePaths);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('https://60c9caa8772a760017204706.mockapi.io/api/v1/files')
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        separateFilesFromPaths(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [separateFilesFromPaths]);

  function createFolderStructure(paths) {
    const folderStructure = [];
    const pathsToArray = paths.map((el) => el.split(','));
    // Main folders
    pathsToArray.forEach(
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
    setFolderTree(folderStructure);
  }

  folderTree && console.log(folderTree);
  return (
    <Layout>
      <div>
        <h1>Browse route</h1>
        <div className={classes.x}>{loading ? 'loading..' : 'items'}</div>
      </div>
    </Layout>
  );
};

export default BrowseRoute;

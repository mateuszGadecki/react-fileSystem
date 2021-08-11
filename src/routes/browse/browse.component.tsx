import { useState, useEffect } from 'react';
import { sortFiles } from './sortFiles';
import { separateFilesFromPaths, createFolderStructure } from './createFolderStructure';
import Layout from '../../components/layout/layout.component';
import classes from './browse.module.css';

const BrowseRoute = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [fileTree, setFileTree] = useState(null);

  async function createStructure(response) {
    const paths = await separateFilesFromPaths(response);
    const folderStructure = await createFolderStructure(paths);
    const completeFolderStructure = await sortFiles(response, folderStructure);
    setFileTree(completeFolderStructure);
  }

  useEffect(() => {
    setLoading(true);
    fetch('https://60c9caa8772a760017204706.mockapi.io/api/v1/files')
      .then((response) => response.json())
      .then((response) => {
        createStructure(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  fileTree && console.log(fileTree);

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

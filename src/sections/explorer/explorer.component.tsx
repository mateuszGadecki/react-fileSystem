import classes from './explorer.module.css';

import Folder from '../../components/folder/folder.component';

const Explorer = ({ fileTree }): JSX.Element => {
  const renderFolders = () => {
    return (
      fileTree &&
      fileTree.map((el) => <Folder key={el.id} folderName={el.folderName} files={el.files} folders={el.folders} />)
    );
  };

  return (
    <div className={classes.explorer}>
      <div className={classes.explorer__nav}></div>
      <div className={classes.explorer__content}>{renderFolders()}</div>
    </div>
  );
};

export default Explorer;

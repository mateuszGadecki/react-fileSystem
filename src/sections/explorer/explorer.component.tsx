import Folder from '../../components/folder/folder.component';
import File from '../../components/file/file.component';

import classes from './explorer.module.css';

const Explorer = ({ fileTree }): JSX.Element => {
  const renderFolders = () => {
    if (fileTree.folders) {
      return fileTree.folders.map((el) => (
        <Folder key={el.id} folderName={el.folderName} files={el.files} folders={el.folders} />
      ));
    } else {
      return (
        fileTree &&
        fileTree.map((el) => <Folder key={el.id} folderName={el.folderName} files={el.files} folders={el.folders} />)
      );
    }
  };
  const renderFiles = () => {
    if (fileTree.files) {
      return (
        fileTree &&
        fileTree.files.map((el) => <File key={el.id} createdAt={el.createdAt} size={el.size} fileName={el.name} />)
      );
    } else {
      return null;
    }
  };

  return (
    <div className={classes.explorer}>
      <div className={classes.explorer__nav}></div>
      <div className={classes.explorer__content}>
        {renderFolders()}
        {renderFiles()}
      </div>
    </div>
  );
};

export default Explorer;

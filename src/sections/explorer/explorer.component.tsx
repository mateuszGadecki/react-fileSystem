import Folder from '../../components/folder/folder.component';
import File from '../../components/file/file.component';
import BackArrow from '../../images/backArrow.svg';
import ForwardArrow from '../../images/forwardArrow.svg';
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
      <div className={classes.explorer__nav}>
        <div className={classes.explorer__navArrows}>
          <div>
            <img className={classes.explorer__arrow} src={BackArrow} alt="backArrowIcon" />
          </div>
          <div>
            <img className={classes.explorer__arrow} src={ForwardArrow} alt="backArrowIcon" />
          </div>
        </div>
      </div>
      <div className={classes.explorer__content}>
        {renderFolders()}
        {renderFiles()}
      </div>
    </div>
  );
};

export default Explorer;

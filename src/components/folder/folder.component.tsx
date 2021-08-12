import classes from './folder.module.css';
import { useDispatch } from 'react-redux';
import { updateCurrentView } from '../../store/filesSlice';
import FolderIcon from '../../images/folderIcon.png';

const Folder = ({ folderName, files, folders }): JSX.Element => {
  const dispatch = useDispatch();

  const currentView = {
    folderName: folderName,
    files: files,
    folders: folders,
  };
  const updateViewHandler = () => {
    dispatch(updateCurrentView(currentView));
  };
  return (
    <div className={classes.folder} onClick={updateViewHandler}>
      <div className={classes.folder__iconWrapper}>
        <img src={FolderIcon} className={classes.folder__icon} alt="folderIcon" />
      </div>
      <p className={classes.folder__name}>{folderName}</p>
    </div>
  );
};

export default Folder;

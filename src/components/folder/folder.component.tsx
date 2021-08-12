import classes from './folder.module.css';

import FolderIcon from '../../images/folderIcon.png';

const Folder = ({ folderName, files, folders }): JSX.Element => {
  console.log(files);
  console.log(folders);
  return (
    <div className={classes.folder}>
      <div className={classes.folder__iconWrapper}>
        <img src={FolderIcon} className={classes.folder__icon} alt="folderIcon" />
      </div>
      <p className={classes.folder__name}>{folderName}</p>
    </div>
  );
};

export default Folder;

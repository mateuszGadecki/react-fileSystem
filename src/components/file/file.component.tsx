import classes from './file.module.css';

import FileIcon from '../../images/fileIcon.png';

const File = ({ fileName, createdAt, size }): JSX.Element => {
  const showFileInfoHandler = () => {
    alert(`File name: ${fileName}\nCreated at: ${createdAt}\nSize: ${size}`);
  };
  return (
    <div onClick={showFileInfoHandler} className={classes.file}>
      <div className={classes.file__iconWrapper}>
        <img src={FileIcon} className={classes.file__icon} alt="fileIcon" />
      </div>
      <p className={classes.file__name}>{fileName}</p>
    </div>
  );
};

export default File;

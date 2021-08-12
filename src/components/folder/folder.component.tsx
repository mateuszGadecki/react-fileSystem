import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDoubleClick from 'use-double-click';
import { selectFiles } from '../../store/store';
import { updateCurrentView, updateHistoryView } from '../../store/filesSlice';
import FolderIcon from '../../images/folderIcon.png';

import classes from './folder.module.css';

const Folder = ({ folderName, files, folders }): JSX.Element => {
  const [activeFolder, setActiveFolder] = useState(false);
  const dispatch = useDispatch();
  const filesState = useSelector(selectFiles);
  const currentView = {
    folderName: folderName,
    files: files,
    folders: folders,
  };

  const SingleFolder = () => {
    const buttonRef = useRef();

    useDoubleClick({
      onSingleClick: () => {
        setActiveFolder(true);
        setTimeout(function () {
          setActiveFolder(false);
        }, 1000);
      },
      onDoubleClick: () => {
        setActiveFolder(false);
        dispatch(updateHistoryView(filesState.currentView));
        dispatch(updateCurrentView(currentView));
      },
      ref: buttonRef,
      latency: 250,
    });

    return (
      <div className={classes.folder} ref={buttonRef}>
        <div className={activeFolder ? classes.folder__iconWrapperActive : classes.folder__iconWrapper}>
          <img src={FolderIcon} className={classes.folder__icon} alt="folderIcon" />
        </div>
        <p className={activeFolder ? classes.folder__nameActive : classes.folder__name}>{folderName}</p>
      </div>
    );
  };

  return <SingleFolder />;
};

export default Folder;

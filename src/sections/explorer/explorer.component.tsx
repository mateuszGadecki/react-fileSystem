import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFiles } from '../../store/store';
import {
  updateCurrentView,
  deleteLastHistoryItem,
  updateForwardView,
  deleteLastForwardItem,
  updateHistoryView,
} from '../../store/filesSlice';
import Folder from '../../components/folder/folder.component';
import File from '../../components/file/file.component';
import BackArrow from '../../images/backArrow.svg';
import ForwardArrow from '../../images/forwardArrow.svg';
import classes from './explorer.module.css';

const Explorer = ({ fileTree }): JSX.Element => {
  const [activeBackArrow, setActiveBackArrow] = useState(false);
  const [activeForwardArrow, setActiveForwardArrow] = useState(false);
  const dispatch = useDispatch();
  const filesState = useSelector(selectFiles);

  useEffect(() => {
    filesState.historyView.length > 0 ? setActiveBackArrow(true) : setActiveBackArrow(false);
    filesState.forwardView.length > 0 ? setActiveForwardArrow(true) : setActiveForwardArrow(false);
  }, [filesState.historyView.length, filesState.forwardView.length]);

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

  const goBackHandler = () => {
    if (filesState.historyView.length > 0) {
      dispatch(updateForwardView(filesState.currentView));
      filesState.historyView.length > 1
        ? dispatch(updateCurrentView(filesState.historyView[filesState.historyView.length - 1]))
        : dispatch(updateCurrentView(filesState.historyView[0]));
      dispatch(deleteLastHistoryItem());
    }
  };

  const goForwardHandler = () => {
    if (filesState.forwardView.length > 0) {
      dispatch(updateHistoryView(filesState.currentView));
      filesState.forwardView.length > 1
        ? dispatch(updateCurrentView(filesState.forwardView[filesState.forwardView.length - 1]))
        : dispatch(updateCurrentView(filesState.forwardView[0]));
      dispatch(deleteLastForwardItem());
    }
  };

  return (
    <div className={classes.explorer}>
      <div className={classes.explorer__nav}>
        <div className={classes.explorer__navArrows}>
          <div onClick={goBackHandler}>
            <img
              className={activeBackArrow ? classes.explorer__arrowActive : classes.explorer__arrow}
              src={BackArrow}
              alt="backArrowIcon"
            />
          </div>
          <div onClick={goForwardHandler}>
            <img
              className={activeForwardArrow ? classes.explorer__arrowActive : classes.explorer__arrow}
              src={ForwardArrow}
              alt="backArrowIcon"
            />
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

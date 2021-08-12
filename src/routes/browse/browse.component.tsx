import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../store/filesSlice';
import { selectFiles } from '../../store/store';
import Layout from '../../components/layout/layout.component';
import Explorer from '../../sections/explorer/explorer.component';
import Loader from '../../components/loader/loader.component';
import classes from './browse.module.css';

const BrowseRoute = (): JSX.Element => {
  const dispatch = useDispatch();
  const files = useSelector(selectFiles);
  useEffect(() => {
    dispatch(getFiles());
  }, []);

  return (
    <Layout>
      <div className={classes.browse}>
        {files.loading ? <Loader /> : <Explorer fileTree={files.folderStructureWithFiles} />}
      </div>
    </Layout>
  );
};

export default BrowseRoute;

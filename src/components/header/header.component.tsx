import { NavLink } from 'react-router-dom';

import classes from './header.module.css';

const Header = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <div>
        <NavLink className={classes.header__logo} to="/">
          File System
        </NavLink>
      </div>
      <nav className={classes.header__nav}>
        <NavLink className={classes.header__navItem} activeClassName={classes.active} to="/browse">
          Browse
        </NavLink>
        <NavLink className={classes.header__navItem} activeClassName={classes.active} to="/viz">
          Viz
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;

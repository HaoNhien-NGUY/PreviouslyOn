import React from 'react';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import { useFloatNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/float';
import { Link } from "react-router-dom";

export const FloatNavigationMenuStyle = React.memo(
  function FloatNavigationMenu() {
    return (
      <>
        <NavMenu gutter={1} useStyles={useFloatNavigationMenuStyles} style={{ fontSize: '1.4rem' }}>
          <NavItem active>
            <Link to="/">Acceuil</Link>
          </NavItem>
          <NavItem>
            <Link to="/shows">Séries</Link>
          </NavItem>
          <NavItem>
            <Link to="/movies">Films</Link>
          </NavItem>
          <NavItem>Ma liste</NavItem>
        </NavMenu>
      </>
    );
  }
);
export default FloatNavigationMenuStyle;
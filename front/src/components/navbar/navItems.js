import React from 'react';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import { useFloatNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/float';
import { Link, useLocation } from "react-router-dom";

export const FloatNavigationMenuStyle = React.memo(
  function FloatNavigationMenu() {
    const location = useLocation();

    return (
      <>
        <NavMenu gutter={1} useStyles={useFloatNavigationMenuStyles} style={{ fontSize: '1.5rem' }}>
          <NavItem as={Link} to="/"  active={location.pathname === '/'}>Accueil</NavItem>
          <NavItem as={Link} to="/shows" active={location.pathname === '/shows'}>Séries</NavItem>
          <NavItem as={Link} to="/movies" active={location.pathname === '/movies'}>Films</NavItem>
          <NavItem>Ma liste</NavItem>
        </NavMenu>
      </>
    );
  }
);
export default FloatNavigationMenuStyle;
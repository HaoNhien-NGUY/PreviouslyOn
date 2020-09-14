import React from 'react';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import { useFloatNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/float';

export const FloatNavigationMenuStyle = React.memo(
  function FloatNavigationMenu() {
    return (
      <>
        <NavMenu gutter={1} useStyles={useFloatNavigationMenuStyles} style={{ fontSize: '1.4rem' }}>
          <NavItem active>Acceuil</NavItem>
          <NavItem>Séries</NavItem>
          <NavItem>Films</NavItem>
          <NavItem>Ma liste</NavItem>
        </NavMenu>
      </>
    );
  }
);
export default FloatNavigationMenuStyle;
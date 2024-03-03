import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ThemeButton from './ThemeButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';

export default function SideMenu( {MenuState , updateMenuState, ColorValue, updateBgColor} ) {
    const DrawerList = (
      <Box sx={{ width: 200 , backgroundColor: ColorValue.bgColor}} role="presentation" >
        <List >
              <ListItemButton>
                <ListItemIcon sx={{ color: ColorValue.fColor }}>
                  <ThemeButton ColorValue={ColorValue} updateBgColor={updateBgColor}/>
                </ListItemIcon>
              </ListItemButton>
        </List>
      </Box>
    );
  
    return (
      <div>
        <Button onClick={() => {updateMenuState(true)}}><MenuIcon /></Button>
        <Drawer open={MenuState} onClose={() => {updateMenuState(false)}} sx={{ '& .MuiDrawer-paper': { backgroundColor: ColorValue.bgColor} }} >
          <Button onClick={() => { updateMenuState(false); }}><SwipeLeftIcon/></Button>
          {DrawerList}
        </Drawer>
      </div>
    );
}
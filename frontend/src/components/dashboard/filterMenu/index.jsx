/* eslint-disable react/prop-types */
import { Fade, Menu, MenuItem } from "@mui/material";

const FilterMenu = ({ anchorEl, settingSortType, handleClose, menuItems }) => {
  const open = Boolean(anchorEl);
  return (
    <Menu
      dir="rtl"
      anchorEl={anchorEl}
      onClose={handleClose}
      onClick={handleClose}
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      TransitionComponent={Fade}
    >
      {menuItems.map((item, i) => {
        return (
          <MenuItem onClick={() => settingSortType(item.sortType)} key={i}>
            {item.text}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default FilterMenu;

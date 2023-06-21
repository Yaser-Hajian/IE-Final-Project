/* eslint-disable react/prop-types */
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({
  startSearch,
  value,
  onChange,
  placeholder = "جست و جوی یک درس بر اساس اسم",
}) => {
  return (
    <Paper
      variant="outlined"
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
    >
      <InputBase
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            startSearch();
          }
        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={startSearch}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;

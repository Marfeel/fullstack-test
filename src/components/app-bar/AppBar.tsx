import React, { useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const StyledAppBar = styled(MuiAppBar)`
  padding: 12px 30px;
  flex-direction: row;
`;

export type AppBarProps = {
  title: string;
};

export const AppBar = ({ title }: AppBarProps) => {
  const [selectedValue, setSelectedValue] = useState<number | string>("today");
  const navigate = useNavigate();

  const location = useLocation();
  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const newValue = event.target.value as string;
    setSelectedValue(newValue);
    // Update the URL query parameter
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("timeframe", newValue);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  return (
    <StyledAppBar>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, alignSelf: "center" }}
      >
        {title}
      </Typography>
      <FormControl variant="outlined" sx={{ minWidth: 120, marginLeft: 2 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          value={selectedValue}
          onChange={handleSelectChange}
          sx={{ color: "inherit" }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"today"}>Today</MenuItem>
          <MenuItem value={"yesterday"}>Yesterday</MenuItem>
          <MenuItem value={"last week"}>Last 7 days</MenuItem>
          <MenuItem value={"this month"}>This month</MenuItem>
        </Select>
      </FormControl>
    </StyledAppBar>
  );
};

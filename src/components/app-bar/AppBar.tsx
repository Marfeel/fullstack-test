import React, { useState, useMemo } from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StyledAppBar = styled(MuiAppBar)`
  padding: 12px 30px;
  flex-direction: row;
`;

export type AppBarProps = {
  title: string;
};

export enum Timeframe {
  Today = "today",
  Yesterday = "yesterday",
  LastWeek = "last week",
  ThisMonth = "this month",
}

export const AppBar = ({ title }: AppBarProps) => {
  const [selectedValue, setSelectedValue] = useState<Timeframe | string>(
    Timeframe.Today
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("timeframe", newValue);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const selectOptions = useMemo(
    () =>
      Object.values(Timeframe).map((value) => (
        <MenuItem key={value} value={value}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </MenuItem>
      )),
    []
  );

  return (
    <StyledAppBar>
      <Typography
        component={Link}
        to="/"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, alignSelf: "center", textDecoration: "none" }}
      >
        {title}
      </Typography>
      <FormControl variant="outlined" sx={{ minWidth: 120, marginLeft: 2 }}>
        <Select
          labelId="timeframe-select-label"
          id="timeframe-select"
          value={selectedValue}
          onChange={handleSelectChange}
          sx={{ color: "inherit" }}
          displayEmpty
          inputProps={{ "aria-label": "Timeframe" }}
        >
          {selectOptions}
        </Select>
      </FormControl>
    </StyledAppBar>
  );
};

import { useState, useMemo, useEffect } from "react";
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

export enum Time {
  Today = "today",
  Yesterday = "yesterday",
  LastWeek = "last 7 days",
  ThisMonth = "this month",
}

export const AppBar = ({ title }: AppBarProps) => {
  const [selectedTime, setSelectedTime] = useState<Time | string>(Time.Today);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setSelectedTime(newValue);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("time", newValue);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const time = search.get("time");

    if (time && Object.values(Time).includes(time as Time)) {
      setSelectedTime(time);
    } else {
      setSelectedTime(Time.Today);
      search.set("time", Time.Today);
      navigate(`${location.pathname}?${search.toString()}`);
    }
  }, [location.search, location.pathname, navigate]);

  const selectOptions = useMemo(
    () =>
      Object.values(Time).map((value) => (
        <MenuItem key={value} value={value}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </MenuItem>
      )),
    []
  );

  const homeUrl = `/` + (selectedTime ? `?time=${selectedTime}` : "");
  return (
    <StyledAppBar>
      <Typography
        component={Link}
        to={homeUrl}
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
          value={selectedTime}
          onChange={handleTimeChange}
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

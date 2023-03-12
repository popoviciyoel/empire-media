import "./header.css";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Paper from "@mui/material/Paper";
import useSocket from "../../hooks/useSocket";

const Header = () => {
  const { time, last, change, percentChange } = useSocket();

  console.log("rendered");

  return time && last && change && percentChange ? (
    <Paper className="header" elevation={12}>
      <div>
        <h1>Apple Inc.</h1>
        <p className="lastPublishedDate">As of: {time}</p>
      </div>
      <div>
        <div className="price">
          {percentChange > 0 ? (
            <ArrowDropUpIcon size={"500px"} style={{ color: "green" }} />
          ) : (
            <ArrowDropDownIcon size={"500px"} style={{ color: "red" }} />
          )}
          <h1>{last}</h1>
        </div>
        <div
          className="change"
          style={percentChange > 0 ? { color: "green" } : { color: "red" }}
        >
          <h2>{change}</h2>
          <h2>({percentChange}%)</h2>
        </div>
      </div>
    </Paper>
  ) : (
    <div>Loading Data</div>
  );
};

export default Header;

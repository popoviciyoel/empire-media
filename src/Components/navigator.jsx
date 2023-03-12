import "./navigator.css";

import HistoryTable from "./historyTable/historyTable";
import StockChart from "./chart/chart";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { calculatePercentage } from "../utils";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

const TabNavigator = () => {
  const [navTab, setNavTab] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("1 Minute");
  const { data, isLoading, error } = useFetch(selectedPeriod);
  console.log(data);

  let content;

  if (isLoading) {
    content = <div>Data is loading</div>;
  } else if (error) {
    content = <div>{error}</div>;
  } else {
    content = (
      <>
        {navTab === 0 && <StockChart data={data} />}
        {navTab === 1 && <HistoryTable data={calculatePercentage(data)} />}
      </>
    );
  }

  return (
    <div>
      <Tabs
        value={navTab}
        onChange={(_, value) => setNavTab(value)}
        aria-label="basic tabs example"
      >
        <Tab label="Overview" />
        <Tab label="History" />
      </Tabs>
      <Tabs
        value={selectedPeriod}
        onChange={(_, value) => setSelectedPeriod(value)}
      >
        <Tab className="selectorPeriod" label="1 Minute" value={"1 Minute"} />
        <Tab className="selectorPeriod" label="5 Minutes" value={"5 Minutes"} />
        <Tab className="selectorPeriod" label="1 Hour" value={"1 Hour"} />
        <Tab className="selectorPeriod" label="1 Week" value={"1 Week"} />
      </Tabs>
      {content}
    </div>
  );
};

export default TabNavigator;

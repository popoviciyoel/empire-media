import { dateComparator, formatDataToPercentage } from "./../../utils";

import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 150,
    sortComparator: dateComparator,
  },
  { field: "high", headerName: "High", width: 90 },
  { field: "low", headerName: "Low", width: 90 },
  {
    field: "open",
    headerName: "Open",
    width: 90,
  },
  {
    field: "close",
    headerName: "Close",
    width: 90,
  },
  {
    field: "change",
    headerName: "%Change",
    width: 90,
    valueFormatter: ({ value }) => `${formatDataToPercentage(value)}%`,
  },
];

const HistoryTable = ({ data, selectedPeriod }) => {
  let rows;
  if (selectedPeriod === "1 Week") {
    // use this to display date format
    rows = data.map((row, index) => {
      return {
        id: index,
        date: row.StartDate,
        high: row.High,
        low: row.Low,
        open: row.Open,
        close: row.Close,
        change: row.change,
      };
    });
  } else {
    // use this to display time formate
    rows = data.map((row, index) => {
      return {
        id: index,
        date: row.StartTime,
        high: row.High,
        low: row.Low,
        open: row.Open,
        close: row.Close,
        change: row.change,
      };
    });
  }

  return (
    <Box
      sx={{
        height: "400px",
        width: "100%",
        "& .increase": {
          color: "green",
        },
        "& .decrease": {
          color: "red",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getCellClassName={(params) => {
          if (params.field !== "change" || params.value == null) {
            return "";
          }
          return params.value > 0
            ? "increase"
            : params.value < 0
            ? "decrease"
            : "none";
        }}
        hideFooter
      />
    </Box>
  );
};

export default HistoryTable;

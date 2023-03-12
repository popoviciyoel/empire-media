import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { formatDataToPercentage } from "./../../utils";

const columns = [
  {
    field: "date",
    headerName: "Date",
    width: 150,
    valueFormatter: ({ value }) => {
      const time = new Date(value);
      return (
        time.toLocaleTimeString("en-US", { timeStyle: "short" }) +
        `(${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()})`
      );
    },
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

const HistoryTable = ({ data }) => {
  const rows = data.map((row, index) => {
    return {
      id: index,
      date: row.Date,
      high: row.High,
      low: row.Low,
      open: row.Open,
      close: row.Close,
      change: row.change,
    };
  });
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
        // pageSize={5}
        // rowsPerPageOptions={[5]}
      />
    </Box>
  );
};

export default HistoryTable;

import { useQuery } from "react-query";

function configureTimeParameters(selectedPeriod) {
  let period;
  let precision;
  // Get NY local time, since trading is based on ET time zone, and create dates to set TimeFrame to display Data
  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const endDate = new Date(currentDate);
  const startDate = new Date(currentDate);
  // Check if it's the weekend, 6 represents saturday, 0 is monday, if it it set date to Friday to retrieve last open market transactions
  if (startDate.getDay() == 0) {
    startDate.setDate(startDate.getDate() - 2);
    endDate.setDate(endDate.getDate() - 2);
    endDate.setMinutes(0);
    endDate.setHours(16);
  }
  if (startDate.getDay() == 6) {
    startDate.setDate(startDate.getDate() - 1);
    endDate.setDate(endDate.getDate() - 1);
    endDate.setMinutes(0);
    endDate.setHours(16);
  }
  // if the hours of trading is inactive when user on setTimeZone to last active trading session
  if (
    startDate.getHours() < 9 ||
    (startDate.getHours() == 9 && startDate.getMinutes() < 30) ||
    startDate.getHours() >= 16
  ) {
    endDate.setMinutes(0);
    endDate.setHours(16);
  }

  switch (selectedPeriod) {
    case "1 Minute":
      period = "1";
      precision = "Minutes";
      startDate.setHours(endDate.getHours() - 1);
      startDate.setMinutes(endDate.getMinutes());
      break;
    case "5 Minutes":
      period = "5";
      precision = "Minutes";
      startDate.setHours(endDate.getHours() - 1);
      startDate.setMinutes(endDate.getMinutes());
      break;
    case "1 Hour":
      period = "1";
      precision = "Hour";
      startDate.setDate(endDate.getDate() - 1);
      startDate.setHours(endDate.getHours() - 1);
      startDate.setMinutes(endDate.getMinutes());

      break;
    case "1 Week":
      period = "1";
      precision = "Week";
      startDate.setMonth(endDate.getMonth() - 1);
      startDate.setHours(endDate.getHours() - 1);
      startDate.setMinutes(endDate.getMinutes());
      break;
    default:
      console.log("This is an error");
  }

  return { period, precision, startDate, endDate };
}

const useFetch = (selectedPeriod) => {
  const { period, precision, startDate, endDate } =
    configureTimeParameters(selectedPeriod);

  // build URL with proper parameters
  const RESOURCE = `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=${
    startDate.getMonth() + 1
  }/${startDate.getDate()}/${startDate.getFullYear()}%20${startDate.getHours()}:${startDate.getMinutes()}&EndTime=${
    endDate.getMonth() + 1
  }/${endDate.getDate()}/${endDate.getFullYear()}%20${endDate.getHours()}:${endDate.getMinutes()}&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume,ChartBars.UTCOffset`;

  // use react query to cache api response, cache becomes invaidated just incase data becomes stale
  const { isLoading, error, data, isFetching } = useQuery(selectedPeriod, () =>
    fetch(RESOURCE).then((res) => res.json())
  );
  return { isLoading, data, error };
};

export default useFetch;

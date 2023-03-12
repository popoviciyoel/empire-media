import { TrimDates, configureTimeParameters } from "../utils";

import { useQuery } from "react-query";

const useFetch = (selectedPeriod) => {
  const { period, precision, startDate, endDate } =
    configureTimeParameters(selectedPeriod);

  // build URL with proper parameters
  const RESOURCE = `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=${
    startDate.getMonth() + 1
  }/${startDate.getDate()}/${startDate.getFullYear()}%20${startDate.getHours()}:${startDate.getMinutes()}&EndTime=${
    endDate.getMonth() + 1
  }/${endDate.getDate()}/${endDate.getFullYear()}%20${endDate.getHours()}:${endDate.getMinutes()}&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume,ChartBars.UTCOffset`;
  console.log(RESOURCE);
  // use react query to cache api response, cache becomes invaidated just incase data becomes stale
  let { isLoading, error, data } = useQuery(selectedPeriod, () =>
    fetch(RESOURCE).then((res) => res.json())
  );

  return { isLoading, data, error };
};

export default useFetch;

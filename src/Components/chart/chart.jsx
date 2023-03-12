import { useEffect } from "react";

const StockChart = ({ data }) => {
  useEffect(() => {
    // Once Component mounted, meaning div is rendered then we can access html element

    window.Highcharts.setOptions({
      lang: {
        rangeSelectorZoom: null,
      },
    });

    window.Highcharts.stockChart("chartHistory", {
      rangeSelector: {
        allButtonsEnabled: false,
        buttons: [],
        inputEnabled: false,
      },
      time: {
        timezone: "America/New_York",
      },
      series: [
        {
          name: "AAPL",
          type: "area",
          threshold: null,
          data: data.map((data) => {
            const time = new Date(data.StartDate + " " + data.StartTime);
            return [
              time.getTime() - time.getTimezoneOffset() * 60 * 1000,
              data.Close,
            ];
          }),
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
      },
    });
  }, [data]);

  return <div id="chartHistory"></div>;
};

export default StockChart;

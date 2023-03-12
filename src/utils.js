export function formatDataToPercentage(data) {
  return Math.round(data * 100) / 100;
}

export function calculatePercentage(data) {
  return data.map((data) => {
    return {
      ...data,
      change: ((data.Close - data.Open) / data.Close) * 100,
    };
  });
}

export function configureTimeParameters(selectedPeriod) {
  let period;
  let precision;
  // Get NY local time, since trading is based on ET time zone, and create dates to set TimeFrame to display Data
  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const endDate = new Date(currentDate);
  const startDate = new Date(currentDate);
  // Check if it's the weekend, 6 represents saturday, 0 is monday, if it it set date to Friday to retrieve last open market transactions
  if (startDate.getDay() === 0) {
    startDate.setDate(startDate.getDate() - 2);
    endDate.setDate(endDate.getDate() - 2);
    endDate.setMinutes(0);
    endDate.setHours(16);
  }
  if (startDate.getDay() === 6) {
    startDate.setDate(startDate.getDate() - 1);
    endDate.setDate(endDate.getDate() - 1);
    endDate.setMinutes(0);
    endDate.setHours(16);
  }
  // if the hours of trading is inactive when user on setTimeZone to last active trading session
  if (
    startDate.getHours() < 9 ||
    (startDate.getHours() === 9 && startDate.getMinutes() < 30) ||
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
      period = "168";
      precision = "Hours";
      startDate.setMonth(endDate.getMonth() - 1);
      startDate.setHours(endDate.getHours() - 1);
      startDate.setMinutes(endDate.getMinutes());
      break;
    default:
      console.log("This is an error");
  }

  return { period, precision, startDate, endDate };
}

export const dateComparator = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return date1 - date2;
};

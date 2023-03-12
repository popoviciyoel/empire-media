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

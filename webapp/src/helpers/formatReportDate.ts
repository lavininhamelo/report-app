export const formatReportDate = (date?: string) => {
  if (!date) {
    return "Proccessing...";
  }

  const dates = new Date(date).toLocaleDateString("en-US")
  const time = new Date(date).toLocaleTimeString("en-US")
  return `${dates} ${time}`;
};

export default formatReportDate;

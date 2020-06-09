import Days from "./Day";
const formatDate = (dateStr) => {
  if (typeof dateStr === "undefined") {
    return;
  }

  const date = new Date(dateStr);

  return `${Days[date.getDay()]}, 
       ${date.getDate()}/${date.getMonth()}/${(date.getFullYear() + "").slice(
    -2
  )}, `;
};

const formatTime = (timeStr) => {
  const time = new Date(timeStr);
  var hours = time.getHours();
  var mins = time.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  return `${hours}:${mins}`;
};

export { formatDate, formatTime };

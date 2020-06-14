import Days from "./Day";
const formatDate = (dateStr) => {
  if (typeof dateStr === "undefined") {
    return;
  }

  const date = new Date(dateStr);
  return `${Days[date.getDay()]}, ${date.getDate()}/${date.getMonth()}/${(
    date.getFullYear() + ""
  ).slice(-2)}`;
};

const formatTime = (timeStr) => {
  const time = new Date(timeStr);
  var hours = time.getHours();
  var mins = time.getMinutes();
  var ampm = "";
  if (hours < 12) {
    // hours = "0" + hours;
    ampm = "am";
  } else {
    ampm = "pm";
    if (hours > 12) {
      hours -= 12;
    }
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  return `${hours}:${mins} ${ampm}`;
};

export { formatDate, formatTime };

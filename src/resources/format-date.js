exports.formatDate = function (dateString) {
  const date = new Date(dateString);
  return date
    .toLocaleString("ru", { day: "numeric", month: "long" })
    .replace(" ", "\xa0");
};

exports.formatPhoneNumber = function (phoneNumber) {
  const match = phoneNumber.match(/^(\+\d)(\d{3})(\d{3})(\d{2})(\d{3})$/);
  if (match) {
    return `${match[1]}\xA0${match[2]}\xA0${match[3]}-${match[4]}-${match[5]}`;
  }

  return null;
};

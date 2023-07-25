const validate = new JustValidate(".application-form");
validate.addField("#name", [
  {
    rule: "required",
    errorMessage: "Укажите Ваше имя",
  },
  {
    rule: "customRegexp",
    value: /^\s*[а-яё]+([ -][а-яё]+)*\s*$/gi,
    errorMessage: "Недопустимый формат",
  },
]);
validate.addField("#email", [
  {
    rule: "required",
    errorMessage: "Укажите Ваш email",
  },
  {
    rule: "email",
    errorMessage: "Недопустимый формат",
  },
]);

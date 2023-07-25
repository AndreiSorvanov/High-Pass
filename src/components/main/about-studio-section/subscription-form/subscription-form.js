const validate = new JustValidate(".subscription-form");
validate.addField("#subscription-email", [
  {
    rule: "required",
    errorMessage: "Укажите Ваш email",
  },
  {
    rule: "email",
    errorMessage: "Недопустимый формат",
  },
]);

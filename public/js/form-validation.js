function Validator(options) {
  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement =
        inputElement.parentElement.querySelector('.form-message');
      if (inputElement) {
        inputElement.onblur = function () {
          var errorMessage = rule.test(inputElement.value);
          if (errorMessage) {
            errorElement.innerHTML = errorMessage;
          }
        };
      }
    });
  }
}
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value.trim()) return undefined;
      else return 'Vui lòng nhập trường này';
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function () {},
  };
};

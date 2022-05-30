const appError = require('../utils/appError');
const passwordRule =
  /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]).*$/;

const passwordCheck = (password, next) => {
  if (!passwordRule.test(password)) {
    return appError(
      400,
      '密碼強度不足，請確認是否具至少有 1 個數字， 1 個大寫英文， 1 個小寫英文',
      next,
    );
  }
};

const randomPassword = () => {
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const num = '1234567890';
  const specials = ',.!@#$%^&*/|][-_=+?><;:~`{}()';
  const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
  let opt, choose;
  let pass = '';
  for (let i = 0; i < 8; i++) {
    opt = Math.floor(Math.random() * options.length);
    choose = Math.floor(Math.random() * options[opt].length);
    pass = pass + options[opt][choose];
    options.splice(opt, 1);
  }
  return pass;
};

module.exports = { passwordRule, passwordCheck, randomPassword };
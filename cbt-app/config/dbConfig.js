/**
 * DBの接続先情報の記述
 * @author Kazuki Enomoto
 */

const DATABASE = "cbtapp";
const URL = "mongodb://localhost:27017/cbtapp";
const OPTIONS = {
  family:4
};

module.exports={
  DATABASE,
  URL,
  OPTIONS
};
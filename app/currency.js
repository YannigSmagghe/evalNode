const fs = require('fs');
const path = require('path');

const getCurrencies = (callback) => {
    fs.readFile(path.join(__dirname, '..', 'helpers', 'forex.json'), 'utf-8', (error, content) => {
        if (error) {
            callback(error);

            return;
        }

        callback(null, JSON.parse(content));
    });
};

const calcul = (value, currency, callback) => {
      getCurrencies((error, content) => {
          if (error) {
              throw error;
          }

          currency = currency.toUpperCase();

          if (!content.rates.hasOwnProperty(currency)) {
              callback(new Error('Unable to find currency "'+currency+'"'));

              return;
          }

          callback(null, parseFloat(value) * parseFloat(content.rates[currency]));
      })
};

module.exports = {
    "getCurrencies": getCurrencies,
    "calcul": calcul,
};
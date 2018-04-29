import OpenPay from 'openpay';

import config from '../server.config';

let openPay;

if (config.OPENPAY.IS_PRODUCTION) {
    openPay = new OpenPay(config.OPENPAY.PRODUCTION.MERCHANT_ID, config.OPENPAY.PRODUCTION.PRIVATE_KEY);
    openPay.setProductionReady(config.OPENPAY.IS_PRODUCTION);
} else {
    openPay = new OpenPay(config.OPENPAY.SANDBOX.MERCHANT_ID, config.OPENPAY.SANDBOX.PRIVATE_KEY);
    openPay.setProductionReady(config.OPENPAY.IS_PRODUCTION);
}

export default openPay;
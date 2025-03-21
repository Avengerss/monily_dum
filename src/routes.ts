import { Router } from 'express';
import { convertFromFiatToCrypto, convertFromCryptoToFiat } from './controllers/conversionController';
import { getCurrencies, getCryptos, getCryptoPrices } from './controllers/currencyController';

const router = Router();

// Conversion Routes
router.post('/convert/fiat-to-crypto', convertFromFiatToCrypto);
router.post('/convert/crypto-to-fiat', convertFromCryptoToFiat);

// Get Available Currencies and Cryptos
router.get('/currencies', getCurrencies);
router.get('/cryptos', getCryptos);

router.get('/crypto-prices', getCryptoPrices);

export default router;

import { Request, Response } from 'express';
import { getCryptoRates } from '../services/coinGeckoService';

export const convertFromFiatToCrypto = async (req: Request, res: Response): Promise<void> => {
    const { amount, currency } = req.body;
    try{
    if (!amount || !currency) {
        throw new Error('Amount and currency are required');
    }

    const rates = await getCryptoRates(currency);
    if (!rates) {
        throw new Error('Failed to fetch crypto rates');
    }

    const result: { [key: string]: string } = {};
    Object.entries(rates).forEach(([crypto, price]) => {
        result[crypto] = (amount / price[currency]).toFixed(6);
    });

    res.json({
        amount,
        currency,
        result
    });}catch(err){
        console.log(err);
    }
};

export const convertFromCryptoToFiat = async (req: Request, res: Response): Promise<void> => {
    const { amount, crypto, currency } = req.body;
    if (!amount || !crypto || !currency) {
        throw new Error('Amount, crypto, and currency are required'); 
    }

    const rates = await getCryptoRates(currency);
    if (!rates || !rates[crypto]) {
        throw new Error('Failed to fetch crypto rates');
    }

    const convertedValue = (amount * rates[crypto][currency]).toFixed(2);

    res.json({
        amount,
        crypto,
        currency,
        convertedValue
    });
};

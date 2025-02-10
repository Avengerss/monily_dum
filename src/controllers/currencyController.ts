import { Request, Response } from 'express';
import { getAvailableCurrencies, getAvailableCryptos } from '../services/coinGeckoService';

export const getCurrencies = async (req: Request, res: Response): Promise<void> => {
    const currencies = getAvailableCurrencies();
    res.json({ currencies });
};

export const getCryptos = async (req: Request, res: Response): Promise<void> => {
    const cryptos = getAvailableCryptos();
    res.json({ cryptos });
};

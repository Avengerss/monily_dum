import { Request, Response } from 'express';
import { getAvailableCurrencies, getAvailableCryptos, getCryptoMarketData } from '../services/coinGeckoService';

export const getCurrencies = async (req: Request, res: Response): Promise<void> => {
    const currencies = getAvailableCurrencies();
    res.json({ currencies });
};

export const getCryptos = async (req: Request, res: Response): Promise<void> => {
    const cryptos = getAvailableCryptos();
    res.json({ cryptos });
};

export const getCryptoPrices = async (req: Request, res: Response): Promise<void> => {
    const { currency } = req.body;

    if (!currency) {
        res.status(400).json({ error: 'Currency parameter is required' });
        return;
    }

    try {
        const marketData = await getCryptoMarketData(currency);
        if (!marketData) {
            throw new Error('Failed to fetch crypto market data');
        }

        res.json({
            currency,
            data: marketData.map((crypto) => ({
                name: crypto.id,
                price: crypto.current_price,
                price_change_24h: crypto.price_change_percentage_24h,
                volume_24h: crypto.total_volume,
                market_cap: crypto.market_cap
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

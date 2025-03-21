import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const API_MARKET_URL = 'https://api.coingecko.com/api/v3/coins/markets';

type CryptoSymbols = 'bitcoin' | 'ethereum' | 'tether' | 'binancecoin' | 'solana' | 'cardano' | 'polkadot' | 'ripple' | 'dogecoin' | 'litecoin' | 'chainlink';
type FiatCurrencies = 'ngn' | 'zar' | 'kes' | 'ghs' | 'egp' | 'mad' | 'usd';

interface CryptoRates {
    [key: string]: { [currency: string]: number };
}

interface CryptoMarketData {
    id: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    market_cap: number;
}


export const getCryptoRates = async (currency: FiatCurrencies): Promise<CryptoRates | null> => {
    try {
        const response = await axios.get<CryptoRates>(API_URL, {
            params: {
                ids: 'bitcoin,ethereum,tether,binancecoin,solana,cardano,polkadot,ripple,dogecoin,litecoin,chainlink',
                vs_currencies: currency
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto rates:', error);
        return null;
    }
};

export const getAvailableCurrencies = (): FiatCurrencies[] => {
    return ['ngn', 'zar', 'kes', 'ghs', 'egp', 'mad'];
};

export const getAvailableCryptos = (): CryptoSymbols[] => {
    return ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'solana', 'cardano','polkadot','ripple','dogecoin','litecoin','chainlink'];
};

export const getCryptoMarketData = async (currency: FiatCurrencies): Promise<CryptoMarketData[] | null> => {
    try {
        const response = await axios.get<CryptoMarketData[]>(API_MARKET_URL, {
            params: {
                vs_currency: currency,
                ids: 'bitcoin,ethereum,tether,binancecoin,solana,cardano,polkadot,ripple,dogecoin,litecoin,chainlink,sui',
                order: 'market_cap_desc',
                per_page: 12,
                page: 1,
                sparkline: false
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto market data:', error);
        return null;
    }
};

import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

type CryptoSymbols = 'bitcoin' | 'ethereum' | 'tether' | 'binancecoin' | 'solana' | 'cardano' | 'polkadot' | 'ripple' | 'dogecoin' | 'litecoin' | 'chainlink';
type FiatCurrencies = 'ngn' | 'zar' | 'kes' | 'ghs' | 'egp' | 'mad';

interface CryptoRates {
    [key: string]: { [currency: string]: number };
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

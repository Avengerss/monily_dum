import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Register routes
app.use('/api', routes);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api`);
});


// import axios from 'axios';
// import inquirer from 'inquirer';
// import chalk from 'chalk';

// const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

// type CryptoSymbols = 'bitcoin' | 'ethereum' | 'tether' | 'binancecoin';
// type FiatCurrencies = 'ngn' | 'zar' | 'kes' | 'ghs' | 'egp' | 'mad';

// interface CryptoRates {
//     [key: string]: { [currency: string]: number };
// }

// // Function to fetch crypto prices in the selected fiat currency
// async function getCryptoRates(currency: FiatCurrencies): Promise<CryptoRates | null> {
//     try {
//         const response = await axios.get<CryptoRates>(API_URL, {
//             params: {
//                 ids: 'bitcoin,ethereum,tether,binancecoin,solana,cardano,polkadot,ripple,dogecoin,litecoin,chainlink',
//                 vs_currencies: currency
//             }
//         });

//         return response.data;
//     } catch (error) {
//         console.error(chalk.red('❌ Error fetching exchange rates:', error));
//         return null;
//     }
// }

// // Function to handle user input and conversion
// async function convertCurrencyToCrypto(): Promise<void> {
//     const { amount, currency } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'amount',
//             message: '💵 Enter the amount in your local currency:',
//             validate: (value: string) => (!isNaN(Number(value)) && Number(value) > 0) ? true : 'Please enter a valid number'
//         },
//         {
//             type: 'list',
//             name: 'currency',
//             message: '🌍 Select your African currency:',
//             choices: ['ngn', 'zar', 'kes', 'ghs', 'egp', 'mad']
//         }
//     ]);

//     const rates = await getCryptoRates(currency);
//     if (!rates) return;

//     console.log(chalk.blueBright(`\n💰 Amount: ${chalk.bold(amount)} ${currency.toUpperCase()}\n`));

//     Object.entries(rates).forEach(([crypto, price]) => {
//         const convertedValue = (Number(amount) / price[currency]).toFixed(6);
//         console.log(chalk.green(`🔹 ${crypto.toUpperCase()}: ${convertedValue}`));
//     });

//     console.log(chalk.yellow('\n🚀 Rates fetched from CoinGecko.'));
// }

// // Run the conversion function
// convertCurrencyToCrypto();

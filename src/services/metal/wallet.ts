import axios from 'axios';

const METAL_API_BASE_URL = 'https://api.metal.build';
const API_KEY = import.meta.env.VITE_METAL_API_KEY;

interface WalletData {
  id: string;
  address: string;
  totalValue: number;
  tokens: {
    address: string;
    balance: string;
    name: string;
    symbol: string;
  }[];
}

export const getOrCreateWallet = async (username: string): Promise<WalletData> => {
  try {
    const response = await axios.put(
      `${METAL_API_BASE_URL}/holder/${username}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting/creating wallet:', error);
    throw new Error('Failed to get or create wallet');
  }
};

export const getWalletBalance = async (address: string): Promise<WalletData> => {
  try {
    const response = await axios.get(
      `${METAL_API_BASE_URL}/holder/${address}`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw new Error('Failed to fetch wallet balance');
  }
};

export const getWalletTransactions = async (address: string): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${METAL_API_BASE_URL}/holder/${address}/transactions`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    throw new Error('Failed to fetch wallet transactions');
  }
}; 
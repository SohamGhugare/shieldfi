import axios from 'axios';

const METAL_API_BASE_URL = 'https://api.metal.build';
const API_KEY = import.meta.env.VITE_METAL_API_KEY;

interface TokenResponse {
  id: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

interface TokenHolder {
  address: string;
  balance: string;
}

export const createToken = async (name: string, symbol: string, decimals: number = 18): Promise<TokenResponse> => {
  try {
    const response = await axios.post(
      `${METAL_API_BASE_URL}/token`,
      {
        name,
        symbol,
        decimals,
        network: 'base'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating token:', error);
    throw new Error('Failed to create token');
  }
};

export const getTokenDetails = async (tokenAddress: string): Promise<TokenResponse> => {
  try {
    const response = await axios.get(
      `${METAL_API_BASE_URL}/token/${tokenAddress}`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching token details:', error);
    throw new Error('Failed to fetch token details');
  }
};

export const getTokenHolders = async (tokenAddress: string): Promise<TokenHolder[]> => {
  try {
    const response = await axios.get(
      `${METAL_API_BASE_URL}/token/${tokenAddress}/holders`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching token holders:', error);
    throw new Error('Failed to fetch token holders');
  }
};

export const distributeTokens = async (
  tokenAddress: string,
  recipientAddress: string,
  amount: string
): Promise<{ success: boolean; txHash: string }> => {
  try {
    const response = await axios.post(
      `${METAL_API_BASE_URL}/token/${tokenAddress}/distribute`,
      {
        recipient: recipientAddress,
        amount,
        network: 'base'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error distributing tokens:', error);
    throw new Error('Failed to distribute tokens');
  }
}; 
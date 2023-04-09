import { BigNumber, ethers, Signer } from 'ethers';
import { TransactionRequest } from '@ethersproject/providers';

interface CustomConnector {
  signer: Signer;
  getAddress(): Promise<string>;
  sendTransaction(tx: TransactionRequest): Promise<string>;
  signMessage(message: string | Uint8Array): Promise<string>;
  getBalance(): Promise<BigNumber>;
  getTransactionCount(): Promise<number>;
  connectAccount(): Promise<any>;
}

class CustomEthereumWalletConnector implements CustomConnector {
  signer: Signer;
  constructor(signer: Signer) {
    this.signer = signer;
  }

  async getAddress(): Promise<string> {
    return await this.signer.getAddress();
  }

  async sendTransaction(tx: TransactionRequest): Promise<string> {
    const result = await this.signer.sendTransaction(tx);
    return result.hash;
  }

  async signMessage(message: string | Uint8Array): Promise<string> {
    return await this.signer.signMessage(message);
  }

  async getBalance(): Promise<BigNumber> {
    return await this.signer.getBalance();
  }

  async getTransactionCount(): Promise<number> {
    return await this.signer.getTransactionCount();
  }

  async connectAccount(): Promise<any> {
    const self = this;
    const acc = {
      async getAddress(): Promise<string> {
        return self.getAddress();
      },
      async signMessage(m: string): Promise<string> {
        return self.signMessage(m);
      },
      async sendTransaction(tx: any): Promise<string> {
        return self.sendTransaction(tx);
      },
      async getBalance(): Promise<BigNumber> {
        return self.getBalance();
      },
      async getTransactionCount(): Promise<number> {
        return self.getTransactionCount();
      },
    };
    return acc;
  }
}

export default CustomEthereumWalletConnector;

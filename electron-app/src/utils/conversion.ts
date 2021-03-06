import {
  ApiBalance,
  ApiBalances,
  ApiEthBalances,
  AssetBalances,
  Balances,
  EthBalances
} from '@/model/blockchain-balances';

import { bigNumberify } from '@/utils/bignumbers';
import transform from 'lodash/transform';
import { ApiAssetBalances } from '@/typing/types';

export function convertEthBalances(apiBalances: ApiEthBalances): EthBalances {
  const balances: EthBalances = {};
  for (const account in apiBalances) {
    if (!Object.prototype.hasOwnProperty.call(apiBalances, account)) {
      continue;
    }

    const api_balance = apiBalances[account];
    const accountAssets = transform(
      api_balance.assets,
      (result: Balances, value: ApiBalance, key: string) => {
        result[key] = {
          amount: bigNumberify(value.amount as string),
          usdValue: bigNumberify(value.usd_value as string)
        };
      },
      {}
    );

    balances[account] = {
      assets: accountAssets,
      totalUsdValue: bigNumberify(api_balance.total_usd_value as string)
    };
  }
  return balances;
}

export function convertBalances(apiBalances: ApiBalances): Balances {
  const balances: Balances = {};
  for (const account in apiBalances) {
    if (!Object.prototype.hasOwnProperty.call(apiBalances, account)) {
      continue;
    }
    balances[account] = {
      amount: bigNumberify(apiBalances[account].amount as string),
      usdValue: bigNumberify(apiBalances[account].usd_value as string)
    };
  }
  return balances;
}

export function convertAssetBalances(
  assetBalances: ApiAssetBalances
): AssetBalances {
  const assets: AssetBalances = {};

  for (const asset in assetBalances) {
    if (!Object.prototype.hasOwnProperty.call(assetBalances, asset)) {
      continue;
    }

    const data = assetBalances[asset];
    assets[asset] = {
      amount: bigNumberify(data.amount),
      usdValue: bigNumberify(data.usd_value)
    };
  }
  return assets;
}

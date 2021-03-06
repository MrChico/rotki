import { defaultAccountingSettings, defaultSettings } from '@/data/factories';
import { AccountingSettings, GeneralSettings } from '@/typing/types';

export interface SessionState {
  newAccount: boolean;
  logged: boolean;
  username: string;
  settings: GeneralSettings;
  accountingSettings: AccountingSettings;
  premium: boolean;
  premiumSync: boolean;
  nodeConnection: boolean;
  syncConflict: string;
}

export const defaultState: () => SessionState = () => ({
  newAccount: false,
  logged: false,
  username: '',
  settings: defaultSettings(),
  accountingSettings: defaultAccountingSettings(),
  premium: false,
  premiumSync: false,
  nodeConnection: false,
  syncConflict: ''
});

export const state: SessionState = defaultState();

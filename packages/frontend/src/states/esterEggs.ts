
import { atom } from 'recoil';

export const fantasyState = atom<boolean>({
  key: 'fantasyState',
  default: false,
});

export const scienceFictionState = atom<boolean>({
  key: 'scienceFictionState',
  default: false,
});

export const mysteryState = atom<boolean>({
  key: 'mysteryState',
  default: false,
});


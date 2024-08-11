import { atom } from 'recoil';


export const bookOpenStatus = atom<boolean>({
  key: 'bookOpenStatus',
  default: false,
});

import { atom } from 'recoil';


export const addPageState = atom<number>({
  key: 'addPageState',
  default: 1,
});
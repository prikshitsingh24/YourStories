import { atom } from 'recoil';


export const savedTitleState = atom<string>({
  key: 'savedTitleState',
  default: "",
});

export const savedStoryState = atom<string>({
  key: 'savedStoryState',
  default: '',
});

export const savedGenreState = atom<string>({
    key: 'savedGenreState',
    default: '',
  });


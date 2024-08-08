import { atom } from 'recoil';


export const titleState = atom<string>({
  key: 'titleState',
  default: "",
});

export const storyState = atom<string>({
  key: 'storyState',
  default: '',
});

export const wholeStoryState = atom({
  key: 'wholeStoryState',
  default: {
    story: '',
    question: '',
    option: []
  },
});


export const questionState = atom<string>({
  key: 'questionState',
  default: '',
});


export const optionsState = atom<string[]>({
  key: 'optionsState',
  default: [],
});
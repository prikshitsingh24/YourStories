import { atom } from 'recoil';


export const titleState = atom<string>({
  key: 'titleState',
  default: "",
});

export const storyState = atom<string>({
  key: 'storyState',
  default: '',
});

export const wholeStoryState = atom<any>({
  key: 'wholeStoryState',
  default: {
    story: '',
    question: '',
    option: []
  },
});

export const continueStoryState = atom<string>({
  key: 'continueStoryState',
  default: '',
});

export const continueQuestionState = atom<string>({
  key: 'continueQuestionState',
  default: '',
});

export const continueOptionsState = atom<any[]>({
  key: 'continueOptionsState',
  default: [],
});


export const questionState = atom<string>({
  key: 'questionState',
  default: '',
});


export const optionsState = atom<string[]>({
  key: 'optionsState',
  default: [],
});
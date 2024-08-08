import {atom} from 'recoil';

export const bookFlipState = atom({
    key: 'bookFlipState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });


  export const bookFlipOnOptionState = atom({
    key: 'bookFlipOnOptionState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });


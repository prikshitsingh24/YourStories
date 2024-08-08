
import { DropdownData } from '../types/dropdownTypes';

export const dropdownData: DropdownData[] = [
  {
    title: 'Genre',
    options: [
      { label: 'Fantasy', value: 'fantasy' },
      { label: 'Science Fiction', value: 'sci-fi' },
      { label: 'Mystery', value: 'mystery' },
      // Add more options as needed
    ],
  },
  {
    title: 'Setting',
    options: [
      { label: 'Urban', value: 'urban' },
      { label: 'Rural', value: 'rural' },
      { label: 'Futuristic', value: 'futuristic' },
      // Add more options as needed
    ],
  },
  {
    title: 'Length',
    options: [
      { label: 'Short', value: 'short' },
      { label: 'Medium', value: 'medium' },
      { label: 'Long', value: 'long' },
      // Add more options as needed
    ],
  },
  {
    title: 'Age',
    options: [
      { label: 'Children', value: 'children' },
      { label: 'Teens', value: 'teens' },
      { label: 'Adults', value: 'adults' },
      // Add more options as needed
    ],
  },
];

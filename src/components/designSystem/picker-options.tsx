export const CSSColors = [
  { value: 'inherit', displayName: 'inherit' },
  { value: 'black', displayName: 'black' },
  { value: 'white', displayName: 'white' },
  { value: 'slategray', displayName: 'slate gray' },
  { value: 'gray', displayName: 'gray' },
  { value: 'brown', displayName: 'brown' },
  { value: 'pink', displayName: 'pink' },
  { value: 'red', displayName: 'red' },
  { value: 'darkorange', displayName: 'dark orange' },
  { value: 'orange', displayName: 'orange' },
  { value: 'gold', displayName: 'amber' },
  { value: 'yellow', displayName: 'yellow' },
  { value: 'lime', displayName: 'lime' },
  { value: 'lightgreen', displayName: 'light green' },
  { value: 'green', displayName: 'green' },
  { value: 'teal', displayName: 'teal' },
  { value: 'cyan', displayName: 'cyan' },
  { value: 'lightblue', displayName: 'light blue' },
  { value: 'blue', displayName: 'blue' },
  { value: 'indigo', displayName: 'indigo' },
  { value: 'rebeccapurple', displayName: 'dark purple' },
  { value: 'purple', displayName: 'purple' },
];

export const TailwindColors = [
  { value: 'inherit', displayName: 'inherit' },
  { value: 'black', displayName: 'Black' },
  { value: 'white', displayName: 'White' },
  { value: 'blue-gray', displayName: 'Slate' },
  { value: 'gray', displayName: 'Gray' },
  { value: 'brown', displayName: 'Brown' },
  { value: 'pink', displayName: 'Pink' },
  { value: 'red', displayName: 'Red' },
  { value: 'deep-orange', displayName: 'Deep Orange' },
  { value: 'orange', displayName: 'Orange' },
  { value: 'amber', displayName: 'Amber' },
  { value: 'yellow', displayName: 'Yellow' },
  { value: 'lime', displayName: 'Lime' },
  { value: 'light-green', displayName: 'Light Green' },
  { value: 'green', displayName: 'Green' },
  { value: 'teal', displayName: 'Teal' },
  { value: 'cyan', displayName: 'Cyan' },
  { value: 'light-blue', displayName: 'Light Blue' },
  { value: 'blue', displayName: 'Blue' },
  { value: 'indigo', displayName: 'Indigo' },
  { value: 'deep-purple', displayName: 'Deep Purple' },
  { value: 'purple', displayName: 'Purple' },
];

export const TextFormats = [
  { value: 'h1', displayName: 'h1' },
  { value: 'h2', displayName: 'h2' },
  { value: 'h3', displayName: 'h3' },
  { value: 'h4', displayName: 'h4' },
  { value: 'h5', displayName: 'h5' },
  { value: 'h6', displayName: 'h6' },
  { value: 'lead', displayName: 'lead' },
  { value: 'parargaph', displayName: 'paragraph' },
  { value: 'small', displayName: 'small' },
];

export const HeadingFormats = TextFormats.filter((format) =>
  format.value.startsWith('h')
);

export const Icons = [];

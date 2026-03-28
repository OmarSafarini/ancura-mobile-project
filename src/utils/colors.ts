
// free Use
export const palette = {

  dark: '#08070E',
  dark2: '#000000B2',

  darkGreen: '#8EB392',
  lightGreen: '#C3E3C7',

  darkBlue: '#6D7EB5',
  lightBlue: '#B6C0F9',

  white: '#FFFFFF',
  offWhite: '#F1EDF8',
  lightGray: '#D4D0DB',
  
  darkGray: '#666666',
  darkGray2: '#DBE6ED',
  darkGray3: '#E4E0EB',
  darkGray4: '#C2C2C2',

  orange: '#E87000',
  red: '#F8545D',
  

};


// constants
export const Colors = {


  primary: palette.darkBlue,
  primaryLight: palette.lightBlue,

  secondary: palette.darkGreen,
  secondaryLight: palette.lightGreen,

  mainBackgroundGradient: [palette.lightBlue, palette.offWhite, palette.lightGreen] as const,

  warning: palette.red,
  underReview: palette.orange,

  formBackground: palette.white,
  formBorder: palette.darkBlue,
  formTitle: palette.darkGray,
  formLabel: palette.darkGray,

  textDark: palette.dark,
  textDark2: palette.dark2,
  textBlue: palette.darkBlue,
  textGreen: palette.darkGreen,
  textGray: palette.darkGray4,

  buttonActive: palette.darkBlue,



} as const;

export type ColorTheme = typeof Colors;
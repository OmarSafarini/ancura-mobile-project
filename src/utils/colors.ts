
// free Use
export const palette = {

  dark: '#08070E',

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
  textBlue: palette.darkBlue,
  textGreen: palette.darkGreen,

  buttonActive: palette.darkBlue,



} as const;

export type ColorTheme = typeof Colors;
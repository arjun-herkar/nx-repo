import 'styled-components';

export interface Theme {
  body: string;
  text: string;
  toggleBorder: string;
  background: string;
  headerBg: string;
  headerColor: string;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
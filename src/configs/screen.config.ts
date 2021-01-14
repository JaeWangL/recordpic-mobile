export enum APP_SCREEN {
  AUTH = 'Auth',
  SIGN_IN = 'SignIn',

  MAIN = 'Main',
  TAB_PRODUCTS = 'TabProducts',

  PRODUCTS = 'Products',
  PRODUCT_DETAIL = 'ProductDetail',

  SETTINGS = 'Settings',
}

export type RootStackParamList = {
  [APP_SCREEN.AUTH]: undefined;
  [APP_SCREEN.SIGN_IN]: undefined;

  [APP_SCREEN.MAIN]: undefined;
  [APP_SCREEN.PRODUCTS]: undefined;
  [APP_SCREEN.PRODUCT_DETAIL]: undefined;

  [APP_SCREEN.SETTINGS]: undefined;
};

export const initialTabRoute: string = APP_SCREEN.PRODUCTS;

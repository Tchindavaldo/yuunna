import { NavigatorScreenParams } from '@react-navigation/native';

// Définir les paramètres pour les routes de navigation
export type HomeTabParamList = {
  index: undefined;
  detail: { itemData: any };
};

export type TabsParamList = {
  home: NavigatorScreenParams<HomeTabParamList>;
  categories: undefined;
  cart: undefined;
  notification: undefined;
  account: undefined;
};

export type RootStackParamList = {
  '(tabs)': NavigatorScreenParams<TabsParamList>;
  '(auth)': undefined;
};

// Extend le type déclaration pour React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

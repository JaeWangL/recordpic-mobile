import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@/configs';

export const navigationRef = createRef<NavigationContainerRef>();

export const navigate = <RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ? [RouteName] | [RouteName, RootStackParamList[RouteName]]
    : [RouteName, RootStackParamList[RouteName]]
): void => {
  navigationRef.current?.navigate(arg[0], arg.length > 1 ? arg[1] : undefined);
};

export const goBack = (): void => {
  navigationRef.current?.goBack();
};

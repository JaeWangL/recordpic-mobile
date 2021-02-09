import { createRef } from 'react';
import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native';
import { RootStackParamList } from '@/configs';

export const isReadyRef = createRef();
export const navigationRef = createRef<NavigationContainerRef>();

export const navigate = <RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
): void => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
};

export const goBack = (): void => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(CommonActions.goBack());
  }
};

export const replace = (name: string, params?: Record<string, unknown> | undefined): void => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.replace(name, params));
  }
};

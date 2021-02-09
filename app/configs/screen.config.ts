import { MemberWithAlbumDto, MomentPreviewDto } from '@/dtos';

export enum APP_SCREEN {
  AUTH = 'Auth',
  SIGN_IN = 'SignIn',

  MAIN = 'Main',
  ON_BOARDING = 'Onboarding',

  ALBUM_SETTINGS = 'AlbumSettings',
  CREATE_ALBUM = 'CreateAlbum',
  CREATE_MOMENT = 'CreateMoment',
  INTRO = 'Intro',
  MOMENTS = 'Moments',
  MOMENT_DETAIL = 'MomentDetail',
  MOMENT_EDIT = 'MomentEdit',
  PHOTO_DETAIL = 'PhotoDetail',

  SETTINGS = 'Settings',
  PROFILE_SETTINGS = 'ProfileSettings',
}

export type RootStackParamList = {
  [APP_SCREEN.AUTH]: undefined;
  [APP_SCREEN.SIGN_IN]: undefined;

  [APP_SCREEN.MAIN]: undefined;
  [APP_SCREEN.ON_BOARDING]: undefined;

  [APP_SCREEN.ALBUM_SETTINGS]: undefined;
  [APP_SCREEN.CREATE_ALBUM]: undefined;
  [APP_SCREEN.CREATE_MOMENT]: {
    member: MemberWithAlbumDto;
  };
  [APP_SCREEN.INTRO]: undefined;
  [APP_SCREEN.MOMENTS]: {
    member: MemberWithAlbumDto;
  };
  [APP_SCREEN.MOMENT_DETAIL]: {
    member: MemberWithAlbumDto;
    currentMoment: MomentPreviewDto;
  };
  [APP_SCREEN.MOMENT_EDIT]: undefined;
  [APP_SCREEN.PHOTO_DETAIL]: {
    photoUrl: string;
  };

  [APP_SCREEN.SETTINGS]: undefined;
  [APP_SCREEN.PROFILE_SETTINGS]: undefined;
};

export type AuthStackParamList = {
  [APP_SCREEN.AUTH]: undefined;

  [APP_SCREEN.SIGN_IN]: undefined;
};

export type MainDrawerParamList = {
  [APP_SCREEN.MAIN]: undefined;
  [APP_SCREEN.ON_BOARDING]: undefined;

  [APP_SCREEN.ALBUM_SETTINGS]: undefined;
  [APP_SCREEN.CREATE_ALBUM]: undefined;
  [APP_SCREEN.CREATE_MOMENT]: {
    member: MemberWithAlbumDto;
  };
  [APP_SCREEN.INTRO]: undefined;
  [APP_SCREEN.MOMENTS]: {
    member: MemberWithAlbumDto;
  };
  [APP_SCREEN.MOMENT_DETAIL]: {
    member: MemberWithAlbumDto;
    currentMoment: MomentPreviewDto;
  };
  [APP_SCREEN.MOMENT_EDIT]: undefined;
  [APP_SCREEN.PHOTO_DETAIL]: {
    photoUrl: string;
  };

  [APP_SCREEN.SETTINGS]: undefined;
  [APP_SCREEN.PROFILE_SETTINGS]: undefined;
};

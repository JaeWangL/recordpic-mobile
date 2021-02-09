import { SignInType, SocialSignInType } from '@/dtos';

// FIXME: Delete this and implement with basic enum conversion featrues
export const parseType = (type: SignInType): number => {
  if (type === SignInType.Mobile) {
    return 1;
  }

  return 0;
};

export const parseSocialType = (socialType: SocialSignInType): number => {
  if (socialType === SocialSignInType.Naver) {
    return 1;
  }

  return 0;
};

export const parseUSocialType = (socialType?: SocialSignInType): number | undefined => {
  if (socialType === SocialSignInType.Google) {
    return 1;
  }
  if (socialType === SocialSignInType.Naver) {
    return 1;
  }

  return undefined;
};

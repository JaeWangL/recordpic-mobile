export interface CreateMomentParamsType {
  name?: string;
  momentDate: Date;
}

export interface CreatePhotoParamsType {
  index: number;
  photoUrl?: string;
  photoTitle?: string;
  photoDescription?: string;
}

export const initMParamsType: CreateMomentParamsType = {
  momentDate: new Date(),
};

export const initPParamsType: CreatePhotoParamsType[] = [
  {
    index: 0,
  },
];

export interface UpdateMomentParamsType {
  name?: string;
  momentDate: Date;
}

export interface UpdatePhotoParamsType {
  index: number;

  /// <summary>
  /// 0: Added
  /// 1: Deleted
  /// 2: Updated
  /// </summary>
  type: number;
  photoId?: number;
  photoUrl?: string;
  photoTitle?: string;
  photoDescription?: string;
}

export const initMParamsType: UpdateMomentParamsType = {
  momentDate: new Date(),
};

export const initPParamsType: UpdatePhotoParamsType[] = [];

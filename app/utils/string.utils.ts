export const isValidString = (source: string | undefined): boolean => {
  if (source && source.length > 0) {
    return true;
  }

  return false;
};

export const isValidAlbumDesc = (albumDesc: string | undefined): boolean => {
  if (albumDesc === undefined || albumDesc.length > 16) {
    return false;
  }

  return true;
};

export const isValidAlbumName = (albumName: string | undefined): boolean => {
  if (albumName === undefined || albumName.length > 10) {
    return false;
  }

  return true;
};

export const getFilenamefromUrl = (url?: string): string => {
  if (!url) {
    return '';
  }

  return url.substring(url.lastIndexOf('/') + 1);
};

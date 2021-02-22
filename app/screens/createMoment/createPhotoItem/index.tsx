import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import IsEqual from 'react-fast-compare';
import FastImage, { ImageStyle, OnLoadEvent } from 'react-native-fast-image';
import * as ImagePicker from 'react-native-image-picker';
import { Chip, TextArea, TextField, View } from 'react-native-ui-lib';
import Placeholder from '@/assets/images/placeholderPhoto.jpg';
import { DeleteImageBlobRequest, UserDto } from '@/dtos';
import { translate } from '@/i18n';
import { deleteImageBlobAsync, uploadImageBlobAsync } from '@/services';
import { photoParamsStyles, placeholderGray200Color, transparentChipColor } from '@/styles';
import { getFilenamefromUrl, isEven, LogUtil } from '@/utils';
import { CreatePhotoParamsType } from '../interfaces';

interface ICreatePhotoProps {
  user?: UserDto;
  params: CreatePhotoParamsType;
  handleParmsChange: (params: CreatePhotoParamsType) => void;
  handleDeletePhoto: (index: number) => void;
  viewportWidth: number;
}

const CreatePhotoItem = (props: ICreatePhotoProps): React.ReactElement => {
  const { handleDeletePhoto, handleParmsChange, params, viewportWidth, user } = props;
  const [calcImgHeight, setCalcImgHeight] = useState<number>(0);

  const getImageStyle = useCallback((): ImageStyle => {
    return { width: viewportWidth * 0.85, height: calcImgHeight };
  }, [calcImgHeight]);

  const onDeletePressAsync = async (): Promise<void> => {
    if (params.index && user) {
      const request: DeleteImageBlobRequest = {
        fileName: getFilenamefromUrl(params.photoUrl),
      };
      await deleteImageBlobAsync(request, user.accessToken);
      handleDeletePhoto(params.index);
    }
  };

  const onImageLoad = useCallback((event: OnLoadEvent): void => {
    setCalcImgHeight((event.nativeEvent.height / event.nativeEvent.width) * viewportWidth * 0.85);
  }, []);

  const onPhotoPress = (): void => {
    const options: ImagePicker.ImageLibraryOptions = {
      quality: 1,
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel || !user) {
        return;
      }
      if (response.errorCode && response.errorMessage) {
        LogUtil(response.errorMessage);
        return;
      }
      if (params.photoUrl && user) {
        const request: DeleteImageBlobRequest = {
          fileName: getFilenamefromUrl(params.photoUrl),
        };
        await deleteImageBlobAsync(request, user.accessToken);
      }

      const photoData = new FormData();
      photoData.append('image', {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
        length: response.fileSize,
      });

      const res = await uploadImageBlobAsync(photoData, user.accessToken);
      if (res) {
        handleParmsChange({ ...params, photoUrl: res });
      }
    });
  };

  const onTitleChange = (text: string): void => {
    handleParmsChange({ ...params, photoTitle: text });
  };

  const onDescChange = (text: string): void => {
    handleParmsChange({ ...params, photoDescription: text });
  };

  const renderImageContainer = useCallback((): React.ReactElement => {
    if (!params.photoUrl) {
      return (
        <TouchableOpacity style={photoParamsStyles.photoContainer} onPress={onPhotoPress}>
          <FastImage
            style={[getImageStyle(), !isEven(params.index) ? photoParamsStyles.photoRight : undefined]}
            source={Placeholder}
            onLoad={onImageLoad}
          />
        </TouchableOpacity>
      );
    }

    return (
      <FastImage
        style={[
          getImageStyle(),
          photoParamsStyles.photoContainer,
          !isEven(params.index) ? photoParamsStyles.photoRight : undefined,
        ]}
        source={{ uri: params.photoUrl }}
        onLoad={onImageLoad}
      >
        <View style={photoParamsStyles.chipContainer}>
          {/* @ts-ignore: invalid error */}
          <Chip
            label={translate('createMoment.photoChange')}
            labelStyle={photoParamsStyles.photoChipLabel}
            backgroundColor={transparentChipColor}
            onPress={onPhotoPress}
          />
          {/* @ts-ignore: invalid error */}
          <Chip
            label={translate('createMoment.photoDelete')}
            labelStyle={photoParamsStyles.photoChipLabel}
            backgroundColor={transparentChipColor}
            onPress={onDeletePressAsync}
          />
        </View>
      </FastImage>
    );
  }, [calcImgHeight]);

  return (
    <>
      {renderImageContainer()}
      <TextField
        style={photoParamsStyles.inputTitleContainer}
        placeholder={translate('createMoment.placeholderPhotoName')}
        placeholderTextColor="black"
        underlineColor="white"
        value={params.photoTitle}
        onChangeText={onTitleChange}
      />
      <TextArea
        style={photoParamsStyles.inputDescContainer}
        placeholder={translate('createMoment.placeholderPhotoDesc')}
        placeholderTextColor={placeholderGray200Color}
        value={params.photoDescription}
        onChangeText={onDescChange}
      />
    </>
  );
};

CreatePhotoItem.defaultProps = {
  user: undefined,
};

export default React.memo(CreatePhotoItem, IsEqual);

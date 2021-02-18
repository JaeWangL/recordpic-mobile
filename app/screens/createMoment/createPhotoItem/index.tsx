import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import IsEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'react-native-image-picker';
import { Chip, TextField, View } from 'react-native-ui-lib';
import Placeholder from '@/assets/images/placeholderPhoto.jpg';
import { DeleteImageBlobRequest, UserDto } from '@/dtos';
import { translate } from '@/i18n';
import { deleteImageBlobAsync, uploadImageBlobAsync } from '@/services';
import { placeholderGray200Color, transparentChipColor } from '@/styles';
import { getFilenamefromUrl, LogUtil } from '@/utils';
import { CreatePhotoParamsType } from '../interfaces';
import styles from './styles';

interface ICreatePhotoProps {
  user?: UserDto;
  params: CreatePhotoParamsType;
  handleParmsChange: (params: CreatePhotoParamsType) => void;
  handleDeletePhoto: (index: number) => void;
}

const CreatePhotoItem = (props: ICreatePhotoProps): React.ReactElement => {
  const { handleDeletePhoto, handleParmsChange, params, user } = props;
  const [uploadPregress, setUploadProgress] = useState<number>(0);

  const isEven = (value?: number): boolean => {
    if (!value) {
      return true;
    }

    return value % 2 === 0;
  };

  const handleUploadProgress = (event: ProgressEvent): void => {
    const progress = (event.loaded / event.total) * 100;

    setUploadProgress(Math.round(progress));
  };

  const onDeletePressAsync = async (): Promise<void> => {
    if (params.index && user) {
      const request: DeleteImageBlobRequest = {
        fileName: getFilenamefromUrl(params.photoUrl),
      };
      await deleteImageBlobAsync(request, user.accessToken);
      handleDeletePhoto(params.index);
    }
  };

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

      const res = await uploadImageBlobAsync(photoData, user.accessToken, handleUploadProgress);
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

  const renderImageContainer = (): React.ReactElement => {
    if (!params.photoUrl) {
      return (
        <TouchableOpacity style={styles.photoContainer} onPress={onPhotoPress}>
          <FastImage style={styles.photoLeft} source={Placeholder} />
        </TouchableOpacity>
      );
    }
    if (uploadPregress !== 0 && uploadPregress !== 100) {
      return <FastImage style={styles.photoLeft} source={Placeholder} />;
      // NOTE: progress does not visible because Image is not big
      // return <Progress.Circle progress={uploadPregress} size={30} indeterminate />;
    }

    return (
      <FastImage
        style={
          isEven(params.index) ? [styles.photoContainer, styles.photoLeft] : [styles.photoContainer, styles.photoRight]
        }
        source={{ uri: params.photoUrl }}
      >
        <View style={styles.chipContainer}>
          {/* @ts-ignore: invalid error */}
          <Chip
            label={translate('createMoment.photoChange')}
            labelStyle={styles.photoChipLabel}
            backgroundColor={transparentChipColor}
            onPress={onPhotoPress}
          />
          {/* @ts-ignore: invalid error */}
          <Chip
            label={translate('createMoment.photoDelete')}
            labelStyle={styles.photoChipLabel}
            backgroundColor={transparentChipColor}
            onPress={onDeletePressAsync}
          />
        </View>
      </FastImage>
    );
  };

  return (
    <>
      {renderImageContainer()}
      <TextField
        style={styles.inputTitleContainer}
        placeholder={translate('createMoment.placeholderPhotoName')}
        placeholderTextColor="black"
        underlineColor="white"
        value={params.photoTitle}
        onChangeText={onTitleChange}
      />
      <TextField
        multiline
        style={styles.inputDescContainer}
        placeholder={translate('createMoment.placeholderPhotoDesc')}
        placeholderTextColor={placeholderGray200Color}
        underlineColor="white"
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

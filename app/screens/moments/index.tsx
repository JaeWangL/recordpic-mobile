import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useRef } from 'react';
import IsEqual from 'react-fast-compare';
import { ImageBackground, FlatList, ListRenderItemInfo } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Chip, Text, View } from 'react-native-ui-lib';
import Edit3 from '@/assets/icons/edit3.svg';
import { CustomLoading, TopNavigation, TopNavigationAction } from '@/components';
import { APP_SCREEN, RootStackParamList } from '@/configs';
import { MomentPreviewDto } from '@/dtos';
import { useMomentsPreviewFetch, useMomentStore, useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { getBGImage } from '@/utils';
import MomentItem from './momentItem';
import styles from './styles';

const keyExtractor = (item: MomentPreviewDto) => item.id.toString();

const MomentsScreen = (props: DrawerScreenProps<RootStackParamList, APP_SCREEN.MOMENTS>): React.ReactElement => {
  const { navigation, route } = props;
  const { member } = route.params;
  const { moment, changeCurrentMoment } = useMomentStore();
  const { user } = useUserStore();
  const { moments, isLoading } = useMomentsPreviewFetch(member.album.id, user.user);
  const momentsList = useRef<FlatList>(null);

  const handleMomentPress = (index: number, item: MomentPreviewDto): void => {
    changeCurrentMoment({ index });
    navigation.navigate(APP_SCREEN.MOMENT_DETAIL, {
      member,
      currentMoment: item,
    });
  };

  const onFABPress = useCallback((): void => {
    navigation.navigate(APP_SCREEN.CREATE_MOMENT, { member });
  }, []);

  const onMenuPress = useCallback((): void => {
    navigation.openDrawer();
  }, []);

  const onProfilePress = useCallback((): void => {
    navigation.navigate(APP_SCREEN.SETTINGS);
  }, []);

  const onSettingsPress = useCallback((): void => {
    navigation.navigate(APP_SCREEN.UPDATE_ALBUM, { member });
  }, []);

  const renderLeftControl = useCallback(
    (): React.ReactElement => <TopNavigationAction iconName="menu" onPress={onMenuPress} />,
    [],
  );

  const renderRightControls = useCallback(
    (): React.ReactElement[] => [<TopNavigationAction key="0" iconName="user" onPress={onProfilePress} />],
    [],
  );

  const renderFABIcon = (): React.ReactElement => {
    return <Edit3 />;
  };

  const renderHeader = useCallback((): React.ReactElement => {
    return (
      <>
        <Text style={styles.titleLabel}>{member.album.name}</Text>
        <Text style={styles.descLabel}>{member.album.description}</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{translate('moments.title')}</Text>
          {/* @ts-ignore: invalid error */}
          <Chip
            style={styles.headerChip}
            label={translate('moments.settings')}
            labelStyle={styles.headerChipLabel}
            onPress={onSettingsPress}
          />
        </View>
      </>
    );
  }, [member]);

  const renderItem = (info: ListRenderItemInfo<MomentPreviewDto>): React.ReactElement => (
    <MomentItem
      index={info.index}
      item={info.item}
      isLastItem={info.index === moments.length - 1}
      handleMomentPress={handleMomentPress}
    />
  );

  if (!user || isLoading) {
    return <CustomLoading />;
  }
  return (
    <ImageBackground style={styles.container} source={{ uri: getBGImage(member.album.coverColor) }}>
      <TopNavigation leftControl={renderLeftControl()} rightControls={renderRightControls()} />
      <FlatList
        ref={momentsList}
        style={styles.momentsContainer}
        data={moments}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        initialNumToRender={7}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialScrollIndex={moment.currentIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            momentsList.current?.scrollToIndex({ index: info.index, animated: false });
          });
        }}
      />
      <FloatingAction
        distanceToEdge={24}
        buttonSize={64}
        color={member.album.coverColor}
        iconHeight={24}
        iconWidth={24}
        showBackground={false}
        floatingIcon={renderFABIcon()}
        onPressMain={onFABPress}
      />
    </ImageBackground>
  );
};

export default React.memo(MomentsScreen, IsEqual);

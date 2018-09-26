import React from 'react';
import { View } from 'react-native';
import { BackHeader, CustomStatusBar } from '../../components';
import { Parameters } from '../../config';
import { createTagPhotosURL } from '../../config/URLCreators';
import { PhotoList } from '../../containers';

const TagsPhotos = ({ navigation }) => {
  const tagID = navigation.getParam(Parameters.TAG_ID);
  const tagName = navigation.getParam(Parameters.TAG_NAME);
  return (
    <View style={{ flex: 1 }}>
      <CustomStatusBar />
      <BackHeader title={tagName} onBackPress={() => navigation.goBack()} />
      <PhotoList
        name="tag"
        id={tagID}
        createURL={createTagPhotosURL}
      />
    </View>
  );
};

export default TagsPhotos;

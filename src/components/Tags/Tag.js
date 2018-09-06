import { Text } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Tag = ({
  label, onPress, tagContainerStyle, tagTextStyle, readonly,
}) => {
  const tagText = <Text style={[styles.tagLabel, tagTextStyle]}>{label}</Text>;

  if (readonly) {
    return (
      <View style={[styles.tag, tagContainerStyle]}>
        {tagText}
      </View>
    );
  }
  return (
    <TouchableOpacity style={[styles.tag, tagContainerStyle]} onPress={onPress}>
      {tagText}
    </TouchableOpacity>
  );
};

export default Tag;

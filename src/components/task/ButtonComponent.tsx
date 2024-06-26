import {TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';

interface Props {
  text: string;
  isLoading?: boolean;
  onPress: () => void;
  color?: string;
}

const ButtonComponent = (props: Props) => {
  const {text, onPress, color, isLoading} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: color ? color : isLoading ? appColors.gray2_t : appColors.blue,
        padding: 14,
        borderRadius: 14,
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TextComponent
          text={text}
          flex={0}
          styles={{textTransform: 'uppercase'}}
          size={16}
          font={fontFamilies.semiBold}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

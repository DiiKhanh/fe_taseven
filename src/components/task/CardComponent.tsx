import {View, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColors';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const CardComponent = (props: Props) => {
  const {children, bgColor, styles, onPress} = props;

  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.inputContainer_t,
        {padding: 12, backgroundColor: bgColor ?? appColors.gray_t},
        styles,
      ]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        globalStyles.inputContainer_t,
        {padding: 12, backgroundColor: bgColor ?? appColors.gray_t},
        styles,
      ]}>
      {children}
    </View>
  );
};

export default CardComponent;

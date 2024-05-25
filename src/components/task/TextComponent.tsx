import {Text, StyleProp, TextStyle, Platform} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
  line?: number;
}

const TextComponent = (props: Props) => {
  const {text, font, size, color, flex, styles, line} = props;
  const weight: any =
    Platform.OS === 'ios'
      ? font
        ? {
            fontWeight: font,
          }
        : {fontWeight: fontFamilies.regular}
      : {};
  return (
    <Text
      numberOfLines={line}
      style={[
        globalStyles.text_t,
        weight,
        {
          flex: flex ?? 1,
          fontFamily: font ?? fontFamilies.regular,
          fontSize: size ?? 14,
          color: color ?? appColors.desc,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;

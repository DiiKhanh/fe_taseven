import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
  radius?: number;
}

const CicularComponent = (props: Props) => {
  const {color, value, radius} = props;
  return (
    <CircularProgress
      value={value}
      title={`${value}%`}
      radius={radius ?? 46}
      showProgressValue={false}
      activeStrokeColor={color ?? appColors.blue}
      inActiveStrokeColor={'#3C444A'}
      titleColor={appColors.text_t}
      activeStrokeWidth={14}
      inActiveStrokeWidth={14}
      titleFontSize={20}
      titleStyle={{
        fontFamily: fontFamilies.medium,
        fontSize: 18,
      }}
    />
  );
};

export default CicularComponent;

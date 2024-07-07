import React from 'react';
import {View} from 'react-native';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import AvatarComponent from './AvatarComponent';

interface Props {
  uids: string[];
}

const AvatarGroup = (props: Props) => {
  const {uids} = props;

  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: appColors.white_t,
  };
  return (
    <RowComponent styles={{justifyContent: 'flex-start'}}>
      {uids.map(
        (item, index) =>
          index < 3 && <AvatarComponent uid={item} key={item} />,
      )}
      {uids.length > 3 && (
        <View
          key={'total'}
          style={[
            imageStyle,
            {
              backgroundColor: 'coral',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              marginLeft: -10,
            },
          ]}>
          <TextComponent
            flex={0}
            styles={{
              lineHeight: 19,
            }}
            font={fontFamilies.semiBold}
            text={`+${uids.length - 3 > 9 ? 9 : uids.length - 3}`}
          />
        </View>
      )}
    </RowComponent>
  );
};

export default AvatarGroup;

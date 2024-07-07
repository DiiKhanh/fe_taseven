import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../constants/appColors';
import {globalStyles} from '../../styles/globalStyles';
import {fontFamilies} from '../../constants/fontFamilies';
import { ProfileModel } from '../../models/ProfileModel';
import userAPI from '../../apis/userApi';


interface Props {
  uid: string;
  index?: number;
}

const AvatarComponent = (props: Props) => {
  const {uid, index} = props;

  const [userDetail, setUserDetail] = useState<ProfileModel>();

  useEffect(() => {
    getInfo();
  }, [uid]);

  const getInfo = async () => {
    const api = `/get-profile?id=${uid}`;
    try {
      const res = await userAPI.HandleUser(api);
      res && res.data && setUserDetail(res.data);
    } catch (error) {
      console.log('avt task', error);
    }
  };

  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: appColors.white_t,
  };
  return userDetail ? (
    userDetail.photoUrl ? (
      <Image
        source={{uri: userDetail.photoUrl}}
        key={`image${uid}`}
        style={[imageStyle, {marginLeft: index && index > 0 ? -10 : 0}]}
      />
    ) : (
      <View
        key={`image${uid}`}
        style={[
          imageStyle,
          {
            marginLeft: index && index > 0 ? -10 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: appColors.gray2_t,
          },
        ]}>
        <Text
          style={[
            globalStyles.text_t,
            {fontFamily: fontFamilies.bold, fontSize: 14},
          ]}>
          {userDetail.username.substring(0, 1).toUpperCase()}
        </Text>
      </View>
    )
  ) : (
    <></>
  );
};

export default AvatarComponent;

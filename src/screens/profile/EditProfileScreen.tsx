import {Platform} from 'react-native';
import React, {useState} from 'react';
import {ProfileModel} from '../../models/ProfileModel';
import {
  AvatarComponent,
  ButtonComponent,
  ButtonImagePicker,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../../components';

import {LoadingModal} from '../../modals';
import userAPI from '../../apis/userApi';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { appInfo } from '../../constants/appInfos';

const EditProfileScreen = ({navigation, route}: any) => {
  const {profile}: {profile: ProfileModel} = route.params;

  const [fileSelected, setFileSelected] = useState<any>();
  const [profileData, setProfileData] = useState<ProfileModel>(profile);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();


  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items: any = {...profileData};

    items[`${key}`] = value;

    setProfileData(items);
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  };


  const handleUpdateProfile = async (data: ProfileModel) => {
    // th1: chua co img, chon fileselec
    // th2: data da co img, chon fileselec
    //th3: chua co img, fileselec null
    //th4: co img, fileselec null
    if (fileSelected) {
    const baseUrl = appInfo.BASE_URL;
    const api = `${baseUrl}/users/update-profile?id=${profile.id}`;
    const formData = new FormData();
    formData.append('image', {
      name: fileSelected.path.split('/').pop(),
      type: fileSelected.mime,
      uri: Platform.OS === 'android' ? fileSelected.path : fileSelected.path.replace('file://', ''),
    });
    formData.append('fullname', data.fullname);
    formData.append('filename', data.filename);
    setIsLoading(true);
    try {
      const res: any = await axios.patch(api, formData , {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.accesstoken}`,
        },
      });

      setIsLoading(false);
      const newData = res.data.data;
      const authData = {...auth, filename: newData.filename, fullname: newData.fullname,
        photoUrl: newData.photoUrl,
      };

      await AsyncStorage.setItem('auth', JSON.stringify(authData));
      dispatch(addAuth(authData));

      navigation.navigate('ProfileScreen', {
        isUpdated: true,
        id: profile.id,
      });
    } catch (error) {
      setIsLoading(false);
      Toast.show({ type: 'error', text1: 'Error update profile', visibilityTime: 2000 });
    }
  } else {
    const api = `/update-profile-nofile?id=${profile.id}`;

    const newData = {
      fullname: data.fullname ?? '',
      photoUrl: data.photoUrl ?? '',
      filename: data.filename ?? '',
    };

    setIsLoading(true);

    try {
      const res: any = await userAPI.HandleUser(api, newData, 'patch');

      setIsLoading(false);

      const newAuth = res.data;
      const authData = {...auth, fullname: newAuth.fullname};

      await AsyncStorage.setItem('auth', JSON.stringify(authData));
      dispatch(addAuth(authData));

      navigation.navigate('ProfileScreen', {
        isUpdated: true,
        id: profile.id,
      });
    } catch (error) {
      setIsLoading(false);
      Toast.show({ type: 'error', text1: 'Error update profile no file', visibilityTime: 2000 });
    }
  }
  };

  const handleDeleteImage = () => {
    setFileSelected(null);
    handleChangeValue('photoUrl', '');
  };

  return (
    <ContainerComponent isScroll back title={profile.username}>
      <SectionComponent>
        <RowComponent>
          <AvatarComponent
            photoURL={profileData.photoUrl}
            name={profileData.username}
            size={120}
          />
        </RowComponent>
        <SpaceComponent height={16} />
        <RowComponent>
        <ButtonImagePicker
            onSelect={(val: any) =>
              val.type === 'url'
                ? handleChangeValue('photoUrl', val.value as string)
                : handleFileSelected(val.value)
            }
          />
          {
          fileSelected ?
          <>
            <ButtonComponent text="Delete" type="primary" color="#EE544A"
            onPress={() => handleDeleteImage()}
            styles={{

            }}
            />
          </> : ''
        }
        </RowComponent>
        <InputComponent
          placeholder="username"
          editable={false}
          value={profileData.username}
          onChange={val => handleChangeValue('username', val)}
        />
        <InputComponent
          placeholder="fullname"
          allowClear
          value={profileData.fullname}
          onChange={val => handleChangeValue('fullname', val)}
        />
      </SectionComponent>
      <ButtonComponent
        disable={profileData === profile}
        text="Update"
        type="primary"
        onPress={() => handleUpdateProfile(profileData)}
      />

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default EditProfileScreen;

import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import userAPI from '../../apis/userApi';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ProfileModel} from '../../models/ProfileModel';
import {
  AuthState,
  authSelector,
} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import EditProfile from './components/EditProfile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../../constants/appColors';

const ProfileScreen = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();
  const [profileId, setProfileId] = useState('');

  const auth: AuthState = useSelector(authSelector);

  useEffect(() => {
    if (route.params) {
      const {id} = route.params;
      setProfileId(id);

      if (route.params.isUpdated) {
        getProfile();
      }
    } else {
      setProfileId(auth.id);
    }
  }, [route.params]);

  useEffect(() => {
    if (profileId) {
      getProfile();
    }
  }, [profileId]);

  const getProfile = async () => {
    const api = `/get-profile?id=${profileId}`;

    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(api);
      res && res.data && setProfile(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log('profilescreen', error);
      setIsLoading(false);
    }
  };


  return (
    <ContainerComponent
      back
      title={route.params ? '' : 'Profile'}
      right={
        <ButtonComponent
          icon={
            <MaterialIcons
              name="more-vert"
              size={24}
              color={appColors.text}
              onPress={() => {}}
            />
          }
        />
      }>
      {isLoading ? (
        <ActivityIndicator />
      ) : profile ? (
        <>
          <SectionComponent styles={[globalStyles.center]}>
            <RowComponent>
              <AvatarComponent
                photoURL={profile.photoUrl}
                name={profile.username}
                size={120}
              />
            </RowComponent>
            <SpaceComponent height={16} />
            <TextComponent
              text={
                profile.fullname
                  ? profile.fullname
                  : profile.username
              }
              title
              size={24}
            />
          </SectionComponent>
          <EditProfile profile={profile} />
        </>
      ) : (
        <TextComponent text="profile not found!" />
      )}
    </ContainerComponent>
  );
};

export default ProfileScreen;

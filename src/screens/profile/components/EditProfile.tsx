import React, {useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {ProfileModel} from '../../../models/ProfileModel';
import {useNavigation} from '@react-navigation/native';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';
import {Edit, Edit2} from 'iconsax-react-native';

interface Props {
  profile: ProfileModel;
}

const EditProfile = (props: Props) => {
  const {profile} = props;

  const [isVisibleModalCategory, setIsVisibleModalCategory] = useState(false);
  const navigation: any = useNavigation();

  return (
    <SectionComponent>
      <RowComponent>
        <ButtonComponent
          styles={{
            borderWidth: 1,
            borderColor: appColors.primary,
            backgroundColor: appColors.white,
          }}
          text="Edit profile"
          onPress={() =>
            navigation.navigate('EditProfileScreen', {
              profile,
            })
          }
          textColor={appColors.primary}
          type="primary"
          icon={<Edit size={18} color={appColors.primary} />}
          iconFlex="left"
        />
      </RowComponent>
      <SpaceComponent height={20} />
      <TextComponent text="Information" title size={18} />
      <RowComponent justify="flex-start" styles={{ gap: 4}}>
      <TextComponent text={'Email: '} />
      <TextComponent text={profile.email} />
      </RowComponent>
      <RowComponent justify="flex-start" styles={{ gap: 4}}>
      <TextComponent text={'Username: '} />
      <TextComponent text={profile.username} />
      </RowComponent>
      <SpaceComponent height={20} />
      <>
        <RowComponent>
          <TextComponent flex={1} text="My Note" title size={18} />
          <RowComponent
            styles={[globalStyles.tag, {backgroundColor: '#FDFDFE'}]}
            onPress={() => setIsVisibleModalCategory(true)}>
            <Edit2 size={18} color={appColors.primary} />
            <SpaceComponent width={8} />
            <TextComponent text="Change" color={appColors.primary} />
          </RowComponent>
        </RowComponent>
      </>
    </SectionComponent>
  );
};

export default EditProfile;

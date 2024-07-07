import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {Edit2} from 'iconsax-react-native';
import ModalSelectCategories from '../../../modals/ModalSelectCategories';
import {CategoryModel} from '../../../models/CategoryModel';
import eventAPI from '../../../apis/eventApi';

interface Props {
  profile: ProfileModel;
}

const EditProfile = (props: Props) => {
  const {profile} = props;

  const [isVisibleModalCategory, setIsVisibleModalCategory] = useState(false);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const navigation: any = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = '/get-categories';
    try {
      const res: any = await eventAPI.HandleEvent(api);

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        />
      </RowComponent>
      <SpaceComponent height={20} />
      <TextComponent text="About" title size={18} />
      <TextComponent text={profile.bio} />
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
          <TextComponent flex={1} text="Interests" title size={18} />
          <RowComponent
            styles={[globalStyles.tag, {backgroundColor: '#FDFDFE'}]}
            onPress={() => setIsVisibleModalCategory(true)}>
            <Edit2 size={18} color={appColors.primary} />
            <SpaceComponent width={8} />
            <TextComponent text="Change" color={appColors.primary} />
          </RowComponent>
        </RowComponent>
        <RowComponent styles={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
          {categories.length > 0 &&
            profile.interests &&
            categories.map(
              item =>
                profile.interests?.includes(item._id) && (
                  <View
                    key={item._id}
                    style={[
                      globalStyles.tag,
                      {backgroundColor: item.color, margin: 6},
                    ]}>
                    <TextComponent text={item.title} color={appColors.white} />
                  </View>
                ),
            )}
        </RowComponent>
      </>

      <ModalSelectCategories
        categories={categories}
        seletected={profile.interests}
        onSelected={() => {
          setIsVisibleModalCategory(false);
          navigation.navigate('ProfileScreen', {
            isUpdated: true,
            id: profile.uid,
          });
        }}
        onClose={() => setIsVisibleModalCategory(false)}
        visible={isVisibleModalCategory}
      />
    </SectionComponent>
  );
};

export default EditProfile;

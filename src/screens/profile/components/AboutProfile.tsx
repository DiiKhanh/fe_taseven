import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../../constants/appColors';
import {globalStyles} from '../../../styles/globalStyles';
import {fontFamilies} from '../../../constants/fontFamilies';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  authSelector,
  updateFollowing,
} from '../../../redux/reducers/authReducer';
import {ProfileModel} from '../../../models/ProfileModel';
import {LoadingModal} from '../../../modals';

interface Props {
  profile: ProfileModel;
}

const AboutProfile = (props: Props) => {
  const {profile} = props;

  const [tabSelected, setTabSelected] = useState('about');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    {
      key: 'about',
      title: 'About',
    },
    {
      key: 'events',
      title: 'Events',
    },
    {
      key: 'reviews',
      title: 'Reviews',
    },
  ];

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();


  return (
    <>
      <SectionComponent>
        <RowComponent>
          <TouchableOpacity
            style={[
              globalStyles.button,
              {flex: 1, backgroundColor: appColors.primary},
            ]}>
            <Feather
              name={
                auth.following && auth.following.includes(profile.id)
                  ? 'user-minus'
                  : 'user-plus'
              }
              size={20}
              color={appColors.white}
            />
            <SpaceComponent width={12} />
            <TextComponent
              text={
                auth.following && auth.following.includes(profile.id)
                  ? 'Unfollow'
                  : 'Follow'
              }
              color={appColors.white}
              font={fontFamilies.medium}
            />
          </TouchableOpacity>
          <SpaceComponent width={20} />

          <TouchableOpacity
            style={[
              globalStyles.button,
              {flex: 1, borderColor: appColors.primary, borderWidth: 1},
            ]}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={appColors.primary}
            />
            <SpaceComponent width={12} />
            <TextComponent
              text="Messages"
              color={appColors.primary}
              font={fontFamilies.medium}
            />
          </TouchableOpacity>

        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          {tabs.map(item => (
            <TouchableOpacity
              onPress={() => setTabSelected(item.key)}
              style={[
                globalStyles.center,
                {
                  flex: 1,
                },
              ]}
              key={item.key}>
              <TextComponent
                text={item.title}
                font={
                  item.key === tabSelected
                    ? fontFamilies.medium
                    : fontFamilies.regular
                }
                color={
                  item.key === tabSelected ? appColors.primary : appColors.text
                }
                size={16}
              />
              <View
                style={{
                  width: 80,
                  borderRadius: 100,
                  marginTop: 6,
                  flex: 0,
                  height: 3,
                  backgroundColor:
                    item.key === tabSelected
                      ? appColors.primary
                      : appColors.white,
                }}
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
      </SectionComponent>

      <LoadingModal visible={isLoading} />
    </>
  );
};

export default AboutProfile;

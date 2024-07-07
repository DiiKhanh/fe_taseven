import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import NetInfo from '@react-native-community/netinfo';
import eventAPI from '../../apis/eventApi';
import { EventModel } from '../../models/EventModel';


const HomeScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>();
  const [eventData, setEventData] = useState<EventModel[]>([]);

  useEffect(() => {
    checkNetWork();
    getEventsData();
  }, []);

  const checkNetWork = () => {
    NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });
  };

  const getEventsData = async () => {
    const api = '/get-events';
    try {
      const res = await eventAPI.HandleEvent(api);

      const data = res.data;

      const items: EventModel[] = [];

      data.forEach((item: any) => items.push(item));

      setEventData(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: Platform.OS === 'android' ? 166 : 182,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={{paddingHorizontal: 16}}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{flex: 1, alignItems: 'center'}]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
            </View>

            <CircleComponent
              onPress={() => navigation.navigate('NotificationsScreen')}
              color="#524CE0"
              size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                  <View
                    style={{
                      backgroundColor: '#02E9FE',
                      width: 10,
                      height: 10,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: '#524CE0',
                      position: 'absolute',
                      top: -2,
                      right: -2,
                    }}
                  />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={20} />
          <RowComponent>
            <RowComponent
              styles={{flex: 1}}
              onPress={() => navigation.navigate('SearchEvents')}>
              <SearchNormal1
                variant="TwoTone"
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gray2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
              />
            </RowComponent>
            <TagComponent
              bgColor={'#5D56F3'}
              onPress={() =>
                navigation.navigate('SearchEvents', {isFilter: true})
              }
              label="Filters"
              icon={
                <CircleComponent size={20} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
            />
          </RowComponent>
          <SpaceComponent height={20} />
        </View>
        <View style={{marginBottom: -16}}>
          <CategoriesList isFill />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 18,
          },
        ]}>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarComponent
            title="Upcoming Events"
            onPress={() =>
              navigation.navigate('ExploreEvents', {
                key: 'upcoming',
                title: 'Upcoming Events',
              })
            }
          />
          {eventData.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={eventData}
              renderItem={({item, index}) => (
                <EventItem key={`event${index}`} item={item} type="card" />
              )}
            />
          ) : (
            <LoadingComponent isLoading={isLoading} values={eventData.length} />
          )}
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <TextComponent text="Invite your friends" title />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                onPress={() => console.log('fafafa')}
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  font={fontFamilies.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
      </ScrollView>

      <Modal animationType="fade" style={[{flex: 1}]} visible={!isOnline}>
        <View style={[globalStyles.center, {flex: 1}]}>
          <Text>Network error</Text>
        </View>
      </Modal>

    </View>
  );
};

export default HomeScreen;

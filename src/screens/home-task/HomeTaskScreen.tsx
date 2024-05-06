import {
  Add,
  Edit2,
  Notification,
  SearchNormal1,
  HambergerMenu,
} from 'iconsax-react-native';
import React from 'react';
import {ActivityIndicator,  TouchableOpacity, View} from 'react-native';
import AvatarGroup from '../../components/task/AvatarGroup';
import CardComponent from '../../components/task/CardComponent';
import CardImageConponent from '../../components/task/CardImageConponent';
import CicularComponent from '../../components/task/CicularComponent';
import Container from '../../components/task/Container';
import ProgressBarComponent from '../../components/task/ProgressBarComponent';
import RowComponent from '../../components/task/RowComponent';
import SectionComponent from '../../components/task/SectionComponent';
import SpaceComponent from '../../components/task/SpaceComponent';
import TagComponent from '../../components/task/TagComponent';
import TextComponent from '../../components/task/TextComponent';
import TitleComponent from '../../components/task/TitleComponent';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import {DateTime} from '../../utils/DateTime';
import {add0ToNumber} from '../../utils/add0ToNumber';
import { AuthState, authSelector } from '../../redux/reducers/authReducer';
import { useSelector } from 'react-redux';

const date = new Date();

const unReadNotifications = [1, 2];

const HomeTaskScreen = ({navigation}: any) => {

  const auth: AuthState = useSelector(authSelector);

  const tasks = [
    {
    uids: ['1234'],
    title: 'task',
    dueDate: date,
    progress: 0.7,
    desctiption: '12131341',
    },
    {
      uids: ['123112'],
      title: 'task1',
      dueDate: date,
      progress: 1,
      desctiption: '12131341',
      },
      {
        uids: ['123213234'],
        title: 'task2',
        dueDate: date,
        progress: 0.2,
        desctiption: '12131341',
        },
  ];
  const urgentTask = [{
    id: 123,
    title: 'asdsad',
    progress: 0.4,
  }];

  const isLoading = false;

  return (
    <View style={{flex: 1}}>
      <Container isScroll>
        <SectionComponent>
          <RowComponent justify="space-between">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white_t} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}>
              <Notification size={24} color={appColors.desc} />
              {unReadNotifications.length > 0 && (
                <View
                  style={{
                    backgroundColor: 'red',
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: appColors.white_t,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              )}
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View style={{flex: 1}}>
              <TextComponent text={`hi, ${auth?.username}`} />
              <TitleComponent text="Be Productive today" />
            </View>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            styles={[globalStyles.inputContainer_t]}>
            <TextComponent color="#f2f2f2" text="Search task" />
            <SearchNormal1 size={20} color={appColors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{flex: 1}}>
                <TitleComponent text="Task progress" />
                <TextComponent
                  text={`${
                    tasks.filter(
                      element => element.progress && element.progress === 1,
                    ).length
                  } /${tasks.length}`}
                />
                <SpaceComponent height={12} />
                <RowComponent justify="flex-start">
                  <TagComponent
                    text={`${appInfo.monthNames[date.getMonth()]} ${add0ToNumber(
                      date.getDate(),
                    )}`}
                  />
                </RowComponent>
              </View>
              <View>
                {tasks.length > 0 && (
                  <CicularComponent
                    value={Math.floor(
                      (tasks.filter(
                        element => element.progress && element.progress === 1,
                      ).length /
                        tasks.length) *
                        100,
                    )}
                  />
                )}
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <RowComponent
              onPress={() =>
                navigation.navigate('ListTasks', {
                  tasks,
                })
              }
              justify="flex-end"
              styles={{
                marginBottom: 16,
              }}>
              <TextComponent size={16} text="See all" flex={0} />
            </RowComponent>
            <RowComponent styles={{alignItems: 'flex-start'}}>
              <View style={{flex: 1}}>
                {tasks[0] && (
                  <CardImageConponent>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[0],
                        })
                      }
                      style={globalStyles.iconContainer_t}>
                      <Edit2 size={20} color={appColors.white_t} />
                    </TouchableOpacity>

                    <TitleComponent text={tasks[0].title} />
                    <TextComponent
                      line={3}
                      text={tasks[0].desctiption}
                      size={13}
                    />

                    <View style={{marginVertical: 28}}>
                      <AvatarGroup uids={tasks[0].uids} />
                      {tasks[0].progress &&
                      (tasks[0].progress as number) >= 0 ? (
                        <ProgressBarComponent
                          percent={`${Math.floor(tasks[0].progress * 100)}%`}
                          color="#0AACFF"
                          size="large"
                        />
                      ) : null}
                    </View>
                    {tasks[0].dueDate && (
                      <TextComponent
                        text={`Due ${DateTime.DateString(
                          tasks[0].dueDate,
                        )}`}
                        size={12}
                        color={appColors.desc}
                      />
                    )}
                  </CardImageConponent>
                )}
              </View>

              <SpaceComponent width={16} />
              <View style={{flex: 1}}>
                {tasks[1] && (
                  <CardImageConponent color="rgba(33, 150, 243, 0.9)">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[1],
                        })
                      }
                      style={globalStyles.iconContainer_t}>
                      <Edit2 size={20} color={appColors.white_t} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[1].title} size={18} />
                    {tasks[1].uids && <AvatarGroup uids={tasks[1].uids} />}
                    {tasks[1].progress ? (
                      <ProgressBarComponent
                        percent={`${Math.floor(tasks[1].progress * 100)}%`}
                        color="#A2F068"
                      />
                    ) : (
                      <></>
                    )}
                  </CardImageConponent>
                )}

                <SpaceComponent height={16} />
                {tasks[2] && (
                  <CardImageConponent color="rgba(18, 181, 22, 0.9)">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddNewTask', {
                          editable: true,
                          task: tasks[2],
                        })
                      }
                      style={globalStyles.iconContainer_t}>
                      <Edit2 size={20} color={appColors.white_t} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[2].title} />
                    <TextComponent
                      text={tasks[2].desctiption}
                      line={3}
                      size={13}
                    />
                  </CardImageConponent>
                )}
              </View>
            </RowComponent>
          </SectionComponent>
        ) : (
          <></>
        )}

        <SectionComponent>
          <TitleComponent
            flex={1}
            font={fontFamilies.bold}
            size={21}
            text="Urgents tasks"
          />
          {urgentTask.length > 0 &&
            urgentTask.map(item => (
              <CardComponent
                key={`urgentTask${item.id}`}
                styles={{marginBottom: 12}}>
                <RowComponent>
                  <CicularComponent
                    value={item.progress ? item.progress * 100 : 0}
                    radius={40}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: 12,
                    }}>
                    <TextComponent text={item.title} />
                  </View>
                </RowComponent>
              </CardComponent>
            ))}
        </SectionComponent>
      </Container>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('AddNewTask', {
              editable: false,
              task: undefined,
            })
          }
          style={[
            globalStyles.row_t,
            {
              backgroundColor: appColors.blue,
              padding: 10,
              borderRadius: 12,
              paddingVertical: 14,
              width: '80%',
            },
          ]}>
          <TextComponent text="Add new tasks" flex={0} />
          <Add size={22} color={appColors.white_t} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTaskScreen;

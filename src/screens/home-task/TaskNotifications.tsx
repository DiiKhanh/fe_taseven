import {FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NotificationTaskModel} from '../../models/NotificationModel';
import firestore from '@react-native-firebase/firestore';
import Container from '../../components/task/Container';
import TextComponent from '../../components/task/TextComponent';
import {DateTime} from '../../utils/DateTime';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import { useSelector } from 'react-redux';
import { AuthState, authSelector } from '../../redux/reducers/authReducer';

const TaskNotifications = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationTaskModel[]>([]);

  const user: AuthState = useSelector(authSelector);


  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    setIsLoading(true);
    try {
      firestore()
      .collection('notifications')
      .where('taskDetail.uids', 'array-contains', user?.id)
      .onSnapshot(snap => {
        if (!snap.empty) {
          const items: NotificationTaskModel[] = [];
          const seenTitles = new Set();

          snap.forEach((item: any) => {
            const data = item.data();
            const title = data.taskDetail.title;

            if (!seenTitles.has(title)) {
              seenTitles.add(title);
              items.push({
                id: item.id,
                ...data,
              });
            }
          });

          setNotifications(
            items.sort((a: any, b: any) => a.isRead - b.isRead),
          );
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log('err notifi', error);
      setIsLoading(false);
    }
  };

  const handleReadNotification = (item: NotificationTaskModel) => {
    firestore()
      .doc(`notifications/${item.id}`)
      .update({
        isRead: true,
      })
      .then(() => {
        navigation.navigate('TaskDetail', {id: item.taskId});
      });
  };

  return (
    <Container back title="Notifications">
      <FlatList
        data={notifications}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleReadNotification(item)}
            style={{marginBottom: 18, paddingHorizontal: 16}}>
            <TextComponent
              text={item?.taskDetail?.title}
              size={18}
              color={item.isRead ? appColors.gray2_t : appColors.text_t}
              font={item.isRead ? fontFamilies.regular : fontFamilies.bold}
            />
            <TextComponent text={item.body} color={appColors.gray2_t} />
            <TextComponent
              text={DateTime.DateString(new Date(item.createdAt))}
              size={12}
              color={appColors.gray2_t}
            />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default TaskNotifications;

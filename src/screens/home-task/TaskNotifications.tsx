import {FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NotificationModel} from '../../models/NotificationModel';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import Container from '../../components/task/Container';
import TextComponent from '../../components/task/TextComponent';
import {DateTime} from '../../utils/DateTime';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';

const TaskNotifications = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);

  const user = useSelector(authSelector);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    setIsLoading(true);
    try {
      // firestore()
      //   .collection('notifications')
      //   .where('uid', '==', user?.uid)
      //   .onSnapshot(snap => {
      //     if (!snap.empty) {
      //       const items: NotificationModel[] = [];

      //       snap.forEach((item: any) => {
      //         items.push({
      //           id: item.id,
      //           ...item.data(),
      //         });
      //       });

      //       setNotifications(
      //         items.sort((a: any, b: any) => a.isRead - b.isRead),
      //       );
      //       setIsLoading(false);
      //     }
      //   });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleReadNotification = (item: NotificationModel) => {
    // firestore()
    //   .doc(`notifications/${item.id}`)
    //   .update({
    //     isRead: true,
    //   })
    //   .then(() => {
    //     navigation.navigate('TaskDetail', {id: item.taskId});
    //   });
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
              text={item.title}
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

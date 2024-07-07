import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import ButtonComponent from '../../components/task/ButtonComponent';
import Container from '../../components/task/Container';
import DateTimePickerComponent from '../../components/task/DateTimePickerComponent';
import DropdownPicker from '../../components/task/DropdownPicker';
import InputComponent from '../../components/task/InputComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/task/SectionComponent';
import SpaceComponent from '../../components/task/SpaceComponent';
import TextComponent from '../../components/task/TextComponent';
import UploadFileComponent from '../../components/task/UploadFileComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {SelectModel} from '../../models/SelectModel';
import {Attachment, TaskModel} from '../../models/TaskModel';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import userAPI from '../../apis/userApi';


const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: undefined,
  start: undefined,
  end: undefined,
  uids: [],
  attachments: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
  isUrgent: false,
};

interface ItemResponse {
  email: string;
  id: string;
  username: string;
}

const AddTaskScreen = ({navigation, route}: any) => {
  const {editable, task}: {editable: boolean; task?: TaskModel} = route.params;

  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const user = useSelector(authSelector);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    user && setTaskDetail({...taskDetail, uids: [user.id]});
  }, [user]);

  useEffect(() => {
    task &&
      setTaskDetail({
        ...taskDetail,
        title: task.title,
        description: task.description,
        uids: task.uids,
      });
  }, [task]);

  const handleGetAllUsers = async () => {
    const api = '/get-all';

    try {
      const res = await userAPI.HandleUser(api);
      if (res.data.length === 0) {
        console.log('user empty');
      } else {
        const items: SelectModel[] = [];
        res.data.forEach((item:ItemResponse) => {
          items.push({
            label: item.username,
            value: item.id,
            email: item.email,
          });
        });
        setUsersSelect(items);
      }
    } catch (error) {
      console.log('err add task load user', error);
    }
  };

  const handleChangeValue = (id: string, value: string | string[] | Date) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  };

  const handleAddNewTask = async () => {
    // add new task
    if (user) {
      const data = {
        ...taskDetail,
        attachments,
        createdAt: task ? task.createdAt : Date.now(),
        updatedAt: Date.now(),
      };

      if (task) {
        await firestore()
          .doc(`tasks/${task.id}`)
          .update(data)
          .then(() => {
            if (usersSelect.length > 0) {
              usersSelect.forEach(member => {
                member.value !== user.id
                &&
                  handleSendInviteNotification({
                    title: 'Update task',
                    body: `Your task updated by ${user?.email}`,
                    taskId: task?.id ?? '',
                    memberId: member.value,
                  });
              });
            }
            navigation.goBack();
          });
      } else {
        await firestore()
          .collection('tasks')
          .add(data)
          .then(() => {
            if (usersSelect.length > 0) {
              usersSelect.forEach(member => {
                member.value !== user.id
                &&
                handleSendInviteNotification({
                    title: 'New task',
                    body: `You have a new task asign by ${user?.email}`,
                    taskId: data.id,
                    memberId: member.value,
                  });
              });
            }
            navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      Alert.alert('You not login!!!');
    }
  };

  const handleSendInviteNotification = async ({ eventId, taskId, memberId }:any) => {
    if (usersSelect.length > 0) {
      const api = '/send-invite';

      try {
        await userAPI.HandleUser(
          api,
          {
            ids: usersSelect,
            eventId, taskId, memberId,
          },
          'post',
        );

        const data: any = {
          from: user.id,
          createdAt: Date.now(),
          content: 'Invite A New Task',
          taskDetail,
          isRead: false,
        };

        usersSelect.forEach(async id => {
          await firestore()
            .collection('notifications')
            .add({...data, uid: id.value});

          console.log('Created notifition done!');
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('', 'Please select user want to invite!!');
    }
  };

  return (
    <Container back title="Add new task" isScroll>
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChange={val => handleChangeValue('title', val)}
          title="Title"
          allowClear
          placeholder="Title of task"
        />
        <InputComponent
          value={taskDetail.description}
          onChange={val => handleChangeValue('description', val)}
          title="Description"
          allowClear
          placeholder="Content"
          multible
          numberOfLine={3}
        />

        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          onSelect={val => handleChangeValue('dueDate', val)}
          placeholder="Choice"
          type="date"
          title="Due date"
        />

        <RowComponent>
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.start}
              type="time"
              onSelect={val => handleChangeValue('start', val)}
              title="Start"
            />
          </View>
          <SpaceComponent width={14} />
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.end}
              onSelect={val => handleChangeValue('end', val)}
              title="End"
              type="time"
            />
          </View>
        </RowComponent>

        <DropdownPicker
          selected={taskDetail.uids}
          items={usersSelect}
          onSelect={val => handleChangeValue('uids', val)}
          title="Members"
          multible
        />

        <View>
          <RowComponent
            styles={{
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <TextComponent
              text="Attachments"
              flex={0}
              font={fontFamilies.bold}
              size={16}
            />
            <SpaceComponent width={8} />
            <UploadFileComponent
              onUpload={file => file && setAttachments([...attachments, file])}
            />
          </RowComponent>
          {attachments.length > 0 &&
            attachments.map((item, index) => (
              <RowComponent
                key={`attachment${index}`}
                styles={{paddingVertical: 12}}>
                <TextComponent text={item.name ?? ''} />
              </RowComponent>
            ))}
        </View>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text={task ? 'Update' : 'Save'}
          onPress={handleAddNewTask}
        />
      </SectionComponent>
    </Container>
  );
};

export default AddTaskScreen;

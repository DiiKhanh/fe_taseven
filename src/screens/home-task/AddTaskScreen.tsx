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

const AddTaskScreen = ({navigation, route}: any) => {
  const {editable, task}: {editable: boolean; task?: TaskModel} = route.params;

  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const user  = useSelector(authSelector);


  useEffect(() => {
    user && setTaskDetail({...taskDetail, uids: [user.uids]});
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

  const handleChangeValue = (id: string, value: string | string[] | Date) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  };

  const handleAddNewTask = async () => {
    if (user) {
      const data = {
        ...taskDetail,
        attachments,
        createdAt: task ? task.createdAt : Date.now(),
        updatedAt: Date.now(),
      };

      if (task) {

      } else {

      }
    } else {
      Alert.alert('You not login!!!');
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

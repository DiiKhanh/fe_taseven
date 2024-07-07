import { FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/task/Container';
import TextComponent from '../../components/task/TextComponent';
import TitleComponent from '../../components/task/TitleComponent';
import {TaskModel} from '../../models/TaskModel';
import SectionComponent from '../../components/task/SectionComponent';
import InputComponent from '../../components/task/InputComponent';
import {SearchNormal1} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {replaceName} from '../../utils/replaceName';

const ListTasks = ({navigation, route}: any) => {
  const {tasks}: {tasks: TaskModel[]} = route.params;

  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<TaskModel[]>([]);

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      const items = tasks.filter(element =>
        replaceName(element.title)
          .toLowerCase()
          .includes(replaceName(searchKey).toLowerCase()),
      );

      setResults(items);
    }
  }, [searchKey]);

  return (
    <Container back>
      <SectionComponent>
        <InputComponent
          value={searchKey}
          onChange={val => setSearchKey(val)}
          allowClear
          prefix={<SearchNormal1 size={20} color={appColors.gray2_t} />}
          placeholder="Search"
        />
      </SectionComponent>
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={searchKey ? results : tasks}
        ListEmptyComponent={
          <SectionComponent>
            <TextComponent text="Task Not Found!!" />
          </SectionComponent>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              marginBottom: 24,
              paddingHorizontal: 16,
            }}
            onPress={() =>
              navigation.navigate('TaskDetail', {
                id: item.id,
              })
            }
            key={item.id}>
            <TitleComponent text={item.title} />
            <TextComponent text={item.description} line={2} />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default ListTasks;

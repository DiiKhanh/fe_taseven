import { Alert, Share } from 'react-native';

export const ShareEvent = async ({
  title, description, id,
}: { title: string, description: string, id: string; }) => {
  try {
    const result = await Share.share({
      message:
        `${title}\n\n${description}\n\nurl: https://i.imgur.com/XlHT7wi.png`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

import { HomeTabParamList } from '@/types/navigation.types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export const useNavigateWithData = () => {
  const navigation = useNavigation<NavigationProp<HomeTabParamList>>();

  const navigateWithData = (path: any, data: any) => {
    navigation.navigate(path, { data });
  };

  return navigateWithData;
};

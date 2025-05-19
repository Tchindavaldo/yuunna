import { ImageSourcePropType } from 'react-native';

export interface ItemProps {
  article?: {
    titre?: string;
    disponibilite?: string;
    prix1?: string | number;
    image?: ImageSourcePropType;
  };
  onPressItem: () => void;
}

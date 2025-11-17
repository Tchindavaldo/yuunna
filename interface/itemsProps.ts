import { ImageSourcePropType } from 'react-native';

export interface ItemProps {
  article?: {
    titre?: string;
    titreOriginal: string;
    disponibilite?: string;
    prix1?: string | number;
    image?: ImageSourcePropType;
    vendeur?: string;
    ventes?: string;
    localisation?: string;
    categoryId?: string;
    status?: string;
  };
  onPressItem: () => void;
}

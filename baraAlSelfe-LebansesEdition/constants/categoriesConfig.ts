import categoriesData from '../data/lebaneseGameData';

export type CategoryKey = keyof typeof categoriesData;

export interface CategoryInfo {
  id: CategoryKey;
  title: string;
  emoji: string;
  color: string;
  itemCount: number;
}

export const CATEGORIES_CONFIG: Record<CategoryKey, Omit<CategoryInfo, 'id' | 'itemCount'>> = {
  lebanesefoods: {
    title: 'أكل لبناني',
    emoji: '🥙',
    color: '#FF6B6B',
  },
  lebaneseAnimals: {
    title: 'حيوانات لبنان',
    emoji: '🐾',
    color: '#4ECDC4',
  },
  lebaneseVegetablesAndFruits: {
    title: 'خضار وفواكه',
    emoji: '🥦',
    color: '#F4D35E',
  },
  lebaneseClothes: {
    title: 'ملابس لبنانية',
    emoji: '👗',
    color: '#4DA8DA',
  },
  lebaneseDessserts: {
    title: 'حلويات لبنانية',
    emoji: '🍮',
    color: '#EE92C2',
  },
};

export const getCategories = (): CategoryInfo[] => {
  return (Object.keys(CATEGORIES_CONFIG) as CategoryKey[]).map((key) => ({
    id: key,
    ...CATEGORIES_CONFIG[key],
    itemCount: categoriesData[key].length,
  }));
};

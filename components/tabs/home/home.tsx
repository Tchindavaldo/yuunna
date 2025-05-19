import Routes from '@/app/(route)/routes';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import BottomNav from '../../gloabal/bottom-nav';
import ItemDesign1 from './design/design1/item-design-1';
import ItemDesign2 from './design/design2/item-design-2';
import Header from './header/header';
import { useNavigateWithData } from './utils/navigate';

const PAGE_SIZE = 10;

export default function HomeComponent() {
  const navigateWithData = useNavigateWithData();

  const [data, setData] = useState<object[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    // Simuler une API (tu peux remplacer ça par fetch/axios)
    const newItems = Array.from({ length: PAGE_SIZE }, (_, i) => ({
      id: `${i + 1 + (page - 1) * PAGE_SIZE}`,
      title: 'Article ' + PAGE_SIZE,
      price: PAGE_SIZE + '.99€',
      category: 'Électronique' + PAGE_SIZE,
      rating: 4.5,
      stock: 1 + PAGE_SIZE,
    }));
    await new Promise(r => setTimeout(r, 1000)); // délai simulé

    setData(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ paddingLeft: 5 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        {[...Array(2)].map((_, index) => (
          <ItemDesign1
            onPressItem={() => {
              navigateWithData(Routes.tabs.home.detail, item);
            }}
            key={`${item.id}${index}`}
          />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        {[...Array(3)].map((_, index) => (
          <ItemDesign2
            onPressItem={() => {
              navigateWithData(Routes.tabs.home.detail, item);
            }}
            key={`item2${item.id}${index}`}
          />
        ))}
      </ScrollView>

      {/* <ItemDesign3 /> */}
    </View>
  );

  return (
    <>
      <Header />
      {/* <BottomNav /> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
      <BottomNav />
    </>
  );
}

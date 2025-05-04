import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import BottomNav from '../../gloabal/bottom-nav';
import ItemDesign1 from './dsign1/item-design-1';
import ItemDesign2 from './dsign2/item-design-2';
import Header from './header/header';

const PAGE_SIZE = 10;

export default function HomeComponent() {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    // Simuler une API (tu peux remplacer ça par fetch/axios)
    const newItems = Array.from({ length: PAGE_SIZE }, (_, i) => `Item ${i + 1 + (page - 1) * PAGE_SIZE}`);
    await new Promise(r => setTimeout(r, 1000)); // délai simulé

    setData(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <View style={{ paddingLeft: 5 }}>
      {/* Ligne horizontale pour ItemDesign1 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        {[...Array(2)].map((_, index) => (
          <ItemDesign1 key={`item1-${index}`} />
        ))}
      </ScrollView>

      {/* Ligne horizontale pour ItemDesign2 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        {[...Array(3)].map((_, index) => (
          <ItemDesign2 key={`item2-${index}`} />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <>
      <Header />
      <BottomNav />
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

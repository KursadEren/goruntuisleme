import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // API'den veriyi çekme fonksiyonu
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.yapikredi.com.tr/api/stockmarket/v1/bistIndices');
      const json = await response.json();
      // API cevabındaki verinin "response.data" dizisinde olduğunu varsayıyoruz
      setData(json.response.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // Bileşen yüklendiğinde veriyi çekiyoruz
  useEffect(() => {
    fetchData();
  }, []);

  // Her bir öğeyi render etmek için fonksiyon
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.aciklama}</Text>
      <Text>Son Değer: {item.son}</Text>
      <Text>Günlük Yüzde: {item.gunlukyuzde}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.sembolId ? item.sembolId.toString() : index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff'
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default App;

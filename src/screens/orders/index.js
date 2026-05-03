import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, useColorScheme} from 'react-native';
import {GlobalStyles} from '../../styles/GlobalStyles';
import { getAllOrders } from '../../api/services/product';
import {
  checkInternetConnection,
  getCachedOrders,
  getPendingOrders,
} from '../../utils/offlineSync';


const OrdersScreen = ({navigation}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [orders, setOrders] = useState([]);
  const [offlineMode, setOfflineMode] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    fetchOrders(1, true);
  }, []);

  const extractOrders = response => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }
    if (Array.isArray(response?.data?.data)) {
      return response.data.data;
    }
    return [];
  };

  const fetchOrders = async (pageNumber = 1, reset = false) => {
    if (loading || loadingMore) {
      return;
    }

    if (reset) {
      setNoMoreData(false);
      setPage(1);
    }

    const isLoadMore = pageNumber > 1;
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const online = await checkInternetConnection();
      if (!online) {
        throw new Error('offline');
      }

      const response = await getAllOrders({page: pageNumber, limit});
      const fetchedOrders = extractOrders(response);
      console.log('response : ', response.data);

      setOrders(prev => (isLoadMore ? [...prev, ...fetchedOrders] : fetchedOrders));
      setOfflineMode(false);
      setPage(pageNumber);
      setNoMoreData(fetchedOrders.length < limit);
    } catch (error) {
      if (!isLoadMore) {
        const cached = await getCachedOrders();
        setOrders(cached);
        setOfflineMode(true);
      }
      setNoMoreData(true);
      console.warn('Offline/orders load from cache or no internet', error);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
        setRefreshing(false);
      }
    }

    const pending = await getPendingOrders();
    setPendingCount(pending.length);
  };

  const handleLoadMore = () => {
    if (offlineMode || loadingMore || loading || noMoreData) {
      return;
    }

    fetchOrders(page + 1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders(1, true);
  };

  // const handleOrderDetails = (orderId) => {
  //   navigation.navigate('OrderDetails', {orderId});
  // };



  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.card, isDarkMode && styles.cardDark]}
        activeOpacity={0.8}
        // later: navigation.navigate('OrderDetailsScreen', {orderId: item._id})
        onPress={() => navigation.navigate('OrderDetailsScreen', {order: item})}
      >
        <View style={styles.row}>
          <Text style={[styles.orderId, isDarkMode && styles.textDark]}>{item.order_id}</Text>
          <Text style={[styles.amount, isDarkMode && styles.textDark]}>₹{item.total}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.meta, isDarkMode && styles.textDark]}> 
            {new Date(item.createdAt).toLocaleString()}
          </Text>

          <Text
            // style={[
            //   styles.badge,
            //   item.payment_type === 'cash' ? styles.cash : styles.online,
            // ]}
            style={[
              styles.badge,
              item.payment_type === 'cash'
                ? styles.cash
                : item.payment_type === 'credit'
                ? styles.credit
                : styles.online,
            ]}
            >
            {item.payment_type.toUpperCase()}
              &nbsp;
              {item.payment_type === 'credit' && '-₹' + item.credit} 
          </Text>
        </View>

        <View style={styles.row}>
          <Text
            style={[
              styles.status,
              item.status === 'paid' ? styles.paid : isDarkMode && styles.textDark,
            ]}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.header, isDarkMode && styles.headerDark]}>My Orders</Text>
      <Text style={[styles.info, isDarkMode && styles.infoDark]}>
        {offlineMode ? 'Offline mode' : 'Online mode'} · Pending uploads: {pendingCount}
      </Text>

      <FlatList
        data={orders}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 20}}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() =>
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={isDarkMode ? '#fff' : '#1565C0'} />
              <Text style={[styles.footerText, isDarkMode && styles.textDark]}>Loading more orders...</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          loading ? (
            <Text style={[styles.empty, isDarkMode && styles.textDark]}>Loading orders...</Text>
          ) : (
            <Text style={[styles.empty, isDarkMode && styles.textDark]}>No orders found</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111',
  },
  headerDark: {
    color: '#fff',
  },
  headerDark: {
    color: '#fff',
  },
  info: {
    color: '#333',
    marginBottom: 16,
  },
  infoDark: {
    color: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  orderId: {
    fontWeight: '600',
    fontSize: 15,
  },
  amount: {
    fontWeight: '700',
    fontSize: 15,
  },
  meta: {
    color: '#666',
    fontSize: 12,
  },
  textDark: {
    color: '#e2e2e2',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  cash: {
    backgroundColor: '#6D4C41',
  },
  online: {
    backgroundColor: '#1565C0',
  },
  credit: {
    backgroundColor: 'red',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  paid: {
    color: '#2E7D32',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
  emptyDark: {
    color: '#ccc',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    color: '#555',
    fontSize: 12,
  },
});

export default OrdersScreen;

import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  checkInternetConnection,
  getPendingOrders,
  getLastFetched,
  syncPendingOrders,
  refreshOrders,
  getCachedOrders,
} from '../utils/offlineSync';

const SyncStatusScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [lastFetched, setLastFetchedState] = useState(null);
  const [ordersCache, setOrdersCache] = useState([]);
  const [loadingSync, setLoadingSync] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const loadStatus = useCallback(async () => {
    const online = await checkInternetConnection();
    const pending = await getPendingOrders();
    const last = await getLastFetched();
    const cached = await getCachedOrders();

    setIsOnline(online);
    setPendingOrders(pending);
    setLastFetchedState(last);
    setOrdersCache(cached);
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const handleForceSync = async () => {
    setLoadingSync(true);
    try {
      const result = await syncPendingOrders();
      if (!result.success && result.reason === 'offline') {
        Alert.alert('Offline', 'No internet connection available.');
      } else if (result.synced > 0) {
        Alert.alert('Sync complete', `${result.synced} order(s) synced.`);
      } else if (result.failed > 0) {
        Alert.alert('Sync partial', `${result.failed} order(s) failed to sync.`);
      } else {
        Alert.alert('No data to sync', 'All pending data is already synced.');
      }
    } catch (error) {
      console.error('sync error', error);
      Alert.alert('Sync failed', 'Unable to sync pending data.');
    } finally {
      setLoadingSync(false);
      await loadStatus();
    }
  };

  const handleForceFetch = async () => {
    setLoadingFetch(true);
    try {
      const result = await refreshOrders();

      if (result.success) {
        Alert.alert('Fetch complete', 'Orders refreshed from server.');
        setOrdersCache(result.orders);
      } else {
        Alert.alert('Fetch failed', 'Unable to load data from server. Showing cached orders.');
      }
    } catch (error) {
      console.error('fetch error', error);
      Alert.alert('Fetch failed', 'Unable to fetch orders.');
    } finally {
      setLoadingFetch(false);
      await loadStatus();
    }
  };

  const renderPendingItem = ({item}) => (
    <View style={styles.pendingItem}>
      <View style={styles.pendingRow}>
        <Text style={styles.pendingTitle}>Order queued</Text>
        <Text style={styles.pendingBadge}>PENDING</Text>
      </View>
      <Text style={styles.pendingText}>Created: {new Date(item.createdAt).toLocaleString()}</Text>
      <Text style={styles.pendingText}>Items: {item.payload.items.length}</Text>
      <Text style={styles.pendingText}>Total: ₹{item.payload.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sync Status</Text>

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Connection</Text>
          <Text style={[styles.statusValue, isOnline ? styles.online : styles.offline]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Pending upload</Text>
          <Text style={styles.statusValue}>{pendingOrders.length}</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Last fetched</Text>
          <Text style={styles.statusValue}>
            {lastFetched ? lastFetched.toLocaleString() : 'Never'}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Cached orders</Text>
          <Text style={styles.statusValue}>{ordersCache.length}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.fetchBtn]}
          onPress={handleForceFetch}
          disabled={loadingFetch}>
          <Text style={styles.actionText}>{loadingFetch ? 'Fetching...' : 'Force fetch'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.syncBtn]}
          onPress={handleForceSync}
          disabled={loadingSync}>
          <Text style={styles.actionText}>{loadingSync ? 'Syncing...' : 'Force sync'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Pending Uploads</Text>

      {pendingOrders.length === 0 ? (
        <Text style={styles.emptyText}>No offline data waiting to be pushed.</Text>
      ) : (
        <FlatList
          data={pendingOrders}
          keyExtractor={item => item.id}
          renderItem={renderPendingItem}
          contentContainerStyle={styles.pendingList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 14,
    color: '#555',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  online: {
    color: '#2E7D32',
  },
  offline: {
    color: '#D32F2F',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  fetchBtn: {
    backgroundColor: '#1976D2',
  },
  syncBtn: {
    backgroundColor: '#388E3C',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  emptyText: {
    color: '#666',
    marginTop: 8,
  },
  pendingList: {
    paddingBottom: 24,
  },
  pendingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
  },
  pendingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pendingTitle: {
    fontWeight: '700',
  },
  pendingBadge: {
    color: '#fff',
    backgroundColor: '#FFA000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
  pendingText: {
    color: '#444',
    marginBottom: 4,
  },
});

export default SyncStatusScreen;

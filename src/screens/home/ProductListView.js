import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getProducts} from '../../api/services/product';

export default function ProductListView({onSelect}) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const fetchProducts = async (pageNo = 1) => {
    if (loadingMore) return;

    setLoadingMore(true);
    setLoading(true);

    try {
      const response = await getProducts({
        page: pageNo,
        limit: 20,
      });

      const newData = response?.data?.data || [];

      setProducts(prev =>
        pageNo === 1 ? newData : [...prev, ...newData],
      );
      setAllProducts(prev =>
        pageNo === 1 ? newData : [...prev, ...newData],
      );
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  const handleSearch = text => {
    setSearch(text);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!text.trim()) {
      setProducts(allProducts);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await getProducts({
          page: 1,
          limit: 20,
          search: text,
        });
        setProducts(response?.data?.data || []);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }, 400);
  };

  const loadMore = () => {
    if (search.trim()) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onSelect(item.barcode || item.sku)}>

      <View>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          ₹{item.sellingPrice}{' '}
          <Text style={styles.mrp}>₹{item.mrp}</Text>
        </Text>
      </View>

      <View style={styles.codeWrapper}>
        <Icon name="barcode" size={14} color="#888" />
        <Text style={styles.code}>{item.barcode || item.sku}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 🔍 SEARCH */}
      <View style={styles.searchBox}>
        <Icon name="magnify" size={20} color="#777" />
        <TextInput
          placeholder="Search products..."
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {loading && products.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1565C0" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item._id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          ListFooterComponent={() =>
            !search && products.length > 0 ? (
              <TouchableOpacity
                style={styles.viewMoreBtn}
                onPress={loadMore}
                disabled={loadingMore}>
                {loadingMore ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.viewMoreText}>View More</Text>
                )}
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  /* SEARCH */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },

  /* LIST */
  list: {
    paddingBottom: 24,
  },

  /* CARD */
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    elevation: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
  },
  mrp: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  /* BARCODE */
  codeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  code: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666',
  },

  /* VIEW MORE */
  viewMoreBtn: {
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 14,
    backgroundColor: '#1565C0',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  viewMoreText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* LOADER */
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

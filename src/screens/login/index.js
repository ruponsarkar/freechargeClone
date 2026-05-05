import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {loginAPI} from '../../api/services/auth';
// import AuthContext from '../../context/AuthContext';
import {AuthContext} from '../../context/AuthContext';
import { requestAllAppPermissions } from '../../utils/allPermissions';


export default function LoginScreen({navigation}) {
  const {login} = useContext(AuthContext);
  const [tenantSlug, setTenantSlug] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    try {
      setLoading(true);

      const res = await loginAPI({
        tenantSlug,
        tenantId,
        email,
        password,
      });
      console.log('Login response:', res.data);

      login(
        res.data.token,
        res.data.refreshToken,
        res.data.user,
        res.data.tenant,
      );

      // 🔐 REQUEST PERMISSIONS ONCE AFTER LOGIN
      await requestAllAppPermissions();

      Alert.alert('Success', 'Login successful');

      // navigate to home/dashboard
      // navigation.replace('Main Screen');
    } catch (err) {
      console.log('Login error:', err);
      Alert.alert(
        'Login failed',
        err.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#050816" />
      <View style={styles.container}>
        <View style={styles.backgroundGlowTop} />
        <View style={styles.backgroundGlowBottom} />

        <View style={styles.header}>
          <Text style={styles.eyebrow}>Welcome Back</Text>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Sign in to access your workspace and continue scanning products.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tenant slug</Text>
            <TextInput
              placeholder="Enter tenant slug"
              placeholderTextColor="#6B7280"
              value={tenantSlug}
              onChangeText={setTenantSlug}
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tenant ID</Text>
            <TextInput
              placeholder="Enter tenant ID"
              placeholderTextColor="#6B7280"
              value={tenantId}
              onChangeText={setTenantId}
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter email address"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.btnText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050816',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 28,
    justifyContent: 'center',
    backgroundColor: '#050816',
  },
  backgroundGlowTop: {
    position: 'absolute',
    top: 40,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1D4ED8',
    opacity: 0.16,
  },
  backgroundGlowBottom: {
    position: 'absolute',
    bottom: 80,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#059669',
    opacity: 0.12,
  },
  header: {
    marginBottom: 28,
  },
  eyebrow: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#94A3B8',
  },
  card: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#111827',
    color: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  btn: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: {
    backgroundColor: '#1D4ED8',
    opacity: 0.7,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

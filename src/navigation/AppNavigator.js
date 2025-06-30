import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
// Removed LinearGradient import
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { login, logout } from '../redux/authSlice';
import { getUser, removeUser } from '../utils/storage';

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Elegant menu items with text-based icons
const menuItems = [
  {
    id: 1,
    title: 'Dashboard',
    icon: '📊',
    screen: 'Dashboard',
    color: '#667eea',
    submenus: []
  },
  {
    id: 2,
    title: 'Products',
    icon: '📦',
    color: '#f093fb',
    submenus: [
      { id: 21, title: 'All Products', screen: 'AllProducts', icon: '📋' },
      { id: 22, title: 'Add Product', screen: 'AddProduct', icon: '➕' },
      { id: 23, title: 'Categories', screen: 'Categories', icon: '🏷️' }
    ]
  },
  {
    id: 3,
    title: 'Orders',
    icon: '🛒',
    color: '#4facfe',
    submenus: [
      { id: 31, title: 'All Orders', screen: 'AllOrders', icon: '📜' },
      { id: 32, title: 'Pending Orders', screen: 'PendingOrders', icon: '⏳' },
      { id: 33, title: 'Completed Orders', screen: 'CompletedOrders', icon: '✅' }
    ]
  },
  {
    id: 4,
    title: 'Customers',
    icon: '👥',
    color: '#43e97b',
    submenus: [
      { id: 41, title: 'All Customers', screen: 'AllCustomers', icon: '👨‍👩‍👧‍👦' },
      { id: 42, title: 'Add Customer', screen: 'AddCustomer', icon: '👤' }
    ]
  },
  {
    id: 5,
    title: 'Analytics',
    icon: '📈',
    color: '#fa709a',
    submenus: [
      { id: 51, title: 'Sales Analytics', screen: 'SalesReport', icon: '📊' },
      { id: 52, title: 'Customer Insights', screen: 'CustomerReport', icon: '🔍' },
      { id: 53, title: 'Product Performance', screen: 'ProductReport', icon: '📉' }
    ]
  },
  {
    id: 6,
    title: 'Settings',
    icon: '⚙️',
    color: '#a8edea',
    screen: 'Settings',
    submenus: []
  },
  {
    id: 7,
    title: 'User Detail',
    icon: '⚙️',
    color: '#a8edea',
    screen: 'Users',
   submenus: [
      { id: 54, title: 'View', screen: 'UserViewDetail', icon: '📊' },
    ]
  }
];

const CustomDrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [animatedValues] = useState({});

  // Initialize animated values
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.submenus && item.submenus.length > 0) {
        animatedValues[item.id] = new Animated.Value(0);
      }
    });
  }, []);

  const toggleSubmenu = (menuId) => {
    const isExpanded = expandedMenus[menuId];
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));

    Animated.timing(animatedValues[menuId], {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

 
  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await removeUser();
            dispatch(logout());
          }
        }
      ]
    );
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };

  const renderIcon = (item, size = 22) => {
    return (
      <Text style={[styles.emojiIcon, { fontSize: size }]}>
        {item.icon}
      </Text>
    );
  };

  return (
    <View style={styles.drawerContainer}>
      {/* Elegant Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: user?.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
              }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'John Doe'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'john@example.com'}</Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileRole}>{user?.role || 'Administrator'}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Elegant Menu Section */}
      <ScrollView style={styles.menuSection} showsVerticalScrollIndicator={false}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <View key={item.id} style={styles.menuItemContainer}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  { backgroundColor: expandedMenus[item.id] ? '#f8f9ff' : 'transparent' }
                ]}
                onPress={() => {
                  if (item.submenus && item.submenus.length > 0) {
                    toggleSubmenu(item.id);
                  } else {
                    navigateToScreen(item.screen);
                  }
                }}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                    {renderIcon(item)}
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                {item.submenus && item.submenus.length > 0 && (
                    <Text style={styles.expandIcon}>
                      {expandedMenus[item.id] ? '▲' : '▼'}
                    </Text>
                )}
              </TouchableOpacity>

              {/* Animated Submenus */}
              {item.submenus && item.submenus.length > 0 && (
                <Animated.View
                  style={[
                    styles.submenuContainer,
                    {
                      maxHeight: animatedValues[item.id]?.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, item.submenus.length * 50]
                      }) || 0,
                      opacity: animatedValues[item.id] || 0
                    }
                  ]}
                >
                  {item.submenus.map((submenu, subIndex) => (
                    <TouchableOpacity
                      key={submenu.id}
                      style={styles.submenuItem}
                      onPress={() => navigateToScreen(submenu.screen)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.submenuConnector} />
                      <Text style={styles.submenuEmojiIcon}>
                        {submenu.icon}
                      </Text>
                      <Text style={styles.submenuText}>{submenu.title}</Text>
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Elegant Logout Section */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <View style={styles.logoutGradient}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 2.1.0</Text>
        </View>
      </View>
    </View>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={({ navigation }) => ({
      drawerStyle: {
        backgroundColor: '#fff',
        width: width * 0.75,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 16,
      },
      headerShown: true,
      headerStyle: {
        backgroundColor: '#667eea',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={styles.hamburgerButton}
          onPress={() => navigation.openDrawer()}
          activeOpacity={0.7}
        >
          <View style={styles.hamburgerContainer}>
            <Text style={styles.hamburgerIcon}>☰</Text>
          </View>
        </TouchableOpacity>
      ),
    })}
  >
    <Drawer.Screen 
      name="Dashboard" 
      component={DashboardScreen}
      options={{
        title: 'Dashboard',
      }}
    />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await getUser();
      if (user) dispatch(login(user));
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen 
            name="Main" 
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    backgroundColor: '#667eea',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: 'relative',
    // Create gradient effect with overlay
    shadowColor: '#764ba2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4ade80',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
    textAlign: 'center',
  },
  profileBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileRole: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuSection: {
    flex: 1,
    paddingTop: 20,
  },
  menuContainer: {
    paddingHorizontal: 12,
  },
  menuItemContainer: {
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
    flex: 1,
  },
  submenuContainer: {
    overflow: 'hidden',
    marginLeft: 20,
    marginRight: 8,
  },
  submenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 1,
  },
  submenuConnector: {
    width: 2,
    height: 20,
    backgroundColor: '#e5e7eb',
    marginRight: 14,
    borderRadius: 1,
  },
  emojiIcon: {
    textAlign: 'center',
  },
  submenuEmojiIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  expandIcon: {
    fontSize: 16,
    color: '#8e8e93',
    fontWeight: 'bold',
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  hamburgerIcon: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  submenuText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    flex: 1,
  },
  logoutSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  logoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#ff6b6b',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#ff6b6b',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  appVersion: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  hamburgerButton: {
    marginLeft: 16,
    padding: 4,
  },
  hamburgerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;
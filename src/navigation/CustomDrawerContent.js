// CustomDrawerContent.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { removeUser } from '../utils/storage';

const menuItems = [
  {
    id: 1,
    title: 'Dashboard',
    icon: 'house',
    screen: 'Dashboard',
    color: '#667eea',
    submenus: [],
  },
  {
    id: 2,
    title: 'Fees Report',
    icon: 'money',
    color: '#f093fb',
    submenus: [
      { id: 21, title: 'Fee Statment', screen: 'FeeStatement', icon: '📋' },
      {
        id: 22,
        title: 'Current Balance Report',
        screen: 'CurrentBalance',
        
      },
      {
        id: 23,
        title: 'Balance Fees Report',
        screen: 'BalanceFeeReport',
        icon: '🏷️',
      },
      { id: 24, title: 'Transaction Report', screen: 'TransactionReport', icon: '🏷️' },
      {
        id: 25,
        title: 'Daily Collection Report',
        screen: 'Categories',
        icon: '🏷️',
      },
      { id: 26, title: 'Fee Follow Up', screen: 'Categories', icon: '🏷️' },
    ],
  },
  {
    id: 3,
    title: 'Students',
    icon: 'students',
    color: '#4facfe',
    submenus: [
      { id: 31, title: 'Students Profile', screen: 'StudentView', icon: '📜' },
      {
        id: 32,
        title: 'Mark Students Attendance',
        screen: 'PendingOrders',
        icon: '⏳',
      },
      {
        id: 33,
        title: 'Students Attendance Report',
        screen: 'StudentAttendence',
        icon: '⏳',
      },
      {
        id: 34,
        title: 'Students Leave Management',
        screen: 'PendingOrders',
        icon: '⏳',
      },
      { id: 35, title: 'Students PTM', screen: 'PendingOrders', icon: '⏳' },
    ],
  },
  {
    id: 4,
    title: 'Examination',
    icon: 'exam',
    color: '#43e97b',
    submenus: [
      { id: 41, title: 'Exam Marks', screen: 'AllCustomers',  },
      { id: 42, title: 'Exam Schedule', screen: 'ExamSchedule',  },
      { id: 43, title: 'Teacher Comment', screen: 'AllCustomers',  },
      {
        id: 44,
        title: 'Co-Curricular Grade',
        screen: 'AllCustomers',
        
      },
      {
        id: 45,
        title: 'Primary Evaluation',
        screen: 'AddCustomer',
        
      },
    ],
  },
  {
    id: 5,
    title: 'Disciplinary',
    icon: 'disciplinary',
    color: '#fa709a',
    submenus: [
      {
        id: 51,
        title: 'Disciplinary Report',
        screen: 'SalesReport',
        
      },
    ],
  },
  {
    id: 6,
    title: 'Human Resource',
    icon: 'desk',
    color: '#fa709a',
    submenus: [
      { id: 61, title: 'Staff Directory', screen: 'SalesReport',  },
      { id: 62, title: 'Recruitment', screen: 'SalesReport',  },
      {
        id: 63,
        title: 'Staff Attendence Report',
        screen: 'SalesReport',
        
      },
      {
        id: 64,
        title: 'Staff Monthly Attendence Report',
        screen: 'SalesReport',
        
      },
      { id: 65, title: 'Apply Leave', screen: 'SalesReport', },
      {
        id: 66,
        title: 'Approve Leave Request',
        screen: 'SalesReport',
        
      },
      { id: 67, title: 'Payroll', screen: 'SalesReport',  },
      { id: 68, title: 'Task', screen: 'SalesReport', },
      { id: 69, title: 'Employee', screen: 'SalesReport',  },
    ],
  },
  {
    id: 7,
    title: 'Academics',
    icon: 'graduate',
    color: '#fa709a',
    submenus: [
      { id: 71, title: 'Teacher Timetable', screen: 'SalesReport',  },
      {
        id: 72,
        title: 'Daily Class Timetable',
        screen: 'SalesReport',
        
      },
    ],
  },
  {
    id: 8,
    title: 'Income / Expense',
    icon: 'salary',
    color: '#fa709a',
    submenus: [
      { id: 81, title: 'Income', screen: 'SalesReport',  },
      { id: 82, title: 'Expense', screen: 'SalesReport', },
    ],
  },
  {
    id: 9,
    title: 'Front Office',
    icon: 'receptionist',
    color: '#fa709a',
    submenus: [
      { id: 91, title: 'Admission Enquiry', screen: 'SalesReport',  },
      { id: 92, title: 'Visitor Book', screen: 'SalesReport',  },
      { id: 93, title: 'Complain', screen: 'SalesReport',  },
      { id: 94, title: 'Gate Pass', screen: 'SalesReport',  },
    ],
  },
  {
    id: 10,
    title: 'Homework / Classwork',
    icon: 'write',
    color: '#fa709a',
    submenus: [
      { id: 101, title: 'Homework', screen: 'Homework',  },
      { id: 102, title: 'Classwork', screen: 'Classwork',  },
      {
        id: 103,
        title: 'Homework Evaluation',
        screen: 'SalesReport',
        
      },
      {
        id: 104,
        title: 'Classwork Evaluation',
        screen: 'SalesReport',
        
      },
    ],
  },
  {
    id: 11,
    title: 'User',
    icon: 'write',
    color: '#fa709a',
    submenus: [
      { id: 105, title: 'User Profile', screen: 'UserView',  },
    ],
  },
  
  {
    id: 12,
    title: 'Settings',
    icon: 'settings',
    color: '#a8edea',
    screen: 'Setting',
    submenus: [],
  },
];

const CustomDrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [animatedValues] = useState({});
  const [activeItemId, setActiveItemId] = useState(null);
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.submenus?.length) {
        animatedValues[item.id] = new Animated.Value(0);
      }
    });
  }, []);

  const toggleSubmenu = menuId => {
    const isExpanded = expandedMenus[menuId];
    setExpandedMenus(prev => ({ ...prev, [menuId]: !prev[menuId] }));

    Animated.timing(animatedValues[menuId], {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await removeUser();
          dispatch(logout());
        },
      },
    ]);
  };

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };

  const iconMap = {
    house: require('../theme/asserts/icon/house.png'),
    desk: require('../theme/asserts/icon/desk.png'),
    disciplinary: require('../theme/asserts/icon/disciplinary.png'),
    exam: require('../theme/asserts/icon/exam.png'),
    graduate: require('../theme/asserts/icon/graduate.png'),
    money: require('../theme/asserts/icon/money.png'),
    receptionist: require('../theme/asserts/icon/receptionist.png'),
    salary: require('../theme/asserts/icon/salary.png'),
    students: require('../theme/asserts/icon/students.png'),
    write: require('../theme/asserts/icon/write.png'),
    settings: require('../theme/asserts/icon/settings.png'),
    // add all icons here
  };

  const renderIcon = (item, size = 22) => (
    // <Text style={{ fontSize: size }}>{item.icon}</Text>
    // <Icon name={item.icon} size={22} color={'#6B7280'} />
    <Image
      source={
        iconMap[item.icon] || require('../theme/asserts/icon/default.png')
      } // optional fallback icon
      style={{ width: 18, height: 18 }}
      resizeMode="contain"
    />
  );

  return (
    <View style={styles.drawerContainer}>
      {/* Elegant Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri:
                  user?.profileImage ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
              }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'John Doe'}</Text>
            <Text style={styles.profileEmail}>
              {user?.email || 'john@example.com'}
            </Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileRole}>
                {user?.role || 'Administrator'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {menuItems.map(item => (
          <View key={item.id} style={{paddingBottom:10,paddingTop:10}}>
            <TouchableOpacity
              style={[
                styles.moduleButton,
                activeItemId === item.id && styles.moduleButtonActive,
              ]}
              onPress={() => {
                setActiveItemId(item.id); // <-- Mark active
                item.submenus.length
                  ? toggleSubmenu(item.id)
                  : navigateToScreen(item.screen);
              }}
              activeOpacity={0.7}
            >
              <Image
                source={
                  iconMap[item.icon] ||
                  require('../theme/asserts/icon/default.png')
                } // optional fallback icon
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.moduleButtonText,
                  activeItemId === item.id && { color: module.color },
                ]}
              >
                {item.title}
              </Text>
              {/* <Text>
                {renderIcon(item)} {' '} {item.title}
              </Text> */}
              {item.submenus.length > 0 && (
                <Text>{expandedMenus[item.id] ? '▲' : '▼'}</Text>
              )}
            </TouchableOpacity>

            {item.submenus.length > 0 && (
              <Animated.View
                style={{
                  maxHeight:
                    animatedValues[item.id]?.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, item.submenus.length * 40],
                    }) || 0,
                  overflow: 'hidden',
                }}
              >
                {item.submenus.map(sub => (
                  <TouchableOpacity
                    key={sub.id}
                    onPress={() => navigateToScreen(sub.screen)}
                    style={{ paddingLeft: 30, paddingVertical: 10 }}
                  >
                    <Text>{sub.title}</Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
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
  moduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  moduleButtonActive: {
    backgroundColor: '#F3F4F6',
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  moduleButtonText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
});

export default CustomDrawerContent;

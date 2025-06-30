import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Footer = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const items = [
    { label: 'Home', icon: 'home', screen: 'Dashboard' },
    {
      label: 'Attendance',
      icon: 'calendar-month',
      screen: 'Attendance',
    },
    {
      label: 'Notice Board',
      icon: 'clipboard-text-outline',
      screen: 'NoticeBoard',
    },
    { label: 'Menu', icon: 'menu', screen: 'Menu' },
  ];
  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Icon name={item.icon} size={24} color="#fff" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#667eea',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
    marginBottom:8
  },
});

export default Footer;

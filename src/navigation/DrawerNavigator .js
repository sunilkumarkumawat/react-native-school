import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, TouchableOpacity, Text, View } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import Test from '../Test/Test';
import CustomDrawerContent from './CustomDrawerContent'; // ✅ Make sure this path is correct

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={({ navigation }) => ({
      drawerStyle: {
        backgroundColor: '#fff',
        width: width * 0.75,
      },
      headerShown: true,
      headerStyle: {
        backgroundColor: '#667eea',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16, padding: 4 }}
          onPress={() => navigation.openDrawer()}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.1)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>☰</Text>
          </View>
        </TouchableOpacity>
      ),
    })}
  >
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Test" component={Test} />
  </Drawer.Navigator>
);

export default DrawerNavigator;

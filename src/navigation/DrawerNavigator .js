import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, TouchableOpacity, Text, View } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import Test from '../Test/Test';
import CustomDrawerContent from './CustomDrawerContent'; // ✅ Make sure this path is correct
import StudentAttendence from '../screens/Student/StudentAttendence';
import StudentView from '../screens/Student/StudentView';
import ExamSchedule from '../screens/Exam/ExamSchedule';
import UserView from '../screens/User/UserView';
import NoticeBoard from '../screens/Communicate/NoticeBoard';
import ProfileView from '../screens/Profile/ProfileView';
import Homework from '../screens/HomeworkClasswork/Homework';
import ClassWork from '../screens/HomeworkClasswork/Classwork';
import FeeStatement from '../screens/FeeReport/FeeStatement';
import CurrentBalance from '../screens/FeeReport/CurrentBalance';
import BalanceFeeReport from '../screens/FeeReport/BalanceFeeReport';
import TransactionReport from '../screens/FeeReport/TransactionReport';
import Setting from '../common/Setting';
import { useTheme } from '../theme/ThemeContext';
import DailyCollectionReport from '../screens/FeeReport/DailyCollectionReport';
import FeeFollowUp from '../screens/FeeReport/FeeFollowUp';
import MarkStudentAttendence from '../screens/Student/MarkStudentAttendence';
import StudentLeaveManagement from '../screens/Student/StudentLeaveManagement';
import StudentPTM from '../screens/Student/StudentPTM';
import ExamMarks from '../screens/Exam/ExamMarks';
import TeacherComment from '../screens/Exam/TeacherComment';
import CoCurricularGrade from '../screens/Exam/CoCurricularGrade';
import PrimaryEvaluation from '../screens/Exam/PrimaryEvaluation';
import DisciplinaryReport from '../screens/Disciplinary/DisciplinaryReport';
import StaffDirectory from '../screens/HumanResource/StaffDirectory';
import StaffAttendanceReport from '../screens/HumanResource/StaffAttendenceReport';
import ApplyLeave from '../screens/HumanResource/ApplyLeave';
import ApproveLeaveRequest from '../screens/HumanResource/ApproveLeaveRequest';

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');

const DrawerNavigator = () => {
  const { themeColor } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: '#fff',
          width: width * 0.75,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: themeColor, // 🟢 use dynamic color
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
      <Drawer.Screen name="StudentAttendence" component={StudentAttendence} />
      <Drawer.Screen name="StudentView" component={StudentView} />
      <Drawer.Screen name="UserView" component={UserView} />
      <Drawer.Screen name="ExamSchedule" component={ExamSchedule} />
      <Drawer.Screen name="NoticeBoard" component={NoticeBoard} />
      <Drawer.Screen name="ProfileView" component={ProfileView} />
      <Drawer.Screen name="Homework" component={Homework} />
      <Drawer.Screen name="Classwork" component={ClassWork} />
      <Drawer.Screen name="FeeStatement" component={FeeStatement} />
      <Drawer.Screen name="CurrentBalance" component={CurrentBalance} />
      <Drawer.Screen name="BalanceFeeReport" component={BalanceFeeReport} />
      <Drawer.Screen name="TransactionReport" component={TransactionReport} />
      <Drawer.Screen name="DailyCollectionReport" component={DailyCollectionReport} />
      <Drawer.Screen name="FeeFollowUp" component={FeeFollowUp} />
      <Drawer.Screen name="MarkStudentAttendence" component={MarkStudentAttendence} />
      <Drawer.Screen name="StudentLeaveManagement" component={StudentLeaveManagement} />
      <Drawer.Screen name="StudentPTM" component={StudentPTM} />
      <Drawer.Screen name="ExamMarks" component={ExamMarks} />
      <Drawer.Screen name="TeacherComment" component={TeacherComment} />
      <Drawer.Screen name="CoCurricularGrade" component={CoCurricularGrade} />
      <Drawer.Screen name="PrimaryEvaluation" component={PrimaryEvaluation} />
      <Drawer.Screen name="DisciplinaryReport" component={DisciplinaryReport} />
      <Drawer.Screen name="StaffDirectory" component={StaffDirectory} />
      <Drawer.Screen name="StaffAttendanceReport" component={StaffAttendanceReport} />
      <Drawer.Screen name="ApplyLeave" component={ApplyLeave} />
      <Drawer.Screen name="ApproveLeaveRequest" component={ApproveLeaveRequest} />
      
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  FlatList,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

const { width } = Dimensions.get('window');

const StudentView = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);

  // Sample student data
  const students = [
    {
      id: 1,
      name: 'Aarav Sharma',
      class: '10th',
      section: 'A',
      rollNumber: 'A001',
      email: 'aarav.sharma@school.edu',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      parentContact: '+91 98765 43210',
      attendance: 92,
      status: 'Present',
      lastActive: '2 mins ago',
      subjects: ['Math', 'Science', 'English', 'Hindi', 'Social Studies'],
    },
    {
      id: 2,
      name: 'Priya Patel',
      class: '10th',
      section: 'B',
      rollNumber: 'B015',
      email: 'priya.patel@school.edu',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      parentContact: '+91 87654 32109',
      attendance: 88,
      status: 'Absent',
      lastActive: '1 hour ago',
      subjects: ['Math', 'Science', 'English', 'Hindi', 'Computer'],
    },
    {
      id: 3,
      name: 'Arjun Singh',
      class: '9th',
      section: 'A',
      rollNumber: 'A025',
      email: 'arjun.singh@school.edu',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      parentContact: '+91 76543 21098',
      attendance: 95,
      status: 'Present',
      lastActive: 'Just now',
      subjects: ['Math', 'Science', 'English', 'Hindi', 'Art'],
    },
    {
      id: 4,
      name: 'Kavya Reddy',
      class: '11th',
      section: 'C',
      rollNumber: 'C008',
      email: 'kavya.reddy@school.edu',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      parentContact: '+91 65432 10987',
      attendance: 90,
      status: 'Present',
      lastActive: '5 mins ago',
      subjects: ['Physics', 'Chemistry', 'Math', 'English', 'Computer'],
    },
    {
      id: 5,
      name: 'Rohit Kumar',
      class: '9th',
      section: 'B',
      rollNumber: 'B012',
      email: 'rohit.kumar@school.edu',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      parentContact: '+91 54321 09876',
      attendance: 85,
      status: 'On Leave',
      lastActive: '3 days ago',
      subjects: ['Math', 'Science', 'English', 'Hindi', 'Sports'],
    },
    {
      id: 6,
      name: 'Ananya Gupta',
      class: '11th',
      section: 'A',
      rollNumber: 'A003',
      email: 'ananya.gupta@school.edu',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      parentContact: '+91 43210 98765',
      attendance: 94,
      status: 'Present',
      lastActive: '1 min ago',
      subjects: ['Biology', 'Chemistry', 'Physics', 'English', 'Math'],
    },
    {
      id: 7,
      name: 'Vikram Joshi',
      class: '10th',
      section: 'A',
      rollNumber: 'A018',
      email: 'vikram.joshi@school.edu',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      parentContact: '+91 32109 87654',
      attendance: 78,
      status: 'Absent',
      lastActive: '2 days ago',
      subjects: ['Math', 'Science', 'English', 'Hindi', 'Geography'],
    },
    {
      id: 8,
      name: 'Sneha Agarwal',
      class: '9th',
      section: 'C',
      rollNumber: 'C020',
      email: 'sneha.agarwal@school.edu',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      parentContact: '+91 21098 76543',
      attendance: 97,
      status: 'Present',
      lastActive: 'Just now',
      subjects: ['Math', 'Science', 'English', 'Hindi', 'Music'],
    },
  ];

  const classes = ['All', '9th', '10th', '11th', '12th'];
  const sections = ['All', 'A', 'B', 'C', 'D'];

  useEffect(() => {
    filterStudents();
  }, [searchKeyword, selectedClass, selectedSection]);

  const filterStudents = () => {
    let filtered = students;

    // Filter by class
    if (selectedClass !== 'All') {
      filtered = filtered.filter(student => student.class === selectedClass);
    }

    // Filter by section
    if (selectedSection !== 'All') {
      filtered = filtered.filter(
        student => student.section === selectedSection,
      );
    }

    // Filter by keyword (name, email, roll number, parent contact, or subjects)
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase().trim();

      filtered = filtered.filter(student => {
        // Search in name
        const nameMatch = student.name.toLowerCase().includes(keyword);

        // Search in email
        const emailMatch = student.email.toLowerCase().includes(keyword);

        // Search in roll number
        const rollMatch = student.rollNumber.toLowerCase().includes(keyword);

        // Search in parent contact (both with and without special characters)
        const phoneDigitsOnly = student.parentContact.replace(/\D/g, '');
        const keywordDigitsOnly = keyword.replace(/\D/g, '');
        const phoneMatch =
          student.parentContact.toLowerCase().includes(keyword) ||
          (keywordDigitsOnly && phoneDigitsOnly.includes(keywordDigitsOnly));

        // Search in subjects
        const subjectMatch = student.subjects.some(subject =>
          subject.toLowerCase().includes(keyword),
        );

        // Search in status
        const statusMatch = student.status.toLowerCase().includes(keyword);

        // Search in class (without 'th' suffix for easier searching)
        const classNumber = student.class.replace('th', '');
        const classMatch =
          student.class.toLowerCase().includes(keyword) ||
          classNumber.includes(keyword);

        // Search in section
        const sectionMatch = student.section.toLowerCase().includes(keyword);

        return (
          nameMatch ||
          emailMatch ||
          rollMatch ||
          phoneMatch ||
          subjectMatch ||
          statusMatch ||
          classMatch ||
          sectionMatch
        );
      });
    }

    setFilteredStudents(filtered);
  };

  const handleDropdownAction = (action, student) => {
    setActiveDropdown(null);

    switch (action) {
      case 'downloadIdCard':
        console.log(`Downloading ID card for ${student.name}`);
        break;
      case 'downloadReportCard':
        console.log(`Downloading report card for ${student.name}`);
        break;
      case 'downloadCertificate':
        console.log(`Downloading certificate for ${student.name}`);
        break;
      case 'viewTimetable':
        console.log(`Viewing timetable for ${student.name}`);
        break;
      case 'attendanceReport':
        console.log(`Viewing attendance report for ${student.name}`);
        break;
      case 'viewGrades':
        console.log(`Viewing grades for ${student.name}`);
        break;
      case 'contactParent':
        console.log(`Contacting parent of ${student.name}`);
        break;
      case 'editProfile':
        console.log(`Editing profile for ${student.name}`);
        break;
      default:
        break;
    }
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setShowClassDropdown(false);
    setShowSectionDropdown(false);
  };

  const getAttendanceColor = attendance => {
    if (attendance >= 95) return '#10b981';
    if (attendance >= 90) return '#f59e0b';
    if (attendance >= 80) return '#f97316';
    return '#ef4444';
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Present':
        return '#10b981';
      case 'Absent':
        return '#ef4444';
      case 'On Leave':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const StudentCard = ({ student }) => (
    <View style={styles.studentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: student.avatar }} style={styles.avatar} />
          {student.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.classSection}>
            {student.class} - Section {student.section}
          </Text>
          <Text style={styles.rollNumber}>Roll No: {student.rollNumber}</Text>
          <Text style={styles.studentEmail}>{student.email}</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() =>
              setActiveDropdown(
                activeDropdown === student.id ? null : student.id,
              )
            }
          >
            <Text style={styles.moreText}>⋯</Text>
          </TouchableOpacity>

          {activeDropdown === student.id && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownAction('downloadIdCard', student)}
              >
                <Text style={styles.dropdownIcon}>🆔</Text>
                <Text style={styles.dropdownText}>Download ID Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() =>
                  handleDropdownAction('downloadReportCard', student)
                }
              >
                <Text style={styles.dropdownIcon}>📊</Text>
                <Text style={styles.dropdownText}>Download Report Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() =>
                  handleDropdownAction('downloadCertificate', student)
                }
              >
                <Text style={styles.dropdownIcon}>📜</Text>
                <Text style={styles.dropdownText}>Download Certificate</Text>
              </TouchableOpacity>

              <View style={styles.dropdownDivider} />

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownAction('viewTimetable', student)}
              >
                <Text style={styles.dropdownIcon}>📅</Text>
                <Text style={styles.dropdownText}>View Timetable</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() =>
                  handleDropdownAction('attendanceReport', student)
                }
              >
                <Text style={styles.dropdownIcon}>📈</Text>
                <Text style={styles.dropdownText}>Attendance Report</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownAction('viewGrades', student)}
              >
                <Text style={styles.dropdownIcon}>🎓</Text>
                <Text style={styles.dropdownText}>View Grades</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownAction('contactParent', student)}
              >
                <Text style={styles.dropdownIcon}>📞</Text>
                <Text style={styles.dropdownText}>Contact Parent</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDropdownAction('editProfile', student)}
              >
                <Text style={styles.dropdownIcon}>✏️</Text>
                <Text style={styles.dropdownText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.contactContainer}>
          <Text style={styles.contactIcon}>📱</Text>
          <Text style={styles.contactText}>{student.parentContact}</Text>
          <Text style={styles.lastActive}>• {student.lastActive}</Text>
        </View>

        <View style={styles.subjectsContainer}>
          <Text style={styles.subjectsLabel}>Subjects:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.subjectsList}>
              {student.subjects.map((subject, index) => (
                <View key={index} style={styles.subjectChip}>
                  <Text style={styles.subjectText}>{subject}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValue,
                { color: getAttendanceColor(student.attendance) },
              ]}
            >
              {student.attendance}%
            </Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(student.status) },
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(student.status) },
                ]}
              >
                {student.status}
              </Text>
            </View>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
          <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
            Send Message
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Backdrop overlay for closing dropdowns */}
      {(activeDropdown || showClassDropdown || showSectionDropdown) && (
        <TouchableWithoutFeedback onPress={closeAllDropdowns}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Directory</Text>
        <Text style={styles.headerSubtitle}>
          {filteredStudents.length} students found
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, roll no, email, phone, subject, class, section, or status..."
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            placeholderTextColor="#9ca3af"
          />
          {searchKeyword.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchKeyword('')}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Class and Section Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.dropdownRow}>
          {/* Class Dropdown */}
          <View style={styles.dropdownWrapper}>
            <Text style={styles.filterLabel}>Class:</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => {
                setShowClassDropdown(!showClassDropdown);
                setShowSectionDropdown(false);
                setActiveDropdown(null);
              }}
            >
              <Text style={styles.dropdownButtonText}>{selectedClass}</Text>
              <Text style={styles.dropdownArrow}>
                {showClassDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showClassDropdown && (
              <View style={styles.dropdownMenu}>
                {classes.map(classItem => (
                  <TouchableOpacity
                    key={classItem}
                    style={[
                      styles.dropdownMenuItem,
                      selectedClass === classItem &&
                        styles.dropdownMenuItemActive,
                    ]}
                    onPress={() => {
                      setSelectedClass(classItem);
                      setShowClassDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownMenuText,
                        selectedClass === classItem &&
                          styles.dropdownMenuTextActive,
                      ]}
                    >
                      {classItem}
                    </Text>
                    {selectedClass === classItem && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Section Dropdown */}
          <View style={styles.dropdownWrapper}>
            <Text style={styles.filterLabel}>Section:</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => {
                setShowSectionDropdown(!showSectionDropdown);
                setShowClassDropdown(false);
                setActiveDropdown(null);
              }}
            >
              <Text style={styles.dropdownButtonText}>{selectedSection}</Text>
              <Text style={styles.dropdownArrow}>
                {showSectionDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showSectionDropdown && (
              <View style={styles.dropdownMenu}>
                {sections.map(section => (
                  <TouchableOpacity
                    key={section}
                    style={[
                      styles.dropdownMenuItem,
                      selectedSection === section &&
                        styles.dropdownMenuItemActive,
                    ]}
                    onPress={() => {
                      setSelectedSection(section);
                      setShowSectionDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownMenuText,
                        selectedSection === section &&
                          styles.dropdownMenuTextActive,
                      ]}
                    >
                      {section}
                    </Text>
                    {selectedSection === section && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Student List */}
      <FlatList
        data={filteredStudents}
        renderItem={({ item }) => <StudentCard student={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No students found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={8}
        getItemLayout={(data, index) => ({
          length: 250, // Approximate height of each card
          offset: 250 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  dropdownWrapper: {
    flex: 1,
    position: 'relative',
  },
  dropdownButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  dropdownMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownMenuItemActive: {
    backgroundColor: '#f0f9ff',
  },
  dropdownMenuText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdownMenuTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  filterContainer: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  filterScrollView: {
    flexGrow: 0,
  },
  filterChip: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  filterChipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  separator: {
    height: 16,
  },
  studentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  classSection: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 2,
  },
  rollNumber: {
    fontSize: 13,
    color: '#f59e0b',
    fontWeight: '500',
    marginBottom: 2,
  },
  studentEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  moreButton: {
    padding: 4,
    position: 'relative',
  },
  moreText: {
    fontSize: 20,
    color: '#9ca3af',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    minWidth: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 4,
  },
  overlay: {
    flex: 1,
  },
  cardBody: {
    marginBottom: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  contactText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  lastActive: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 8,
  },
  subjectsContainer: {
    marginBottom: 16,
  },
  subjectsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  subjectsList: {
    flexDirection: 'row',
  },
  subjectChip: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  subjectText: {
    fontSize: 12,
    color: '#0284c7',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default StudentView;

"use client"

import { useState, useEffect } from "react"
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
  Alert,
  Modal,
} from "react-native"

const { width } = Dimensions.get("window")

const StudentAttendance = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedClass, setSelectedClass] = useState("All")
  const [selectedSection, setSelectedSection] = useState("All")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [showClassDropdown, setShowClassDropdown] = useState(false)
  const [showSectionDropdown, setShowSectionDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [attendanceData, setAttendanceData] = useState({})
  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [selectedStudentReport, setSelectedStudentReport] = useState(null)

  // Sample student data with attendance records
  const students = [
    {
      id: 1,
      name: "Aarav Sharma",
      class: "10th",
      section: "A",
      rollNumber: "A001",
      email: "aarav.sharma@school.edu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      parentContact: "+91 98765 43210",
      attendanceHistory: {
        "2024-01-15": "Present",
        "2024-01-16": "Present",
        "2024-01-17": "Absent",
        "2024-01-18": "Present",
        "2024-01-19": "Present",
      },
      monthlyStats: {
        totalDays: 20,
        presentDays: 18,
        absentDays: 2,
        percentage: 90,
      },
    },
    {
      id: 2,
      name: "Priya Patel",
      class: "10th",
      section: "B",
      rollNumber: "B015",
      email: "priya.patel@school.edu",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      parentContact: "+91 87654 32109",
      attendanceHistory: {
        "2024-01-15": "Present",
        "2024-01-16": "Absent",
        "2024-01-17": "Present",
        "2024-01-18": "Present",
        "2024-01-19": "Absent",
      },
      monthlyStats: {
        totalDays: 20,
        presentDays: 15,
        absentDays: 5,
        percentage: 75,
      },
    },
    {
      id: 3,
      name: "Arjun Singh",
      class: "9th",
      section: "A",
      rollNumber: "A025",
      email: "arjun.singh@school.edu",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      parentContact: "+91 76543 21098",
      attendanceHistory: {
        "2024-01-15": "Present",
        "2024-01-16": "Present",
        "2024-01-17": "Present",
        "2024-01-18": "Present",
        "2024-01-19": "Present",
      },
      monthlyStats: {
        totalDays: 20,
        presentDays: 19,
        absentDays: 1,
        percentage: 95,
      },
    },
    {
      id: 4,
      name: "Kavya Reddy",
      class: "11th",
      section: "C",
      rollNumber: "C008",
      email: "kavya.reddy@school.edu",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      parentContact: "+91 65432 10987",
      attendanceHistory: {
        "2024-01-15": "Present",
        "2024-01-16": "Present",
        "2024-01-17": "Late",
        "2024-01-18": "Present",
        "2024-01-19": "Present",
      },
      monthlyStats: {
        totalDays: 20,
        presentDays: 17,
        absentDays: 2,
        percentage: 85,
      },
    },
    {
      id: 5,
      name: "Rohit Kumar",
      class: "9th",
      section: "B",
      rollNumber: "B012",
      email: "rohit.kumar@school.edu",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      parentContact: "+91 54321 09876",
      attendanceHistory: {
        "2024-01-15": "Absent",
        "2024-01-16": "Present",
        "2024-01-17": "Absent",
        "2024-01-18": "Present",
        "2024-01-19": "Present",
      },
      monthlyStats: {
        totalDays: 20,
        presentDays: 12,
        absentDays: 8,
        percentage: 60,
      },
    },
  ]

  const classes = ["All", "9th", "10th", "11th", "12th"]
  const sections = ["All", "A", "B", "C", "D"]
  const attendanceOptions = ["Present", "Absent", "Late", "Half Day", "Excused"]

  useEffect(() => {
    filterStudents()
    initializeAttendanceData()
  }, [searchKeyword, selectedClass, selectedSection])

  const initializeAttendanceData = () => {
    const initialData = {}
    students.forEach((student) => {
      initialData[student.id] = student.attendanceHistory[selectedDate] || "Not Marked"
    })
    setAttendanceData(initialData)
  }

  const filterStudents = () => {
    let filtered = students

    if (selectedClass !== "All") {
      filtered = filtered.filter((student) => student.class === selectedClass)
    }

    if (selectedSection !== "All") {
      filtered = filtered.filter((student) => student.section === selectedSection)
    }

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase().trim()
      filtered = filtered.filter((student) => {
        return (
          student.name.toLowerCase().includes(keyword) ||
          student.rollNumber.toLowerCase().includes(keyword) ||
          student.email.toLowerCase().includes(keyword)
        )
      })
    }

    setFilteredStudents(filtered)
  }

  const markAttendance = (studentId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const saveAttendance = () => {
    Alert.alert("Save Attendance", `Save attendance for ${selectedDate}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Save",
        onPress: () => {
          Alert.alert("Success", "Attendance saved successfully!")
        },
      },
    ])
  }

  const getAttendanceColor = (status) => {
    switch (status) {
      case "Present":
        return "#10b981"
      case "Absent":
        return "#ef4444"
      case "Late":
        return "#f59e0b"
      case "Half Day":
        return "#06b6d4"
      case "Excused":
        return "#8b5cf6"
      case "Not Marked":
        return "#6b7280"
      default:
        return "#6b7280"
    }
  }

  const getAttendancePercentageColor = (percentage) => {
    if (percentage >= 90) return "#10b981"
    if (percentage >= 75) return "#f59e0b"
    if (percentage >= 60) return "#f97316"
    return "#ef4444"
  }

  const calculateAttendanceTotals = () => {
    const totals = {
      Present: 0,
      Absent: 0,
      Late: 0,
      "Half Day": 0,
      Excused: 0,
      "Not Marked": 0,
    }

    filteredStudents.forEach((student) => {
      const status = attendanceData[student.id] || "Not Marked"
      totals[status] = (totals[status] || 0) + 1
    })

    return totals
  }

  const showStudentReport = (student) => {
    setSelectedStudentReport(student)
    setReportModalVisible(true)
  }

  const closeDropdowns = () => {
    setShowClassDropdown(false)
    setShowSectionDropdown(false)
  }

  const AttendanceCard = ({ student }) => (
    <View style={styles.attendanceCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentBasicInfo}>
          <Image source={{ uri: student.avatar }} style={styles.avatar} />
          <View style={styles.studentDetails}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.classInfo}>
              {student.class} - {student.section}
            </Text>
            <Text style={styles.rollNumber}>Roll: {student.rollNumber}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.reportButton} onPress={() => showStudentReport(student)}>
          <Text style={styles.reportButtonText}>📊</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: getAttendancePercentageColor(student.monthlyStats.percentage) }]}>
            {student.monthlyStats.percentage}%
          </Text>
          <Text style={styles.statLabel}>Monthly</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{student.monthlyStats.presentDays}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{student.monthlyStats.absentDays}</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
      </View>
    </View>
  )

  const StudentReportModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={reportModalVisible}
      onRequestClose={() => setReportModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Attendance Report</Text>
            <TouchableOpacity onPress={() => setReportModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          {selectedStudentReport && (
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.reportStudentInfo}>
                <Image source={{ uri: selectedStudentReport.avatar }} style={styles.reportAvatar} />
                <View>
                  <Text style={styles.reportStudentName}>{selectedStudentReport.name}</Text>
                  <Text style={styles.reportClassInfo}>
                    {selectedStudentReport.class} - Section {selectedStudentReport.section}
                  </Text>
                  <Text style={styles.reportRollNumber}>Roll: {selectedStudentReport.rollNumber}</Text>
                </View>
              </View>

              <View style={styles.reportStats}>
                <View style={styles.reportStatCard}>
                  <Text style={styles.reportStatValue}>{selectedStudentReport.monthlyStats.percentage}%</Text>
                  <Text style={styles.reportStatLabel}>Attendance Rate</Text>
                </View>
                <View style={styles.reportStatCard}>
                  <Text style={styles.reportStatValue}>{selectedStudentReport.monthlyStats.presentDays}</Text>
                  <Text style={styles.reportStatLabel}>Days Present</Text>
                </View>
                <View style={styles.reportStatCard}>
                  <Text style={styles.reportStatValue}>{selectedStudentReport.monthlyStats.absentDays}</Text>
                  <Text style={styles.reportStatLabel}>Days Absent</Text>
                </View>
              </View>

              <View style={styles.attendanceHistory}>
                <Text style={styles.historyTitle}>Recent Attendance</Text>
                {Object.entries(selectedStudentReport.attendanceHistory).map(([date, status]) => (
                  <View key={date} style={styles.historyItem}>
                    <Text style={styles.historyDate}>{date}</Text>
                    <View style={[styles.historyStatus, { backgroundColor: getAttendanceColor(status) }]}>
                      <Text style={styles.historyStatusText}>{status}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Attendance Report</Text>
        <Text style={styles.headerSubtitle}>
          {filteredStudents.length} students • {selectedDate}
        </Text>
      </View>

      {/* Main Content - Single ScrollView */}
      <ScrollView 
        style={styles.mainScrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={closeDropdowns}
      >
        {/* Date Selector */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Select Date:</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{selectedDate}</Text>
            <Text style={styles.dateArrow}>📅</Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search students..."
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              placeholderTextColor="#9ca3af"
            />
            {searchKeyword.length > 0 && (
              <TouchableOpacity onPress={() => setSearchKeyword("")} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Class and Section Filters */}
        <View style={styles.filtersContainer}>
          <View style={styles.dropdownRow}>
            <View style={styles.dropdownWrapper}>
              <Text style={styles.filterLabel}>Class:</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  setShowClassDropdown(!showClassDropdown)
                  setShowSectionDropdown(false)
                }}
              >
                <Text style={styles.dropdownButtonText}>{selectedClass}</Text>
                <Text style={styles.dropdownArrow}>{showClassDropdown ? "▲" : "▼"}</Text>
              </TouchableOpacity>
              {showClassDropdown && (
                <View style={styles.dropdownMenu}>
                  <ScrollView style={styles.dropdownScrollView} nestedScrollEnabled={true}>
                    {classes.map((classItem) => (
                      <TouchableOpacity
                        key={classItem}
                        style={[styles.dropdownMenuItem, selectedClass === classItem && styles.dropdownMenuItemActive]}
                        onPress={() => {
                          setSelectedClass(classItem)
                          setShowClassDropdown(false)
                        }}
                      >
                        <Text
                          style={[styles.dropdownMenuText, selectedClass === classItem && styles.dropdownMenuTextActive]}
                        >
                          {classItem}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.dropdownWrapper}>
              <Text style={styles.filterLabel}>Section:</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  setShowSectionDropdown(!showSectionDropdown)
                  setShowClassDropdown(false)
                }}
              >
                <Text style={styles.dropdownButtonText}>{selectedSection}</Text>
                <Text style={styles.dropdownArrow}>{showSectionDropdown ? "▲" : "▼"}</Text>
              </TouchableOpacity>
              {showSectionDropdown && (
                <View style={styles.dropdownMenu}>
                  <ScrollView style={styles.dropdownScrollView} nestedScrollEnabled={true}>
                    {sections.map((section) => (
                      <TouchableOpacity
                        key={section}
                        style={[styles.dropdownMenuItem, selectedSection === section && styles.dropdownMenuItemActive]}
                        onPress={() => {
                          setSelectedSection(section)
                          setShowSectionDropdown(false)
                        }}
                      >
                        <Text
                          style={[styles.dropdownMenuText, selectedSection === section && styles.dropdownMenuTextActive]}
                        >
                          {section}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Attendance Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.summaryScrollView}>
            {Object.entries(calculateAttendanceTotals()).map(([status, count]) => (
              <View key={status} style={[styles.summaryCard, { borderLeftColor: getAttendanceColor(status) }]}>
                <Text style={[styles.summaryCount, { color: getAttendanceColor(status) }]}>{count}</Text>
                <Text style={styles.summaryLabel}>{status}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Student List */}
        <View style={styles.listContainer}>
          {filteredStudents.map((student, index) => (
            <View key={student.id}>
              <AttendanceCard student={student} />
              {index < filteredStudents.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        {/* Bottom padding for save button */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Save Button - Fixed at bottom */}
      <View style={styles.saveContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveAttendance}>
          <Text style={styles.saveButtonText}>Save Attendance</Text>
        </TouchableOpacity>
      </View>

      <StudentReportModal />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  mainScrollView: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginRight: 12,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#374151",
    marginRight: 8,
  },
  dateArrow: {
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    color: "#374151",
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: "#9ca3af",
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  dropdownWrapper: {
    flex: 1,
    position: "relative",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#6b7280",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 150,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  dropdownScrollView: {
    maxHeight: 150,
  },
  dropdownMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownMenuItemActive: {
    backgroundColor: "#f0f9ff",
  },
  dropdownMenuText: {
    fontSize: 16,
    color: "#374151",
  },
  dropdownMenuTextActive: {
    color: "#2563eb",
    fontWeight: "600",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 16,
  },
  bottomPadding: {
    height: 100,
  },
  attendanceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  studentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  studentBasicInfo: {
    flexDirection: "row",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  classInfo: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
    marginBottom: 2,
  },
  rollNumber: {
    fontSize: 13,
    color: "#f59e0b",
    fontWeight: "500",
  },
  reportButton: {
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  reportButtonText: {
    fontSize: 20,
  },
  statsSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
  },
  saveContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  saveButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: "80%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#6b7280",
  },
  modalBody: {
    padding: 20,
  },
  reportStudentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  reportAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  reportStudentName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  reportClassInfo: {
    fontSize: 16,
    color: "#6366f1",
    fontWeight: "600",
    marginBottom: 2,
  },
  reportRollNumber: {
    fontSize: 14,
    color: "#f59e0b",
    fontWeight: "500",
  },
  reportStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  reportStatCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  reportStatValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  reportStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  attendanceHistory: {
    marginTop: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  historyDate: {
    fontSize: 16,
    color: "#374151",
  },
  historyStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historyStatusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  summaryContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  summaryScrollView: {
    paddingRight: 20,
  },
  summaryCard: {
    backgroundColor: "#f9fafb",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 60,
    alignItems: "center",
    borderLeftWidth: 3,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  summaryCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    fontWeight: "500",
  },
})

export default StudentAttendance

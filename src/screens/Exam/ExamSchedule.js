"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  Platform,
} from "react-native"

const { width } = Dimensions.get("window")

const ExamSchedule = () => {
  const [selectedTerm, setSelectedTerm] = useState("")
  const [selectedExam, setSelectedExam] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [showTermDropdown, setShowTermDropdown] = useState(false)
  const [showExamDropdown, setShowExamDropdown] = useState(false)
  const [showClassDropdown, setShowClassDropdown] = useState(false)
  const [showSectionDropdown, setShowSectionDropdown] = useState(false)
  const [examSchedule, setExamSchedule] = useState([])

  // Sample data
  const terms = ["First Term", "Second Term", "Third Term", "Final Term"]
  const exams = ["Unit Test 1", "Unit Test 2", "Mid Term", "Final Exam", "Pre-Board", "Board Exam"]
  const classes = ["9th", "10th", "11th", "12th"]
  const sections = ["A", "B", "C", "D"]

  // Sample exam schedule data
  const examScheduleData = {
    "First Term-Unit Test 1-10th-A": [
      {
        id: 1,
        date: "2024-02-15",
        day: "Monday",
        time: "09:00 AM - 12:00 PM",
        subject: "Mathematics",
        duration: "3 Hours",
        room: "Room 101",
        invigilator: "Mr. Sharma",
        maxMarks: 100,
        instructions: "Bring calculator and geometry box",
      },
      {
        id: 2,
        date: "2024-02-16",
        day: "Tuesday",
        time: "09:00 AM - 12:00 PM",
        subject: "Science",
        duration: "3 Hours",
        room: "Room 102",
        invigilator: "Ms. Patel",
        maxMarks: 100,
        instructions: "Practical exam will be conducted separately",
      },
      {
        id: 3,
        date: "2024-02-17",
        day: "Wednesday",
        time: "09:00 AM - 12:00 PM",
        subject: "English",
        duration: "3 Hours",
        room: "Room 103",
        invigilator: "Mrs. Singh",
        maxMarks: 100,
        instructions: "Dictionary not allowed",
      },
      {
        id: 4,
        date: "2024-02-18",
        day: "Thursday",
        time: "09:00 AM - 12:00 PM",
        subject: "Hindi",
        duration: "3 Hours",
        room: "Room 104",
        invigilator: "Mr. Kumar",
        maxMarks: 100,
        instructions: "Write in blue or black pen only",
      },
      {
        id: 5,
        date: "2024-02-19",
        day: "Friday",
        time: "09:00 AM - 12:00 PM",
        subject: "Social Studies",
        duration: "3 Hours",
        room: "Room 105",
        invigilator: "Ms. Gupta",
        maxMarks: 100,
        instructions: "Maps and atlas will be provided",
      },
    ],
  }

  useEffect(() => {
    loadExamSchedule()
  }, [selectedTerm, selectedExam, selectedClass, selectedSection])

  const loadExamSchedule = () => {
    if (selectedTerm && selectedExam && selectedClass && selectedSection) {
      const key = `${selectedTerm}-${selectedExam}-${selectedClass}-${selectedSection}`
      const schedule = examScheduleData[key] || []
      setExamSchedule(schedule)
    } else {
      setExamSchedule([])
    }
  }

  const closeAllDropdowns = () => {
    setShowTermDropdown(false)
    setShowExamDropdown(false)
    setShowClassDropdown(false)
    setShowSectionDropdown(false)
  }

  const getSubjectColor = (subject) => {
    const colors = {
      Mathematics: "#ef4444",
      Science: "#10b981",
      English: "#6366f1",
      Hindi: "#f59e0b",
      "Social Studies": "#8b5cf6",
      Physics: "#06b6d4",
      Chemistry: "#84cc16",
      Biology: "#f97316",
    }
    return colors[subject] || "#6b7280"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { day: "2-digit", month: "short", year: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const ExamCard = ({ exam }) => (
    <View style={styles.examCard}>
      <View style={styles.examHeader}>
        <View style={styles.dateSection}>
          <Text style={styles.examDate}>{formatDate(exam.date)}</Text>
          <Text style={styles.examDay}>{exam.day}</Text>
        </View>
        <View style={[styles.subjectBadge, { backgroundColor: getSubjectColor(exam.subject) }]}>
          <Text style={styles.subjectText}>{exam.subject}</Text>
        </View>
      </View>

      <View style={styles.examDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🕒</Text>
            <View>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{exam.time}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>⏱️</Text>
            <View>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{exam.duration}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🏫</Text>
            <View>
              <Text style={styles.detailLabel}>Room</Text>
              <Text style={styles.detailValue}>{exam.room}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>👨‍🏫</Text>
            <View>
              <Text style={styles.detailLabel}>Invigilator</Text>
              <Text style={styles.detailValue}>{exam.invigilator}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>📊</Text>
            <View>
              <Text style={styles.detailLabel}>Max Marks</Text>
              <Text style={styles.detailValue}>{exam.maxMarks}</Text>
            </View>
          </View>
        </View>

        {exam.instructions && (
          <View style={styles.instructionsSection}>
            <Text style={styles.instructionsLabel}>📝 Instructions:</Text>
            <Text style={styles.instructionsText}>{exam.instructions}</Text>
          </View>
        )}
      </View>
    </View>
  )

  const DropdownComponent = ({ label, value, options, isOpen, onToggle, onSelect, placeholder }) => (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.filterLabel}>{label}:</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={onToggle}>
        <Text style={[styles.dropdownButtonText, !value && styles.placeholderText]}>{value || placeholder}</Text>
        <Text style={styles.dropdownArrow}>{isOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.dropdownMenuItem, value === option && styles.dropdownMenuItemActive]}
              onPress={() => onSelect(option)}
            >
              <Text style={[styles.dropdownMenuText, value === option && styles.dropdownMenuTextActive]}>{option}</Text>
              {value === option && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )

  const allOptionsSelected = selectedTerm && selectedExam && selectedClass && selectedSection

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exam Schedule</Text>
        <Text style={styles.headerSubtitle}>Select filters to view exam schedule</Text>
      </View>

      {/* Filters */}
      <ScrollView style={styles.filtersScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.filtersContainer}>
          <View style={styles.dropdownRow}>
            <DropdownComponent
              label="Term"
              value={selectedTerm}
              options={terms}
              isOpen={showTermDropdown}
              onToggle={() => {
                setShowTermDropdown(!showTermDropdown)
                setShowExamDropdown(false)
                setShowClassDropdown(false)
                setShowSectionDropdown(false)
              }}
              onSelect={(term) => {
                setSelectedTerm(term)
                setShowTermDropdown(false)
              }}
              placeholder="Select Term"
            />

            <DropdownComponent
              label="Exam"
              value={selectedExam}
              options={exams}
              isOpen={showExamDropdown}
              onToggle={() => {
                setShowExamDropdown(!showExamDropdown)
                setShowTermDropdown(false)
                setShowClassDropdown(false)
                setShowSectionDropdown(false)
              }}
              onSelect={(exam) => {
                setSelectedExam(exam)
                setShowExamDropdown(false)
              }}
              placeholder="Select Exam"
            />
          </View>

          <View style={styles.dropdownRow}>
            <DropdownComponent
              label="Class"
              value={selectedClass}
              options={classes}
              isOpen={showClassDropdown}
              onToggle={() => {
                setShowClassDropdown(!showClassDropdown)
                setShowTermDropdown(false)
                setShowExamDropdown(false)
                setShowSectionDropdown(false)
              }}
              onSelect={(classItem) => {
                setSelectedClass(classItem)
                setShowClassDropdown(false)
              }}
              placeholder="Select Class"
            />

            <DropdownComponent
              label="Section"
              value={selectedSection}
              options={sections}
              isOpen={showSectionDropdown}
              onToggle={() => {
                setShowSectionDropdown(!showSectionDropdown)
                setShowTermDropdown(false)
                setShowExamDropdown(false)
                setShowClassDropdown(false)
              }}
              onSelect={(section) => {
                setSelectedSection(section)
                setShowSectionDropdown(false)
              }}
              placeholder="Select Section"
            />
          </View>
        </View>

        {/* Selection Summary */}
        {(selectedTerm || selectedExam || selectedClass || selectedSection) && (
          <View style={styles.selectionSummary}>
            <Text style={styles.summaryTitle}>Selected Filters:</Text>
            <View style={styles.summaryTags}>
              {selectedTerm && (
                <View style={styles.summaryTag}>
                  <Text style={styles.summaryTagText}>{selectedTerm}</Text>
                </View>
              )}
              {selectedExam && (
                <View style={styles.summaryTag}>
                  <Text style={styles.summaryTagText}>{selectedExam}</Text>
                </View>
              )}
              {selectedClass && (
                <View style={styles.summaryTag}>
                  <Text style={styles.summaryTagText}>Class {selectedClass}</Text>
                </View>
              )}
              {selectedSection && (
                <View style={styles.summaryTag}>
                  <Text style={styles.summaryTagText}>Section {selectedSection}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Exam Schedule */}
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeAllDropdowns}>
          {allOptionsSelected ? (
            examSchedule.length > 0 ? (
              <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleTitle}>
                  {selectedTerm} - {selectedExam} Schedule
                </Text>
                <Text style={styles.scheduleSubtitle}>
                  Class {selectedClass} - Section {selectedSection}
                </Text>
                <FlatList
                  data={examSchedule}
                  renderItem={({ item }) => <ExamCard exam={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={styles.listContainer}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
              </View>
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataIcon}>📅</Text>
                <Text style={styles.noDataTitle}>No Exam Schedule Found</Text>
                <Text style={styles.noDataText}>No exams are scheduled for the selected criteria.</Text>
              </View>
            )
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>Select All Filters</Text>
              <Text style={styles.emptyText}>
                Please select Term, Exam, Class, and Section to view the exam schedule.
              </Text>
              <View style={styles.progressIndicator}>
                <View style={styles.progressSteps}>
                  <View style={[styles.progressStep, selectedTerm && styles.progressStepActive]}>
                    <Text style={[styles.progressStepText, selectedTerm && styles.progressStepTextActive]}>1</Text>
                  </View>
                  <View style={styles.progressLine} />
                  <View style={[styles.progressStep, selectedExam && styles.progressStepActive]}>
                    <Text style={[styles.progressStepText, selectedExam && styles.progressStepTextActive]}>2</Text>
                  </View>
                  <View style={styles.progressLine} />
                  <View style={[styles.progressStep, selectedClass && styles.progressStepActive]}>
                    <Text style={[styles.progressStepText, selectedClass && styles.progressStepTextActive]}>3</Text>
                  </View>
                  <View style={styles.progressLine} />
                  <View style={[styles.progressStep, selectedSection && styles.progressStepActive]}>
                    <Text style={[styles.progressStepText, selectedSection && styles.progressStepTextActive]}>4</Text>
                  </View>
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabel}>Term</Text>
                  <Text style={styles.progressLabel}>Exam</Text>
                  <Text style={styles.progressLabel}>Class</Text>
                  <Text style={styles.progressLabel}>Section</Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
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
  filtersScrollView: {
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
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
  dropdownButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  placeholderText: {
    color: "#9ca3af",
    fontWeight: "400",
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
    maxHeight: 200,
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
  dropdownMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  checkmark: {
    fontSize: 16,
    color: "#2563eb",
    fontWeight: "bold",
  },
  selectionSummary: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  summaryTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  summaryTag: {
    backgroundColor: "#f0f9ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0f2fe",
  },
  summaryTagText: {
    fontSize: 14,
    color: "#0284c7",
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  progressIndicator: {
    alignItems: "center",
  },
  progressSteps: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  progressStepActive: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  progressStepText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6b7280",
  },
  progressStepTextActive: {
    color: "#ffffff",
  },
  progressLine: {
    width: 24,
    height: 2,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 8,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
  progressLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  noDataIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  noDataTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    textAlign: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  scheduleContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scheduleTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
    textAlign: "center",
  },
  scheduleSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  separator: {
    height: 16,
  },
  examCard: {
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
  examHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  dateSection: {
    flex: 1,
  },
  examDate: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  examDay: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  subjectBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  examDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailIcon: {
    fontSize: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  instructionsSection: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  instructionsLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  instructionsText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
})

export default ExamSchedule;

"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TextInput,
  Modal,
  FlatList,
  Alert,
  BackHandler,
} from "react-native"

const TransactionReport = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDateRange, setSelectedDateRange] = useState("This Month")

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      if (currentStep === 2) {
        setCurrentStep(1)
        setSelectedTransaction(null)
        return true
      } else if (currentStep === 1) {
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ])
        return true
      }
      return false
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
    return () => backHandler.remove()
  }, [currentStep])

  // Sample data
  const transactionCategories = [
    "All",
    "Fee Collection",
    "Teacher Salaries",
    "Inventory Sales",
    "Expenses",
    "Other Income",
  ]
  const dateRanges = ["Today", "This Week", "This Month", "Last Month", "Custom"]

  const financialSummary = {
    totalIncome: 2450000,
    totalExpenses: 1680000,
    netProfit: 770000,
    totalTransactions: 47,
  }

  // Monthly trend data for bar chart
  const monthlyData = [
    { month: "Oct", income: 180000, expense: 120000 },
    { month: "Nov", income: 220000, expense: 140000 },
    { month: "Dec", income: 245000, expense: 168000 },
  ]

  // Aggregated monthly transactions
  const transactions = [
    {
      id: 1,
      transactionId: "FC-JAN-2025",
      date: "January 2025",
      category: "Fee Collection",
      type: "Income",
      amount: 2850000,
      status: "Completed",
      description: "Monthly Fee Collection",
      details: "485 students • Avg: ₹5,876 per student",
      breakdown: {
        tuitionFee: 2100000,
        transportFee: 450000,
        hostelFee: 300000,
      },
      paymentModes: {
        online: 70,
        cash: 20,
        cheque: 10,
      },
    },
    {
      id: 2,
      transactionId: "SAL-JAN-2025",
      date: "January 2025",
      category: "Teacher Salaries",
      type: "Expense",
      amount: 1250000,
      status: "Completed",
      description: "Monthly Teacher Salaries",
      details: "28 teachers • Avg: ₹44,643 per teacher",
      breakdown: {
        basicSalary: 900000,
        allowances: 250000,
        bonus: 100000,
      },
      paymentModes: {
        bankTransfer: 100,
      },
    },
    {
      id: 3,
      transactionId: "INV-JAN-2025",
      date: "January 2025",
      category: "Inventory Sales",
      type: "Income",
      amount: 185000,
      status: "Completed",
      description: "Monthly Inventory Sales",
      details: "Books, Uniforms & Supplies",
      breakdown: {
        uniforms: 95000,
        books: 65000,
        supplies: 25000,
      },
      paymentModes: {
        cash: 60,
        online: 40,
      },
    },
    {
      id: 4,
      transactionId: "EXP-JAN-2025",
      date: "January 2025",
      category: "Expenses",
      type: "Expense",
      amount: 320000,
      status: "Completed",
      description: "Monthly Operational Expenses",
      details: "Utilities, Maintenance & Admin",
      breakdown: {
        electricity: 120000,
        maintenance: 100000,
        supplies: 60000,
        others: 40000,
      },
      paymentModes: {
        online: 80,
        cheque: 20,
      },
    },
    {
      id: 5,
      transactionId: "OTH-JAN-2025",
      date: "January 2025",
      category: "Other Income",
      type: "Income",
      amount: 75000,
      status: "Completed",
      description: "Other Income Sources",
      details: "Hall Rental, Events & Misc",
      breakdown: {
        hallRental: 45000,
        events: 20000,
        miscellaneous: 10000,
      },
      paymentModes: {
        cash: 50,
        online: 50,
      },
    },
  ]

  const DropdownModal = ({ visible, onClose, data, onSelect, title }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onSelect(item)
                  onClose()
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showDateRangeModal, setShowDateRangeModal] = useState(false)

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction)
    setCurrentStep(2)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Math.abs(amount))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#10b981"
      case "Pending":
        return "#f59e0b"
      case "Failed":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Fee Collection":
        return "#10b981"
      case "Teacher Salaries":
        return "#ef4444"
      case "Inventory Sales":
        return "#3b82f6"
      case "Expenses":
        return "#f59e0b"
      case "Other Income":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
  }

  // Simple Donut Chart Component
  const DonutChart = () => {
    const total = financialSummary.totalIncome + financialSummary.totalExpenses
    const incomePercentage = (financialSummary.totalIncome / total) * 100

    return (
      <View style={styles.donutContainer}>
        <View style={styles.donutChart}>
          <View style={styles.donutCenter}>
            <Text style={styles.donutCenterText}>₹{formatCurrency(financialSummary.netProfit)}</Text>
            <Text style={styles.donutCenterLabel}>Net Profit</Text>
          </View>
        </View>
        <View style={styles.donutLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#10b981" }]} />
            <Text style={styles.legendText}>Income {incomePercentage.toFixed(0)}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#ef4444" }]} />
            <Text style={styles.legendText}>Expense {(100 - incomePercentage).toFixed(0)}%</Text>
          </View>
        </View>
      </View>
    )
  }

  // Simple Bar Chart Component
  const BarChart = () => {
    const maxValue = Math.max(...monthlyData.map((d) => Math.max(d.income, d.expense)))

    return (
      <View style={styles.barChartContainer}>
        <Text style={styles.chartTitle}>3-Month Trend</Text>
        <View style={styles.barChart}>
          {monthlyData.map((data, index) => (
            <View key={index} style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.bar, styles.incomeBar, { height: (data.income / maxValue) * 40 }]} />
                <View style={[styles.bar, styles.expenseBar, { height: (data.expense / maxValue) * 40 }]} />
              </View>
              <Text style={styles.barLabel}>{data.month}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      !searchText ||
      transaction.description.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.details.toLowerCase().includes(searchText.toLowerCase())

    const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderStep1 = () => (
    <View style={styles.container}>
      {/* Compact Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Monthly Financial Report</Text>
        <Text style={styles.headerDate}>{selectedDateRange}</Text>
      </View>

      {/* Key Metrics - Smaller cards */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, styles.incomeCard]}>
          <Text style={styles.metricValue}>₹{formatCurrency(financialSummary.totalIncome)}</Text>
          <Text style={styles.metricLabel}>Total Income</Text>
          <Text style={styles.metricChange}>+12.5%</Text>
        </View>
        <View style={[styles.metricCard, styles.expenseCard]}>
          <Text style={styles.metricValue}>₹{formatCurrency(financialSummary.totalExpenses)}</Text>
          <Text style={styles.metricLabel}>Total Expenses</Text>
          <Text style={styles.metricChange}>+8.3%</Text>
        </View>
        <View style={[styles.metricCard, styles.profitCard]}>
          <Text style={styles.metricValue}>₹{formatCurrency(financialSummary.netProfit)}</Text>
          <Text style={styles.metricLabel}>Net Profit</Text>
          <Text style={styles.metricChange}>+18.7%</Text>
        </View>
      </View>

      {/* Charts Section - Smaller */}
      <View style={styles.chartsSection}>
        <DonutChart />
        <BarChart />
      </View>

      {/* Compact Filters */}
      <View style={styles.filtersRow}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search collections..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowCategoryModal(true)}>
          <Text style={styles.filterButtonText}>{selectedCategory}</Text>
        </TouchableOpacity>
      </View>

      {/* Monthly Collections List - Smaller cards */}
      <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
        {filteredTransactions.map((transaction) => (
          <TouchableOpacity
            key={transaction.id}
            style={styles.transactionItem}
            onPress={() => handleTransactionClick(transaction)}
          >
            <View style={styles.transactionLeft}>
              <View style={[styles.categoryIndicator, { backgroundColor: getCategoryColor(transaction.category) }]} />
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDesc}>{transaction.description}</Text>
                <Text style={styles.transactionDetails}>{transaction.details}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text
                style={[styles.transactionAmount, { color: transaction.type === "Income" ? "#10b981" : "#ef4444" }]}
              >
                {transaction.type === "Income" ? "+" : "-"}₹{formatCurrency(transaction.amount)}
              </Text>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(transaction.status) }]} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <DropdownModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        data={transactionCategories}
        onSelect={setSelectedCategory}
        title="Select Category"
      />
    </View>
  )

  const renderStep2 = () => (
    <View style={styles.container}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => setCurrentStep(1)} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.detailTitle}>Collection Details</Text>
      </View>

      <ScrollView style={styles.detailContent} showsVerticalScrollIndicator={false}>
        {/* Transaction Summary - Smaller */}
        <View style={styles.detailSummary}>
          <Text style={styles.transactionIdLarge}>{selectedTransaction?.transactionId}</Text>
          <Text style={styles.transactionDescLarge}>{selectedTransaction?.description}</Text>
          <Text
            style={[
              styles.transactionAmountLarge,
              { color: selectedTransaction?.type === "Income" ? "#10b981" : "#ef4444" },
            ]}
          >
            {selectedTransaction?.type === "Income" ? "+" : "-"}₹{formatCurrency(selectedTransaction?.amount || 0)}
          </Text>
          <Text style={styles.transactionDetailsLarge}>{selectedTransaction?.details}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(selectedTransaction?.category) }]}>
              <Text style={styles.categoryTagText}>{selectedTransaction?.category}</Text>
            </View>
            <View style={[styles.statusTag, { backgroundColor: getStatusColor(selectedTransaction?.status) }]}>
              <Text style={styles.statusTagText}>{selectedTransaction?.status}</Text>
            </View>
          </View>
        </View>

        {/* Breakdown Details */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Amount Breakdown</Text>
          {selectedTransaction?.breakdown &&
            Object.entries(selectedTransaction.breakdown).map(([key, value], index) => (
              <View key={index} style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </Text>
                <Text style={styles.breakdownValue}>₹{formatCurrency(value)}</Text>
              </View>
            ))}
        </View>

        {/* Payment Mode Distribution */}
        <View style={styles.paymentModeCard}>
          <Text style={styles.paymentModeTitle}>Payment Mode Distribution</Text>
          {selectedTransaction?.paymentModes &&
            Object.entries(selectedTransaction.paymentModes).map(([mode, percentage], index) => (
              <View key={index} style={styles.paymentModeRow}>
                <Text style={styles.paymentModeLabel}>
                  {mode.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </Text>
                <View style={styles.paymentModeBar}>
                  <View style={[styles.paymentModeProgress, { width: `${percentage}%` }]} />
                </View>
                <Text style={styles.paymentModePercentage}>{percentage}%</Text>
              </View>
            ))}
        </View>

        {/* Action Buttons - Smaller */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Download Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Export Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1e40af" barStyle="light-content" />
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    padding: 14,
  },

  // Header - Smaller
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  headerDate: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },

  // Metrics - Smaller cards
  metricsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
  incomeCard: {
    backgroundColor: "#f0fdf4",
    borderLeftWidth: 2,
    borderLeftColor: "#10b981",
  },
  expenseCard: {
    backgroundColor: "#fef2f2",
    borderLeftWidth: 2,
    borderLeftColor: "#ef4444",
  },
  profitCard: {
    backgroundColor: "#eff6ff",
    borderLeftWidth: 2,
    borderLeftColor: "#3b82f6",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 1,
  },
  metricChange: {
    fontSize: 9,
    color: "#10b981",
    fontWeight: "600",
  },

  // Charts - Smaller
  chartsSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  // Donut Chart - Smaller
  donutContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
  donutChart: {
    alignItems: "center",
    marginBottom: 8,
  },
  donutCenter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 6,
    borderColor: "#10b981",
  },
  donutCenterText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1e293b",
  },
  donutCenterLabel: {
    fontSize: 6,
    color: "#64748b",
  },
  donutLegend: {
    gap: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "500",
  },

  // Bar Chart - Smaller
  barChartContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  barChart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 50,
  },
  barGroup: {
    alignItems: "center",
    gap: 4,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 1,
  },
  bar: {
    width: 6,
    borderRadius: 3,
  },
  incomeBar: {
    backgroundColor: "#10b981",
  },
  expenseBar: {
    backgroundColor: "#ef4444",
  },
  barLabel: {
    fontSize: 8,
    color: "#64748b",
    fontWeight: "500",
  },

  // Filters - Smaller
  filtersRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 10,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  filterButton: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: "center",
  },
  filterButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  // Transactions - Smaller cards
  transactionsList: {
    flex: 1,
  },
  transactionItem: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 10,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 1,
  },
  transactionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryIndicator: {
    width: 3,
    height: 30,
    borderRadius: 1.5,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 1,
  },
  transactionDetails: {
    fontSize: 10,
    color: "#64748b",
    marginBottom: 1,
  },
  transactionDate: {
    fontSize: 9,
    color: "#94a3b8",
  },
  transactionRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  transactionAmount: {
    fontSize: 12,
    fontWeight: "700",
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  // Detail View - Smaller
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 14,
    color: "#1e40af",
    fontWeight: "600",
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },
  detailContent: {
    flex: 1,
  },
  detailSummary: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
  transactionIdLarge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 4,
  },
  transactionDescLarge: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  transactionAmountLarge: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  transactionDetailsLarge: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 12,
    textAlign: "center",
  },
  statusRow: {
    flexDirection: "row",
    gap: 6,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryTagText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusTagText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },

  // Breakdown Card
  breakdownCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  breakdownLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  breakdownValue: {
    fontSize: 12,
    color: "#1e293b",
    fontWeight: "600",
  },

  // Payment Mode Card
  paymentModeCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
  paymentModeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  paymentModeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  paymentModeLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "500",
    width: 80,
  },
  paymentModeBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
  },
  paymentModeProgress: {
    height: "100%",
    backgroundColor: "#1e40af",
    borderRadius: 3,
  },
  paymentModePercentage: {
    fontSize: 10,
    color: "#1e293b",
    fontWeight: "600",
    width: 30,
    textAlign: "right",
  },

  // Action Buttons - Smaller
  actionButtons: {
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#1e40af",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  secondaryButtonText: {
    color: "#1e40af",
    fontSize: 14,
    fontWeight: "600",
  },

  // Modal - Smaller
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "#1e293b",
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  modalItemText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "#1e40af",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  closeButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
})

export default TransactionReport;

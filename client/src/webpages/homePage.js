

import { useState, useEffect, useRef } from 'react'
import { Mail, MapPin, Phone, Star,MessageCircle, Settings, Activity, Clock, CheckCircle, Info, Home, FileText, Link, User} from 'lucide-react'
import Chart from 'chart.js/auto'
import { useNavigate } from 'react-router-dom'; 

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  
  const chartRefs = {
    monthlyProgress: useRef(null),
    skillDistribution: useRef(null),
    performanceMetrics: useRef(null),
    weeklyActivity: useRef(null),
    quarterlyPerformance: useRef(null),
    taskDistribution: useRef(null),
  }

  useEffect(() => {
    // Monthly Progress Chart
    const monthlyProgressCtx = chartRefs.monthlyProgress.current.getContext('2d')
    new Chart(monthlyProgressCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Progress',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })

    // Skill Distribution Chart
    const skillDistributionCtx = chartRefs.skillDistribution.current.getContext('2d')
    new Chart(skillDistributionCtx, {
      type: 'radar',
      data: {
        labels: ['Coding', 'Design', 'Communication', 'Problem Solving', 'Teamwork'],
        datasets: [{
          label: 'Skills',
          data: [85, 75, 90, 80, 70],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })

    // Performance Metrics Chart
    const performanceMetricsCtx = chartRefs.performanceMetrics.current.getContext('2d')
    new Chart(performanceMetricsCtx, {
      type: 'radar',
      data: {
        labels: ['Speed', 'Quality', 'Efficiency', 'Creativity', 'Collaboration'],
        datasets: [{
          label: 'Current',
          data: [80, 90, 85, 70, 75],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
        }, {
          label: 'Target',
          data: [90, 95, 90, 80, 85],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgb(255, 206, 86)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })

    // Weekly Activity Chart
    const weeklyActivityCtx = chartRefs.weeklyActivity.current.getContext('2d')
    new Chart(weeklyActivityCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Activity Hours',
          data: [8, 7, 9, 8, 7, 5, 3],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })

    // Quarterly Performance Chart
    const quarterlyPerformanceCtx = chartRefs.quarterlyPerformance.current.getContext('2d')
    new Chart(quarterlyPerformanceCtx, {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Performance',
          data: [75, 82, 90, 95],
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })

    // Task Distribution Chart
    const taskDistributionCtx = chartRefs.taskDistribution.current.getContext('2d')
    new Chart(taskDistributionCtx, {
      type: 'pie',
      data: {
        labels: ['Development', 'Design', 'Testing', 'Meetings', 'Learning'],
        datasets: [{
          data: [40, 20, 15, 15, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    })
  }, [])

  const handleProfileImageClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfileImage(e.target.result)
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: isDark ? '#0f172a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      fontFamily: 'Inter, sans-serif',
    },
    sidebar: {
        width: '240px',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '24px',
        height: '100vh',
        position: 'fixed',
        overflowY: 'auto',
        left: 0,
        top: 0,
      },
      sidebarLogo: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '24px',
        fontSize: '30px',
        fontWeight: 600,
      },
      logoIcon: {
        width: '70px',
        height: '70px',
        backgroundColor: '#000000',
        color: '#ffffff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        fontWeight: 600,
        marginLeft: '20px',
      },
      addButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#343840',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '24px',
        transition: 'background-color 0.2s',
      },
      navSection: {
        marginBottom: '24px',
      },
      navLabel: {
        fontSize: '12px',
        color: '#6b7280',
        marginBottom: '12px',
        fontWeight: 600,
        letterSpacing: '10px',
      },
      navButton: {
        width: '100%',
        padding: '10px 12px',
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '4px',
        transition: 'background-color 0.2s',
        height: '50px',
        fontSize: '16px',
      },
    main: {
      marginLeft: '260px',
      padding: '40px',
      width: 'calc(100% - 240px)',
    },
    profileSection: {
      marginBottom: '30px',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '40px',
      marginBottom: '24px',
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: isDark ? '#1e293b' : '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 600,
      cursor: 'pointer',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `2px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    profileName: {
      fontSize: '24px',
      fontWeight: 600,
    },
    profileDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginBottom: '32px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px',
    },
    statCard: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: isDark ? '#94a3b8' : '#64748b',
      marginBottom: '12px',
      padding: '16px',
      borderRadius: '8px',
      transition: 'all 0.2s',
      cursor: 'pointer',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
    },
    rating: {
      display: 'flex',
      gap: '4px',
      color: '#fbbf24',
    },
    graphsGrid: {
      display: 'grid',
      gap: '24px',
    },
    graphRow: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
    },
    graphCard: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    graphContent: {
      flex: 1,
      padding: '24px',
    },
    graphDetails: {
      flex: 1,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      borderRadius: '12px',
      border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      overflow: 'hidden',
      marginBottom: '24px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHeader: {
      padding: '24px 24px 0',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
    },
    cardContent: {
      padding: '24px',
    },
    tabs: {
      display: 'flex',
      flexDirection: 'column',
    },
    tabsList: {
      display: 'flex',
      borderBottom: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
      marginBottom: '16px',
    },
    tabsTrigger: {
      padding: '12px 24px',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s',
    },
    activeTabsTrigger: {
      borderBottomColor: '#3b82f6',
    },
    tabsContent: {
      display: 'none',
    },
    activeTabsContent: {
      display: 'block',
    },
    chartContainer: {
      width: '100%',
      height: '300px',
    },
  }
  const navigate = useNavigate(); // Get navigate function using useNavigate hook

  const handleContract = () => {
    navigate("/contract"); 
  };
  const handleConnect = () => {
    navigate("/connect"); 
  };

  return (
    
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIcon}>V</div>
          <span>Vyuha</span>
        </div>

        <button 
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2044b4'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#343840'
          }}
        >
        
        + Add New
        </button>

        <nav style={styles.navSection}>
          <div style={styles.navLabel}>PAGES</div>
          {[
            { icon: Home, label: 'Home' },
            { icon: FileText, label: 'Contract', onClick: handleContract },
            { icon: Link, label: 'Connect', onClick: handleConnect },
            { icon: User, label: 'Profile' },
            { icon: MessageCircle , label: 'Chat' },
            { icon: Settings , label: 'Settings' },
          ].map((item) => (
            
            <button
              key={item.label}
              style={{
                ...styles.navButton,
                backgroundColor: item.label === 'Profile' ? '#3b82f6' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (item.label !== 'Profile') {
                  e.currentTarget.style.backgroundColor = '#2044b4'
                }
              }}
              onMouseLeave={(e) => {
                if (item.label !== 'Profile') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>
        <div style={{
          ...styles.card,
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }
        }}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Profile</h2>
          </div>
          <div style={styles.cardContent}>
            <div style={styles.profileHeader}>
              <div 
                style={{
                  ...styles.avatar,
                  ...(profileImage ? { backgroundImage: `url(${profileImage})` } : {}),
                }}
                onClick={handleProfileImageClick}
              >
                {!profileImage && 'T'}
              </div>
              <div style={styles.profileInfo}>
                <h2 style={styles.profileName}>Tarush Nigam</h2>
                <div style={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#fbbf24" />
                  ))}
                </div>
                <div style={{...styles.profileDetail, color: '#4ade80'}}>5 years of work experience</div>
                <div style={{...styles.profileDetail, color: '#60a5fa'}}>Professional Guitarist</div>
                <div style={{...styles.profileDetail, color: '#f472b6'}}>
                  <Info size={16} />
                  <span>Passionate musician and tech enthusiast</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          ...styles.card,
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }
        }}>
          <div style={styles.cardContent}>
            <div style={styles.tabs}>
              <div style={styles.tabsList}>
                <div 
                  style={{
                    ...styles.tabsTrigger,
                    ...(activeTab === 'info' ? styles.activeTabsTrigger : {}),
                  }}
                  onClick={() => setActiveTab('info')}
                >
                  Contact Information
                </div>
                <div 
                  style={{
                    ...styles.tabsTrigger,
                    ...(activeTab === 'stats' ? styles.activeTabsTrigger : {}),
                  }}
                  onClick={() => setActiveTab('stats')}
                >
                  Statistics
                </div>
              </div>
              <div style={{
                ...styles.tabsContent,
                ...(activeTab === 'info' ? styles.activeTabsContent : {}),
              }}>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <Mail size={20} />
                    <span>tarush.nigam@example.com</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Phone size={20} />
                    <span>+91 98765 43210</span>
                  </div>
                  <div style={styles.infoItem}>
                    <MapPin size={20} />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                  <div style={styles.infoItem}>
                    <Activity size={20} />
                    <span>Active since Jan 2024</span>
                  </div>
                </div>
              </div>
              <div style={{
                ...styles.tabsContent,
                ...(activeTab === 'stats' ? styles.activeTabsContent : {}),
              }}>
                <div style={styles.statsGrid}>
                  {[
                    { title: 'Past Records', value: '24', description: 'Completed projects', icon: Activity },
                    { title: 'Current Account', value: '₹45,231', description: 'Balance', icon: Activity },
                    { title: 'Pending', value: '7', description: 'Transactions', icon: Clock },
                    { title: 'Completed', value: '129', description: 'Transactions', icon: CheckCircle },
                  ].map((stat, index) => (
                    <div key={index} style={{
                      ...styles.statCard,
                      ':hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      }
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                        <span style={{fontSize: '14px', fontWeight: 500}}>{stat.title}</span>
                        <stat.icon size={16} style={{color: isDark ? '#94a3b8' : '#64748b'}} />
                      </div>
                      <div style={{fontSize: '24px', fontWeight: 700}}>{stat.value}</div>
                      <p style={{fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b'}}>{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Graphs Section */}
        <div style={{
          ...styles.card,
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }
        }}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Performance Graphs</h2>
          </div>
          <div style={styles.cardContent}>
            <div style={styles.graphsGrid}>
              {/* Row 1 */}
              <div style={styles.graphRow}>
                <div style={{
                  ...styles.graphCard,
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }
                }}>
                  <div style={styles.graphContent}>
                    <h3 style={styles.cardTitle}>Monthly Progress</h3>
                    <div style={styles.chartContainer}>
                      <canvas ref={chartRefs.monthlyProgress}></canvas>
                    </div>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Linear Graph</h4>
                    <p>Shows the monthly progress over time. The upward trend indicates consistent improvement in performance.</p>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div style={styles.graphRow}>
                <div style={{
                  ...styles.graphCard,
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }
                }}>
                  <div style={styles.graphContent}>
                    <h3 style={styles.cardTitle}>Skill Distribution</h3>
                    <div style={styles.chartContainer}>
                      <canvas ref={chartRefs.skillDistribution}></canvas>
                    </div>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Radar Graph</h4>
                    <p>Illustrates the distribution of skills across different areas. The length of each spoke represents the proficiency level in that skill.</p>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div style={styles.graphRow}>
                <div style={{
                  ...styles.graphCard,
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }
                }}>
                  <div style={styles.graphContent}>
                    <h3 style={styles.cardTitle}>Performance Metrics</h3>
                    <div style={styles.chartContainer}>
                      <canvas ref={chartRefs.performanceMetrics}></canvas>
                    </div>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Radar Graph</h4>
                    <p>Displays performance across multiple dimensions. Each spoke represents a different metric, allowing for a comprehensive view of overall performance.</p>
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div style={styles.graphRow}>
                <div style={{
                  ...styles.graphCard,
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }
                }}>
                  <div style={styles.graphContent}>
                    <h3 style={styles.cardTitle}>Weekly Activity</h3>
                    <div style={styles.chartContainer}>
                      <canvas ref={chartRefs.weeklyActivity}></canvas>
                    </div>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Bar Graph</h4>
                    <p>Shows activity levels for each day of the week. The height of each bar represents the amount of activity on that day.</p>
                  </div>
                </div>
              </div>

              {/* Additional graphs */}
              <div style={styles.graphRow}>
                <div style={{
                  ...styles.graphCard,
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }
                }}>
                  <div style={styles.graphContent}>
                    <h3 style={styles.cardTitle}>Quarterly Performance</h3>
                    <div style={styles.chartContainer}>
                      <canvas ref={chartRefs.quarterlyPerformance}></canvas>
                    </div>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Area Graph</h4>
                    <p>Visualizes the quarterly performance trend. The filled area under the line emphasizes the cumulative nature of the data.</p>
                  </div>
                </div>
                <div style={{
                  ...styles.graphCard,
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }
                }}>
                  <div style={styles.graphContent}>
                    <h3 style={styles.cardTitle}>Task Distribution</h3>
                    <div style={styles.chartContainer}>
                      <canvas ref={chartRefs.taskDistribution}></canvas>
                    </div>
                  </div>
                  <div style={styles.graphDetails}>
                    <h4>Pie Chart</h4>
                    <p>Represents the distribution of tasks across different categories. Each slice of the pie corresponds to a proportion of the total workload.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

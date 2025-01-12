import React, { useState, useRef } from 'react';
import { Moon, Bell, Globe2, Shield, KeyRound, Smartphone, Mail, Eye, UserPlus, LogOut, Pencil, User } from 'lucide-react';

function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false,
    pushNotifications: true,
    autoTranslation: false,
    privacyMode: false,
    twoFactor: false,
    mobileNotifications: true,
    emailNotifications: true,
    onlineStatus: true
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  const toggleSetting = (setting) => {
    if (setting === 'darkMode') {
      setIsDarkMode(!isDarkMode);
      document.body.style.backgroundColor = !isDarkMode ? '#1a1a1a' : '#ffffff';
    }
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    profileSection: {
      backgroundColor: isDarkMode ? '#333' : '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    avatar: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      cursor: 'pointer',
      overflow: 'hidden',
      color: isDarkMode ? '#fff' : '#666',
    },
    profileInfo: {
      flex: 1,
    },
    nameSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    name: {
      margin: '0',
      fontSize: '20px',
      fontWeight: '600',
    },
    subtitle: {
      margin: '4px 0 0',
      color: isDarkMode ? '#aaa' : '#666',
      fontSize: '14px',
    },
    settingsSection: {
      backgroundColor: isDarkMode ? '#333' : '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    settingItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: `1px solid ${isDarkMode ? '#444' : '#f0f0f0'}`,
    },
    settingLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    toggle: {
      width: '44px',
      height: '24px',
      backgroundColor: '#e0e0e0',
      borderRadius: '12px',
      padding: '2px',
      cursor: 'pointer',
      position: 'relative',
    },
    toggleActive: {
      backgroundColor: '#8015e3',
    },
    toggleHandle: {
      width: '20px',
      height: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '50%',
      transition: 'transform 0.2s',
      transform: 'translateX(0)',
    },
    toggleHandleActive: {
      transform: 'translateX(20px)',
    },
    button: {
      width: '100%',
      padding: '12px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    addAccountButton: {
      backgroundColor: 'transparent',
      border: `1px solid ${isDarkMode ? '#444' : '#e0e0f0'}`,
      color: isDarkMode ? '#fff' : '#000',
    },
    signOutButton: {
      backgroundColor: '#FF3B30',
      color: '#ffffff',
    },
    icon: {
      width: '20px',
      height: '20px',
      color: isDarkMode ? '#fff' : '#666',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileSection}>
        <div style={styles.profileHeader}>
          <div 
            style={styles.avatar}
            onClick={() => fileInputRef.current?.click()}
          >
            {profilePic ? (
              <img 
                src={profilePic} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <User style={{ width: '32px', height: '32px' }} />
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleProfilePicUpload} 
            style={{ display: 'none' }} 
            accept="image/*"
          />
          <div style={styles.profileInfo}>
            <div style={styles.nameSection}>
              <h1 style={styles.name}>Tarush Nigam</h1>
              <Pencil style={{ ...styles.icon, cursor: 'pointer' }} />
            </div>
            <p style={styles.subtitle}>Manage your account settings</p>
          </div>
        </div>
      </div>

      <div style={styles.settingsSection}>
        <h2 style={{ margin: '0 0 8px', fontSize: '24px' }}>Settings</h2>
        <p style={{ color: isDarkMode ? '#aaa' : '#666', marginBottom: '24px' }}>
          Configure your preferences and account settings.
        </p>

        {Object.entries(settings).map(([key, value]) => (
          <div key={key} style={styles.settingItem}>
            <div style={styles.settingLabel}>
              {getIcon(key, styles.icon)}
              <span>{getSettingLabel(key)}</span>
            </div>
            <div 
              style={{
                ...styles.toggle,
                ...(value ? styles.toggleActive : {})
              }}
              onClick={() => toggleSetting(key)}
            >
              <div 
                style={{
                  ...styles.toggleHandle,
                  ...(value ? styles.toggleHandleActive : {})
                }}
              />
            </div>
          </div>
        ))}

        <button style={{ ...styles.button, ...styles.addAccountButton }}>
          <UserPlus style={styles.icon} />
          Add Another Account
        </button>
        <button style={{ ...styles.button, ...styles.signOutButton }}>
          <LogOut style={{ ...styles.icon, color: '#fff' }} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

function getIcon(setting, style) {
  switch (setting) {
    case 'darkMode': return <Moon style={style} />;
    case 'pushNotifications': return <Bell style={style} />;
    case 'autoTranslation': return <Globe2 style={style} />;
    case 'privacyMode': return <Shield style={style} />;
    case 'twoFactor': return <KeyRound style={style} />;
    case 'mobileNotifications': return <Smartphone style={style} />;
    case 'emailNotifications': return <Mail style={style} />;
    case 'onlineStatus': return <Eye style={style} />;
    default: return null;
  }
}

function getSettingLabel(setting) {
  switch (setting) {
    case 'darkMode': return 'Dark Mode';
    case 'pushNotifications': return 'Push Notifications';
    case 'autoTranslation': return 'Enable Auto-Translation';
    case 'privacyMode': return 'Enhanced Privacy Mode';
    case 'twoFactor': return 'Two-Factor Authentication';
    case 'mobileNotifications': return 'Mobile Notifications';
    case 'emailNotifications': return 'Email Notifications';
    case 'onlineStatus': return 'Show Online Status';
    default: return setting;
  }
}

export default SettingsPage;


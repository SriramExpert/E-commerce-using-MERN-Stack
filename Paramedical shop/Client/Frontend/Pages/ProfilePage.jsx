import React, { useState } from 'react';
import '../CSS/ProfileDetails.css';

const ProfilePage= () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 32,
    gender: 'Male',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 15, 2021',
    membership: 'Premium',
    status: 'Active'
  });

  const [activities, setActivities] = useState([
    {
      action: 'Password changed',
      time: '2 hours ago',
      device: 'iPhone 13 Pro'
    },
    {
      action: 'Order placed: ORD-7892',
      time: '3 days ago',
      device: 'Desktop Chrome'
    },
    {
      action: 'Profile information updated',
      time: '1 week ago',
      device: 'Samsung Galaxy S21'
    },
    {
      action: 'Payment method added',
      time: '2 weeks ago',
      device: 'Desktop Chrome'
    }
  ]);

  return (
    <div className="profile-details-container">
      <div className="profile-header">
        <h1>Profile Details</h1>
        <p>Manage your personal information, account settings, and review your activity</p>
      </div>

      <div className="profile-content">
        {/* Left Column - Profile Image & Personal Info */}
        <div className="profile-left-column">
          <div className="profile-card">
            <div className="profile-image-section">
              <div className="profile-image">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
                  alt="Profile" 
                />
                <button className="change-photo-btn">
                  <i className="fas fa-camera"></i> Change Photo
                </button>
              </div>
            </div>

            <div className="personal-info">
              <h3>Personal Information</h3>
              
              <div className="info-group">
                <label>Full Name</label>
                <div className="info-value">{user.name}</div>
              </div>
              
              <div className="info-group">
                <label>Email Address</label>
                <div className="info-value">{user.email}</div>
              </div>
              
              <div className="info-group">
                <label>Age</label>
                <div className="info-value">{user.age} years</div>
              </div>
              
              <div className="info-group">
                <label>Gender</label>
                <div className="info-value">{user.gender}</div>
              </div>
              
              <div className="info-group">
                <label>Phone Number</label>
                <div className="info-value">{user.phone}</div>
              </div>

              <button className="edit-profile-btn">
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Account Info, Activities & Orders */}
        <div className="profile-right-column">
          {/* Account Information Card */}
          <div className="info-card">
            <h3>Account Information</h3>
            
            <div className="account-details">
              <div className="account-detail">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">{user.joinDate}</span>
              </div>
              
              <div className="account-detail">
                <span className="detail-label">Membership Tier</span>
                <span className="detail-value premium">{user.membership}</span>
              </div>
              
              <div className="account-detail">
                <span className="detail-label">Account Status</span>
                <span className="detail-value active">{user.status}</span>
              </div>
              
              <div className="account-detail">
                <span className="detail-label">Language</span>
                <span className="detail-value">English (US)</span>
              </div>
            </div>
          </div>

          {/* Recent Activities Card */}
          <div className="info-card">
            <h3>Recent Activities</h3>
            
            <div className="activities-list">
              {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="activity-details">
                    <p className="activity-action">{activity.action}</p>
                    <div className="activity-meta">
                      <span className="activity-time">{activity.time}</span>
                      <span className="activity-device">{activity.device}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="view-all-btn">
              View All Activities <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
import React from 'react';
import { Award, ShieldCheck, Edit2 } from 'lucide-react';

const ProfileView = () => {
  return (
    <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Bio Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e0d8d0', border: '3px solid var(--bg-color)' }} />
          <div style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: 'var(--success-color)', color: 'white', padding: '4px', borderRadius: '50%', border: '2px solid var(--bg-color)' }}>
            <ShieldCheck size={16} />
          </div>
        </div>
        <h2 style={{ margin: '0 0 4px 0' }}>Tanika G.</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Computer Science • Junior</p>
        <div style={{ backgroundColor: 'rgba(85, 128, 94, 0.1)', color: 'var(--success-color)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', marginTop: '8px', display: 'inline-block' }}>
          Verified Campus Email
        </div>
      </div>

      {/* Skill Wallet */}
      <div style={{ backgroundColor: 'var(--accent-color)', color: 'white', padding: '20px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 20px rgba(56, 48, 42, 0.2)' }}>
        <div>
          <h3 style={{ fontSize: '14px', margin: '0 0 8px 0', opacity: 0.9, fontWeight: 400 }}>Skill Wallet</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 'bold' }}>14</span>
            <span style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.2 }}>Successful<br/>Swaps</span>
          </div>
        </div>
        <Award size={48} opacity={0.2} />
      </div>

      {/* Offers & Wants */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', margin: 0 }}>I can offer</h3>
            <button style={{ color: 'var(--text-secondary)' }}><Edit2 size={16} /></button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ padding: '6px 12px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', fontSize: '14px', border: '1px solid var(--border-color)' }}>React.js</span>
            <span style={{ padding: '6px 12px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', fontSize: '14px', border: '1px solid var(--border-color)' }}>Guitar Basics</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', margin: 0 }}>I want to learn</h3>
            <button style={{ color: 'var(--text-secondary)' }}><Edit2 size={16} /></button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ padding: '6px 12px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', fontSize: '14px', border: '1px solid var(--border-color)' }}>Machine Learning</span>
            <span style={{ padding: '6px 12px', backgroundColor: 'var(--bg-color)', borderRadius: '12px', fontSize: '14px', border: '1px solid var(--border-color)' }}>Conversational French</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileView;

import React from 'react';

const mockChats = [
  { id: 1, name: "Liam P.", msg: "Let's meet at the library at 5?", time: "10m", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam", unread: true },
  { id: 2, name: "Sophia R.", msg: "Thanks for the Python help!", time: "2h", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia", unread: false },
  { id: 3, name: "Arjun D.", msg: "I can bring my extra rook.", time: "1d", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun", unread: false }
];

const ChatView = () => {
  return (
    <div>
      {/* Matches (Horizontal scroll would go here, omitting for simplicity) */}
      <div style={{ padding: '16px 16px 8px 16px' }}>
        <h3 style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>New Matches</h3>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
          {[1,2,3,4].map(num => (
            <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--accent-color)', padding: '2px' }}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Match${num}`} style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#eee' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '8px 16px' }}></div>

      {/* Messages List */}
      <div style={{ padding: '8px 16px' }}>
        <h3 style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Messages</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {mockChats.map(chat => (
            <div key={chat.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', cursor: 'pointer' }}>
              <img src={chat.img} style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#eee' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: chat.unread ? '600' : '500', fontSize: '16px' }}>{chat.name}</span>
                  <span style={{ fontSize: '12px', color: chat.unread ? 'var(--accent-color)' : 'var(--text-secondary)' }}>{chat.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: chat.unread ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
                  {chat.msg}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatView;

import { useState } from 'react';
import { MessageSquare, Megaphone, Repeat, Map as MapIcon, User } from 'lucide-react';
import SwapView from './views/SwapView';
import ShoutoutView from './views/ShoutoutView';
import MapView from './views/MapView';
import ProfileView from './views/ProfileView';
import ChatView from './views/ChatView';
import './App.css'; 

const initialShoutouts = [
  // Mock X,Y coordinates (percentages) roughly pointing to campus areas
  { id: 1, user: "Ananya", text: "Anyone up for a quick game of chess at the SAC?", time: "2 mins ago", type: 'open', x: 28, y: 65, category: 'chess' },
  { id: 2, user: "Kabir", text: "Stuck on the fluid mechanics assignment, need 1 study buddy pls", time: "15 mins ago", type: 'limited', limit: 1, replies: 0, x: 48, y: 45, category: 'study' },
  { id: 3, user: "Meera", text: "Acoustic jam near the gazebo at 7 PM! Bring an instrument.", time: "1 hour ago", type: 'open', x: 70, y: 55, category: 'guitar' },
];

function App() {
  const [activeTab, setActiveTab] = useState('swap');
  const [shoutouts, setShoutouts] = useState(initialShoutouts);

  const handleReply = (postId) => {
    setShoutouts(prev => {
      const updated = prev.map(post => {
        if (post.id === postId) {
          if (post.type === 'limited') {
            return { ...post, replies: post.replies + 1 };
          }
        }
        return post;
      });
      // Filter out limited posts that have reached their capacity
      return updated.filter(post => {
        if (post.type === 'limited' && post.replies >= post.limit) {
          return false;
        }
        return true;
      });
    });
  };

  const renderView = () => {
    switch (activeTab) {
      case 'chat': return <ChatView />;
      case 'shoutout': return <ShoutoutView shoutouts={shoutouts} setShoutouts={setShoutouts} navigateTo={(tab) => setActiveTab(tab)} handleReply={handleReply} />;
      case 'swap': return <SwapView />;
      case 'map': return <MapView shoutouts={shoutouts} handleReply={handleReply} />;
      case 'profile': return <ProfileView />;
      default: return <SwapView />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'chat': return 'Chats';
      case 'shoutout': return 'Shoutouts';
      case 'swap': return 'BartR';
      case 'map': return 'Campus Map';
      case 'profile': return 'Profile';
      default: return 'BartR';
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>{getHeaderTitle()}</h1>
      </div>

      <div className="view-content">
        {renderView()}
      </div>

      <div className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare size={24} />
          <span>Chat</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'shoutout' ? 'active' : ''}`}
          onClick={() => setActiveTab('shoutout')}
        >
          <Megaphone size={24} />
          <span>Shoutout</span>
        </button>
        <button 
          className={`nav-item swap-nav-item ${activeTab === 'swap' ? 'active' : ''}`}
          onClick={() => setActiveTab('swap')}
        >
          <Repeat size={28} />
        </button>
        <button 
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <MapIcon size={24} />
          <span>Map</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={24} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}

export default App;

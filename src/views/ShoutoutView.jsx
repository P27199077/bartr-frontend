import React, { useState } from 'react';
import { Send, Clock, Users, MapPin, X } from 'lucide-react';

const ShoutoutView = ({ shoutouts, setShoutouts, navigateTo, handleReply }) => {
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState("open"); 
  const [participantLimit, setParticipantLimit] = useState(1);
  const [postLocation, setPostLocation] = useState(null); // {x, y}
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      user: "You",
      text: newPost,
      time: "Just now",
      type: postType,
      ...(postType === 'limited' ? { limit: participantLimit, replies: 0 } : {}),
      ...(postLocation ? { x: postLocation.x, y: postLocation.y } : {})
    };
    
    setShoutouts([post, ...shoutouts]);
    
    setNewPost("");
    setPostType("open");
    setParticipantLimit(1);
    setPostLocation(null);
  };

  const handleMapClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPostLocation({ x, y });
    setIsMapModalOpen(false);
  };

  return (
    <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Create Post Area */}
      <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <form onSubmit={handlePost} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea 
            placeholder="What's happening? (e.g. Badminton at 5?)"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{ width: '100%', border: 'none', resize: 'none', fontFamily: 'inherit', fontSize: '16px', outline: 'none', backgroundColor: 'transparent' }}
            rows={2}
          />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input type="radio" checked={postType === 'open'} onChange={() => setPostType('open')} style={{ accentColor: 'var(--accent-color)' }} /> Open Invite
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input type="radio" checked={postType === 'limited'} onChange={() => setPostType('limited')} style={{ accentColor: 'var(--accent-color)' }} /> Limited
                </label>

                {postType === 'limited' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={14} color="var(--text-secondary)" />
                    <input type="number" min="1" max="99" value={participantLimit} onChange={(e) => setParticipantLimit(parseInt(e.target.value) || 1)} style={{ width: '40px', padding: '4px', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '13px' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: postLocation ? 'var(--success-color)' : 'var(--text-secondary)', padding: '6px 12px', borderRadius: '12px', border: `1px solid ${postLocation ? 'var(--success-color)' : 'var(--border-color)'}`, backgroundColor: postLocation ? 'rgba(85, 128, 94, 0.1)' : 'transparent' }}
                >
                  <MapPin size={14} />
                  {postLocation ? "Location Pinned!" : "Drop Pin"}
                  {postLocation && <X size={12} onClick={(e) => { e.stopPropagation(); setPostLocation(null); }} style={{ marginLeft: '4px' }}/>}
                </button>

                <button 
                  type="submit"
                  disabled={!newPost.trim()}
                  style={{ backgroundColor: newPost.trim() ? 'var(--accent-color)' : 'var(--border-color)', color: 'white', padding: '8px 24px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s', fontWeight: '500' }}
                >
                  Post <Send size={16} />
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>

      {/* Feed */}
      <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Live Nearby</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {shoutouts.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No active shoutouts yet. Start one!</p>}
        {shoutouts.map(post => (
          <div key={post.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {post.user}
                {post.type === 'limited' && (
                  <span style={{ fontSize: '11px', backgroundColor: 'var(--bg-color)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={10} /> {post.limit - post.replies} spots left
                  </span>
                )}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {post.time}
              </span>
            </div>
            
            <p style={{ fontSize: '15px', lineHeight: '1.4' }}>{post.text}</p>
            
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               {post.x && post.y ? (
                 <button onClick={() => navigateTo('map')} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> View on Map
                 </button>
               ) : <div />}
              <button 
                onClick={() => handleReply(post.id)} 
                style={{ fontSize: '13px', color: 'var(--accent-color)', fontWeight: '600' }}
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Map Modal */}
      {isMapModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ width: '100%', maxWidth: '440px', backgroundColor: 'var(--bg-color)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Drop a pin</h3>
              <button onClick={() => setIsMapModalOpen(false)}><X size={20} /></button>
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', backgroundColor: '#e8e4db' }}>
               <img 
                 src="/campus_map_base.png" 
                 alt="Campus Map" 
                 style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'crosshair' }} 
                 onClick={handleMapClick}
               />
               <p style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: '16px', fontSize: '12px', fontWeight: '500', pointerEvents: 'none', textAlign: 'center', width: '80%' }}>
                 Click anywhere on the map to place your event.
               </p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ShoutoutView;

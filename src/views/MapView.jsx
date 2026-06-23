import React, { useState } from 'react';
import { MapPin, Users } from 'lucide-react';

const MapView = ({ shoutouts, handleReply }) => {
  const [activePin, setActivePin] = useState(null);

  // Filter shoutouts that actually have a location
  const mapEvents = shoutouts.filter(s => s.x && s.y);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', flexShrink: 0, zIndex: 10, borderBottom: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Interactive campus map. Tap a ping to see the shoutout details!
        </p>
      </div>

      {/* Map Container */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#e8e4db' }}>
        
        {/* We use an image that covers the area or allows panning. For MVP, we'll cover to fit the phone screen nicely */}
        <img 
          src="/campus_map_base.png" 
          alt="Strava style campus map"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Render Pings */}
        {mapEvents.map(event => (
          <div 
            key={event.id}
            onClick={() => setActivePin(activePin === event.id ? null : event.id)}
            style={{
              position: 'absolute',
              left: `${event.x}%`,
              top: `${event.y}%`,
              transform: 'translate(-50%, -100%)', // Center bottom of pin to coordinate
              cursor: 'pointer',
              zIndex: activePin === event.id ? 100 : 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Tooltip */}
            {activePin === event.id && (
              <div style={{ 
                backgroundColor: 'white', 
                padding: '16px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginBottom: '8px',
                width: '200px',
                border: '1px solid var(--border-color)',
                position: 'relative',
                animation: 'fadeIn 0.2s ease-out'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600', fontSize: '14px' }}>{event.user}</span>
                  {event.type === 'limited' && (
                    <span style={{ fontSize: '10px', backgroundColor: 'var(--bg-color)', color: 'var(--text-secondary)', padding: '2px 4px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Users size={8} /> {event.limit - event.replies} spots
                    </span>
                  )}
                </div>
                
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>{event.text}</div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // prevent closing tooltip
                    handleReply(event.id);
                  }}
                  style={{ width: '100%', backgroundColor: 'var(--accent-color)', color: 'white', padding: '6px 0', borderRadius: '16px', fontSize: '12px', fontWeight: '500' }}
                >
                  Reply
                </button>

                {/* Small triangle arrow at bottom */}
                <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid white' }}></div>
              </div>
            )}
            
            {/* The Actual Pin Marker */}
            <div style={{
              backgroundColor: activePin === event.id ? 'var(--text-primary)' : 'var(--accent-color)',
              color: 'white',
              borderRadius: '50%',
              padding: '6px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white',
              transition: '0.2s'
            }}>
              <MapPin size={16} />
            </div>
            
            {/* Glowing effect below pin */}
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              width: '12px',
              height: '4px',
              backgroundColor: 'rgba(56, 48, 42, 0.4)',
              borderRadius: '50%',
              filter: 'blur(2px)',
              zIndex: -1
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;

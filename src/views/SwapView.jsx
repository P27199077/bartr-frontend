import React, { useState } from 'react';
import { X, Heart, Search } from 'lucide-react';

const mockProfiles = [
  {
    id: 1,
    name: "Rohan K.",
    year: "Sophomore",
    canTeach: ["Guitar (Acoustic)", "Introduction to Python"],
    wantsToLearn: ["Chess Openings", "UI/Design Basics"],
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
  },
  {
    id: 2,
    name: "Priya S.",
    year: "Junior",
    canTeach: ["Figma & Prototyping", "Fluent Spanish"],
    wantsToLearn: ["Machine Learning", "Tennis"],
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    id: 3,
    name: "Aryan M.",
    year: "Senior",
    canTeach: ["Data Structures in C++", "Rubik's Cube solving"],
    wantsToLearn: ["Video Editing", "Skateboarding"],
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan"
  }
];

const allSkills = Array.from(new Set(mockProfiles.flatMap(p => [...p.canTeach, ...p.wantsToLearn]))).sort();

const SwipeCard = ({ profile, selectedSkill, lookingFor, onPass, onConnect }) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const SWIPE_THRESHOLD = 120; // px threshold to trigger an action

  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    setStartX(clientX - dragOffset.x);
    setStartY(clientY - dragOffset.y);
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    setDragOffset({
      x: clientX - startX,
      y: clientY - startY
    });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Check if we swiped past the threshold
    if (dragOffset.x < -SWIPE_THRESHOLD) {
      onPass();
    } else if (dragOffset.x > SWIPE_THRESHOLD) {
      onConnect();
    } else {
      // Snap back if threshold not met
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Derived styling constants
  const rotateCalc = dragOffset.x * 0.05; 
  const passOpacity = Math.min(Math.max(dragOffset.x / -100, 0), 1);
  const connectOpacity = Math.min(Math.max(dragOffset.x / 100, 0), 1);

  return (
    <div
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={() => { if(isDragging) handleEnd() }}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
      style={{
        flex: 1, 
        backgroundColor: 'var(--bg-color-alt)', 
        borderRadius: '24px', 
        border: '1px solid var(--border-color)', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
        position: 'relative',
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotateCalc}deg)`,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none' // prevent text selection while dragging
      }}
    >
      {/* Overlay Stamps */}
      <div style={{ position: 'absolute', top: 40, right: 40, opacity: passOpacity, color: 'var(--danger-color)', border: '4px solid var(--danger-color)', padding: '8px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '32px', transform: 'rotate(15deg)', zIndex: 10, pointerEvents: 'none' }}>NOPE</div>
      <div style={{ position: 'absolute', top: 40, left: 40, opacity: connectOpacity, color: 'var(--success-color)', border: '4px solid var(--success-color)', padding: '8px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '32px', transform: 'rotate(-15deg)', zIndex: 10, pointerEvents: 'none' }}>CONNECT</div>

      {/* Profile Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img src={profile.img} alt={profile.name} style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#eee', pointerEvents: 'none' }} />
        <div>
          <h2 style={{ fontSize: '24px', margin: '0' }}>{profile.name}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '4px 0 0' }}>{profile.year}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>I can teach / offer</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profile.canTeach.map((skill, i) => (
              <span key={i} style={{ padding: '8px 16px', backgroundColor: (selectedSkill === skill && lookingFor === 'teachers') ? 'rgba(85, 128, 94, 0.15)' : 'rgba(56, 48, 42, 0.05)', border: (selectedSkill === skill && lookingFor === 'teachers') ? '1px solid rgba(85, 128, 94, 0.3)' : '1px solid transparent', borderRadius: '16px', fontSize: '14px', fontWeight: '500', color: (selectedSkill === skill && lookingFor === 'teachers') ? 'var(--success-color)' : 'var(--text-primary)' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>I want to learn</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profile.wantsToLearn.map((skill, i) => (
              <span key={i} style={{ padding: '8px 16px', backgroundColor: (selectedSkill === skill && lookingFor === 'learners') ? 'rgba(85, 128, 94, 0.15)' : 'rgba(56, 48, 42, 0.05)', border: (selectedSkill === skill && lookingFor === 'learners') ? '1px solid rgba(85, 128, 94, 0.3)' : '1px solid transparent', borderRadius: '16px', fontSize: '14px', fontWeight: '500', color: (selectedSkill === skill && lookingFor === 'learners') ? 'var(--success-color)' : 'var(--text-primary)' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

const SwapView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [lookingFor, setLookingFor] = useState("teachers");

  const filteredProfiles = mockProfiles.filter(profile => {
    if (!selectedSkill) return true;
    if (lookingFor === 'teachers') {
      return profile.canTeach.includes(selectedSkill);
    } else {
      return profile.wantsToLearn.includes(selectedSkill);
    }
  });

  const handlePass = () => {
    if (currentIndex < filteredProfiles.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleConnect = () => {
    alert(`Connection request sent to ${filteredProfiles[currentIndex]?.name}!`);
    handlePass();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
      
      {/* Search & Filter Bar */}
      <div style={{ paddingBottom: '16px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '0 12px' }}>
          <Search size={18} color="var(--text-secondary)" />
          <select 
            value={selectedSkill} 
            onChange={(e) => { setSelectedSkill(e.target.value); setCurrentIndex(0); }}
            style={{ flex: 1, padding: '12px 0', border: 'none', backgroundColor: 'transparent', fontSize: '14px', outline: 'none', color: 'var(--text-primary)', WebkitAppearance: 'none' }}
          >
            <option value="">Find any skill. . .</option>
            {allSkills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
          </select>
        </div>
        
        {selectedSkill && (
          <div style={{ display: 'flex', gap: '16px', padding: '4px 4px 0 4px' }}>
            <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={lookingFor === 'teachers'} 
                onChange={() => { setLookingFor('teachers'); setCurrentIndex(0); }} 
                style={{ accentColor: 'var(--accent-color)' }}
              /> 
              I want to learn this
            </label>
            <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={lookingFor === 'learners'} 
                onChange={() => { setLookingFor('learners'); setCurrentIndex(0); }} 
                style={{ accentColor: 'var(--accent-color)' }}
              /> 
              I can teach this
            </label>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {currentIndex >= filteredProfiles.length ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '16px' }}>No matches found!</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  We couldn't find anyone for this specific search.
                </p>
                <button 
                  onClick={() => { setSelectedSkill(""); setCurrentIndex(0); }}
                  style={{ marginTop: '24px', padding: '12px 24px', backgroundColor: 'var(--accent-color)', color: 'white', borderRadius: '24px', fontWeight: '500' }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <SwipeCard 
                  key={filteredProfiles[currentIndex].id} // key ensures reset of offset state on next card
                  profile={filteredProfiles[currentIndex]} 
                  selectedSkill={selectedSkill} 
                  lookingFor={lookingFor}
                  onPass={handlePass}
                  onConnect={handleConnect}
                />
                {/* Action Buttons */}
                <div style={{ paddingTop: '24px', pb: '12px', display: 'flex', justifyContent: 'center', gap: '32px' }}>
                  <button 
                    onClick={handlePass}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-color-alt)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                  >
                    <X size={32} />
                  </button>
                  <button 
                    onClick={handleConnect}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-color)', boxShadow: '0 4px 10px rgba(56, 48, 42, 0.3)' }}
                  >
                    <Heart size={28} />
                  </button>
                </div>
              </>
            )}
          </div>
      </div>
      
    </div>
  );
};

export default SwapView;

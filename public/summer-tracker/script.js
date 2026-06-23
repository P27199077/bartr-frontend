// JavaScript for 60-Day Summer Habit Tracker

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Config
    const TOTAL_DAYS = 60;
    const habits = [
        { key: 'wake_5am', label: 'Wake up at 5:00 AM', category: 'routine', color: '#f59e0b' },
        { key: 'gym_session', label: 'Gym Session (Strength/Power)', category: 'fitness', color: '#ef4444' },
        { key: 'hyrox_activity', label: 'Hyrox Activity (Running/Conditioning)', category: 'hyrox', color: '#f97316' },
        { key: 'water_4l', label: 'Drink 4L of Water', category: 'diet', color: '#10b981' },
        { key: 'protein_powder', label: 'Consume Protein Powder', category: 'diet', color: '#10b981' },
        { key: 'leetcode_practice', label: 'LeetCode Practice (2.5 Hours)', category: 'code', color: '#38bdf8' },
        { key: 'side_project', label: 'Work on Side App Project', category: 'code', color: '#38bdf8' },
        { key: 'learn_korean', label: 'Learn Korean (40 mins)', category: 'skills', color: '#8b5cf6' },
        { key: 'make_reels', label: 'Create & Edit Reels', category: 'skills', color: '#8b5cf6' },
        { key: 'core_100', label: '100 Reps Core Exercises', category: 'fitness', color: '#ef4444' },
        { key: 'fast_typing', label: 'Fast Typing Practice', category: 'skills', color: '#8b5cf6' }
    ];

    // 60 Korean Words for Daily Study
    const koreanWords = [
        { word: "배우다", roman: "bae-u-da", meaning: "To learn, study" },
        { word: "안녕하세요", roman: "an-nyeong-ha-se-yo", meaning: "Hello" },
        { word: "감사합니다", roman: "gam-sa-ham-ni-da", meaning: "Thank you" },
        { word: "친구", roman: "chin-gu", meaning: "Friend" },
        { word: "물", roman: "mul", meaning: "Water" },
        { word: "책", roman: "chaek", meaning: "Book" },
        { word: "시간", roman: "si-gan", meaning: "Time" },
        { word: "오늘", roman: "o-neul", meaning: "Today" },
        { word: "내일", roman: "nae-il", meaning: "Tomorrow" },
        { word: "공부", roman: "gong-bu", meaning: "Study" },
        { word: "학교", roman: "hak-gyo", meaning: "School" },
        { word: "운동", roman: "un-dong", meaning: "Exercise, sports" },
        { word: "가족", roman: "ga-jok", meaning: "Family" },
        { word: "음식", roman: "eum-sik", meaning: "Food" },
        { word: "커피", roman: "keo-pi", meaning: "Coffee" },
        { word: "하늘", roman: "ha-neul", meaning: "Sky" },
        { word: "바다", roman: "ba-da", meaning: "Sea, ocean" },
        { word: "사랑", roman: "sa-rang", meaning: "Love" },
        { word: "행복", roman: "haeng-bok", meaning: "Happiness" },
        { word: "길", roman: "gil", meaning: "Road, path" },
        { word: "집", roman: "jip", meaning: "House, home" },
        { word: "돈", roman: "don", meaning: "Money" },
        { word: "사람", roman: "sa-ram", meaning: "Person, human" },
        { word: "생각", roman: "saeng-gak", meaning: "Thought, idea" },
        { word: "이름", roman: "i-reum", meaning: "Name" },
        { word: "나라", roman: "na-ra", meaning: "Country, nation" },
        { word: "문", roman: "mun", meaning: "Door" },
        { word: "창문", roman: "chang-mun", meaning: "Window" },
        { word: "의자", roman: "ui-ja", meaning: "Chair" },
        { word: "탁자", roman: "tak-ja", meaning: "Table" },
        { word: "노래", roman: "no-rae", meaning: "Song" },
        { word: "그림", roman: "geu-rim", meaning: "Picture, drawing" },
        { word: "밤", roman: "bam", meaning: "Night" },
        { word: "낮", roman: "nat", meaning: "Daytime" },
        { word: "아침", roman: "a-chim", meaning: "Morning" },
        { word: "저녁", roman: "jeo-nyeok", meaning: "Evening" },
        { word: "바람", roman: "ba-ram", meaning: "Wind" },
        { word: "비", roman: "bi", meaning: "Rain" },
        { word: "눈", roman: "nun", meaning: "Snow / Eye" },
        { word: "구름", roman: "gu-reum", meaning: "Cloud" },
        { word: "꿈", roman: "kkum", meaning: "Dream" },
        { word: "마음", roman: "ma-eum", meaning: "Heart, mind" },
        { word: "말", roman: "mal", meaning: "Word, horse" },
        { word: "일", roman: "il", meaning: "Work, day, number 1" },
        { word: "몸", roman: "mom", meaning: "Body" },
        { word: "건강", roman: "geon-gang", meaning: "Health" },
        { word: "약속", roman: "yak-sok", meaning: "Promise, appointment" },
        { word: "기쁨", roman: "gi-ppeum", meaning: "Joy, gladness" },
        { word: "슬픔", roman: "seul-peum", meaning: "Sadness, sorrow" },
        { word: "화", roman: "hwa", meaning: "Anger" },
        { word: "웃음", roman: "u-seum", meaning: "Laughter, smile" },
        { word: "눈물", roman: "nun-mul", meaning: "Tears" },
        { word: "평화", roman: "pyeong-hwa", meaning: "Peace" },
        { word: "용기", roman: "yong-gi", meaning: "Courage" },
        { word: "희망", roman: "hui-mang", meaning: "Hope" },
        { word: "성공", roman: "seong-gong", meaning: "Success" },
        { word: "노력", roman: "no-ryeok", meaning: "Effort, hard work" },
        { word: "경험", roman: "gyeong-heom", meaning: "Experience" },
        { word: "기억", roman: "gi-eok", meaning: "Memory" },
        { word: "시작", roman: "si-jak", meaning: "Beginning, start" }
    ];

    // 3. State Variables
    let activeDay = 1;
    let trackerData = {}; // Format: { dayNum: { habits: {}, water: 0, leetcode: [] } }
    let supabaseClient = null;
    let isConnected = false;

    // Typing Test Variables
    const typingTexts = [
        "The quick brown fox jumps over the lazy dog. Programming is the art of solving problems. Persistence beats talent. Keep pushing forward.",
        "Consistency is key when learning coding or training for fitness. Every small effort compounds over time into massive success.",
        "Data structures and algorithms form the foundation of efficient software engineering. Practice makes perfect when solving complex challenges.",
        "Hydration is critical for athletic performance and brain functions. Drink water consistently to stay sharp and maintain high energy levels."
    ];
    let typingTimer = null;
    let typingTimeRemaining = 30;
    let currentText = "";
    let isTypingActive = false;

    // Load Local Data
    const loadState = () => {
        const localData = localStorage.getItem('summer_tracker_data_expanded');
        if (localData) {
            trackerData = JSON.parse(localData);
        } else {
            // Check for legacy data compatibility
            const legacyData = localStorage.getItem('summer_tracker_data');
            if (legacyData) {
                const parsedLegacy = JSON.parse(legacyData);
                for (let d = 1; d <= TOTAL_DAYS; d++) {
                    trackerData[d] = {
                        habits: parsedLegacy[d] || {},
                        water: 0,
                        leetcode: []
                    };
                }
            } else {
                // Initialize clean data structure
                for (let d = 1; d <= TOTAL_DAYS; d++) {
                    trackerData[d] = {
                        habits: {},
                        water: 0,
                        leetcode: []
                    };
                    habits.forEach(h => {
                        trackerData[d].habits[h.key] = false;
                    });
                }
            }
            saveLocalState();
        }

        const localActiveDay = localStorage.getItem('summer_tracker_active_day');
        activeDay = localActiveDay ? parseInt(localActiveDay) : 1;

        // Load Typing Record
        const typingRecord = localStorage.getItem('summer_typing_record');
        if (typingRecord) {
            document.getElementById('typing-record').innerText = `Best: ${typingRecord} WPM`;
        }
    };

    const saveLocalState = () => {
        localStorage.setItem('summer_tracker_data_expanded', JSON.stringify(trackerData));
        localStorage.setItem('summer_tracker_active_day', activeDay.toString());
    };

    // Save/Sync Day's data to cloud & local
    const syncDayData = async (dayNum) => {
        saveLocalState();
        if (isConnected && supabaseClient) {
            const dayData = trackerData[dayNum];
            try {
                const { error } = await supabaseClient
                    .from('summer_tracker')
                    .upsert({
                        day_num: dayNum,
                        habits: dayData.habits,
                        water_amount: dayData.water,
                        leetcode_logs: dayData.leetcode,
                        updated_at: new Date().toISOString()
                    });
                if (error) throw error;
            } catch (err) {
                console.error("Cloud sync failed:", err.message);
            }
        }
    };

    // 4. Supabase Database Sync operations
    const initSupabase = async () => {
        const savedUrl = localStorage.getItem('supabase_url');
        const savedKey = localStorage.getItem('supabase_key');

        if (savedUrl && savedKey) {
            document.getElementById('supabase-url').value = savedUrl;
            document.getElementById('supabase-key').value = savedKey;
            await connectToCloud(savedUrl, savedKey, false);
        }
    };

    const connectToCloud = async (url, key, isManual = true) => {
        const btn = document.getElementById('connect-db-btn');
        const indicator = document.getElementById('db-status-indicator');
        
        btn.innerText = 'Connecting...';
        btn.disabled = true;

        try {
            if (!window.supabase) {
                throw new Error("Supabase library not loaded. Check internet connection.");
            }

            // Create Supabase client
            supabaseClient = window.supabase.createClient(url, key);

            // Test connection by fetching a single row
            const { data, error } = await supabaseClient
                .from('summer_tracker')
                .select('day_num')
                .limit(1);

            if (error) throw error;

            // Success! Save config
            localStorage.setItem('supabase_url', url);
            localStorage.setItem('supabase_key', key);
            isConnected = true;

            // Change UI indicator status
            indicator.classList.remove('disconnected');
            indicator.classList.add('connected');
            indicator.querySelector('.status-label').innerText = 'Cloud Sync Connected';
            btn.innerText = 'Disconnect';
            btn.disabled = false;

            // Pull and merge all rows from Supabase
            await pullAllCloudData();

        } catch (err) {
            console.error("Cloud connection error:", err.message);
            indicator.classList.remove('connected');
            indicator.classList.add('disconnected');
            indicator.querySelector('.status-label').innerText = 'Offline (Local Only)';
            btn.innerText = 'Connect Cloud';
            btn.disabled = false;
            isConnected = false;
            if (isManual) {
                alert(`Connection failed: ${err.message}\nMake sure you created the 'summer_tracker' table in your Supabase project.`);
            }
        }
    };

    const pullAllCloudData = async () => {
        if (!supabaseClient) return;
        try {
            const { data, error } = await supabaseClient
                .from('summer_tracker')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                // Merge cloud data into local state
                data.forEach(row => {
                    if (trackerData[row.day_num]) {
                        trackerData[row.day_num].habits = row.habits;
                        trackerData[row.day_num].water = row.water_amount;
                        trackerData[row.day_num].leetcode = row.leetcode_logs;
                    }
                });
                saveLocalState();
                
                // Re-render dashboard
                renderCircularRing();
                updateChecklistUI();
                updateGlobalStats();
            }
        } catch (err) {
            console.error("Error pulling database records:", err.message);
        }
    };

    const disconnectCloud = () => {
        localStorage.removeItem('supabase_url');
        localStorage.removeItem('supabase_key');
        supabaseClient = null;
        isConnected = false;

        const indicator = document.getElementById('db-status-indicator');
        indicator.classList.remove('connected');
        indicator.classList.add('disconnected');
        indicator.querySelector('.status-label').innerText = 'Offline (Local Only)';

        const btn = document.getElementById('connect-db-btn');
        btn.innerText = 'Connect Cloud';
        
        // Reset input fields
        document.getElementById('supabase-url').value = '';
        document.getElementById('supabase-key').value = '';
    };

    // 5. Render Circular SVG Ring
    const renderCircularRing = () => {
        const svg = document.getElementById('radial-svg');
        svg.innerHTML = ''; 

        const cx = 250;
        const cy = 250;
        const radius = 190;

        // Draw connections lines
        for (let i = 0; i < TOTAL_DAYS; i++) {
            const angle1 = (i * (360 / TOTAL_DAYS) - 90) * (Math.PI / 180);
            const angle2 = (((i + 1) % TOTAL_DAYS) * (360 / TOTAL_DAYS) - 90) * (Math.PI / 180);

            const x1 = cx + radius * Math.cos(angle1);
            const y1 = cy + radius * Math.sin(angle1);
            const x2 = cx + radius * Math.cos(angle2);
            const y2 = cy + radius * Math.sin(angle2);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('class', 'connect-line');
            svg.appendChild(line);
        }

        // Draw day nodes
        for (let i = 0; i < TOTAL_DAYS; i++) {
            const dayNum = i + 1;
            const angle = (i * (360 / TOTAL_DAYS) - 90) * (Math.PI / 180);
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', `day-node ${dayNum === activeDay ? 'active' : ''}`);
            g.setAttribute('data-day', dayNum);

            // Calculate day completion status
            const completedCount = getDayCompletedCount(dayNum);
            let strokeColor = 'rgba(255,255,255,0.15)'; // Unstarted
            let nodeFill = '#020617';

            if (completedCount === habits.length) {
                strokeColor = '#10b981'; // Completed (Green)
                nodeFill = 'rgba(16, 185, 129, 0.15)';
            } else if (completedCount > 0) {
                strokeColor = '#f97316'; // In-progress (Orange)
                nodeFill = 'rgba(249, 115, 22, 0.08)';
            }

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', '14');
            circle.setAttribute('fill', nodeFill);
            circle.setAttribute('stroke', strokeColor);
            g.appendChild(circle);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', y);
            text.textContent = dayNum;
            g.appendChild(text);

            // Click listener
            g.addEventListener('click', () => {
                selectDay(dayNum);
            });

            svg.appendChild(g);
        }
    };

    const getDayCompletedCount = (dayNum) => {
        let count = 0;
        const dayData = trackerData[dayNum] || { habits: {} };
        habits.forEach(h => {
            if (dayData.habits[h.key] === true) count++;
        });
        return count;
    };

    // 6. Update Checklist UI & Daily Widgets
    const updateChecklistUI = () => {
        document.getElementById('checklist-day-title').innerText = `Day ${activeDay}`;
        document.getElementById('header-active-day').innerText = activeDay;
        document.getElementById('wheel-center-day').innerText = `Day ${activeDay}`;

        const completedCount = getDayCompletedCount(activeDay);
        document.getElementById('wheel-center-status').innerText = `${completedCount}/${habits.length} Done`;

        // Update checkboxes
        const dayData = trackerData[activeDay] || { habits: {}, water: 0, leetcode: [] };
        habits.forEach(h => {
            const checkbox = document.getElementById(`habit-${h.key}`);
            if (checkbox) {
                checkbox.checked = dayData.habits[h.key] === true;
            }
        });

        // Update single-day progress bar
        const percent = Math.round((completedCount / habits.length) * 100) || 0;
        document.getElementById('day-bar-fill').style.width = `${percent}%`;
        document.getElementById('day-progress-text').innerText = `${percent}% Complete`;

        // 6a. Update Water Intake Visuals
        const waterVal = dayData.water || 0;
        document.getElementById('cup-water-val').innerText = `${waterVal} / 4000 ml`;
        const waterPercent = Math.min((waterVal / 4000) * 100, 100);
        document.getElementById('water-wave').style.height = `${waterPercent}%`;

        // 6b. Update LeetCode List Visuals
        renderLeetCodeLogs();

        // 6c. Update Korean Card
        const wordIdx = (activeDay - 1) % koreanWords.length;
        const wordData = koreanWords[wordIdx];
        document.getElementById('kr-hangul').innerText = wordData.word;
        document.getElementById('kr-romanization').innerText = `[${wordData.roman}]`;
        document.getElementById('kr-meaning').innerText = wordData.meaning;
    };

    // 7. Select Day
    const selectDay = (dayNum) => {
        activeDay = dayNum;
        localStorage.setItem('summer_tracker_active_day', activeDay.toString());

        // Update active class in SVG nodes
        const nodes = document.querySelectorAll('.day-node');
        nodes.forEach(node => {
            const nodeDay = parseInt(node.getAttribute('data-day'));
            if (nodeDay === activeDay) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });

        updateChecklistUI();
    };

    // 8. Habit Checkbox change handlers
    const setupChecklistListeners = () => {
        habits.forEach(h => {
            const checkbox = document.getElementById(`habit-${h.key}`);
            if (checkbox) {
                checkbox.addEventListener('change', async (e) => {
                    const isChecked = e.target.checked;
                    trackerData[activeDay].habits[h.key] = isChecked;
                    
                    // Specific logic: if Leetcode is checked, auto-switch tab to Leetcode logger
                    if (h.key === 'leetcode_practice' && isChecked) {
                        switchLoggingTab('leetcode-tab');
                    }
                    // Specific logic: if Korean is checked, auto-switch to Korean tab
                    if (h.key === 'learn_korean' && isChecked) {
                        switchLoggingTab('korean-tab');
                    }
                    
                    await syncDayData(activeDay);
                    
                    updateChecklistUI();
                    renderCircularRing();
                    updateGlobalStats();
                });
            }
        });

        // Reset Day button
        const resetBtn = document.getElementById('reset-day-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', async () => {
                habits.forEach(h => {
                    trackerData[activeDay].habits[h.key] = false;
                });
                trackerData[activeDay].water = 0;
                trackerData[activeDay].leetcode = [];
                
                await syncDayData(activeDay);
                
                updateChecklistUI();
                renderCircularRing();
                updateGlobalStats();
            });
        }
    };

    // 9. Habit completion stats calculations (Overall, Streaks, Habit Rates)
    const updateGlobalStats = () => {
        let totalPossibleHabits = TOTAL_DAYS * habits.length;
        let totalCompletedHabits = 0;
        const habitCompletes = {};
        habits.forEach(h => habitCompletes[h.key] = 0);

        for (let d = 1; d <= TOTAL_DAYS; d++) {
            const dayData = trackerData[d] || { habits: {} };
            habits.forEach(h => {
                if (dayData.habits[h.key] === true) {
                    totalCompletedHabits++;
                    habitCompletes[h.key]++;
                }
            });
        }

        // Update overall progress bar
        const globalPercent = Math.round((totalCompletedHabits / totalPossibleHabits) * 100) || 0;
        document.getElementById('global-percent-val').innerText = `${globalPercent}%`;
        
        const circleBar = document.getElementById('global-progress-bar');
        const circumference = 2 * Math.PI * 50; 
        const offset = circumference - (globalPercent / 100) * circumference;
        circleBar.style.strokeDashoffset = offset;

        // Render Habit completion bars in Sidebar
        const statsListContainer = document.getElementById('habit-stats-list');
        statsListContainer.innerHTML = '';

        habits.forEach(h => {
            const count = habitCompletes[h.key];
            const habitPercent = Math.round((count / TOTAL_DAYS) * 100) || 0;

            const item = document.createElement('div');
            item.setAttribute('class', 'habit-stat-item');
            item.innerHTML = `
                <div class="habit-stat-info">
                    <span class="habit-stat-name">${h.label}</span>
                    <span>${count}/${TOTAL_DAYS} d (${habitPercent}%)</span>
                </div>
                <div class="habit-stat-bar-track">
                    <div class="habit-stat-bar-fill" style="width: ${habitPercent}%; background-color: ${h.color};"></div>
                </div>
            `;
            statsListContainer.appendChild(item);
        });

        // Update Streak Counter
        calculateStreak();
    };

    const calculateStreak = () => {
        let currentStreak = 0;
        
        // Scan backwards starting from yesterday or today
        // A day counts for the streak if all 11 habits are fully checked
        // Find if today is 100% completed or yesterday is the starting point
        let checkDay = activeDay;
        
        // If today is not fully completed yet, look at yesterday as the starting point
        if (getDayCompletedCount(activeDay) < habits.length && activeDay > 1) {
            checkDay = activeDay - 1;
        }

        for (let d = checkDay; d >= 1; d--) {
            const completedCount = getDayCompletedCount(d);
            if (completedCount === habits.length) {
                currentStreak++;
            } else {
                // Streak broken
                break;
            }
        }

        document.getElementById('header-streak-val').innerText = currentStreak;
    };

    // 10. Water Cup logic
    const setupWaterListeners = () => {
        const addWater = async (amount) => {
            const currentAmount = trackerData[activeDay].water || 0;
            trackerData[activeDay].water = currentAmount + amount;
            
            // Auto check water habit checkbox if total intake hits 4L (4000ml)
            if (trackerData[activeDay].water >= 4000) {
                trackerData[activeDay].habits['water_4l'] = true;
            }
            
            await syncDayData(activeDay);
            updateChecklistUI();
            renderCircularRing();
            updateGlobalStats();
        };

        document.getElementById('btn-water-250').addEventListener('click', () => addWater(250));
        document.getElementById('btn-water-500').addEventListener('click', () => addWater(500));
        
        document.getElementById('btn-water-reset').addEventListener('click', async () => {
            trackerData[activeDay].water = 0;
            trackerData[activeDay].habits['water_4l'] = false;
            await syncDayData(activeDay);
            updateChecklistUI();
            renderCircularRing();
            updateGlobalStats();
        });
    };

    // 11. LeetCode Logger Tab logic
    const renderLeetCodeLogs = () => {
        const listContainer = document.getElementById('leetcode-log-list');
        listContainer.innerHTML = '';

        const dayLogs = trackerData[activeDay].leetcode || [];
        
        if (dayLogs.length === 0) {
            listContainer.innerHTML = '<div class="text-muted text-center" style="font-size:0.8rem; padding: 1rem 0;">No questions logged for today.</div>';
            return;
        }

        dayLogs.forEach((log, index) => {
            const item = document.createElement('div');
            item.setAttribute('class', 'lc-log-item');
            item.innerHTML = `
                <span class="lc-log-title">${log.title}</span>
                <span class="lc-log-difficulty lc-diff-${log.difficulty}">${log.difficulty}</span>
                <button type="button" class="btn-log-delete" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
            `;
            
            // Delete log listener
            item.querySelector('.btn-log-delete').addEventListener('click', async () => {
                dayLogs.splice(index, 1);
                trackerData[activeDay].leetcode = dayLogs;
                
                // If logs are empty, auto uncheck Leetcode habit
                if (dayLogs.length === 0) {
                    trackerData[activeDay].habits['leetcode_practice'] = false;
                }
                
                await syncDayData(activeDay);
                updateChecklistUI();
                renderCircularRing();
                updateGlobalStats();
            });

            listContainer.appendChild(item);
        });
    };

    const setupLeetCodeForm = () => {
        const form = document.getElementById('leetcode-log-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const titleInput = document.getElementById('leetcode-title');
            const diffSelect = document.getElementById('leetcode-difficulty');

            const title = titleInput.value.trim();
            const difficulty = diffSelect.value;

            if (title) {
                if (!trackerData[activeDay].leetcode) {
                    trackerData[activeDay].leetcode = [];
                }
                
                trackerData[activeDay].leetcode.push({ title, difficulty });
                
                // Auto check the LeetCode habit checkbox
                trackerData[activeDay].habits['leetcode_practice'] = true;
                
                await syncDayData(activeDay);
                
                // Clear input
                titleInput.value = '';
                
                updateChecklistUI();
                renderCircularRing();
                updateGlobalStats();
            }
        });
    };

    // Logging tabs (Korean vs LeetCode) switcher
    const switchLoggingTab = (tabId) => {
        const tabs = document.querySelectorAll('.log-tab-btn');
        const contents = document.querySelectorAll('.log-tab-content');

        tabs.forEach(btn => {
            if (btn.getAttribute('data-log-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        contents.forEach(content => {
            if (content.getAttribute('id') === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    };

    const setupLoggingTabs = () => {
        const tabs = document.querySelectorAll('.log-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                switchLoggingTab(tab.getAttribute('data-log-tab'));
            });
        });
    };

    // 12. Fast-Typing speed test widget
    const setupTypingTest = () => {
        const wordsDisplay = document.getElementById('typing-words');
        const inputArea = document.getElementById('typing-input');
        const startBtn = document.getElementById('btn-start-typing');
        const timerDisplay = document.getElementById('typing-timer');
        const wpmDisplay = document.getElementById('typing-wpm');

        let wordsArray = [];
        let wordElements = [];
        let currentWordIndex = 0;
        let charIndex = 0;
        let totalCorrectChars = 0;

        const loadNewText = () => {
            const randomText = typingTexts[Math.floor(Math.random() * typingTexts.length)];
            currentText = randomText;
            wordsArray = randomText.split(' ');
            wordsDisplay.innerHTML = '';
            
            wordsArray.forEach((word, idx) => {
                const span = document.createElement('span');
                span.innerText = word + ' ';
                wordsDisplay.appendChild(span);
            });
            
            wordElements = wordsDisplay.querySelectorAll('span');
            currentWordIndex = 0;
            charIndex = 0;
            totalCorrectChars = 0;
            if (wordElements.length > 0) {
                wordElements[0].classList.add('current');
            }
        };

        loadNewText();

        const startTest = () => {
            loadNewText();
            isTypingActive = true;
            typingTimeRemaining = 30;
            timerDisplay.innerText = `${typingTimeRemaining}s`;
            wpmDisplay.innerText = '-- WPM';
            
            inputArea.value = '';
            inputArea.disabled = false;
            inputArea.focus();
            
            startBtn.innerText = 'Restart';

            // Start countdown timer
            if (typingTimer) clearInterval(typingTimer);
            typingTimer = setInterval(() => {
                typingTimeRemaining--;
                timerDisplay.innerText = `${typingTimeRemaining}s`;
                
                if (typingTimeRemaining <= 0) {
                    endTest();
                }
            }, 1000);
        };

        const endTest = () => {
            isTypingActive = false;
            clearInterval(typingTimer);
            inputArea.disabled = true;
            startBtn.innerText = 'Start Test';

            // Calculate final WPM (average word is 5 characters)
            const secondsPassed = 30 - typingTimeRemaining;
            const wordsTyped = totalCorrectChars / 5;
            const minutesPassed = secondsPassed / 60;
            const wpm = Math.round(wordsTyped / minutesPassed) || 0;

            wpmDisplay.innerText = `${wpm} WPM`;

            // Auto check fast-typing checkbox if test completes
            if (wpm > 0) {
                trackerData[activeDay].habits['fast_typing'] = true;
                syncDayData(activeDay);
                updateChecklistUI();
                renderCircularRing();
                updateGlobalStats();
            }

            // Save highscore record
            const currentRecord = localStorage.getItem('summer_typing_record');
            if (!currentRecord || wpm > parseInt(currentRecord)) {
                localStorage.setItem('summer_typing_record', wpm.toString());
                document.getElementById('typing-record').innerText = `Best: ${wpm} WPM`;
            }
        };

        startBtn.addEventListener('click', startTest);

        inputArea.addEventListener('input', (e) => {
            if (!isTypingActive) return;

            const typedVal = inputArea.value;
            const currentWordSpan = wordElements[currentWordIndex];
            const currentWord = wordsArray[currentWordIndex] + ' ';

            // Check if space was pressed (submits current word)
            if (typedVal.endsWith(' ') || currentWordIndex === wordsArray.length - 1 && typedVal === wordsArray[currentWordIndex]) {
                const wordTypedNoSpace = typedVal.trim();
                const targetWordNoSpace = currentWord.trim();

                // Highlight word green/red based on correctness
                if (wordTypedNoSpace === targetWordNoSpace) {
                    currentWordSpan.classList.remove('current');
                    currentWordSpan.classList.add('correct');
                    totalCorrectChars += currentWord.length;
                } else {
                    currentWordSpan.classList.remove('current');
                    currentWordSpan.classList.add('incorrect');
                }

                currentWordIndex++;
                inputArea.value = '';

                if (currentWordIndex >= wordsArray.length) {
                    endTest();
                } else {
                    wordElements[currentWordIndex].classList.add('current');
                }
            } else {
                // Character by character highlights
                const partialWord = typedVal;
                const matches = currentWord.startsWith(partialWord);
                
                if (matches) {
                    currentWordSpan.className = 'current';
                } else {
                    currentWordSpan.className = 'current incorrect';
                }
            }
        });
    };

    // 13. Supabase Config Panel Form listeners
    const setupDatabaseSettings = () => {
        const connectBtn = document.getElementById('connect-db-btn');
        
        connectBtn.addEventListener('click', () => {
            if (isConnected) {
                // Trigger disconnect
                disconnectCloud();
            } else {
                const url = document.getElementById('supabase-url').value.trim();
                const key = document.getElementById('supabase-key').value.trim();
                
                if (url && key) {
                    connectToCloud(url, key, true);
                } else {
                    alert("Please fill in both the Supabase URL and Anon Key.");
                }
            }
        });
    };

    // Init Execution Flow
    loadState();
    renderCircularRing();
    updateChecklistUI();
    updateGlobalStats();
    setupChecklistListeners();
    setupWaterListeners();
    setupLeetCodeForm();
    setupLoggingTabs();
    setupTypingTest();
    setupDatabaseSettings();
    initSupabase();
});

// Life Reset App JavaScript State & Mechanics (60-Day Gamified Challenge)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Habit Configuration (Wishlist Items)
    const HABITS = [
        { 
            id: 'wakeup', 
            name: 'Wake up at 5:00 AM', 
            category: 'Routine', 
            difficulty: 'Hard', 
            icon: 'fa-clock', 
            desc: 'Win the morning, win the day.' 
        },
        { 
            id: 'gym', 
            name: 'Gym Session', 
            category: 'Fitness', 
            difficulty: 'Hard', 
            icon: 'fa-dumbbell', 
            desc: 'Push heavy weights, build raw power.' 
        },
        { 
            id: 'hyrox', 
            name: 'Hyrox Activity', 
            category: 'Fitness', 
            difficulty: 'Hard', 
            icon: 'fa-person-running', 
            desc: 'High intensity endurance and conditioning.' 
        },
        { 
            id: 'water', 
            name: 'Drink 4L Water', 
            category: 'Health', 
            difficulty: 'Easy', 
            icon: 'fa-droplet', 
            desc: 'Optimal cellular hydration.' 
        },
        { 
            id: 'protein', 
            name: 'Consume Protein Powder', 
            category: 'Health', 
            difficulty: 'Easy', 
            icon: 'fa-prescription-bottle', 
            desc: 'Fuel muscle repair and synthesis.' 
        },
        { 
            id: 'leetcode', 
            name: 'LeetCode Practice (2.5h)', 
            category: 'DSA', 
            difficulty: 'Hard', 
            icon: 'fa-code', 
            desc: 'Solve challenging algorithms & structures.' 
        },
        { 
            id: 'project', 
            name: 'Work on Side Project', 
            category: 'Fullstack', 
            difficulty: 'Hard', 
            icon: 'fa-laptop-code', 
            desc: 'Develop, deploy, ship code.' 
        },
        { 
            id: 'korean', 
            name: 'Learn Korean (40 mins)', 
            category: 'Learning', 
            difficulty: 'Medium', 
            icon: 'fa-language', 
            desc: 'Practice vocabulary, reading, and listening.' 
        },
        { 
            id: 'reels', 
            name: 'Make Reels', 
            category: 'Creative', 
            difficulty: 'Medium', 
            icon: 'fa-video', 
            desc: 'Film, edit, and post high-quality content.' 
        },
        { 
            id: 'core', 
            name: '100 Core', 
            category: 'Fitness', 
            difficulty: 'Medium', 
            icon: 'fa-circle-dot', 
            desc: 'Core training: sit-ups, planks, leg raises.' 
        },
        { 
            id: 'typing', 
            name: 'Learn Fast Typing', 
            category: 'Skill', 
            difficulty: 'Easy', 
            icon: 'fa-keyboard', 
            desc: 'Increase words per minute (WPM).' 
        }
    ];

    // Daily Plans Lookups for Dynamic Descriptions
    const HYROX_PLAN = [
        "Baseline Testing: Run 1.5 km (comfortable pace). Perform 3 rounds of: 10 Goblet Squats, 10 Walking Lunges, 30s Plank.",
        "Strength Foundation: 3 sets: 8 Kettlebell Squats (heavy), 12 Reverse Lunges (bodyweight), 10 Romanian Deadlifts.",
        "Zone 2 Run: 35 minutes of easy jogging at conversational pace. Walk for 1 min if breathing becomes heavy.",
        "Recovery & Mobility: Full rest day. 15 minutes of dynamic leg stretching (quads/hips).",
        "Grip & Upper Body: 3 sets: 10 Push-ups, 12 Dumbbell Rows, 2x50m Farmers Carries (heavy weights).",
        "Compromised Run Intro: Run 1 km (easy). Immediately do: 30 Air Squats + 20 Walking Lunges. Run 1 km (easy).",
        "Active Recovery: 30-minute light walking.",
        "Running Intervals: 5-min warm-up jog. 4 rounds of: 800m run (moderate pace) + 2 min walking rest.",
        "Leg Power & Wall Balls: 3 sets: 10 Heavy Leg Presses (sled push prep), 12 Wall Ball throws, 45s Wall Sit.",
        "Long Aerobic Base: 45 minutes of slow, steady running (Zone 2).",
        "Rest Day: Complete rest day.",
        "Hyrox Work Capacity: 4 rounds: 100m Farmers Carry (heavy), 10 Burpee Broad Jumps, 500m Row or SkiErg.",
        "Compromised Progression: Run 1.5 km. Immediately: 40 Air Squats + 20 Walking Lunges + 10 Burpees. Run 1 km.",
        "Active Recovery: 30-minute light stroll or easy spin cycling.",
        "Aerobic Threshold: Run 3 km at your target race pace (sustainable but challenging).",
        "Heavy Leg Strength: 4 sets: 8 Heavy Leg Presses, 12 Weighted Walking Lunges, 15 Kettlebell Swings.",
        "Conversational Run: 50 minutes of slow, easy jogging.",
        "Rest Day: Complete rest day.",
        "Transition Practice: 3 rounds of: 500m Row/SkiErg, 50m Farmers Carry, 20 Wall Balls, 20 Sandbag Lunges (minimal rest).",
        "Half-Hyrox Simulation: Run 1 km -> 50 Goblet Squats -> Run 1 km -> 50m Farmers Carry -> Run 1 km -> 25 Burpees -> Run 1 km -> 30 Wall Balls.",
        "Deep Recovery: Full rest day. Epsom salt bath.",
        "Easy Recovery Run: 20 minutes of very slow jogging.",
        "Active Mobility: 20 minutes of yoga, stretching, and core planks.",
        "Zone 2 Run: 30 minutes of easy conversational running.",
        "Rest Day: Complete rest day.",
        "Station Quality Review: 2 rounds (light): 10 squats, 10 lunges, 5 burpees. Focus on flawless technique.",
        "30-Day Hyrox Readiness Test: Full-intensity 10 km total moving workout (alternating 1km run and standard bodyweight stations).",
        "Rest Day: Complete rest day.",
        "Tempo Run: 5 km tempo run (first 1km slow, next 3km at target half-marathon pace, last 1km easy).",
        "Leg Strength Maintenance: 3 sets (moderate): 10 Goblet Squats, 10 Lunges, 15 Calf Raises, 45s Plank.",
        "Conversational Base Run: 60 minutes of easy Zone 2 running.",
        "Rest Day: Complete rest day.",
        "Upper Body Maintenance: 3 sets: 10 Push-ups, 12 Rows, 10 Burpee Broad Jumps.",
        "Double-Digit Long Run: 12 km Long Slow Distance (LSD) Run. Keep HR low, walk-drink every 3 km.",
        "Active Recovery: 30-minute easy walk and foam roll.",
        "Speed Intervals: 10-min warm-up. 5 rounds of: 1 km run (moderately fast) + 2 min walking rest.",
        "Core & Lower Body Mobility: Planks, glute bridges, side lunges, and bird-dogs. No heavy lifting.",
        "Semi-Long Run: 8 km easy running.",
        "Rest Day: Complete rest day.",
        "Functional Maintenance: 3 rounds (low weight): 15 Goblet Squats, 15 Wall Balls, 20 lunges.",
        "Peak Long Run: 15 km Long Slow Distance Run. Practice taking energy gels/fuel every 45 mins.",
        "Deep Recovery: Complete rest and stretching.",
        "Aerobic Threshold Run: 6 km run at target half-marathon pace.",
        "Core & Mobility: Hamstring and hip flexor stretches, core work.",
        "Mid-Week Base Run: 10 km easy Zone 2 running.",
        "Rest Day: Complete rest day.",
        "Hyrox Grip Practice: 3 sets: 100m Farmers Carries (heavy), 10 pushups.",
        "Peak Mileage Test: 18 km Long Slow Distance Run. Keep very steady pace, overcome mental fatigue.",
        "Rest & Recovery: Complete rest day.",
        "Easy Shakeout: 5 km very easy run.",
        "Rest Day: Complete rest day.",
        "Light Tempo Run: 4 km run (2km at half-marathon pace).",
        "Rest Day: Complete rest day.",
        "Active Stretching & Walk: 20-minute light walk, dynamic leg swings. Hydrate heavily.",
        "Pre-HM Rest & Carb Load: Rest. Eat clean carbs & drink water with electrolytes.",
        "🏁 HALF MARATHON RUN (21.1 km): Keep pace conservative. Do not sprint. Finish the full distance.",
        "Post-HM Recovery Walk: 20-minute light walking to flush legs. Stretch out calves and IT bands.",
        "Shakeout Run: 3 km slow jog. 3x50m light strides.",
        "Active Mobility: 15 minutes of foam rolling and yoga stretches.",
        "Final Prep & Hydration: Complete rest. Pack your gear. Double up on electrolytes. (Race day tomorrow!)"
    ];

    const DSA_PLAN = [
        "Arrays & Dynamic Arrays: Study memory contiguous storage, static vs dynamic arrays, and O(1) time lookups.",
        "Arrays Complexity: Study insert, search, delete time complexities for array bounds.",
        "Arrays Operations: Practice reverse array, find min/max, and basic array rotations in Python/C++.",
        "LeetCode 217 - Contains Duplicate: Implement a solution using linear sorting or dynamic array checks.",
        "LeetCode 217 (Hash Set): Optimize Contains Duplicate using a Hash Set to reach O(N) time complexity.",
        "Strings Foundations: Understand character storage, ASCII transformations, and immutable string bounds.",
        "Strings Operations: Practice reverse string, checks for anagrams, and string tokenization.",
        "LeetCode 242 - Valid Anagram: Implement a frequency sorting solution (O(N log N)).",
        "LeetCode 242 (Hash Map): Optimize Valid Anagram using an array bucket / hash dictionary (O(N) time).",
        "Strings Review: Re-solve Anagram and Duplicate problems under a 15-minute timebox.",
        "Hash Maps theory: Understand bucket tables, collision resolution (chaining vs linear probing), and O(1) searches.",
        "Hash Sets theory: Study set operations, subsets, unions, intersections, and memory allocations.",
        "LeetCode 1 - Two Sum: Solve using the brute-force nested loop approach (O(N^2)).",
        "LeetCode 1 (One-pass Hash Map): Optimize Two Sum using a hash table to store complements in O(N) time.",
        "Hashing Review: Solve contains duplicates & two sum again to cement Hash Map usage.",
        "Two Pointers technique: Learn the logic of dual pointers moving toward the center on sorted lists.",
        "Two Pointers Mechanics: Study pointer increment/decrement boundaries and how to avoid infinite loops.",
        "LeetCode 125 - Valid Palindrome: Write a solution cleaning non-alphanumeric chars and checking match.",
        "LeetCode 125 (Optimized Pointers): Optimize Valid Palindrome using two pointers moving inwards.",
        "Two Pointers Practice: Practice reversing characters in a string in-place with two pointers.",
        "Sliding Window technique: Learn static vs dynamic size windows, tracking sum/length subsets.",
        "Sliding Window calculations: Learn how to slide the window by subtracting left and adding right elements.",
        "LeetCode 121 - Best Time to Buy/Sell Stock: Solve using nested loop checks (O(N^2)).",
        "LeetCode 121 (One-pass Greedy): Optimize Stock Buy/Sell tracking the lowest price and max profit in O(N).",
        "Sliding Window review: Practice building sub-array sum counters and sliding them.",
        "Stack theory: Understand LIFO (Last In First Out), push/pop bounds, and typical recursive equivalents.",
        "Queue theory: Understand FIFO (First In First Out), enqueue/dequeue time complexity, and circular buffers.",
        "LeetCode 20 - Valid Parentheses: Study the stack mapping for bracket configurations.",
        "LeetCode 20 (Stack Solution): Implement Valid Parentheses using a stack and dictionary map in O(N).",
        "Linear Data Structures Review: Re-solve Valid Parentheses, Palindrome, and Two Sum.",
        "Binary Search theory: Learn divide-and-conquer search spaces on sorted arrays.",
        "Binary Search pointers: Study boundary checks, calculation of mid to prevent overflow: left + (right-left)/2.",
        "LeetCode 704 - Binary Search: Implement iterative binary search on a sorted integer array (O(log N)).",
        "LeetCode 704 (Recursive): Implement binary search recursively to understand call stack allocations.",
        "Binary Search practice: Find target insertion index or bounds using binary search logic.",
        "Linked Lists theory: Learn node structures, head/tail pointer addresses, and recursive pointer traversals.",
        "Linked Lists insertion: Practice inserting and deleting nodes at the head, middle, and tail.",
        "LeetCode 206 - Reverse Linked List: Trace pointer changes (prev, curr, next) on paper.",
        "LeetCode 206 (Iteration): Implement iterative reverse linked list by swapping pointer links in-place.",
        "LeetCode 206 (Recursion): Solve reverse linked list using recursion to build call stack familiarity.",
        "Linked Lists Merge logic: Practice merging two sorted lists on paper, tracing node redirection.",
        "LeetCode 21 - Merge Two Sorted Lists: Implement using a dummy node and iterating through list pointers.",
        "LeetCode 21 (Recursive): Merge two sorted lists using recursion for elegant code execution.",
        "Linked Lists review: Re-solve reverse list and merge list in C++ / Python.",
        "Linked Lists cycles: Learn Floyd's cycle detection algorithm (slow and fast pointers).",
        "Trees foundations: Study binary tree traversals (Pre-order, In-order, Post-order) and node structures.",
        "Trees depth theory: Understand depth-first search (DFS) recursion on hierarchical tree paths.",
        "LeetCode 226 - Invert Binary Tree: Trace recursive node inversions (swapping left and right children).",
        "LeetCode 226 (Recursive Solution): Implement recursive invert binary tree (O(N) time, O(H) space).",
        "LeetCode 226 (BFS Iterative): Invert a binary tree iteratively using a queue (Breadth-First Search).",
        "NeetCode 150 Easy Review: Re-solve Contains Duplicate, Valid Anagram, and Two Sum under time pressure.",
        "NeetCode 150 Easy Review: Re-solve Valid Palindrome, Best Time to Buy Stock, and Valid Parentheses.",
        "NeetCode 150 Easy Review: Re-solve Binary Search, Reverse Linked List, and Merge Lists.",
        "NeetCode 150 Easy Review: Re-solve Invert Binary Tree and practice drawing tree recursions.",
        "DSA Mock Test: Simulate an interview. Solve 2 randomly selected Easy tasks within 35 minutes.",
        "Arrays and Hashing Review: Solve a new array-based Easy question from LeetCode.",
        "Two Pointers & Sliding Window Review: Solve a new string-based Easy question.",
        "Answers Verification: Practice trace logs and print debug lines on parenthesis or buffer arrays.",
        "Linked Lists & Trees Review: Practice reversing a sublist or finding tree max depth.",
        "Final DSA Assessment: Review all core concepts and checklist completion state."
    ];

    const FULLSTACK_PLAN = [
        "Wireframing & UI Basics: Study user flows and box hierarchies. Draw a paper layout/wireframe of your landing page.",
        "HTML5 Elements: Learn semantic tags. Build a raw style-less contact page using HTML forms and inputs.",
        "CSS3 Foundations: Study selectors, colors, fonts, and the Box Model. Style your contact page to align form elements.",
        "Layout Systems: Master Flexbox and CSS Grid. Create a card grid layout that collapses nicely on mobile screens.",
        "Tailwind CSS: Study utility classes. Rebuild your card grid layout using only Tailwind utility classes.",
        "JavaScript Foundations: Learn variables, data types, and conditionals. Write basic console scripts.",
        "JS Arrays & Objects: Model products and loop over collections to print details to the console.",
        "Advanced JS & DOM: Study ES6 syntax, selection, and modification. Build an interactive clicker game.",
        "Async JS (Fetch): Study Promises and Async/Await. Fetch public quotes/weather API data and render it.",
        "Intro to React JS: Learn components, JSX, and useState. Build a toggle button or counter component.",
        "React Lifecycle & Lists: Study useEffect. Build a search input filtering a dynamic list of API elements.",
        "Python Core Basics: Learn variables, loops, functions, lists, dictionaries, and list comprehensions.",
        "Python OOP & File I/O: Learn class definitions, inheritance, and reading/writing local JSON database files.",
        "Python API & Automation: Write a Python script using requests to fetch and log current cryptocurrency rates.",
        "Node.js & npm: Learn node runtime, package managers, package.json, and install npm packages.",
        "Express.js Servers: Write a basic backend web server responding with JSON on /api/greet.",
        "NoSQL (MongoDB): Study documents. Connect Express server to MongoDB Atlas and insert collections using Mongoose.",
        "SQL Databases: Learn tables, columns, constraints, and execute basic SQLite/MySQL joins.",
        "Express CRUD API: Build a full REST API for a Todo list database connected to MongoDB.",
        "Python NumPy: Learn vector calculations, reshaping, and statistical operations on arrays.",
        "Python Pandas: Read CSV files, clean null data, filter, and summarize DataFrame data.",
        "Connecting MERN: Set up CORS. Fetch backend REST API tasks and render them inside your React state.",
        "Auth & Security: Implement registration and login endpoints using JSON Web Tokens (JWT) and bcrypt.",
        "Python Data Viz: Plot datasets using lines, bars, and scatter plots in Matplotlib and Seaborn.",
        "Gemini/OpenAI SDK: Write a Python script calling the Gemini API to summarize custom user text inputs.",
        "FastAPI/Flask API: Build a light Python API wrapping Gemini model chat responses.",
        "Full Integration: Hook React Front-End to call Express Backend, which queries the Python FastAPI LLM service.",
        "Deployment: Host React on Vercel, Node server on Render, and MongoDB on Atlas.",
        "shadcn/ui Dashboard: Assemble highly polished dashboard UI pages quickly using shadcn component libraries.",
        "Prebuilt Auth (Clerk): Add Clerk social authentication (Google/GitHub login) to lock/unlock React pages.",
        "Git Collaboration: Practice staging, branching, pull requests, and resolving merge conflicts.",
        "Third-party APIs: Integrate transactional notifications or send billing alerts using Resend SDK.",
        "Boilerplate Starter: Run a production starter kit template (Next.js + Tailwind + Clerk + Prisma).",
        "Tailwind Animations: Add slide-overs, drawer menus, and micro-hover cards using Framer Motion.",
        "Speed-run Challenge: Timebox building a full landing page with email signup in under 4 hours.",
        "AI Streaming Chat: Implement chat response letter-by-letter text streaming using Vercel AI SDK.",
        "Vector Databases: Generate text embeddings and store them in Pinecone / Supabase Vector databases.",
        "RAG (Retrieval Gen): Write a script querying LLMs on custom vector knowledge files.",
        "Gemini Function Calling: Register local Python functions for LLM callbacks.",
        "LangChain Chains: Build a multi-step sequential LLM pipeline (Idea -> Translate -> Tweet).",
        "Image/Audio APIs: Generate illustrative assets using DALL-E/ElevenLabs APIs.",
        "Prompt Engineering: Write safe system prompts for an AI health chatbot.",
        "Hackathon Scoping MVP: Pick a hackathon prompt and scope down to 3 core features.",
        "UI Mockups & Boilerplate: Initialize hackathon database schema and nav bar.",
        "Core DB Coding: Write form input controllers to save backend mock records.",
        "Core AI Coding: Hook up streaming prompts inside the server endpoints.",
        "Polish Visual States: Add loader states, skeletons, and error screens.",
        "Live Hackathon Deploy: Set up domains on Vercel and check console logs.",
        "Pitch Preparation: Structure problem, solution, and mechanism statements.",
        "Landing Page Optimization: Design conversion-optimized Hero block.",
        "Charts & Analytics: Display database telemetry on Chart.js/Recharts in React.",
        "Winning Demo Script: Write a 120s script highlighting the product's value.",
        "Record Loom Demo: Film a seamless walkthrough of the hackathon build.",
        "Write README: Compose an awesome repository landing page with visual assets.",
        "Devpost Submission: Create final Devpost submissions drafts and descriptions.",
        "Portfolio Review: Bundle all month 1 & 2 items into your main landing page.",
        "Hackathon Polish: Refine UI and responsive styling details.",
        "Mock Auditing: Test edge cases and inputs validation.",
        "Pitch Deck Slides: Design simple slides for your product pitch.",
        "Final Launch: Prepare public repositories and share links on social channels."
    ];

    // 2. Achievements Configurations
    const ACHIEVEMENTS = [
        {
            id: 'first_step',
            title: 'The Initiate',
            quote: '"Every journey begins with a single step."',
            conditionText: 'Complete any habit on Day 1',
            icon: 'fa-shoe-prints',
            check: (state) => {
                const day1 = state.habitsState["1"];
                if (!day1) return false;
                for (const hId in day1) {
                    if (day1[hId] === 'done') return true;
                }
                return false;
            }
        },
        {
            id: 'streak_7',
            title: 'Week 1 Warrior',
            quote: '"Consistency is the mother of mastery."',
            conditionText: 'Reach a 7-day streak',
            icon: 'fa-fire',
            check: (state) => state.streak >= 7
        },
        {
            id: 'streak_30',
            title: 'Halfway Hero',
            quote: '"The power of habit is unstoppable."',
            conditionText: 'Reach a 30-day streak',
            icon: 'fa-shield-halved',
            check: (state) => state.streak >= 30
        },
        {
            id: 'streak_60',
            title: 'Life Reset Legend',
            quote: '"You have conquered the 60-day reset. You are reborn."',
            conditionText: 'Complete the entire 60-day challenge',
            icon: 'fa-crown',
            check: (state) => state.streak >= 60
        },
        {
            id: 'gems_500',
            title: 'Gem Hoarder',
            quote: '"Wealth is the ability to fully experience life."',
            conditionText: 'Earn 500 gems (💎)',
            icon: 'fa-gem',
            check: (state) => state.gems >= 500
        },
        {
            id: 'fitness_master',
            title: 'Iron Athlete',
            quote: '"No excuses. Gym and Hyrox completed together."',
            conditionText: 'Complete Gym & Hyrox on the same day',
            icon: 'fa-bolt-lightning',
            check: (state) => {
                for (let d = 1; d <= 60; d++) {
                    const day = state.habitsState[d];
                    if (day && day['gym'] === 'done' && day['hyrox'] === 'done') {
                        return true;
                    }
                }
                return false;
            }
        }
    ];

    // Motivation Quotes array
    const MOTIVATION_QUOTES = [
        "You are stronger than you think. Keep pushing!",
        "Success is built daily. Stay disciplined.",
        "Don't stop when you are tired. Stop when you are done.",
        "One day at a time. The 60-day reset is yours.",
        "Consistency is what transforms average into excellence.",
        "Your future self will thank you for today's effort.",
        "Small daily wins lead to massive life changes.",
        "Stay focused. Elite habits build an elite life.",
        "Make today count. No excuses."
    ];

    // 3. Application State
    let state = {
        challengeStartTime: null,
        currentDay: 1,
        habitsState: {}, // Key: "1" to "60". Value: { habitId: 'todo'/'done'/'skipped' }
        gems: 0,
        streak: 0,
        trophies: 0,
        activeTab: 'todos', // 'todos', 'done', 'skipped'
        unlockedAchievements: {} // Key: id. Value: Date unlocked
    };

    // Load from local storage or create new state
    const loadState = () => {
        const localData = localStorage.getItem('life_reset_state_v2');
        if (localData) {
            state = JSON.parse(localData);
            // Verify all days exist in loaded state
            for (let d = 1; d <= 60; d++) {
                if (!state.habitsState[d]) {
                    state.habitsState[d] = {};
                    HABITS.forEach(h => state.habitsState[d][h.id] = 'todo');
                }
            }
        } else {
            resetToDefault();
        }
        recalculateAndSync();
    };

    const saveState = () => {
        localStorage.setItem('life_reset_state_v2', JSON.stringify(state));
    };

    const resetToDefault = () => {
        state.challengeStartTime = Date.now();
        state.currentDay = 1;
        state.habitsState = {};
        state.gems = 0;
        state.streak = 0;
        state.trophies = 0;
        state.activeTab = 'todos';
        state.unlockedAchievements = {};
        
        for (let d = 1; d <= 60; d++) {
            state.habitsState[d] = {};
            HABITS.forEach(h => {
                state.habitsState[d][h.id] = 'todo';
            });
        }
        saveState();
    };

    // 4. Calculations Engine
    const recalculateAndSync = () => {
        // Calculate Gems: +10 for each completed habit
        let doneCount = 0;
        for (let d = 1; d <= 60; d++) {
            for (const hId in state.habitsState[d]) {
                if (state.habitsState[d][hId] === 'done') {
                    doneCount++;
                }
            }
        }
        state.gems = doneCount * 10;

        // Calculate Streak: Consecutive days where all 11 habits are 'done'
        state.streak = calculateCurrentStreak();

        // Check Achievements
        checkAchievements();

        // Update Trophies
        state.trophies = Object.keys(state.unlockedAchievements).length;

        saveState();
    };

    const isDayFullyCompleted = (day) => {
        const dayHabits = state.habitsState[day];
        if (!dayHabits) return false;
        for (const h of HABITS) {
            if (dayHabits[h.id] !== 'done') {
                return false;
            }
        }
        return true;
    };

    const calculateCurrentStreak = () => {
        let maxCompletedDay = 0;
        // Find latest day with any habit checked as done
        for (let d = 60; d >= 1; d--) {
            let hasDone = false;
            for (const hId in state.habitsState[d]) {
                if (state.habitsState[d][hId] === 'done') {
                    hasDone = true;
                    break;
                }
            }
            if (hasDone) {
                maxCompletedDay = d;
                break;
            }
        }

        if (maxCompletedDay === 0) return 0;

        let startCheck = maxCompletedDay;
        // If the latest active day is not fully complete yet, we check from the day before it.
        // This is forgiving because the user is still working on their current day.
        if (!isDayFullyCompleted(maxCompletedDay) && maxCompletedDay > 1) {
            startCheck = maxCompletedDay - 1;
        }

        let consecutive = 0;
        for (let d = startCheck; d >= 1; d--) {
            if (isDayFullyCompleted(d)) {
                consecutive++;
            } else {
                break; // broken
            }
        }

        // Add 1 if the max completed day was actually fully completed too!
        if (isDayFullyCompleted(maxCompletedDay) && startCheck !== maxCompletedDay) {
            consecutive++;
        }

        return consecutive;
    };

    // Synthesize achievement unlock sound via Web Audio API
    const playUnlockChime = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioCtx.currentTime;
            
            const playTone = (freq, start, duration) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, start);
                
                gain.gain.setValueAtTime(0.08, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
                
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc.start(start);
                osc.stop(start + duration);
            };

            // Play a sweet ascending pentatonic chime (C5, D5, E5, G5, A5, C6)
            playTone(523.25, now, 0.15); // C5
            playTone(587.33, now + 0.08, 0.15); // D5
            playTone(659.25, now + 0.16, 0.15); // E5
            playTone(783.99, now + 0.24, 0.2); // G5
            playTone(880.00, now + 0.32, 0.2); // A5
            playTone(1046.50, now + 0.40, 0.4); // C6
        } catch (e) {
            console.log("AudioContext blocked or not supported:", e);
        }
    };

    const checkAchievements = () => {
        ACHIEVEMENTS.forEach(ach => {
            if (!state.unlockedAchievements[ach.id]) {
                if (ach.check(state)) {
                    state.unlockedAchievements[ach.id] = new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    // Play sound and alert
                    setTimeout(() => {
                        playUnlockChime();
                        showToast(`🏆 Achievement Unlocked: ${ach.title}!`);
                    }, 500);
                }
            }
        });
    };

    // Toast popup notification
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.style.position = 'absolute';
        toast.style.top = '100px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '16px';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4), 0 0 15px rgba(59, 130, 246, 0.4)';
        toast.style.fontFamily = 'Space Grotesk, sans-serif';
        toast.style.fontWeight = 'bold';
        toast.style.fontSize = '0.85rem';
        toast.style.zIndex = '9999';
        toast.style.textAlign = 'center';
        toast.style.width = '80%';
        toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -20px)';
        
        document.querySelector('.phone-frame').appendChild(toast);
        toast.innerText = message;
        
        // Force reflow
        toast.offsetHeight;
        
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, 0)';
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    };

    // 5. Journey Timer Logic
    const formatDuration = (ms) => {
        const totalSecs = Math.floor(ms / 1000);
        const days = Math.floor(totalSecs / (24 * 3600));
        const hours = Math.floor((totalSecs % (24 * 3600)) / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(days)}:${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    };

    const updateJourneyTimer = () => {
        if (!state.challengeStartTime) {
            state.challengeStartTime = Date.now();
            saveState();
        }
        const diff = Date.now() - state.challengeStartTime;
        document.getElementById('journey-time').innerText = formatDuration(diff);
    };

    setInterval(updateJourneyTimer, 1000);
    updateJourneyTimer();

    // 6. SVG Render for Circular Tracker Ring (60 segments)
    const createCircularTrackerSVG = (habitId) => {
        const totalDays = 60;
        const radius = 41;
        const cx = 55;
        const cy = 55;
        let svgContent = `<svg width="110" height="110" class="tracker-svg" data-habit-id="${habitId}">`;
        
        // Circular trace guide ring
        svgContent += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1.5" />`;
        
        // Plot 60 dots
        for (let d = 1; d <= totalDays; d++) {
            const angle = ((d - 1) * (360 / totalDays) - 90) * (Math.PI / 180);
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            
            const dayStatus = state.habitsState[d] ? state.habitsState[d][habitId] : 'todo';
            let fill = 'rgba(255, 255, 255, 0.12)';
            let stroke = 'none';
            let r = 2.0;
            let className = 'svg-dot';
            
            if (dayStatus === 'done') {
                fill = '#00f2fe';
                r = 2.6;
                className += ' done';
            } else if (dayStatus === 'skipped') {
                fill = '#f43f5e';
                r = 2.0;
                className += ' skipped';
            }
            
            if (d === state.currentDay) {
                stroke = '#ffffff';
                r = 3.5;
                className += ' current';
            }
            
            svgContent += `
                <circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="0.8" class="${className}" data-day="${d}">
                    <title>Day ${d}: ${dayStatus.toUpperCase()}</title>
                </circle>
            `;
        }
        
        // Calculate completion sum for this habit
        let completedCount = 0;
        for (let d = 1; d <= totalDays; d++) {
            if (state.habitsState[d] && state.habitsState[d][habitId] === 'done') {
                completedCount++;
            }
        }
        
        // Draw centered labels
        svgContent += `
            <text x="55" y="52" class="tracker-center-val" text-anchor="middle" font-size="20" font-weight="700" fill="#ffffff">${completedCount}</text>
            <text x="55" y="68" class="tracker-center-lbl" text-anchor="middle" font-size="9" fill="#64748b">DAYS</text>
        `;
        
        svgContent += `</svg>`;
        return svgContent;
    };

    // 7. Render UI Components
    const renderStats = () => {
        document.getElementById('streak-count').innerText = state.streak;
        document.getElementById('trophy-count').innerText = state.trophies;
        
        const oldGems = parseInt(document.getElementById('gems-count').innerText) || 0;
        const newGems = state.gems;
        document.getElementById('gems-count').innerText = newGems;
        
        if (newGems > oldGems) {
            const delta = newGems - oldGems;
            const deltaSpan = document.getElementById('gems-delta-val');
            deltaSpan.innerText = `(+${delta})`;
            deltaSpan.classList.add('active');
            
            setTimeout(() => {
                deltaSpan.classList.remove('active');
            }, 1800);
        }
    };

    const renderDaySelector = () => {
        document.getElementById('day-title').innerText = `Day ${state.currentDay}/60`;
        
        // Enable/Disable navigation buttons
        document.getElementById('btn-prev-day').disabled = (state.currentDay === 1);
        document.getElementById('btn-next-day').disabled = (state.currentDay === 60);

        // Motivational Quote update
        const quoteIndex = (state.currentDay - 1) % MOTIVATION_QUOTES.length;
        document.querySelector('.day-motivation').innerText = MOTIVATION_QUOTES[quoteIndex];
    };

    const renderWaterWidget = () => {
        const bars = document.querySelectorAll('.spark-bar');
        const startDay = Math.max(1, state.currentDay - 6);
        
        // Loop over the 7 bars
        for (let i = 0; i < 7; i++) {
            const targetDay = startDay + i;
            const bar = bars[i];
            
            if (targetDay > state.currentDay) {
                // Future days
                bar.style.setProperty('--h', '10%');
                bar.classList.remove('active');
                bar.setAttribute('title', `Day ${targetDay} (Future)`);
            } else {
                const dayData = state.habitsState[targetDay];
                const isWaterDone = dayData && dayData['water'] === 'done';
                const isWaterSkipped = dayData && dayData['water'] === 'skipped';
                
                let height = '15%';
                if (isWaterDone) {
                    height = '100%';
                    bar.classList.add('active');
                } else if (isWaterSkipped) {
                    height = '0%';
                    bar.classList.remove('active');
                } else {
                    bar.classList.remove('active');
                }
                
                bar.style.setProperty('--h', height);
                bar.setAttribute('title', `Day ${targetDay}: ${isWaterDone ? 'Done' : isWaterSkipped ? 'Skipped' : 'To-do'}`);
            }
        }

        // Calculate water intake compliance over the past 14 days
        let waterDonePast14 = 0;
        let countedDays = 0;
        for (let d = Math.max(1, state.currentDay - 13); d <= state.currentDay; d++) {
            countedDays++;
            if (state.habitsState[d] && state.habitsState[d]['water'] === 'done') {
                waterDonePast14++;
            }
        }
        
        const complianceRate = countedDays > 0 ? Math.round((waterDonePast14 / countedDays) * 100) : 0;
        document.querySelector('.widget-footer strong').innerText = `${complianceRate}% compliance`;
        document.querySelector('.impact-result').innerText = `Focus Level Outcome: +${Math.round(complianceRate * 0.3)}% focus increase`;
    };

    const renderHabitsList = () => {
        const container = document.getElementById('habits-list-container');
        container.innerHTML = '';

        const currentDayHabits = state.habitsState[state.currentDay];
        
        // Filter habits according to current tab filter
        const filteredHabits = HABITS.filter(h => {
            const status = currentDayHabits[h.id] || 'todo';
            return status === state.activeTab || (state.activeTab === 'todos' && status === 'todo');
        });

        // Set Tab Badges Counts
        let countTodos = 0;
        let countDone = 0;
        let countSkipped = 0;

        HABITS.forEach(h => {
            const status = currentDayHabits[h.id] || 'todo';
            if (status === 'done') countDone++;
            else if (status === 'skipped') countSkipped++;
            else countTodos++;
        });

        document.getElementById('badge-todos').innerText = countTodos;
        document.getElementById('badge-done').innerText = countDone;
        document.getElementById('badge-skipped').innerText = countSkipped;

        if (filteredHabits.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: var(--text-dim); padding: 30px 10px; font-size: 0.85rem; border: 1.5px dashed var(--border-card); border-radius: 20px;">
                    No habits in "${state.activeTab.toUpperCase()}" list for Day ${state.currentDay}.
                </div>
            `;
            return;
        }

        // Render card elements
        filteredHabits.forEach(h => {
            const status = currentDayHabits[h.id] || 'todo';
            const card = document.createElement('div');
            card.className = `habit-card state-${status}`;
            card.setAttribute('data-habit-id', h.id);

            const diffClass = `tag-difficulty-${h.difficulty.toLowerCase()}`;
            
            let actionBtnHTML = '';
            if (status === 'todo') {
                actionBtnHTML = `
                    <button class="habit-btn btn-done" data-action="done"><i class="fa-solid fa-circle-check"></i> Done</button>
                    <button class="habit-btn btn-skip" data-action="skip">Skip</button>
                `;
            } else {
                actionBtnHTML = `
                    <button class="habit-btn btn-undo" data-action="undo"><i class="fa-solid fa-rotate-left"></i> Undo</button>
                `;
            }

            card.innerHTML = `
                <div class="habit-details-left">
                    <div class="habit-tags">
                        <span class="habit-tag ${diffClass}">${h.difficulty}</span>
                        <span class="habit-tag tag-category">${h.category}</span>
                    </div>
                    <h2><i class="fa-solid ${h.icon}"></i> ${h.name}</h2>
                    <p class="habit-desc">${
                        h.id === 'hyrox' ? (HYROX_PLAN[state.currentDay - 1] || h.desc) :
                        h.id === 'leetcode' ? (DSA_PLAN[state.currentDay - 1] || h.desc) :
                        h.id === 'project' ? (FULLSTACK_PLAN[state.currentDay - 1] || h.desc) :
                        h.desc
                    }</p>
                    <div class="habit-actions">
                        ${actionBtnHTML}
                    </div>
                </div>
                <div class="circular-tracker-container">
                    ${createCircularTrackerSVG(h.id)}
                </div>
            `;

            container.appendChild(card);
        });
    };

    const renderAchievements = () => {
        const achSection = document.querySelector('.achievements-section');
        achSection.innerHTML = `
            <div class="section-heading">
                <h2>Unlocked Badges (${Object.keys(state.unlockedAchievements).length}/${ACHIEVEMENTS.length})</h2>
            </div>
        `;

        ACHIEVEMENTS.forEach(ach => {
            const isUnlocked = !!state.unlockedAchievements[ach.id];
            const unlockDate = state.unlockedAchievements[ach.id];
            
            const card = document.createElement('div');
            card.className = `achievement-card ${isUnlocked ? '' : 'locked'}`;
            
            card.innerHTML = `
                <div class="ach-icon-container">
                    <i class="fa-solid ${isUnlocked ? ach.icon : 'fa-lock'} ach-icon"></i>
                </div>
                <div class="ach-details">
                    <h3>${ach.title}</h3>
                    <p class="ach-quote">${isUnlocked ? ach.quote : '"Keep going to reveal this secret badge."'}</p>
                    <span class="ach-condition"><i class="fa-solid fa-circle-info"></i> ${ach.conditionText}</span>
                    ${isUnlocked ? `<span class="ach-date">Unlocked on ${unlockDate}</span>` : ''}
                </div>
            `;
            
            achSection.appendChild(card);
        });
    };

    const updateFullUI = () => {
        renderStats();
        renderDaySelector();
        renderWaterWidget();
        renderHabitsList();
        renderAchievements();
    };

    // 8. Interactive Click Event Bindings
    // Tabs Navigation
    document.querySelector('.habit-tabs-bar').addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeTab = btn.getAttribute('data-tab');
        
        saveState();
        renderHabitsList();
    });

    // Day Prev/Next navigation
    document.getElementById('btn-prev-day').addEventListener('click', () => {
        if (state.currentDay > 1) {
            state.currentDay--;
            saveState();
            updateFullUI();
        }
    });

    document.getElementById('btn-next-day').addEventListener('click', () => {
        if (state.currentDay < 60) {
            state.currentDay++;
            saveState();
            updateFullUI();
        }
    });

    // Actions Click Events (Done / Skip / Undo) on Habit cards
    document.getElementById('habits-list-container').addEventListener('click', (e) => {
        const btn = e.target.closest('.habit-btn');
        if (btn) {
            const card = btn.closest('.habit-card');
            const habitId = card.getAttribute('data-habit-id');
            const action = btn.getAttribute('data-action');
            
            const currentDayHabits = state.habitsState[state.currentDay];
            
            if (action === 'done') {
                currentDayHabits[habitId] = 'done';
            } else if (action === 'skip') {
                currentDayHabits[habitId] = 'skipped';
            } else if (action === 'undo') {
                currentDayHabits[habitId] = 'todo';
            }
            
            recalculateAndSync();
            updateFullUI();
            return;
        }

        // SVG Dot Clicking to directly check/uncheck days
        const svgDot = e.target.closest('.svg-dot');
        if (svgDot) {
            const dayNum = parseInt(svgDot.getAttribute('data-day'));
            const svg = svgDot.closest('.tracker-svg');
            const habitId = svg.getAttribute('data-habit-id');
            
            // Toggle state of this habit for that day
            const currentStatus = state.habitsState[dayNum][habitId] || 'todo';
            let newStatus = 'todo';
            
            if (currentStatus === 'todo') {
                newStatus = 'done';
            } else if (currentStatus === 'done') {
                newStatus = 'skipped';
            } else {
                newStatus = 'todo';
            }
            
            state.habitsState[dayNum][habitId] = newStatus;
            
            // Set current active day to this clicked dot day
            state.currentDay = dayNum;
            
            recalculateAndSync();
            updateFullUI();
        }
    });

    // Reset App Confirmation
    document.getElementById('btn-reset-app').addEventListener('click', () => {
        if (confirm("🚨 WARNING: Are you sure you want to reset the challenge? This will wipe your 60-day checklists, elapsed timer, streaks, and achievements forever!")) {
            resetToDefault();
            recalculateAndSync();
            updateFullUI();
            showToast("Challenge reset successfully. Day 1/60.");
        }
    });

    // 9. Boot Execution
    loadState();
    updateFullUI();
});

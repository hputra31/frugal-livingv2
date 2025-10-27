document.addEventListener('DOMContentLoaded', () => {
    // Check which page is currently active and run the corresponding script.
    if (document.getElementById('app')) {
        // This is app.html
        initializeAppLogic();
    } else if (document.getElementById('main-header')) {
        // This is index.html (landing page)
        initializeLandingPageLogic();
    }
});

/**
 * Initializes scripts for the landing page (index.html).
 */
function initializeLandingPageLogic() {
    // Hero section animation on load
    const heroTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1200
    });

    heroTimeline
        .add({
            targets: 'main h2',
            translateY: [25, 0],
            opacity: [0, 1],
            duration: 1000
        })
        .add({ // Make the paragraph container visible before typing starts
            targets: '#typing-effect',
            opacity: [0, 1]
        }, '-=800')
        .add({ // Start the typing effect
            targets: '#typing-effect',
            duration: 10000, // Increased duration for the longer text
            begin: function() {
                const targetElement = document.getElementById('typing-effect');
                const textToType = "Frixsave (Financial Revolution & Innovative Xtra Save) adalah gerakan revolusioner dalam pengelolaan keuangan pribadi yang menggunakan inovasi teknologi cerdas untuk menggantikan metode budgeting lama yang rumit. Tujuan utamanya adalah memberikan kebebasan finansial dengan menghasilkan simpanan ekstra (Xtra Save) yang nyata bagi penggunanya.";
                let i = 0;
                const typingSpeed = 20; // Slightly faster typing speed
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                targetElement.appendChild(cursor);

                function typeWriter() {
                    if (i < textToType.length) {
                        targetElement.insertBefore(document.createTextNode(textToType.charAt(i)), cursor);
                        i++;
                        setTimeout(typeWriter, typingSpeed);
                    } else {
                        cursor.style.animationPlayState = 'paused';
                        cursor.style.opacity = 0;
                    }
                }
                typeWriter();
            }
        }, '-=600')
        .add({ // Animate the button after typing starts
            targets: 'main a',
            translateY: [25, 0],
            opacity: [0, 1],
        }, '-=600');

    // Intersection Observer for scroll animations with anime.js
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine which section is visible and apply animation
                const sectionId = entry.target.id;
                let targets;

                if (sectionId === 'features' || sectionId === 'slogans' || sectionId === 'testimonials' || sectionId === 'faq') {
                    targets = `#${sectionId} .fade-in-section`;
                } else if (sectionId === 'pricing' || sectionId === 'cta') {
                    targets = `#${sectionId} .fade-in-section`;
                }

                if (targets) {
                    anime({
                        targets: targets,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150, { start: 100 }),
                        easing: 'easeOutExpo',
                        duration: 1000
                    });
                }
                
                // Unobserve the target to prevent re-animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    // Observe the main sections that need to be animated on scroll
    const sectionsToAnimate = document.querySelectorAll('#features, #slogans, #pricing, #testimonials, #faq, #cta');
    sectionsToAnimate.forEach(section => {
        // Hide sections initially
        const children = section.querySelectorAll('.fade-in-section');
        children.forEach(child => {
            child.style.opacity = '0';
        });
        observer.observe(section);
    });

    // Feature icon hover animation
    const featureItems = document.querySelectorAll('#features .fade-in-section');
    featureItems.forEach(item => {
        const iconContainer = item.querySelector('.w-16.h-16'); // The colored box

        item.addEventListener('mouseenter', () => {
            anime.remove(iconContainer);
            anime({
                targets: iconContainer,
                translateY: -8,
                scale: 1.15,
                rotate: '10deg',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        item.addEventListener('mouseleave', () => {
            anime.remove(iconContainer);
            anime({ targets: iconContainer, translateY: 0, scale: 1, rotate: '0deg', duration: 400, easing: 'easeOutElastic(1, .8)' });
        });
    });

    // Sticky header logic
    const header = document.getElementById('main-header');
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }

        if (window.scrollY > 300) {
            backToTopButton.classList.add('is-visible');
        } else {
            backToTopButton.classList.remove('is-visible');
        }
    });

    // --- 3D Background Animation with Three.js ---
    function initThreeJSBackground() {
        const container = document.getElementById('three-bg');
        if (!container) return;

        let scene, camera, renderer, group, pointLight;
        const mouse = new THREE.Vector2();

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 20;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x888888, 1);
        scene.add(ambientLight);

        pointLight = new THREE.PointLight(0xffffff, 2, 100);
        pointLight.position.set(0, 0, 25);
        scene.add(pointLight);

        // Materials
        const coinMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 0.8, roughness: 0.2 });
        const billMaterial = new THREE.MeshStandardMaterial({ color: 0x4CAF50, metalness: 0.2, roughness: 0.8, side: THREE.DoubleSide });
        const chartMaterial = new THREE.MeshStandardMaterial({ color: 0x6366f1, metalness: 0.5, roughness: 0.5 });

        // Geometries
        const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
        const billGeometry = new THREE.PlaneGeometry(2.5, 1.2);
        const bar1 = new THREE.BoxGeometry(0.3, 1, 0.3);
        const bar2 = new THREE.BoxGeometry(0.3, 1.5, 0.3);
        const bar3 = new THREE.BoxGeometry(0.3, 0.8, 0.3);

        // Group to hold all objects
        group = new THREE.Group();
        scene.add(group);

        const objectTypes = [
            { geo: coinGeometry, mat: coinMaterial },
            { geo: billGeometry, mat: billMaterial },
            { geo: [bar1, bar2, bar3], mat: chartMaterial } // Chart is special
        ];

        // Create and place objects
        for (let i = 0; i < 150; i++) {
            const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
            let mesh;

            if (Array.isArray(type.geo)) { // It's a chart
                const chartGroup = new THREE.Group();
                const barMesh1 = new THREE.Mesh(type.geo[0], type.mat);
                barMesh1.position.x = -0.5;
                const barMesh2 = new THREE.Mesh(type.geo[1], type.mat);
                const barMesh3 = new THREE.Mesh(type.geo[2], type.mat);
                barMesh3.position.x = 0.5;
                chartGroup.add(barMesh1, barMesh2, barMesh3);
                mesh = chartGroup;
            } else {
                mesh = new THREE.Mesh(type.geo, type.mat);
            }

            // Position in a sphere
            const phi = Math.acos(-1 + (2 * i) / 150);
            const theta = Math.sqrt(150 * Math.PI) * phi;
            const radius = 15;
            
            mesh.position.setFromSphericalCoords(radius, phi, theta);
            mesh.position.x += (Math.random() - 0.5) * 5;
            mesh.position.y += (Math.random() - 0.5) * 5;
            mesh.position.z += (Math.random() - 0.5) * 5;

            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            mesh.scale.setScalar(Math.random() * 0.5 + 0.2);

            group.add(mesh);
        }

        // Mouse move listener
        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Animate group rotation
            group.rotation.y = elapsedTime * 0.05;
            group.rotation.x = elapsedTime * 0.02;

            // Animate individual objects
            group.children.forEach((child, index) => {
                child.rotation.x += 0.001 * (index % 5 + 1);
                child.rotation.y += 0.002 * (index % 5 + 1);
            });

            // Animate camera based on mouse
            camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            // Animate light to follow mouse
            const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const pos = camera.position.clone().add(dir.multiplyScalar(distance));
            pointLight.position.copy(pos);

            renderer.render(scene, camera);
        }

        // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        window.addEventListener('resize', onWindowResize);

        animate();
    }

    initThreeJSBackground();
}

/**
 * Initializes the main application logic for app.html.
 */
function initializeAppLogic() {
    // Default date range to the last month until today
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 1);
    const startDateString = startDate.toISOString().split('T')[0];
    
    // Simple state management
    let appState = {
        user: null,
        isLoading: true,
        profile: { name: 'Pengguna Frixsave', currency: 'IDR', theme: 'light', accentColor: 'indigo' },
        currentPage: 'overview',
        sidebarOpen: false,
        userDropdownOpen: false,
        overview: {
            categoryChartFilter: 'thisMonth' // 'today', 'thisWeek', 'thisMonth', 'thisYear'
        },
        showQuickAdd: false,
        transactions: [],
        budgets: [],
        categories: [
            // Expense Categories
            { type: 'expense', name: '🍽️ Makanan' },
            { type: 'expense', name: '🚗 Transportasi' },
            { type: 'expense', name: '🛍️ Belanja' },
            { type: 'expense', name: '📄 Tagihan' },
            { type: 'expense', name: '🎬 Hiburan' },
            { type: 'expense', name: '🏥 Kesehatan' },
            { type: 'expense', name: '📚 Pendidikan' },
            { type: 'expense', name: '🎁 Hadiah' },
            { type: 'expense', name: '🤲 Berbagi' },
            { type: 'expense', name: '🏠 Rumah Tangga' },
            { type: 'expense', name: '📱 Top Up' },
            { type: 'expense', name: '💳 E-Wallet' },
            { type: 'expense', name: '🤝 Arisan' },
            { type: 'expense', name: '📦 Lainnya' },
            // Income Categories
            { type: 'income', name: '📥 Piutang' },
            { type: 'income', name: '💰 Gaji' },
            { type: 'income', name: '📈 Investasi' },
            { type: 'income', name: '💸 Bonus' },
            { type: 'income', name: '🤝 Arisan' },
            { type: 'income', name: '🪙 Lainnya' },
            // Expense Categories for Debt/Receivable
            { type: 'expense', name: '💸 Utang' },
        ],
        transactionManagement: {
            currentPage: 1,
            transactionsPerPage: 10, // Show 10 transactions per page
            totalTransactions: 0,
            startDate: startDateString, // Filter tanggal mulai
            endDate: endDate,    // Filter tanggal akhir
            summary: {
                income: 0,
                expense: 0,
                balance: 0
            }
        },
        goals: [],
        receivables: [],
        userManagement: {
            currentPage: 1,
            usersPerPage: 5, // Show 5 users per page
            totalUsers: 0
        }
    };

    // To keep track of active real-time subscriptions
    let activeSubscriptions = [];

    // Function to unsubscribe from all active channels
    async function unsubscribeAll() {
        if (activeSubscriptions.length > 0) {
            console.log('👋 Unsubscribing from all real-time channels...');
            try {
                await Promise.all(activeSubscriptions.map(sub => supabase.removeChannel(sub)));
                activeSubscriptions = [];
                console.log('✅ All channels unsubscribed.');
            } catch (error) {
                console.error('❌ Error unsubscribing from channels:', error);
            }
        }
    }

    // Function to set up real-time subscriptions
    async function setupRealtimeSubscriptions(userId) {
        // First, ensure any old subscriptions are removed before creating new ones
        await unsubscribeAll();

        console.log('📡 Setting up real-time subscriptions for user:', userId);

        const handleChanges = (payload) => {
            console.log('🔄 Real-time change detected:', payload);
            // A simple way to handle changes is to just reload all data and re-render
            loadUserData();
            render();
            showSyncStatus('info', 'Data diperbarui secara real-time.');
        };

        const tables = ['transactions', 'budgets', 'goals', 'receivables'];

        tables.forEach(table => {
            const channel = supabase.channel(`public:${table}:user_id=eq.${userId}`)
                .on('postgres_changes', { event: '*', schema: 'public', table: table, filter: `user_id=eq.${userId}` }, handleChanges)
                .subscribe((status, err) => {
                    if (status === 'SUBSCRIBED') {
                        console.log(`✅ Subscribed to ${table} changes for user ${userId}`);
                    }
                    if (status === 'CHANNEL_ERROR') {
                        console.error(`❌ Subscription error on ${table}:`, err);
                    }
                });
            activeSubscriptions.push(channel);
        });
    }

    // API Layer - All database interactions go through this object
    const api = {
        // User functions
        async createUser(userData) {
            const { data, error } = await supabase
                .from('users')
                .insert([userData])
                .select();
            return { data, error };
        },
        
        async getUserByEmail(email) {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();
            return { data, error };
        },
        
        async updateUser(userId, updates) {
            const { data, error } = await supabase
                .from('users')
                .update(updates)
                .eq('id', userId)
                .select();
            return { data, error };
        },

        async getAllUsers(page = 1, perPage = 5) {
            const from = (page - 1) * perPage;
            const to = from + perPage - 1;
            const { data, error, count } = await supabase
                .from('users_with_stats') // Query the new view instead of the table
                .select('*', { count: 'exact' }) // The view has all the columns we need
                .order('email', { ascending: true })
                .range(from, to);
            return { data, error, count };
        },

        async deleteUser(userId) {
            const { data, error } = await supabase
                .from('users')
                .delete()
                .eq('id', userId);
            return { data, error };
        },
        
        async getAllUsersWithStats() {
            const { data, error } = await supabase
                .from('users_with_stats')
                .select('*')
                .order('created_at', { ascending: true });
            return { data, error };
        },

        // --- Admin Aggregate Functions ---
        async getSystemStats() {
            // This RPC function needs to be created in Supabase
            // It should return { total_transactions: count, total_volume: sum }
            const { data, error } = await supabase.rpc('get_system_stats');
            return { data, error };
        },

        async getTopActiveUsers(limit = 5) {
            // This RPC function needs to be created in Supabase
            // It should return users with their transaction_count and total_volume
            const { data, error } = await supabase.rpc('get_top_active_users', { limit_count: limit });
            return { data, error };
        },

        async getMonthlyUserGrowth() {
            // This RPC function needs to be created in Supabase
            // It should return { month, user_count } for the last 6 months
            const { data, error } = await supabase.rpc('get_monthly_user_growth');
            return { data, error };
        },

        // We can reuse the existing function for transaction activity
        // No new API function needed for this one if we fetch all transactions.
        // However, an RPC would be more performant.

        async getTransactionsFromLastMonths(months = 6) {
            const date = new Date();
            date.setMonth(date.getMonth() - months);
            const fromDate = date.toISOString().split('T')[0];

            const { data, error } = await supabase
                .from('transactions')
                .select('date, amount')
                .gte('date', fromDate);
            return { data, error };
        },

        // Transaction functions
        async getTransactions(userId, page = 1, perPage = 10, startDate = null, endDate = null) {
            const from = (page - 1) * perPage;
            const to = from + perPage - 1;
            
            let query = supabase
                .from('transactions')
                .select('*', { count: 'exact' })
                .eq('user_id', userId)
                .order('date', { ascending: false });

            if (startDate) {
                query = query.gte('date', startDate);
            }
            if (endDate) {
                query = query.lte('date', endDate);
            }

            const { data, error, count } = await query.range(from, to);
            return { data, error, count };
        },

        async getTransactionsSummary(userId, startDate, endDate) {
            // This RPC function needs to be created in Supabase
            const { data, error } = await supabase.rpc('get_transactions_summary', { p_user_id: userId, p_start_date: startDate, p_end_date: endDate });
            return { data, error };
        },
        
        async createTransaction(transactionData) {
            const { data, error } = await supabase
                .from('transactions')
                .insert([transactionData])
                .select();
            return { data, error };
        },
        
        async deleteTransaction(transactionId) {
            const { data, error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', transactionId);
            return { data, error };
        },

        async updateTransaction(transactionId, updates) {
            const { data, error } = await supabase
                .from('transactions')
                .update(updates)
                .eq('id', transactionId)
                .select();
            return { data, error };
        },
        
        // Budget functions
        async getBudgets(userId) {
            const { data, error } = await supabase
                .from('budgets')
                .select('*')
                .eq('user_id', userId);
            return { data, error };
        },
        
        async createBudget(budgetData) {
            const { data, error } = await supabase
                .from('budgets')
                .insert([budgetData])
                .select();
            return { data, error };
        },

        async updateBudget(budgetId, updates) {
            const { data, error } = await supabase
                .from('budgets')
                .update(updates)
                .eq('id', budgetId)
                .select();
            return { data, error };
        },

        async deleteBudget(budgetId) {
            const { data, error } = await supabase
                .from('budgets')
                .delete()
                .eq('id', budgetId);
            return { data, error };
        },
        
        // Goal functions
        async getGoals(userId) {
            const { data, error } = await supabase
                .from('goals')
                .select('*')
                .eq('user_id', userId);
            return { data, error };
        },
        
        async createGoal(goalData) {
            const { data, error } = await supabase
                .from('goals')
                .insert([goalData])
                .select();
            return { data, error };
        },

        async updateGoal(goalId, updates) {
            const { data, error } = await supabase
                .from('goals')
                .update(updates)
                .eq('id', goalId)
                .select();
            return { data, error };
        },

        async deleteGoal(goalId) {
            const { data, error } = await supabase
                .from('goals')
                .delete()
                .eq('id', goalId);
            return { data, error };
        },
        
        // Receivable functions
        async getReceivables(userId) {
            const { data, error } = await supabase
                .from('receivables')
                .select('*')
                .eq('user_id', userId)
                .order('due_date', { ascending: true });
            return { data, error };
        },
        
        async createReceivable(receivableData) {
            const { data, error } = await supabase
                .from('receivables')
                .insert([receivableData])
                .select();
            return { data, error };
        },

        async updateReceivable(receivableId, updates) {
            const { data, error } = await supabase
                .from('receivables')
                .update(updates)
                .eq('id', receivableId)
                .select();
            return { data, error };
        },

        async deleteReceivable(receivableId) {
            const { data, error } = await supabase
                .from('receivables')
                .delete()
                .eq('id', receivableId);
            return { data, error };
        },
    };

    // Hashing utility using Web Crypto API for enhanced security
    const hasher = {
        async hashPin(pin, salt) {
            if (!pin || !salt) throw new Error("PIN and salt are required for hashing.");
            const encoder = new TextEncoder();
            // Combine PIN and a unique salt (user ID) before hashing
            const data = encoder.encode(pin + salt); 
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            // Convert buffer to hex string for storage
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }
    };

    // Mock authentication with PIN system
    const auth = {
        login: async (email, pin = null) => { // Wajib Supabase
            if (!useSupabase) return { success: false, error: 'Supabase tidak terkonfigurasi.' };

            const { data: dbUser, error: userError } = await api.getUserByEmail(email);

            if (userError || !dbUser) {
                return { success: false, error: 'Email tidak terdaftar. Minta admin untuk membuat akun Anda.' };
            }

            // Jika user ada tapi belum punya PIN (misal baru dibuat admin), minta set PIN.
            // Untuk login, kita asumsikan PIN sudah ada.
            if (!dbUser.pin) {
                // Logika ini bisa dikembangkan untuk alur pembuatan PIN pertama kali.
                // Untuk sekarang, kita anggap user yang valid pasti punya PIN.
                return { success: false, error: 'Akun ini belum memiliki PIN. Silakan hubungi admin.' };
            }

            // Jika user ada dan punya PIN, tapi PIN tidak diberikan di form, minta PIN.
            if (!pin) {
                return { success: false, needPin: true };
            }

            const userId = dbUser.id;
            const userPinHash = dbUser.pin;
            const hashedPin = await hasher.hashPin(pin, userId);
            if (!userPinHash || hashedPin !== userPinHash) {
                return { success: false, error: 'PIN salah' };
            }

            let userRole = 'user';
            if (useSupabase) {
                if (dbUser && dbUser.role) {
                    userRole = dbUser.role;
                }
            }

            // Simpan seluruh data user dari DB ke appState
            appState.user = dbUser;

            // Simpan sesi user ke localStorage untuk persistensi
            localStorage.setItem('frixsave_user', JSON.stringify(dbUser));

            if (userRole === 'admin') {
                appState.currentPage = 'admin-dashboard';
            }
            console.log(`✅ Login successful for: ${email} with role: ${userRole}`);
            return { success: true };
        },
        logout: async function() {
            await unsubscribeAll();

            // Hapus sesi user dari localStorage
            localStorage.removeItem('frixsave_user');
            
            // Reset the entire app state to its initial condition
            appState = {
                user: null,
                isLoading: false, // Set to false to prevent loading screen
                profile: { name: 'Pengguna Frixsave', currency: 'IDR', theme: 'light' },
                currentPage: 'overview',
                sidebarOpen: false,
                showQuickAdd: false,
                transactions: [], budgets: [], goals: [], receivables: [],
                userManagement: { currentPage: 1, usersPerPage: 5, totalUsers: 0 }
            };

            console.log('✅ Logout successful.');
            render(); // Directly re-render the app, which will show the login page
        },
        init: async () => {},
        setPin: async (newPin) => {
            if (!appState.user) return false;
            
            const userId = appState.user.id;
            const hashedPin = await hasher.hashPin(newPin, userId);

            if (useSupabase) {
                try {
                    const { error } = await api.updateUser(userId, { pin: hashedPin });
                    if (error) {
                        console.error('❌ Supabase PIN update error:', error);
                        showSyncStatus('error', 'Gagal sinkronisasi PIN ke cloud.');
                    }
                    console.log('✅ PIN hash updated in Supabase for user:', userId);
                } catch (e) {
                    console.error('❌ Exception during PIN update:', e);
                    return false;
                }
            }
            return true;
        },
        removePin: async () => {
            if (!appState.user) return false;
            
            const userId = appState.user.id;
            if (useSupabase) {
                try {
                    const { error } = await api.updateUser(userId, { pin: null });
                    if (error) {
                        console.error('❌ Supabase PIN removal error:', error);
                        showSyncStatus('error', 'Gagal hapus PIN di cloud.');
                        return false;
                    }
                    console.log('✅ PIN removed from Supabase for user:', userId);
                } catch (e) {
                    console.error('❌ Exception during PIN removal:', e);
                    return false;
                }
            }
            return true;
        },
        hasPin: () => {
            if (appState.user) {
                return !!appState.user.pin;
            }
            return false;
        }
    };

    // Theme Management
    function applyAppearance(theme, accentColor) {
        const root = document.documentElement;

        // 1. Handle Light/Dark Theme
        if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // 2. Handle Accent Color
        // Remove old accent color classes
        const accents = ['indigo', 'green', 'rose', 'orange'];
        accents.forEach(color => root.classList.remove(`theme-${color}`));

        // Add new accent color class
        root.classList.add(`theme-${accentColor || 'indigo'}`);
    }

    function loadProfileSettings(userId) {
        appState.profile.name = appState.user.name || 'Pengguna Frixsave';
        appState.profile.currency = appState.user.currency || 'IDR';
        appState.profile.theme = appState.user.theme || 'light';
        appState.profile.accentColor = appState.user.accent_color || 'indigo';
        applyAppearance(appState.profile.theme, appState.profile.accentColor);
    }

    // Override supabase.updateUser to include accent_color
    const originalUpdateUser = api.updateUser;
    api.updateUser = async (userId, updates) => {
        updates.accent_color = updates.accentColor; // Map JS-style name to DB-style name
        return originalUpdateUser(userId, updates);
    }

    // Data management
    async function loadUserData() {
        if (!appState.user) return;
        
        const userId = appState.user.id;
        
        try {
            console.log('🔄 Loading data from Supabase...');
            const { currentPage, transactionsPerPage, startDate, endDate } = appState.transactionManagement;

            const [
                { data: transactions, error: transError, count: transCount },
                { data: summaryData, error: summaryError },
                { data: budgets, error: budgetError },
                { data: goals, error: goalError },
                { data: receivables, error: receivableError },
            ] = await Promise.all([
                api.getTransactions(userId, currentPage, transactionsPerPage, startDate, endDate),
                api.getTransactionsSummary(userId, startDate, endDate),
                api.getBudgets(userId),
                api.getGoals(userId),
                api.getReceivables(userId),
            ]);

            if (transError || budgetError || goalError || receivableError || summaryError) {
                throw new Error('One or more data streams failed to load.');
            }

            appState.transactions = transactions || [];
            appState.budgets = budgets || [];
            if (summaryData && summaryData.length > 0) {
                const summary = summaryData[0];
                appState.transactionManagement.summary.income = summary.total_income || 0;
                appState.transactionManagement.summary.expense = summary.total_expense || 0;
                appState.transactionManagement.summary.balance = summary.total_income - summary.total_expense;
            }

            appState.transactionManagement.totalTransactions = transCount || 0;
            appState.goals = goals || [];
            appState.receivables = receivables || [];
            
            console.log('✅ Data loaded from Supabase.');
            
            // Ensure profile settings are also loaded from the user data
            loadProfileSettings();

            await setupRealtimeSubscriptions(userId);

        } catch (error) {
            console.error('❌ Fatal Error loading from Supabase:', error);
            showSyncStatus('error', 'Gagal memuat data dari cloud. Coba refresh.');
        }
    }

    async function saveTransaction(transaction) {
        if (!appState.user) return;
        
        transaction.id = Date.now();
        transaction.user_id = appState.user.id;
        transaction.created_at = new Date().toISOString();
        
        try {
            if (useSupabase) {
                console.log('💾 Saving transaction to Supabase...');
                const { data, error } = await api.createTransaction(transaction);
                if (error) {
                    console.error('❌ Supabase save error:', error);
                    showSyncStatus('error', 'Tersimpan lokal, gagal sync ke cloud');
                } else {
                    console.log('✅ Transaction saved to Supabase:', data);
                    await loadUserData(); // Reload data to get the latest state
                    render();
                    showSyncStatus('success', 'Transaksi tersimpan & tersinkronisasi');
                }
            }
        } catch (error) {
            console.error('❌ Error saving transaction:', error);
            showSyncStatus('error', 'Gagal menyimpan transaksi');
        }
    }

    window.deleteTransaction = deleteTransaction;
    async function deleteTransaction(id) {
        showConfirmModal({
            title: 'Hapus Transaksi?',
            message: 'Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.',
            confirmText: 'Ya, Hapus',
            isDestructive: true,
            onConfirm: async () => {
                if (useSupabase) {
                    const { error } = await api.deleteTransaction(id);
                    if (error) {
                        console.error('❌ Error deleting transaction:', error);
                        showSyncStatus('error', 'Gagal menghapus transaksi.');
                    } else {
                        await loadUserData();
                        render();
                        showSyncStatus('success', 'Transaksi dihapus & disinkronisasi.');
                    }
                }
            }
        });
    }

    async function createBudget(budget) {
        if (!appState.user) return;
        
        budget.id = Date.now();
        budget.user_id = appState.user.id;
        budget.created_at = new Date().toISOString();

        try {
            if (useSupabase) {
                const { data, error } = await api.createBudget(budget);
                if (error) {
                    showSyncStatus('error', 'Gagal sync anggaran ke cloud');
                    console.error('Supabase budget create error:', error);
                } else {
                    await loadUserData();
                    render();
                    showSyncStatus('success', 'Anggaran dibuat & disinkronisasi');
                }
            }
        } catch (error) {
            console.error('Error creating budget:', error);
            showSyncStatus('error', 'Gagal membuat anggaran');
        } finally {
            render();
        }
    }

    async function updateBudget(budgetId, updates) {
        if (!appState.user) return;

        try {
            if (useSupabase) {
                const { data, error } = await api.updateBudget(budgetId, updates);
                if (error) {
                    showSyncStatus('error', 'Gagal sync update anggaran');
                    console.error('Supabase budget update error:', error);
                } else {
                    await loadUserData();
                    render();
                    showSyncStatus('success', 'Anggaran berhasil diperbarui.');
                }
            }
        } catch (error) {
            console.error('Error updating budget:', error);
            showSyncStatus('error', 'Gagal memperbarui anggaran');
        }
    }

    async function deleteBudget(budgetId) {
        showConfirmModal({
            title: 'Hapus Anggaran?',
            message: 'Apakah Anda yakin ingin menghapus anggaran ini?',
            confirmText: 'Ya, Hapus',
            isDestructive: true,
            onConfirm: async () => {
                if (useSupabase) {
                    const { error } = await api.deleteBudget(budgetId);
                    if (error) {
                        console.error('❌ Error deleting budget:', error);
                        showSyncStatus('error', 'Gagal menghapus anggaran.');
                    } else {
                        await loadUserData();
                        render();
                        showSyncStatus('success', 'Anggaran dihapus & disinkronisasi.');
                    }
                }
            }
        });
    }

    async function deleteReceivable(receivableId) {
        showConfirmModal({
            title: 'Hapus Piutang?',
            message: 'Apakah Anda yakin ingin menghapus catatan piutang ini?',
            confirmText: 'Ya, Hapus',
            isDestructive: true,
            onConfirm: async () => {
                if (useSupabase) {
                    const { error } = await api.deleteReceivable(receivableId);
                    if (error) {
                        console.error('❌ Error deleting receivable:', error);
                        showSyncStatus('error', 'Gagal menghapus piutang.');
                    } else {
                        await loadUserData();
                        render();
                        showSyncStatus('success', 'Piutang dihapus & disinkronisasi.');
                    }
                }
            }
        });
    }

    async function createGoal(goal) {
        if (!appState.user) return;
        
        goal.id = Date.now();
        goal.user_id = appState.user.id;
        goal.created_at = new Date().toISOString();

        try {
            if (useSupabase) {
                const { data, error } = await api.createGoal(goal);
                if (error) {
                    showSyncStatus('error', 'Gagal sync target ke cloud');
                    console.error('Supabase goal create error:', error);
                } else {
                    await loadUserData();
                    render();
                    showSyncStatus('success', 'Target dibuat & disinkronisasi');
                }
            }
        } catch (error) {
            console.error('Error creating goal:', error);
            showSyncStatus('error', 'Gagal membuat target');
        } finally {
            render();
        }
    }

    function renderLoadingScreen() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center text-white p-4 relative overflow-hidden dark:from-slate-900 dark:via-black dark:to-slate-800">
                <style>
                    @keyframes spin-and-grow {
                        0% { transform: rotate(0deg) scale(0.8); }
                        50% { transform: rotate(180deg) scale(1.1); }
                        100% { transform: rotate(360deg) scale(0.8); }
                    }
                    .loader-icon {
                        animation: spin-and-grow 2s ease-in-out infinite;
                    }
                    @keyframes text-glow {
                        0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.3); }
                        50% { text-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 25px rgba(255, 255, 255, 0.5); }
                    }
                    .glowing-text {
                        animation: text-glow 3s ease-in-out infinite;
                    }
                    @keyframes progress-fill {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                </style>
                <div class="text-center fade-in">
                    <!-- Ganti ikon dengan tag <img> untuk logo Anda -->
                    <div class="inline-flex items-center justify-center w-24 h-24 mb-8 loader-icon drop-shadow-xl">
                        <img src="img/loading.png" alt="Frixsave Logo" class="h-full w-full object-contain logo-transparent-bg">
                    </div>
                    <h1 class="text-5xl font-bold text-white mb-4 tracking-tight glowing-text">Frixsave</h1>
                    <p class="text-white/80 text-xl">Memuat data keuangan Anda...</p>
                    <!-- Progress Bar -->
                    <div class="w-full max-w-xs bg-white/20 rounded-full h-2.5 mt-8 mx-auto">
                        <div id="loading-progress-bar" class="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full" style="animation: progress-fill 1.5s ease-out forwards;"></div>
                    </div>
                    <p id="loading-progress-text" class="text-white/80 text-sm mt-2">Menyiapkan antarmuka...</p>
                </div>
            </div>
        `;
    }

    function renderSetupRequiredPage() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center p-4 text-white">
                <div class="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl border border-white/20">
                    <div class="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <i class="fas fa-tools text-white text-3xl"></i>
                    </div>
                    <h1 class="text-4xl font-bold mb-4">Konfigurasi Diperlukan</h1>
                    <p class="text-white/80 text-lg mb-6">
                        Aplikasi ini memerlukan koneksi ke Supabase untuk berfungsi. Silakan konfigurasi kredensial Anda di file <code>config.js</code>.
                    </p>
                    <div class="text-left bg-black/30 p-4 rounded-xl font-mono text-sm">
                        <p><span class="text-yellow-400">const SUPABASE_URL</span> = 'PASTE_URL_ANDA_DISINI';</p>
                        <p><span class="text-yellow-400">const SUPABASE_ANON_KEY</span> = 'PASTE_KUNCI_ANON_ANDA_DISINI';</p>
                    </div>
                    <p class="text-white/60 text-sm mt-6">Setelah Anda mengisi kredensial, silakan refresh halaman ini.</p>
                </div>
            </div>`;
    }

    // Login Page
    function renderLoginPage() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden dark:from-slate-900 dark:via-black dark:to-slate-800">
                <!-- Animated Background Elements -->
                <div class="absolute inset-0 overflow-hidden">
                    <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                    <div class="absolute top-40 left-40 w-60 h-60 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
                </div>

                <!-- Login Card -->
                <div class="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 fade-in">
                    <!-- Header -->
                    <div class="text-center mb-8">
                        <!-- Logo diperbesar dan diberi bayangan -->
                        <div class="inline-flex items-center justify-center w-25 h-24 mb-6 drop-shadow-xl ">
                            <img src="img/login.png" alt="Frixsave Logo" class="h-full w-full object-contain logo-transparent-bg">
                        </div>
                        <p class="text-white/80 text-lg">Smart Financial Management</p>
                        <div class="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mx-auto mt-4"></div>
                    </div>

                    <!-- Login Form -->
                    <div id="login-form" class="space-y-6">
                        <div class="space-y-4">
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i class="fas fa-envelope text-white/60"></i>
                                </div>
                                <input
                                    type="email"
                                    id="email-input"
                                    class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                    placeholder="Masukkan alamat email"
                                    required
                                />
                            </div>
                            
                            <div id="error-message" class="hidden bg-red-500/20 border border-red-400/30 text-red-100 px-4 py-3 rounded-2xl backdrop-blur-sm">
                                <div class="flex items-center">
                                    <i class="fas fa-exclamation-triangle mr-3 text-red-300"></i>
                                    <span id="error-text" class="text-sm"></span>
                                </div>
                            </div>
                            
                            <button
                                onclick="handleLogin()"
                                id="login-button"
                                class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                            >
                                <i class="fas fa-arrow-right mr-3"></i>Akses Dashboard
                            </button>
                        </div>
                    </div>
                    
                    <!-- Divider -->
                    <div class="flex items-center my-8">
                        <div class="flex-1 border-t border-white/20"></div>
                        <span class="px-4 text-white/60 text-sm font-medium">Quick Demo Access</span>
                        <div class="flex-1 border-t border-white/20"></div>
                    </div>

                    <!-- Demo Buttons -->
                    <div class="space-y-3">
                        <button
                            onclick="quickLogin('demo@frixsave.com')"
                            class="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm group"
                        >
                            <div class="flex items-center justify-center">
                                <div class="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                                    <i class="fas fa-user text-white text-sm"></i>
                                </div>
                                <span class="font-medium">demo@frixsave.com</span>
                                <i class="fas fa-arrow-right ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                            </div>
                        </button>
                    </div>

                    <!-- Footer Info -->
                    <div class="mt-8 text-center">
                        <div class="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                            <i class="fas fa-shield-alt text-green-400 mr-2"></i>
                            <span class="text-white/80 text-sm">Secure & Private</span>
                        </div>
                    </div>
                </div>

                <!-- Bottom Credits -->
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <p class="text-white/60 text-sm">
                        Powered by <span class="font-semibold text-white">HPUTRAX</span>
                    </p>
                </div>
            </div>
        `;
    }

    // Dashboard Layout
    function renderDashboard() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900">
                <!-- Modern Navbar -->
                <nav class="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 fixed w-full top-0 z-40 dark:bg-slate-800/80 dark:border-slate-700/50">
                    <div class="px-4 sm:px-6 lg:px-8 ">
                        <div class="flex justify-between items-center h-18">
                            <div class="flex items-center">
                                <button
                                    onclick="toggleSidebar()"
                                    class="lg:hidden p-3 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
                                >
                                    <i class="fas fa-bars text-lg"></i>
                                </button>
                                <img src="img/logo.png" alt="Frixsave Logo" class="h-10 w-auto object-contain drop-shadow-lg logo-transparent-bg flex-shrink-0 ml-2 lg:ml-0">
                            </div>
                            
                            <div class="flex items-center space-x-4">
                                <!-- Info Pengguna Dropdown (Tambahkan onclick untuk menghentikan propagasi event) -->
                                <div class="relative" id="user-dropdown-container" onclick="event.stopPropagation()">
                                    <button onclick="toggleUserDropdown(event)" class="flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-2 sm:px-4 sm:py-2 rounded-2xl border border-white/40 dark:bg-slate-700/50 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-700 transition-colors duration-300">
                                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <i class="fas fa-user text-white text-sm"></i>
                                        </div>
                                        <span class="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">${appState.user.email}</span>
                                        <i class="fas fa-chevron-down text-xs text-gray-500 dark:text-gray-400 ml-1 transition-transform duration-300 ${appState.userDropdownOpen ? 'rotate-180' : ''}"></i>
                                    </button>

                                    <!-- Dropdown Menu -->
                                    ${appState.userDropdownOpen ? `
                                    <div id="user-dropdown-menu" class="absolute right-0 mt-3 w-56 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:bg-slate-800/90 dark:border-slate-700/80 animate-fadeIn">
                                        <div class="p-2">
                                            <button onclick="navigateTo('settings')" class="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl transition-colors duration-200">
                                                <i class="fas fa-user-cog w-5 mr-3 text-gray-500 dark:text-gray-400"></i>
                                                Profil
                                            </button>
                                            <div class="my-1 h-px bg-gray-200 dark:bg-slate-700"></div>
                                            <button onclick="handleLogout()" class="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-xl transition-colors duration-200">
                                                <i class="fas fa-sign-out-alt w-5 mr-3"></i>
                                                Keluar
                                            </button>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Modern Sidebar -->
                <div id="sidebar" class="fixed inset-y-0 left-0 z-30 w-72 bg-white/90 backdrop-blur-xl shadow-2xl transform ${
                    appState.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 transition-transform duration-300 ease-in-out border-r border-white/20 dark:bg-slate-800/90 dark:border-slate-700">
                    <div class="flex flex-col h-full pt-20">
                        <!-- User Profile Section -->
                        <div class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <i class="fas fa-user text-white text-lg"></i>
                                </div>
                                <div class="flex-1 ml-3">
                                    <p class="font-semibold text-gray-800 dark:text-gray-100 truncate">${appState.user.name || 'Pengguna Frixsave'}</p>
                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">${appState.user.email}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex-1 px-4 py-6 space-y-2 border-t border-gray-100 dark:border-slate-700 overflow-y-auto">
                            ${renderMenuItems()}
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:ml-72 pt-20">
                    <main class="p-4 sm:p-6 lg:p-8 pb-32 lg:pb-20">
                        <div id="page-content" class="page-fade-in">
                            ${renderCurrentPage()}
                        </div>
                    </main>
                </div>

                <!-- Mobile Bottom Navigation -->
                <div class="lg:hidden fixed bottom-0 left-0 z-40 w-full h-20 bg-white/90 backdrop-blur-xl border-t border-gray-200/80 dark:bg-slate-800/90 dark:border-slate-700/80">
                    <div class="grid h-full grid-cols-5 mx-auto">
                        ${renderBottomNavItem('overview', 'Ringkasan', 'fas fa-home')}
                        ${renderBottomNavItem('goals', 'Target', 'fas fa-bullseye')}
                        
                        <!-- Tombol Tambah di Tengah -->
                        <div class="flex items-center justify-center">
                            <button onclick="showQuickAddModal()" class="inline-flex items-center justify-center w-16 h-16 font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg transform -translate-y-4 hover:scale-110 transition-transform duration-300">
                                <i class="fas fa-plus text-2xl"></i>
                            </button>
                        </div>

                        ${renderBottomNavItem('budgets', 'Anggaran', 'fas fa-chart-pie')}
                        ${renderBottomNavItem('reports', 'Laporan', 'fas fa-chart-bar')}
                    </div>
                </div>

                <!-- Modern Footer -->
                <footer class="lg:ml-72 bg-white/60 backdrop-blur-sm border-t border-white/20 py-6 px-4 sm:px-6 lg:px-8 dark:bg-slate-800/60 dark:border-slate-700">
                    <div class="text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Frixsave by <span class="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">HPUTRAX</span>
                        </p>
                    </div>
                </footer>

                <!-- Mobile Sidebar Overlay -->
                ${appState.sidebarOpen ? `
                    <div
                        class="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
                        onclick="toggleSidebar()"
                    ></div>
                ` : ''}

                <!-- Quick Add Modal -->
                ${appState.showQuickAdd ? renderQuickAddModal() : ''}
            </div>
        `;
    }

    function renderBottomNavItem(pageId, label, icon) {
        const isActive = appState.currentPage === pageId;
        const activeClass = 'text-indigo-600 dark:text-indigo-400';
        const inactiveClass = 'text-gray-500 dark:text-gray-400';

        return `
            <button type="button" onclick="navigateTo('${pageId}')" class="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 group transition-colors duration-300">
                <div class="w-8 h-8 flex items-center justify-center">
                    <i class="${icon} text-xl ${isActive ? activeClass : inactiveClass} group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"></i>
                </div>
                <span class="text-xs ${isActive ? activeClass + ' font-semibold' : inactiveClass} group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    ${label}
                </span>
            </button>
        `;
    }

    function renderMenuItems() {
        const baseMenuItems = [
            { id: 'overview', label: 'Ringkasan', icon: 'fas fa-chart-line' },
            { id: 'transactions', label: 'Transaksi', icon: 'fas fa-receipt' },
            { id: 'budgets', label: 'Anggaran', icon: 'fas fa-chart-pie' },
            { id: 'receivables', label: 'Piutang', icon: 'fas fa-hand-holding-usd' },
            { id: 'goals', label: 'Target', icon: 'fas fa-bullseye' },
            { id: 'reports', label: 'Laporan', icon: 'fas fa-chart-bar' },
            { id: 'settings', label: 'Pengaturan', icon: 'fas fa-cog' }
        ];
        
        const adminMenuItems = [
            { id: 'admin-dashboard', label: 'Admin Dashboard', icon: 'fas fa-crown' },
            { id: 'user-management', label: 'Kelola User', icon: 'fas fa-users' },
            { id: 'system-reports', label: 'Laporan Sistem', icon: 'fas fa-chart-area' }
        ];
        
        let menuItems;
        if (appState.user?.role === 'admin') {
            // Admin only sees admin menus and the settings menu
            const settingsMenu = baseMenuItems.find(item => item.id === 'settings');
            menuItems = [...adminMenuItems, settingsMenu];
        } else {
            menuItems = baseMenuItems;
        }

        return menuItems.map(item => `
            <button
                onclick="navigateTo('${item.id}')"
                class="w-full flex items-center px-4 py-3 text-left rounded-2xl font-semibold transition-all duration-300 group ${
                    appState.currentPage === item.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white'
                }"
            >
                <i class="${item.icon} mr-3 w-5 group-hover:scale-110 transition-transform"></i>
                ${item.label}
            </button>
        `).join('');
    }

    function renderCurrentPage() {
        switch (appState.currentPage) {
            case 'overview':
                return renderOverviewPage();
            case 'transactions':
                return renderTransactionsPage();
            case 'budgets':
                return renderBudgetsPage();
            case 'receivables':
                return renderReceivablesPage();
            case 'reports':
                return renderReportsPage();
            case 'goals':
                return renderGoalsPage();
            case 'settings':
                return renderSettingsPage();
            case 'admin-dashboard':
                return appState.user?.role === 'admin' ? renderAdminDashboard() : renderOverviewPage();
            case 'user-management':
                if (appState.user?.role === 'admin') { return renderUserManagement(); } else { return renderOverviewPage(); }
            case 'system-reports':
                return appState.user?.role === 'admin' ? renderSystemReports() : renderOverviewPage();
            default:
                return renderOverviewPage();
        }
    }

    function renderOverviewPage() {
        const syncStatusIndicator = useSupabase 
            ? `<div class="flex items-center space-x-2 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span class="text-xs font-medium text-green-700 dark:text-green-300">Tersinkronisasi</span></div>`
            : `<div class="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-yellow-500 rounded-full"></div><span class="text-xs font-medium text-yellow-700 dark:text-yellow-300">Mode Lokal</span></div>`;

        const totalIncome = appState.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = appState.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIncome - totalExpense;

        // Logic for Financial Status
        let financialStatus;
        const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : -1;

        if (savingsRate >= 20) {
            financialStatus = {
                title: 'Bertumbuh',
                description: 'Kerja bagus! Pengeluaran Anda jauh di bawah pemasukan. Terus pertahankan!',
                image: 'img/bertumbuh.png',
                bgColor: 'bg-green-50 dark:bg-green-500/10',
                borderColor: 'border-green-200 dark:border-green-500/20',
                textColor: 'text-green-700 dark:text-green-300',
                icon: 'fa-rocket'
            };
        } else if (savingsRate >= 0) {
            financialStatus = {
                title: 'Seimbang',
                description: 'Pemasukan dan pengeluaran Anda cukup seimbang. Cari peluang untuk menabung lebih banyak.',
                image: 'img/seimbang.png',
                bgColor: 'bg-blue-50 dark:bg-blue-500/10',
                borderColor: 'border-blue-200 dark:border-blue-500/20',
                textColor: 'text-blue-700 dark:text-blue-300',
                icon: 'fa-balance-scale'
            };
        } else {
            financialStatus = {
                title: 'Waspada',
                description: 'Pengeluaran melebihi pemasukan. Saatnya meninjau kembali anggaran Anda.',
                image: 'img/waspada.png',
                bgColor: 'bg-red-50 dark:bg-red-500/10',
                borderColor: 'border-red-200 dark:border-red-500/20',
                textColor: 'text-red-700 dark:text-red-300',
                icon: 'fa-exclamation-triangle'
            };
        }

        // Data processing for the trend chart
        const trendData = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const today = new Date();

        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            trendData[key] = {
                label: monthNames[d.getMonth()],
                income: 0,
                expense: 0
            };
        }

        appState.transactions.forEach(t => {
            const d = new Date(t.date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            
            if (trendData[key]) {
                if (t.type === 'income') {
                    trendData[key].income += t.amount;
                } else {
                    trendData[key].expense += t.amount;
                }
            }
        });

        return `
            <div class="space-y-8 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">Ringkasan Keuangan</h1>
                        <p class="text-gray-600 mt-2 dark:text-gray-400">Pantau kondisi keuangan Anda secara real-time</p>
                    </div>
                    ${syncStatusIndicator}
                </div>

                <!-- Financial Status Card -->
                <div class="financial-status-card ${financialStatus.bgColor} ${financialStatus.borderColor} border-2 rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <img src="${financialStatus.image}" alt="Status ${financialStatus.title}" class="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"/>
                    <div class="text-center md:text-left">
                        <div class="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <i class="fas ${financialStatus.icon} ${financialStatus.textColor}"></i>
                            <h2 class="text-xl font-bold ${financialStatus.textColor}">
                                Status Keuangan: ${financialStatus.title}
                            </h2>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                            ${financialStatus.description}
                        </p>
                    </div>
                </div>

                
                <!-- Modern Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group dark:bg-slate-800/70 dark:border-slate-700 dark:hover:shadow-indigo-500/10">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600 mb-2">Total Pemasukan</p>
                                <p class="text-3xl font-bold text-green-600">Rp ${(totalIncome * 1000).toLocaleString('id-ID')}</p>
                                <p class="text-xs text-green-500 mt-1">↗ Trend positif</p>
                            </div>
                            <div class="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-arrow-up text-white text-xl"></i>
                            </div>
                        </div>
                    </div>                    
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group dark:bg-slate-800/70 dark:border-slate-700 dark:hover:shadow-rose-500/10">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600 mb-2">Total Pengeluaran</p>
                                <p class="text-3xl font-bold text-red-600">Rp ${(totalExpense * 1000).toLocaleString('id-ID')}</p>
                                <p class="text-xs text-red-500 mt-1">↘ Perlu dikontrol</p>
                            </div>
                            <div class="bg-gradient-to-br from-red-400 to-rose-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-arrow-down text-white text-xl"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group dark:bg-slate-800/70 dark:border-slate-700 dark:hover:shadow-blue-500/10">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600 mb-2">Saldo Bersih</p>
                                <p class="text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}">
                                    Rp ${(balance * 1000).toLocaleString('id-ID')}
                                </p>
                                <p class="text-xs ${balance >= 0 ? 'text-green-500' : 'text-red-500'} mt-1">
                                    ${balance >= 0 ? '✓ Kondisi sehat' : '⚠️ Perlu perhatian'}
                                </p>
                            </div>
                            <div class="bg-gradient-to-br from-${balance >= 0 ? 'blue' : 'orange'}-400 to-${balance >= 0 ? 'indigo' : 'red'}-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-wallet text-white text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Interactive Charts Section -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <!-- Monthly Trend Chart -->
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg sm:text-xl font-bold text-gray-800 flex items-center dark:text-white">
                                <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                                    <i class="fas fa-chart-line text-white text-sm"></i>
                                </div>
                                Tren Keuangan
                            </h3>
                            <select class="text-sm bg-white/80 border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <option>6 Bulan Terakhir</option>
                                <option>12 Bulan Terakhir</option>
                                <option>Tahun Ini</option>
                            </select>
                        </div>
                        
                        ${appState.transactions.length === 0 ? `
                            <div class="text-center py-8 sm:py-12 dark:text-gray-400">
                                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <i class="fas fa-chart-line text-2xl sm:text-3xl text-indigo-400"></i>
                                </div>
                                <h4 class="text-base sm:text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">Belum Ada Data</h4>
                                <p class="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">Tambahkan transaksi untuk melihat tren keuangan</p>
                                <button onclick="showQuickAddModal()" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                                    <i class="fas fa-plus mr-2"></i>Tambah Transaksi
                                </button>
                            </div>
                        ` : `
                            <!-- Simple Chart Visualization -->
                            <div class="space-y-4">${(() => {
                                const trendValues = Object.values(trendData);
                                const maxAmount = Math.max(1, ...trendValues.map(d => d.income), ...trendValues.map(d => d.expense));
                                
                                return `
                                <div class="relative h-32 sm:h-40 bg-gradient-to-t from-blue-50 to-transparent rounded-2xl p-4 flex items-end justify-around dark:from-blue-900/50">
                                    ${trendValues.map(monthData => {
                                        const incomeHeight = (monthData.income / maxAmount) * 100;
                                        const expenseHeight = (monthData.expense / maxAmount) * 100;
                                        return `
                                            <div class="flex items-end h-full gap-1 group relative">
                                                <div class="w-4 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg shadow-lg" style="height: ${incomeHeight}%" title="Pemasukan: Rp ${(monthData.income * 1000).toLocaleString('id-ID')}"></div>
                                                <div class="w-4 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg shadow-lg" style="height: ${expenseHeight}%" title="Pengeluaran: Rp ${(monthData.expense * 1000).toLocaleString('id-ID')}"></div>
                                                <div class="absolute -bottom-6 text-center w-full text-xs text-gray-500 dark:text-gray-400">${monthData.label}</div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                                <div class="flex items-center justify-center space-x-6 text-xs sm:text-sm">
                                    <div class="flex items-center">
                                        <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-2"></div>
                                        <span class="text-gray-600 dark:text-gray-300">Pemasukan</span>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-2"></div>
                                        <span class="text-gray-600 dark:text-gray-300">Pengeluaran</span>
                                    </div>
                                </div>
                                `;
                            })()}</div>
                        `}
                    </div>

                    <!-- Category Pie Chart -->
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg sm:text-xl font-bold text-gray-800 flex items-center dark:text-white">
                                <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                                    <i class="fas fa-chart-pie text-white text-sm"></i>
                                </div>
                                Kategori Pengeluaran
                            </h3>
                            <!-- Category Chart Filter Dropdown -->
                            <select onchange="setCategoryChartFilter(this.value)" class="text-sm bg-white/80 border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <option value="today" ${appState.overview.categoryChartFilter === 'today' ? 'selected' : ''}>Hari Ini</option>
                                <option value="thisWeek" ${appState.overview.categoryChartFilter === 'thisWeek' ? 'selected' : ''}>Minggu Ini</option>
                                <option value="thisMonth" ${appState.overview.categoryChartFilter === 'thisMonth' ? 'selected' : ''}>Bulan Ini</option>
                                <option value="thisYear" ${appState.overview.categoryChartFilter === 'thisYear' ? 'selected' : ''}>Tahun Ini</option>
                            </select>
                        </div>
                        
                        ${(() => {
                            const now = new Date();
                            const todayStr = now.toISOString().split('T')[0];
                            
                            const startOfWeek = new Date(now);
                            startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // Monday as start of week
                            const startOfWeekStr = startOfWeek.toISOString().split('T')[0];

                            const startOfMonthStr = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
                            const startOfYearStr = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];

                            const filteredTransactions = appState.transactions.filter(t => {
                                switch(appState.overview.categoryChartFilter) {
                                    case 'today': return t.date === todayStr;
                                    case 'thisWeek': return t.date >= startOfWeekStr;
                                    case 'thisMonth': return t.date >= startOfMonthStr;
                                    case 'thisYear': return t.date >= startOfYearStr;
                                    default: return true;
                                }
                            });

                            const expensesByCategory = {};
                            filteredTransactions.filter(t => t.type === 'expense').forEach(t => {
                                expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
                            });
                            const topCategories = Object.entries(expensesByCategory).sort(([,a], [,b]) => b - a).slice(0, 4);
                            const totalExpense = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);
                            
                            if (topCategories.length === 0) {
                                return `
                                    <div class="text-center py-8 sm:py-12 dark:text-gray-400">
                                        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                            <i class="fas fa-chart-pie text-2xl sm:text-3xl text-purple-400"></i>
                                        </div>
                                        <h4 class="text-base sm:text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">Belum Ada Pengeluaran</h4>
                                        <p class="text-gray-500 text-sm sm:text-base">Catat pengeluaran untuk melihat breakdown kategori</p>
                                    </div>
                                `;
                            }
                            
                            const colors = ['blue', 'green', 'purple', 'red'];
                            
                            return `
                                <div class="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                                    <!-- Simple Donut Chart -->
                                    <div class="relative w-32 h-32 mx-auto">
                                        <div class="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-lg dark:from-blue-600 dark:to-purple-700">
                                            <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                                                <div class="text-center">
                                                    <div class="text-lg font-bold text-gray-800 dark:text-white">${topCategories.length}</div>
                                                    <div class="text-xs text-gray-500">Kategori</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Legend -->
                                    <div class="flex-1 space-y-3">
                                        ${topCategories.map(([category, amount], index) => {
                                            const percentage = (amount / totalExpense) * 100;
                                            const color = colors[index % colors.length];
                                            
                                            return `
                                                <div class="flex items-center justify-between p-3 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group dark:bg-slate-700/50 dark:border-slate-600 dark:hover:bg-slate-700">
                                                    <div class="flex items-center space-x-3">
                                                        <div class="w-4 h-4 bg-gradient-to-r from-${color}-400 to-${color}-500 rounded-full shadow-sm"></div>
                                                        <div>
                                                            <p class="font-semibold text-gray-800 text-sm dark:text-gray-200">${category}</p>
                                                            <p class="text-xs text-gray-500 dark:text-gray-400">${percentage.toFixed(1)}% dari total</p>
                                                        </div>
                                                    </div>
                                                    <div class="text-right">
                                                        <p class="font-bold text-gray-800 text-sm dark:text-gray-100">Rp ${(amount * 1000).toLocaleString('id-ID')}</p>
                                                    </div>
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>
                            `;
                        })()}
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">Transaksi Terbaru</h3>
                        <button onclick="navigateTo('transactions')" class="text-indigo-600 hover:text-indigo-700 font-medium text-sm dark:text-indigo-400 dark:hover:text-indigo-300">
                            Lihat Semua →
                        </button>
                    </div>
                    ${appState.transactions.length === 0 ? `
                        <div class="text-center py-12 dark:text-gray-400">
                            <div class="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <i class="fas fa-receipt text-3xl text-indigo-400"></i>
                            </div>
                            <h4 class="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">Belum Ada Transaksi</h4>
                            <p class="text-gray-500 mb-6">Mulai catat transaksi pertama Anda untuk melihat ringkasan keuangan</p>
                            <button onclick="showQuickAddModal()" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                <i class="fas fa-plus mr-2"></i>Tambah Transaksi Pertama
                            </button>
                        </div>
                    ` : `
                        <div class="space-y-4">
                            ${appState.transactions.slice(-5).reverse().map(t => `
                                <div class="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 dark:bg-slate-700/50 dark:border-slate-600 dark:hover:bg-slate-700">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-12 h-12 bg-gradient-to-br from-${t.type === 'income' ? 'green' : 'red'}-400 to-${t.type === 'income' ? 'emerald' : 'rose'}-500 rounded-2xl flex items-center justify-center shadow-lg">
                                            <i class="fas fa-${t.type === 'income' ? 'arrow-up' : 'arrow-down'} text-white"></i>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-gray-800 dark:text-gray-100">${t.description}</p>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">${t.category} • ${new Date(t.date).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-lg font-bold text-${t.type === 'income' ? 'green' : 'red'}-600 dark:text-${t.type === 'income' ? 'green' : 'red'}-400">
                                            ${t.type === 'income' ? '+' : '-'}Rp ${(t.amount * 1000).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    function renderTransactionsPage() {
        const syncStatusIndicator = useSupabase 
            ? `<div class="flex items-center space-x-2 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span class="text-xs font-medium text-green-700 dark:text-green-300">Tersinkronisasi</span></div>`
            : `<div class="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-yellow-500 rounded-full"></div><span class="text-xs font-medium text-yellow-700 dark:text-yellow-300">Mode Lokal</span></div>`;

        return `
            <div class="space-y-6 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">Transaksi</h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1 dark:text-gray-400">Kelola semua transaksi keuangan Anda</p>
                    </div>
                    <div class="flex flex-col sm:flex-row items-center gap-3">
                        ${syncStatusIndicator}
                        <button onclick="showQuickAddModal()" class="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 sm:px-6 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                            <i class="fas fa-paper-plane mr-2"></i>
                            <span class="text-sm sm:text-base">Tambah Transaksi</span>
                        </button>
                    </div>
                </div>

                <!-- Summary Cards for Filtered Date Range -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                                <i class="fas fa-arrow-up text-white text-lg"></i>
                            </div>
                            <div>
                                <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Pemasukan (Filter)</p>
                                <p class="text-xl font-bold text-green-600 dark:text-green-400">Rp ${(appState.transactionManagement.summary.income * 1000).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                                <i class="fas fa-arrow-down text-white text-lg"></i>
                            </div>
                            <div>
                                <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Pengeluaran (Filter)</p>
                                <p class="text-xl font-bold text-red-600 dark:text-red-400">Rp ${(appState.transactionManagement.summary.expense * 1000).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                                <i class="fas fa-wallet text-white text-lg"></i>
                            </div>
                            <div>
                                <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Saldo Bersih (Filter)</p>
                                <p class="text-xl font-bold ${appState.transactionManagement.summary.balance >= 0 ? 'text-green-600' : 'text-red-600'} dark:${appState.transactionManagement.summary.balance >= 0 ? 'text-green-400' : 'text-red-400'}">
                                    Rp ${(appState.transactionManagement.summary.balance * 1000).toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Search and Filter Section -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                    <div class="flex flex-col lg:flex-row gap-4">
                        <!-- Search Input -->
                        <div class="flex-1 relative">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <i class="fas fa-search text-gray-400"></i>
                            </div>
                            <input
                                type="text"
                                id="transaction-search"
                                placeholder="Cari transaksi berdasarkan deskripsi, kategori, atau jumlah..."
                                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                                oninput="filterTransactions()"
                            />
                        </div>

                        <!-- Date Range Filter -->
                        <div class="flex items-center gap-2">
                            <input
                                type="date"
                                id="start-date-filter"
                                value="${appState.transactionManagement.startDate}"
                                onchange="handleDateFilterChange()"
                                class="w-full px-3 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                            <input
                                type="date"
                                id="end-date-filter"
                                value="${appState.transactionManagement.endDate}"
                                onchange="handleDateFilterChange()"
                                class="w-full px-3 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                        
                        <!-- Filter Buttons -->
                        <div class="flex flex-wrap gap-2">
                            <button
                                id="filter-all"
                                onclick="setTransactionFilter('all')"
                                class="px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                            >
                                <i class="fas fa-list mr-1"></i>Semua
                            </button>
                            <button
                                id="filter-income"
                                onclick="setTransactionFilter('income')"
                                class="px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-green-500/20 dark:hover:text-green-300"
                            >
                                <i class="fas fa-arrow-up mr-1"></i>Pemasukan
                            </button>
                            <button
                                id="filter-expense"
                                onclick="setTransactionFilter('expense')"
                                class="px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-700 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-red-500/20 dark:hover:text-red-300"
                            >
                                <i class="fas fa-arrow-down mr-1"></i>Pengeluaran
                            </button>
                            <button
                                onclick="clearTransactionFilters()"
                                class="px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                            >
                                <i class="fas fa-times mr-1"></i>Reset
                            </button>
                        </div>
                    </div>
                    
                    <!-- Search Results Info -->
                    <div id="search-results-info" class="mt-4 text-sm text-gray-600 hidden">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span id="results-count"></span>
                    </div>
                </div>

                <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <div id="transactions-container">
                        {/* Konten akan dirender oleh updateTransactionsDisplay */}
                        ${renderTransactionsList(appState.transactions)}
                    </div>
                </div>
            </div>
        `;
    }

    async function navigateToTransactionPage(page) {
        const { totalTransactions, transactionsPerPage } = appState.transactionManagement;
        const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

        if (page < 1 || page > totalPages) return;

        appState.transactionManagement.currentPage = page;

        // Tampilkan loading spinner
        const container = document.getElementById('transactions-container');
        if (container) container.innerHTML = `<div class="text-center p-8"><i class="fas fa-spinner fa-spin text-2xl text-indigo-500"></i></div>`;

        // Ambil data baru dari API
        const { data, error, count } = await api.getTransactions(appState.user.id, page, transactionsPerPage, appState.transactionManagement.startDate, appState.transactionManagement.endDate);
        if (error) {
            showSyncStatus('error', 'Gagal memuat halaman transaksi.');
            return;
        }

        appState.transactions = data || [];
        appState.transactionManagement.totalTransactions = count || 0;

        // Render ulang hanya bagian list transaksi dan kontrol pagination
        updateTransactionsDisplay();
    }

    function renderTransactionPaginationControls() {
        const { currentPage, transactionsPerPage, totalTransactions } = appState.transactionManagement;
        const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

        if (totalPages <= 1) return '';

        return `
            <div class="flex items-center justify-between gap-4 p-4 sm:p-6 border-t border-gray-200/50 dark:border-slate-700/50">
                <span class="text-sm text-gray-600 dark:text-gray-400">
                    Halaman <strong>${currentPage}</strong> dari <strong>${totalPages}</strong>
                </span>
                <div class="flex items-center space-x-2">
                    <button onclick="navigateToTransactionPage(${currentPage - 1})" class="px-4 py-2 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50" ${currentPage === 1 ? 'disabled' : ''}>&laquo; Sebelumnya</button>
                    <button onclick="navigateToTransactionPage(${currentPage + 1})" class="px-4 py-2 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50" ${currentPage >= totalPages ? 'disabled' : ''}>Berikutnya &raquo;</button>
                </div>
            </div>`;
    }

    function renderBudgetsPage() {
        const syncStatusIndicator = useSupabase 
            ? `<div class="flex items-center space-x-2 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span class="text-xs font-medium text-green-700 dark:text-green-300">Tersinkronisasi</span></div>`
            : `<div class="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-yellow-500 rounded-full"></div><span class="text-xs font-medium text-yellow-700 dark:text-yellow-300">Mode Lokal</span></div>`;

        return `
            <div class="space-y-6 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">Anggaran</h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1 dark:text-gray-400">Kelola anggaran bulanan Anda</p>
                    </div>
                    <div class="flex flex-col sm:flex-row items-center gap-3">
                        ${syncStatusIndicator}
                        <button onclick="showAddBudgetForm()" class="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 sm:px-6 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                            <i class="fas fa-paper-plane mr-2"></i>
                            <span class="text-sm sm:text-base">Tambah Anggaran</span>
                        </button>
                    </div>
                </div>

                <div id="budget-form" class="hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:border-slate-700">
                    <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Buat Anggaran Baru</h3>
                    <form onsubmit="handleAddBudget(event)" class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <select
                                id="budget-category"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                                required
                            >
                                <option value="">✨ Pilih Kategori</option>
                                ${appState.categories
                                    .filter(c => c.type === 'expense')
                                    .map(c => `<option value="${c.name}">${c.name}</option>`)
                                    .join('')}
                            </select>
                            <input
                                type="number"
                                step="1000"
                                id="budget-amount"
                                placeholder="Jumlah Anggaran (Rp)"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                id="budget-description"
                                placeholder="Deskripsi singkat (opsional)"
                                rows="2"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                            ></textarea>
                        </div>
                        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <select
                                id="budget-period"
                                class="flex-1 w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            >
                                <option value="monthly">Bulanan</option>
                                <option value="weekly">Mingguan</option>
                                <option value="yearly">Tahunan</option>
                            </select>
                            <div class="flex space-x-2">
                                <button
                                    type="submit"
                                    class="flex-1 sm:flex-none bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                                >
                                    <i class="fas fa-check mr-2"></i>Tambah
                                </button>
                                <button
                                    type="button"
                                    onclick="hideAddBudgetForm()"
                                    class="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-200"
                                >
                                    <i class="fas fa-times mr-2"></i>Batal
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${appState.budgets.map(budget => {
                        const usedAmount = appState.transactions
                            .filter(t => t.type === 'expense' && t.category === budget.category)
                            .reduce((sum, t) => sum + t.amount, 0);
                        const progress = budget.amount > 0 ? (usedAmount / budget.amount) * 100 : 0;
                        const remaining = budget.amount - usedAmount;
                        const progressColor = progress > 100 ? 'red' : progress > 75 ? 'yellow' : 'blue';

                        return `
                            <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 dark:border-slate-700 flex flex-col">
                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${budget.category}</h3>
                                        ${budget.description ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${budget.description}</p>` : ''}
                                    </div>
                                    <span class="text-xs px-2 py-1 rounded-full font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 capitalize">${budget.period}</span>
                                </div>
                                <div class="space-y-3 flex-grow mt-2">
                                    <div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                                        <div class="bg-gradient-to-r from-${progressColor}-400 to-${progressColor}-600 h-3 rounded-full" style="width: ${Math.min(progress, 100)}%"></div>
                                    </div>
                                    <div class="flex justify-between text-sm">
                                        <span class="text-gray-600 dark:text-gray-400">Terpakai: <span class="font-semibold text-gray-800 dark:text-gray-200">Rp ${(usedAmount * 1000).toLocaleString('id-ID')}</span></span>
                                        <span class="font-bold text-${progressColor}-600 dark:text-${progressColor}-400">${progress.toFixed(1)}%</span>
                                    </div>
                                    <div class="text-xs text-gray-500 dark:text-gray-400">
                                        ${remaining >= 0 ? `Sisa: Rp ${(remaining * 1000).toLocaleString('id-ID')}` : `Lebih: Rp ${(Math.abs(remaining) * 1000).toLocaleString('id-ID')}`}
                                    </div>
                                </div>
                                <div class="mt-4 pt-4 border-t border-gray-200/80 dark:border-slate-700/80 space-y-2">
                                    <button onclick="showRecordPaymentForBudget(${budget.id})" class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-3 py-2 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105">
                                        <i class="fas fa-money-bill-wave mr-2"></i> Catat Pembayaran
                                    </button>
                                    <div class="flex items-center gap-2">
                                        <button onclick="showEditBudgetForm(${budget.id})" class="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold px-3 py-2 rounded-xl transition-all duration-300 text-sm">
                                            <i class="fas fa-edit mr-1"></i> Edit
                                        </button>
                                        <button onclick="handleDeleteBudget(${budget.id})" class="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-3 py-2 rounded-xl transition-all duration-300 text-sm">
                                            <i class="fas fa-trash mr-1"></i> Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                ${appState.budgets.length === 0 ? `
                    <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20 dark:border-slate-700 text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:to-purple-900/50">
                            <i class="fas fa-chart-pie text-3xl text-indigo-400 dark:text-indigo-300"></i>
                        </div>
                        <h4 class="text-lg sm:text-xl font-semibold text-gray-700 mb-2 dark:text-gray-200">Belum Ada Anggaran</h4>
                        <p class="text-gray-500 mb-6 text-sm sm:text-base dark:text-gray-400">Buat anggaran untuk mengontrol pengeluaran Anda</p>
                        <button
                            onclick="showAddBudgetForm()"
                            class="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                        >
                            <i class="fas fa-plus mr-2"></i>Buat Anggaran Pertama
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    function renderReceivablesPage() {
        const syncStatusIndicator = useSupabase 
            ? `<div class="flex items-center space-x-2 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span class="text-xs font-medium text-green-700 dark:text-green-300">Tersinkronisasi</span></div>`
            : `<div class="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-yellow-500 rounded-full"></div><span class="text-xs font-medium text-yellow-700 dark:text-yellow-300">Mode Lokal</span></div>`;

        const totalUnpaid = appState.receivables
            .filter(r => r.status === 'unpaid')
            .reduce((sum, r) => sum + r.amount, 0);
        const totalPaid = appState.receivables
            .filter(r => r.status === 'paid')
            .reduce((sum, r) => sum + r.amount, 0);

        return `
            <div class="space-y-6 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">Catatan Piutang</h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1 dark:text-gray-400">Kelola dan lacak semua piutang Anda</p>
                    </div>
                    <div class="flex flex-col sm:flex-row items-center gap-3">
                        ${syncStatusIndicator}
                        <button onclick="showAddReceivableForm()" class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 sm:px-6 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                            <i class="fas fa-plus mr-2"></i>
                            <span class="text-sm sm:text-base">Tambah Piutang</span>
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 dark:border-slate-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Piutang (Belum Lunas)</p>
                                <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">Rp ${(totalUnpaid * 1000).toLocaleString('id-ID')}</p>
                            </div>
                            <div class="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-2xl shadow-lg">
                                <i class="fas fa-hourglass-half text-white text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 dark:border-slate-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Sudah Dibayar</p>
                                <p class="text-2xl font-bold text-green-600 dark:text-green-400">Rp ${(totalPaid * 1000).toLocaleString('id-ID')}</p>
                            </div>
                            <div class="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl shadow-lg">
                                <i class="fas fa-check-circle text-white text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Add Receivable Form -->
                <div id="receivable-form" class="hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:border-slate-700">
                    <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Tambah Catatan Piutang Baru</h3>
                    <form onsubmit="handleAddReceivable(event)" class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" id="receivable-debtor" placeholder="Nama Peminjam" class="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 font-medium bg-white/80 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                            <input type="number" step="1000" id="receivable-amount" placeholder="Jumlah Piutang (Rp)" class="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 font-medium bg-white/80 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Jatuh Tempo</label>
                            <input type="date" id="receivable-due-date" class="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 font-medium bg-white/80 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                        </div>
                        <div>
                            <textarea id="receivable-description" placeholder="Deskripsi (opsional)" rows="2" class="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 font-medium bg-white/80 dark:bg-slate-700 dark:border-slate-600 dark:text-white"></textarea>
                        </div>
                        <div class="flex space-x-2">
                            <button type="submit" class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"><i class="fas fa-check mr-2"></i>Simpan</button>
                            <button type="button" onclick="hideAddReceivableForm()" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-200"><i class="fas fa-times mr-2"></i>Batal</button>
                        </div>
                    </form>
                </div>

                <!-- Receivables List -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${appState.receivables.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)).map(receivable => {
                        const isPaid = receivable.status === 'paid';
                        const dueDate = new Date(receivable.due_date);
                        const today = new Date();
                        today.setHours(0,0,0,0);
                        const isOverdue = !isPaid && dueDate < today;
                        const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                        const currentAmount = receivable.current_amount || 0;
                        const progress = receivable.amount > 0 ? (currentAmount / receivable.amount) * 100 : 0;

                        return `
                            <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 dark:border-slate-700 flex flex-col transition-all duration-300 ${isPaid ? 'bg-green-50/50 dark:bg-green-900/20' : ''}">
                                <div class="flex justify-between items-start mb-3">
                                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${receivable.debtor_name}</h3>
                                    <span class="text-xs px-2 py-1 rounded-full font-medium ${isPaid ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' : isOverdue ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300'}">${isPaid ? 'Lunas' : isOverdue ? 'Terlewat' : `${daysDiff} hari lagi`}</span>
                                </div>
                                <div class="flex-grow space-y-3">
                                    <div class="flex justify-between items-baseline">
                                        <p class="text-2xl font-bold text-gray-800 dark:text-gray-100">Rp ${(receivable.amount * 1000).toLocaleString('id-ID')}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">Jatuh Tempo: ${dueDate.toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <!-- Progress Bar -->
                                    <div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3.5">
                                        <div class="bg-gradient-to-r from-green-400 to-emerald-500 h-3.5 rounded-full" style="width: ${progress}%"></div>
                                    </div>
                                    <div class="flex justify-between text-xs">
                                        <span class="text-gray-600 dark:text-gray-400">Terbayar: <span class="font-semibold text-gray-800 dark:text-gray-200">Rp ${(currentAmount * 1000).toLocaleString('id-ID')}</span></span>
                                        <span class="font-bold text-green-600 dark:text-green-400">${progress.toFixed(1)}%</span>
                                    </div>
                                    ${receivable.description ? `<p class="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700/50 p-2 rounded-lg">${receivable.description}</p>` : ''}
                                </div>
                                <div class="mt-4 pt-4 border-t border-gray-200/80 dark:border-slate-700/80 flex items-center gap-2">
                                    ${!isPaid ? `<button onclick="showAddInstallmentModal(${receivable.id})" class="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-3 py-2 rounded-xl transition-all duration-300 text-sm"><i class="fas fa-plus mr-1"></i> Cicilan</button>` : ''}
                                    ${!isPaid ? `<button onclick="handleMarkAsPaid(${receivable.id})" class="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-3 py-2 rounded-xl transition-all duration-300 text-sm"><i class="fas fa-check-double mr-1"></i> Lunasi</button>` : ''}
                                    <button onclick="showEditReceivableModal(${receivable.id})" class="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold px-3 py-2 rounded-xl transition-all duration-300 text-sm"><i class="fas fa-edit mr-1"></i> Edit</button>
                                    <button onclick="handleDeleteReceivable(${receivable.id})" class="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-3 py-2 rounded-xl transition-all duration-300 text-sm"><i class="fas fa-trash mr-1"></i> Hapus</button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                ${appState.receivables.length === 0 ? `
                    <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20 dark:border-slate-700 text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 dark:bg-gradient-to-br dark:from-green-900/50 dark:to-emerald-900/50"><i class="fas fa-hand-holding-usd text-3xl text-green-400 dark:text-green-300"></i></div>
                        <h4 class="text-lg sm:text-xl font-semibold text-gray-700 mb-2 dark:text-gray-200">Belum Ada Catatan Piutang</h4>
                        <p class="text-gray-500 mb-6 text-sm sm:text-base dark:text-gray-400">Catat piutang agar tidak lupa menagih</p>
                        <button onclick="showAddReceivableForm()" class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"><i class="fas fa-plus mr-2"></i>Catat Piutang Pertama</button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    function renderGoalsPage() {
        const syncStatusIndicator = useSupabase 
            ? `<div class="flex items-center space-x-2 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span class="text-xs font-medium text-green-700 dark:text-green-300">Tersinkronisasi</span></div>`
            : `<div class="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-yellow-500 rounded-full"></div><span class="text-xs font-medium text-yellow-700 dark:text-yellow-300">Mode Lokal</span></div>`;

        return `
            <div class="space-y-6 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Target Keuangan</h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1">Wujudkan impian finansial Anda</p>
                    </div>
                    <div class="flex flex-col sm:flex-row items-center gap-3">
                        ${syncStatusIndicator}
                        <button onclick="showAddGoalForm()" class="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 sm:px-6 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                            <i class="fas fa-paper-plane mr-2"></i>
                            <span class="text-sm sm:text-base">Tambah Target</span>
                        </button>
                    </div>
                </div>

                <div id="goal-form" class="hidden bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                    <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                            <i class="fas fa-bullseye text-white text-sm"></i>
                        </div>
                        Buat Target Baru
                    </h3>
                    <form onsubmit="handleAddGoal(event)" class="space-y-4 sm:space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <input
                                type="text"
                                id="goal-title"
                                placeholder="Nama Target (contoh: Liburan ke Bali)"
                                class="px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm"
                                required
                            />
                            <input
                                type="number"
                                step="1000"
                                id="goal-target"
                                placeholder="Target Jumlah (Rp)"
                                class="px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm"
                                required
                            />
                            <input
                                type="number"
                                step="1000"
                                id="goal-current"
                                placeholder="Jumlah Saat Ini (opsional)"
                                class="px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm"
                            />
                            <input
                                type="date"
                                id="goal-deadline"
                                class="px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm"
                                required
                            />
                        </div>
                        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <button
                                type="submit"
                                class="flex-1 sm:flex-none bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 sm:px-8 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                            > 
                                <i class="fas fa-check mr-2"></i>Buat Target
                            </button>
                            <button
                                type="button"
                                onclick="hideAddGoalForm()"
                                class="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-8 py-3 sm:py-2 rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base"
                            >
                                <i class="fas fa-times mr-2"></i>Batal
                            </button>
                        </div>
                    </form>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${appState.goals.map(goal => {
                        const progress = (goal.current_amount / goal.target_amount) * 100;
                        const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                        
                        return `
                            <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 flex flex-col">
                                <div class="flex justify-between items-start mb-4">
                                    <h3 class="text-lg font-semibold text-gray-800">${goal.title}</h3>
                                    <span class="text-sm px-2 py-1 rounded-full font-medium ${
                                        daysLeft > 30 ? 'bg-green-100 text-green-700' :
                                        daysLeft > 7 ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }">
                                        ${daysLeft > 0 ? `${daysLeft} hari lagi` : 'Terlewat'}
                                    </span>
                                </div>
                                <div class="space-y-3 flex-grow">
                                    <div class="flex justify-between text-sm">
                                        <span>Terkumpul: Rp ${(goal.current_amount * 1000).toLocaleString('id-ID')}</span>
                                        <span>Target: Rp ${(goal.target_amount * 1000).toLocaleString('id-ID')}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                                            style="width: ${Math.min(progress, 100)}%"
                                        ></div>
                                    </div>
                                    <p class="text-sm text-gray-600">${progress.toFixed(1)}% Tercapai</p>
                                </div>
                                <div class="mt-4 pt-4 border-t border-gray-200/80">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <input type="number" step="1000" id="add-funds-input-${goal.id}" class="flex-grow min-w-[100px] px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Tambah dana (Rp)">
                                        <button onclick="handleAddFundsToGoal(${goal.id})" class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-2 rounded-xl transition-all duration-300 flex-shrink-0">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                        <button onclick="showEditGoalForm(${goal.id})" class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 py-2 rounded-xl transition-all duration-300 flex-shrink-0">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="deleteGoal(${goal.id})" class="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-xl transition-all duration-300 flex-shrink-0">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                ${appState.goals.length === 0 ? `
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20 text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-bullseye text-3xl text-indigo-400"></i>
                        </div>
                        <h4 class="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Belum Ada Target Keuangan</h4>
                        <p class="text-gray-500 mb-6 text-sm sm:text-base">Mulai wujudkan impian finansial Anda dengan membuat target pertama</p>
                        <button
                            onclick="showAddGoalForm()"
                            class="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                        >
                            <i class="fas fa-plus mr-2"></i>Buat Target Pertama
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    function renderReportsPage() {
        const syncStatusIndicator = useSupabase 
            ? `<div class="flex items-center space-x-2 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span class="text-xs font-medium text-green-700 dark:text-green-300">Tersinkronisasi</span></div>`
            : `<div class="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-yellow-500 rounded-full"></div><span class="text-xs font-medium text-yellow-700 dark:text-yellow-300">Mode Lokal</span></div>`;

        // Calculate actual data from transactions
        const totalIncome = appState.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = appState.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIncome - totalExpense;
        const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100) : 0;
        
        // Calculate monthly averages dynamically
        const dateSet = new Set(appState.transactions.map(t => new Date(t.date).toISOString().slice(0, 7))); // Get unique months YYYY-MM
        const numMonths = dateSet.size > 0 ? dateSet.size : 1;

        const monthlyIncome = totalIncome / numMonths;
        const monthlyExpense = totalExpense / numMonths;
        const monthlySavings = monthlyIncome - monthlyExpense;
        
        // Category breakdown for expenses
        const expensesByCategory = {};
        appState.transactions.filter(t => t.type === 'expense').forEach(t => {
            expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
        });
        
        const topCategories = Object.entries(expensesByCategory)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        // Financial Health Score Calculations
        const totalBudgetedAmount = appState.budgets.reduce((sum, b) => sum + b.amount, 0);
        const totalSpentOnBudgetCategories = appState.budgets.reduce((total, budget) => {
            const spent = appState.transactions
                .filter(t => t.type === 'expense' && t.category === budget.category)
                .reduce((sum, t) => sum + t.amount, 0);
            return total + spent;
        }, 0);

        const budgetAdherence = totalBudgetedAmount > 0 ? Math.max(0, 100 - ((totalSpentOnBudgetCategories / totalBudgetedAmount) * 100)) : 100;
        const savingsRateScore = Math.min(100, (savingsRate / 20) * 100); // 20% savings rate is 100 score
        const budgetAdherenceScore = budgetAdherence; // Direct mapping
        
        // Overall score (weighted average: 60% savings, 40% budget)
        const overallScore = (savingsRateScore * 0.6) + (budgetAdherenceScore * 0.4);

        // Data processing for the trend chart (same as overview)
        const trendData = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const today = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            trendData[key] = { label: monthNames[d.getMonth()], income: 0, expense: 0 };
        }
        appState.transactions.forEach(t => {
            const d = new Date(t.date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            if (trendData[key]) { trendData[key][t.type] += t.amount; }
        });
        return `
            <div class="space-y-6 sm:space-y-8 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Laporan Keuangan</h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1">Analisis mendalam kondisi keuangan Anda</p>
                    </div>
                    <div class="flex flex-col sm:flex-row items-center gap-3">
                        ${syncStatusIndicator}
                        <div class="hidden sm:block h-6 w-px bg-gray-300 dark:bg-slate-600"></div>
                        <button onclick="exportReportToPDF()" class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                            <i class="fas fa-download mr-2"></i>
                            <span class="text-sm sm:text-base">Ekspor PDF</span>
                        </button>
                        <button onclick="shareReport()" class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                            <i class="fas fa-share-alt mr-2"></i> 
                            <span class="text-sm sm:text-base">Bagikan</span>
                        </button>
                    </div>
                </div>
                
                <!-- Enhanced Statistics Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4"> 
                            <div class="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 sm:p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-arrow-up text-white text-lg sm:text-xl"></i>
                            </div>
                            <div class="text-right">
                                <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-2">Rata-rata Pemasukan</p>
                            <p class="text-xl sm:text-2xl font-bold text-blue-600">Rp ${(monthlyIncome * 1000).toLocaleString('id-ID')}</p>
                            <p class="text-xs text-blue-500 mt-1 flex items-center">
                                <i class="fas fa-trending-up mr-1"></i>
                                Per bulan
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-gradient-to-br from-red-400 to-rose-500 p-3 sm:p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-arrow-down text-white text-lg sm:text-xl"></i>
                            </div>
                            <div class="text-right">
                                <div class="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-2">Rata-rata Pengeluaran</p>
                            <p class="text-xl sm:text-2xl font-bold text-red-600">Rp ${(monthlyExpense * 1000).toLocaleString('id-ID')}</p>
                            <p class="text-xs text-red-500 mt-1 flex items-center">
                                <i class="fas fa-trending-down mr-1"></i>
                                Per bulan
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-gradient-to-br from-green-400 to-emerald-500 p-3 sm:p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-piggy-bank text-white text-lg sm:text-xl"></i>
                            </div>
                            <div class="text-right">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-2">Rata-rata Tabungan</p>
                            <p class="text-xl sm:text-2xl font-bold text-green-600">Rp ${(monthlySavings * 1000).toLocaleString('id-ID')}</p>
                            <p class="text-xs text-green-500 mt-1 flex items-center">
                                <i class="fas fa-chart-line mr-1"></i>
                                Per bulan
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-gradient-to-br from-purple-400 to-pink-500 p-3 sm:p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-percentage text-white text-lg sm:text-xl"></i>
                            </div>
                            <div class="text-right">
                                <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-2">Tingkat Tabungan</p>
                            <p class="text-xl sm:text-2xl font-bold text-purple-600">${savingsRate.toFixed(1)}%</p>
                            <p class="text-xs text-purple-500 mt-1 flex items-center">
                                <i class="fas fa-target mr-1"></i>
                                ${savingsRate >= 20 ? 'Excellent!' : savingsRate >= 10 ? 'Good' : 'Needs improvement'}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Charts and Analysis Section -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <!-- Monthly Trend Chart -->
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg sm:text-xl font-bold text-gray-800 flex items-center"> 
                                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                                    <i class="fas fa-chart-line text-white text-sm"></i>
                                </div>
                                Tren Bulanan
                            </h3>
                            <select class="text-sm bg-white/80 border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 hidden-on-export">
                                <option>6 Bulan Terakhir</option>
                                <option>12 Bulan Terakhir</option>
                                <option>Tahun Ini</option>
                            </select>
                        </div>
                        
                        ${appState.transactions.length === 0 ? `
                            <div class="text-center py-8 sm:py-12">
                                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <i class="fas fa-chart-line text-2xl sm:text-3xl text-indigo-400"></i>
                                </div>
                                <h4 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">Belum Ada Data</h4>
                                <p class="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">Tambahkan transaksi untuk melihat tren keuangan</p>
                                <button onclick="showQuickAddModal()" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                                    <i class="fas fa-plus mr-2"></i>Tambah Transaksi
                                </button>
                            </div>
                        ` : `
                            <!-- Interactive Chart with Chart.js -->
                            <div class="relative h-64">
                                <canvas id="monthlyTrendChart"></canvas>
                            </div>
                        `}
                    </div>

                    <!-- Category Breakdown -->
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg sm:text-xl font-bold text-gray-800 flex items-center"> 
                                <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                                    <i class="fas fa-chart-pie text-white text-sm"></i>
                                </div>
                                Kategori Pengeluaran
                            </h3>
                        </div>
                        
                        ${topCategories.length === 0 ? `
                            <div class="text-center py-8 sm:py-12">
                                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <i class="fas fa-chart-pie text-2xl sm:text-3xl text-purple-400"></i>
                                </div>
                                <h4 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">Belum Ada Pengeluaran</h4>
                                <p class="text-gray-500 text-sm sm:text-base">Catat pengeluaran untuk melihat breakdown kategori</p>
                            </div>
                        ` : `
                            <div class="flex flex-col lg:flex-row items-center gap-6">
                                <div class="relative h-48 w-48 sm:h-56 sm:w-56 flex-shrink-0">
                                    <canvas id="categoryDoughnutChart"></canvas>
                                </div>
                                <div class="w-full flex-1 space-y-2">
                                    ${topCategories.map(([category, amount], index) => {
                                        const percentage = (amount / totalExpense) * 100;
                                        const colors = ['blue', 'green', 'purple', 'red', 'orange'];
                                        const color = colors[index % colors.length];
                                        return `
                                            <div class="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white/30">
                                                <div class="flex items-center space-x-3">
                                                    <div class="w-3 h-3 bg-${color}-500 rounded-full"></div>
                                                    <span class="text-sm font-medium text-gray-700">${category}</span>
                                                </div>
                                                <span class="text-sm font-bold text-gray-800">Rp ${(amount * 1000).toLocaleString('id-ID')}</span>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Financial Health Score -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                                <i class="fas fa-heartbeat text-white text-sm"></i>
                            </div>
                            Skor Kesehatan Keuangan
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <!-- Savings Rate Score -->
                        <div class="text-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 relative">
                                <div class="w-full h-full bg-gray-200 rounded-full"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style="clip-path: polygon(0 0, ${Math.min(savingsRate * 5, 100)}% 0, ${Math.min(savingsRate * 5, 100)}% 100%, 0 100%)"></div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-lg sm:text-xl font-bold text-gray-700">${savingsRate.toFixed(0)}%</span>
                                </div>
                            </div>
                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base mb-1">Tingkat Tabungan</h4>
                            <p class="text-xs sm:text-sm text-gray-500">${savingsRate >= 20 ? 'Sangat Baik' : savingsRate >= 10 ? 'Baik' : 'Perlu Perbaikan'}</p>
                        </div>
                        
                        <!-- Budget Adherence -->
                        <div class="text-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 relative">
                                <div class="w-full h-full bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" style="clip-path: polygon(0 0, ${budgetAdherence.toFixed(0)}% 0, ${budgetAdherence.toFixed(0)}% 100%, 0 100%)"></div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-200">${budgetAdherence.toFixed(0)}%</span>
                                </div>
                            </div>
                            <h4 class="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-1">Kepatuhan Anggaran</h4>
                            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${budgetAdherence >= 90 ? 'Sangat Baik' : budgetAdherence >= 75 ? 'Baik' : 'Perlu Perbaikan'}</p>
                        </div>
                        
                        <!-- Overall Score -->
                        <div class="text-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30">
                            <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 relative">
                                <div class="w-full h-full bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style="clip-path: polygon(0 0, ${overallScore.toFixed(0)}% 0, ${overallScore.toFixed(0)}% 100%, 0 100%)"></div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-200">${overallScore.toFixed(0)}</span>
                                </div>
                            </div>
                            <h4 class="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-1">Skor Keseluruhan</h4>
                            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${overallScore >= 80 ? 'Sangat Baik' : overallScore >= 60 ? 'Baik' : 'Perlu Perbaikan'}</p>
                        </div>
                    </div>
                    
                    <!-- Recommendations -->
                    <div class="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <h4 class="font-semibold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                            <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                            Rekomendasi Perbaikan
                        </h4>
                        <ul class="space-y-2 text-xs sm:text-sm text-gray-600">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                <span>Tingkatkan tingkat tabungan menjadi minimal 20% dari pendapatan</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                <span>Buat anggaran untuk kategori pengeluaran terbesar</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                <span>Pertimbangkan investasi untuk dana yang menganggur</span>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
    }

    function renderSettingsPage() {
        const syncStatusIndicator = useSupabase 
            ? `<div class="flex items-center space-x-2 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span class="text-xs font-medium text-green-700 dark:text-green-300">Tersinkronisasi</span></div>`
            : `<div class="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 rounded-full"><div class="w-2 h-2 bg-yellow-500 rounded-full"></div><span class="text-xs font-medium text-yellow-700 dark:text-yellow-300">Mode Lokal</span></div>`;

        const hasPin = auth.hasPin();
        const profile = appState.profile || { name: 'Pengguna Frixsave', currency: 'IDR', theme: 'light' };
        return ` 
            <div class="space-y-6 sm:space-y-8 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">Pengaturan</h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1 dark:text-gray-400">Kelola preferensi dan keamanan akun Anda</p>
                    </div>
                    ${syncStatusIndicator}
                </div>
                
                <!-- Profile Settings -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                    <div class="flex items-center mb-6">
                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                            <i class="fas fa-user text-white text-sm"></i>
                        </div>
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Pengaturan Profil</h3>
                    </div>
                    <form class="space-y-4 sm:space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div class="relative group">
                                <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                    <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                                        <i class="fas fa-id-card text-white text-xs"></i>
                                    </div>
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="full-name"
                                    value="${profile.name}"
                                    class="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm group-hover:border-blue-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                                />
                            </div>
                            <div class="relative group">
                                <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                    <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                                        <i class="fas fa-envelope text-white text-xs"></i>
                                    </div>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value="${appState.user.email}"
                                    disabled
                                    class="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl bg-gray-100 text-gray-500 font-medium text-sm sm:text-base shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-gray-400"
                                />
                            </div>
                            <div class="relative group">
                                <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                    <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                                        <i class="fas fa-coins text-white text-xs"></i>
                                    </div>
                                    Mata Uang
                                </label>
                                <select id="currency" class="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm group-hover:border-blue-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                    <option value="IDR" ${profile.currency === 'IDR' ? 'selected' : ''}>🇮🇩 IDR (Rp)</option>
                                    <option value="USD" ${profile.currency === 'USD' ? 'selected' : ''}>🇺🇸 USD ($)</option>
                                    <option value="EUR" ${profile.currency === 'EUR' ? 'selected' : ''}>🇪🇺 EUR (€)</option>
                                    <option value="GBP" ${profile.currency === 'GBP' ? 'selected' : ''}>🇬🇧 GBP (£)</option>
                                </select>
                            </div>
                            <div class="relative group">
                                <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                    <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                                        <i class="fas fa-palette text-white text-xs"></i>
                                    </div>
                                    Tema
                                </label>
                                <select id="theme" class="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base shadow-sm group-hover:border-blue-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                    <option value="light" ${profile.theme === 'light' ? 'selected' : ''}>🌞 Terang</option>
                                    <option value="dark" ${profile.theme === 'dark' ? 'selected' : ''}>🌙 Gelap</option>
                                    <option value="auto" ${profile.theme === 'auto' ? 'selected' : ''}>🔄 Otomatis</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="button"
                            onclick="saveProfileSettings()"
                            class="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                        >
                            <i class="fas fa-save mr-2"></i>Simpan Perubahan
                        </button>
                    </form>
                </div>

                <!-- Security Settings -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                    <div class="flex items-center mb-6">
                        <div class="w-8 h-8 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                            <i class="fas fa-shield-alt text-white text-sm"></i>
                        </div>
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Keamanan</h3>
                    </div>
                    
                    <!-- PIN Settings -->
                    <div class="space-y-4 sm:space-y-6">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30 dark:bg-slate-700/50 dark:border-slate-600">
                            <div class="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
                                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-${hasPin ? 'green' : 'gray'}-400 to-${hasPin ? 'emerald' : 'gray'}-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <i class="fas fa-${hasPin ? 'lock' : 'unlock'} text-white text-sm"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-800 text-sm sm:text-base dark:text-gray-200">PIN Keamanan</h4>
                                    <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        ${hasPin ? 'PIN aktif - Akun Anda terlindungi' : 'Tambahkan PIN untuk keamanan ekstra'}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                                ${hasPin ? `
                                    <button
                                        onclick="showChangePinModal()" 
                                        class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                                    >
                                        <i class="fas fa-edit mr-2"></i>Ubah PIN
                                    </button>
                                    <button
                                        onclick="removePinSecurity()"
                                        class="w-full sm:w-auto bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                                    >
                                        <i class="fas fa-times mr-2"></i>Hapus PIN
                                    </button>
                                ` : `
                                    <button
                                        onclick="showSetPinModal()"
                                        class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                                    >
                                        <i class="fas fa-plus mr-2"></i>Atur PIN
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Data Management -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                    <div class="flex items-center mb-6">
                        <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                            <i class="fas fa-database text-white text-sm"></i>
                        </div>
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Manajemen Data</h3>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <button onclick="exportData()" class="flex flex-col items-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group dark:bg-slate-700/50 dark:border-slate-600 dark:hover:bg-slate-700">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-download text-white text-lg sm:text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base mb-1 dark:text-gray-200">Ekspor Data</h4>
                            <p class="text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">Unduh semua data keuangan Anda</p>
                        </button>

                        <button onclick="showImportModal()" class="flex flex-col items-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group dark:bg-slate-700/50 dark:border-slate-600 dark:hover:bg-slate-700">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-upload text-white text-lg sm:text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base mb-1 dark:text-gray-200">Impor CSV</h4>
                            <p class="text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">Impor transaksi dari file CSV</p>
                        </button>
                        
                        <button onclick="backupData()" class="flex flex-col items-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group dark:bg-slate-700/50 dark:border-slate-600 dark:hover:bg-slate-700">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-cloud-upload-alt text-white text-lg sm:text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base mb-1 dark:text-gray-200">Backup Data</h4>
                            <p class="text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">Simpan data ke cloud storage</p>
                        </button>
                        
                        <button onclick="clearAllData()" class="flex flex-col items-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30 hover:bg-red-50 transition-all duration-300 group dark:bg-slate-700/50 dark:border-slate-600 dark:hover:bg-red-500/10">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-trash text-white text-lg sm:text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base mb-1 dark:text-gray-200">Hapus Semua</h4>
                            <p class="text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">Reset semua data aplikasi</p>
                        </button>
                    </div>
                </div>

                <!-- App Information -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                    <div class="flex items-center mb-6">
                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                            <i class="fas fa-info-circle text-white text-sm"></i>
                        </div>
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800">Informasi Aplikasi</h3>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div class="flex items-center justify-between p-3 sm:p-4 bg-white/50 rounded-2xl border border-white/30">
                            <span class="text-sm sm:text-base font-medium text-gray-700">Versi Aplikasi</span>
                            <span class="text-sm sm:text-base font-bold text-indigo-600">v2.1.0</span>
                        </div>
                        <div class="flex items-center justify-between p-3 sm:p-4 bg-white/50 rounded-2xl border border-white/30">
                            <span class="text-sm sm:text-base font-medium text-gray-700">Total Transaksi</span>
                            <span class="text-sm sm:text-base font-bold text-green-600">${appState.transactions.length}</span>
                        </div>
                        <div class="flex items-center justify-between p-3 sm:p-4 bg-white/50 rounded-2xl border border-white/30">
                            <span class="text-sm sm:text-base font-medium text-gray-700">Bergabung Sejak</span>
                            <span class="text-sm sm:text-base font-bold text-purple-600">${new Date(appState.user.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div class="flex items-center justify-between p-3 sm:p-4 bg-white/50 rounded-2xl border border-white/30">
                            <span class="text-sm sm:text-base font-medium text-gray-700">Dibuat Oleh</span>
                            <span class="text-sm sm:text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">HPUTRAX</span>
                        </div>
                    </div>
                </div>

                ${appState.user?.role === 'admin' ? `
                <!-- Supabase Configuration Panel (Admin Only) -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                    <div class="flex items-center mb-6">
                        <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                            <i class="fas fa-cloud text-white text-sm"></i>
                        </div>
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800">Konfigurasi Supabase</h3>
                    </div>
                    
                    <!-- Supabase Status -->
                    <div class="mb-6 p-4 bg-gradient-to-r from-${useSupabase ? 'green' : 'yellow'}-50 to-${useSupabase ? 'emerald' : 'orange'}-50 rounded-2xl border border-${useSupabase ? 'green' : 'yellow'}-200">
                        <h4 class="font-semibold text-${useSupabase ? 'green' : 'yellow'}-800 mb-3 flex items-center">
                            <i class="fas fa-${useSupabase ? 'check-circle' : 'exclamation-triangle'} mr-2"></i>
                            Status Supabase: ${useSupabase ? 'Terhubung' : 'Tidak Terkonfigurasi'}
                        </h4>
                        <p class="text-${useSupabase ? 'green' : 'yellow'}-700 text-sm">
                            ${useSupabase ? 
                                'Data Anda tersinkronisasi dengan cloud database Supabase. Aman dan dapat diakses dari perangkat lain.' : 
                                'Saat ini menggunakan localStorage. Data hanya tersimpan di browser ini.'
                            }
                        </p>
                    </div>

                    <!-- Debug & Troubleshooting Panel -->
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                        <div class="flex items-center mb-6">
                            <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                                <i class="fas fa-bug text-white text-sm"></i>
                            </div>
                            <h3 class="text-lg sm:text-xl font-bold text-gray-800">Debug & Troubleshooting</h3>
                        </div>
                        
                        <!-- Data Status -->
                        <div class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                            <h4 class="font-semibold text-blue-800 mb-3 flex items-center">
                                <i class="fas fa-database mr-2"></i>
                                Status Penyimpanan Data
                            </h4>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                <div class="bg-white/80 p-3 rounded-xl">
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-600">Transaksi:</span>
                                        <span class="font-bold text-blue-600">${appState.transactions.length}</span>
                                    </div>
                                </div>
                                <div class="bg-white/80 p-3 rounded-xl">
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-600">Anggaran:</span>
                                        <span class="font-bold text-green-600">${appState.budgets.length}</span>
                                    </div>
                                </div>
                                <div class="bg-white/80 p-3 rounded-xl">
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-600">Target:</span>
                                        <span class="font-bold text-purple-600">${appState.goals.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Debug Actions -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <button onclick="checkDataIntegrity()" class="flex flex-col items-center p-4 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group">
                                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                                    <i class="fas fa-search text-white text-lg"></i> 
                                </div>
                                <h5 class="font-semibold text-gray-800 text-sm mb-1">Cek Data</h5>
                                <p class="text-xs text-gray-500 text-center">Verifikasi integritas data</p>
                            </button>
                            
                            <button onclick="exportDebugData()" class="flex flex-col items-center p-4 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group">
                                <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                                    <i class="fas fa-download text-white text-lg"></i>
                                </div>
                                <h5 class="font-semibold text-gray-800 text-sm mb-1">Export Debug</h5>
                                <p class="text-xs text-gray-500 text-center">Download data lengkap</p>
                            </button>
                            
                            <button onclick="showStorageInfo()" class="flex flex-col items-center p-4 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group">
                                <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                                    <i class="fas fa-hdd text-white text-lg"></i>
                                </div>
                                <h5 class="font-semibold text-gray-800 text-sm mb-1">Info Storage</h5>
                                <p class="text-xs text-gray-500 text-center">Lihat penggunaan storage</p>
                            </button>
                            
                            <button onclick="refreshAppData()" class="flex flex-col items-center p-4 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group">
                                <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                                    <i class="fas fa-sync text-white text-lg"></i>
                                </div>
                                <h5 class="font-semibold text-gray-800 text-sm mb-1">Refresh Data</h5>
                                <p class="text-xs text-gray-500 text-center">Muat ulang dari storage</p>
                            </button>
                        </div>
                    </div>
                ` : ''}

                
                ${appState.user?.role === 'admin' ? `
                <!-- Manual PIN Hasher (Admin Tool) -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 dark:bg-slate-800/70 dark:border-slate-700">
                    <div class="flex items-center mb-6">
                        <div class="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                            <i class="fas fa-hashtag text-white text-sm"></i>
                        </div>
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Manual PIN Hasher (Admin Tool)</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email (untuk Salt)</label>
                                <input type="email" id="manual-hash-email" placeholder="user@example.com" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">PIN (6 digit)</label>
                                <input type="text" id="manual-hash-pin" placeholder="123456" maxlength="6" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                            </div>
                        </div>
                        <button onclick="handleManualHash()" class="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg">
                            <i class="fas fa-cogs mr-2"></i>Generate Hash
                        </button>
                        <div id="manual-hash-output-container" class="hidden pt-4">
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hasil Hash (SHA-256)</label>
                            <div class="flex items-center gap-2">
                                <p id="manual-hash-output" class="flex-1 p-3 bg-gray-100 dark:bg-slate-900 rounded-xl font-mono text-xs text-gray-700 dark:text-gray-300 break-all"></p>
                                <button onclick="copyToClipboard(document.getElementById('manual-hash-output').textContent)" class="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-slate-600 dark:hover:bg-slate-500 px-3 py-2 rounded-xl">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    function renderQuickAddModal() {
        return `
            <div class="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
                <div class="bg-white/95 backdrop-blur-3xl rounded-3xl sm:rounded-4xl p-0 w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-2xl border border-white/40 animate-slideUp overflow-hidden max-h-[95vh] overflow-y-auto">
                    <!-- Enhanced Header with floating elements -->
                    <div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 sm:p-6 text-white relative overflow-hidden">
                        <!-- Floating background elements -->
                        <div class="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
                        <div class="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12 animate-pulse animation-delay-2000"></div>
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                        
                        <div class="relative flex justify-between items-start">
                            <div class="flex-1">
                                <div class="flex items-center mb-2">
                                    <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-3 backdrop-blur-sm"> 
                                        <i class="fas fa-paper-plane text-lg sm:text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-xl sm:text-2xl font-bold">Tambah Transaksi</h3>
                                        <p class="text-white/90 text-xs sm:text-sm mt-1">Catat keuangan dengan mudah</p>
                                    </div>
                                </div>
                            </div>
                            <button onclick="hideQuickAddModal()" class="text-white/80 hover:text-white hover:bg-white/20 p-2 sm:p-3 rounded-2xl transition-all duration-300 hover:rotate-90 ml-2">
                                <i class="fas fa-times text-lg sm:text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="p-4 sm:p-6 lg:p-8">
                        <form onsubmit="handleQuickAdd(event)" class="space-y-4 sm:space-y-6">
                            <!-- Enhanced Type Selection -->
                            <div class="relative bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl p-1.5 sm:p-2 flex shadow-inner">
                                <button
                                    type="button"
                                    id="expense-btn"
                                    onclick="setTransactionType('expense')"
                                    class="flex-1 py-3 sm:py-4 px-3 sm:px-6 rounded-2xl font-bold transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg transform scale-105"
                                >
                                    <div class="relative z-10 flex items-center justify-center">
                                        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                            <i class="fas fa-arrow-down text-xs sm:text-sm"></i>
                                        </div>
                                        <span class="text-sm sm:text-base">Pengeluaran</span>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    id="income-btn"
                                    onclick="setTransactionType('income')"
                                    class="flex-1 py-3 sm:py-4 px-3 sm:px-6 rounded-2xl font-bold transition-all duration-300 text-gray-600 hover:text-gray-800"
                                >
                                    <div class="flex items-center justify-center">
                                        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                            <i class="fas fa-arrow-up text-xs sm:text-sm"></i>
                                        </div>
                                        <span class="text-sm sm:text-base">Pemasukan</span>
                                    </div>
                                </button>
                            </div>
                            
                            <!-- Enhanced Amount Input -->
                            <div class="relative group">
                                <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                    <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-indigo-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                                        <i class="fas fa-coins text-white text-xs"></i>
                                    </div>
                                    Jumlah
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
                                        <span class="text-gray-600 font-bold text-base sm:text-lg">Rp</span>
                                    </div>
                                    <input
                                        type="number"
                                        step="1"
                                        id="quick-amount"
                                        placeholder="0"
                                        class="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-xl sm:text-2xl font-bold bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-indigo-300 shadow-sm"
                                        required
                                    />
                                    <div class="absolute inset-y-0 right-0 pr-4 sm:pr-6 flex items-center">
                                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Enhanced Category & Description Grid -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <!-- Category Selection -->
                                <div class="relative group">
                                    <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                        <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                                            <i class="fas fa-tag text-white text-xs"></i>
                                        </div>
                                        Kategori
                                    </label>
                                    <select
                                        id="quick-category"
                                        class="w-full px-4 sm:px-6 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-indigo-300 text-sm sm:text-lg shadow-sm"
                                        required
                                    >
                                        <!-- Options will be populated by setTransactionType -->
                                        <option value="">✨ Pilih Kategori</option>
                                        ${appState.categories
                                            .filter(c => c.type === 'expense') // Default to expense
                                            .map(c => `<option value="${c.name}">${c.name}</option>`)
                                            .join('')}
                                    </select>
                                </div>
                                
                                <!-- Date Input -->
                                <div class="relative group">
                                    <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                        <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                                            <i class="fas fa-calendar text-white text-xs"></i>
                                        </div>
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        id="quick-date"
                                        value="${new Date().toISOString().split('T')[0]}"
                                        class="w-full px-4 sm:px-6 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-indigo-300 text-sm sm:text-lg shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <!-- Description Input -->
                            <div class="relative group">
                                <label class="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                    <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                                        <i class="fas fa-edit text-white text-xs"></i>
                                    </div>
                                    Deskripsi
                                </label>
                                <input
                                    type="text"
                                    id="quick-description"
                                    placeholder="Contoh: Makan siang di restoran..."
                                    class="w-full px-4 sm:px-6 py-4 sm:py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-indigo-300 text-sm sm:text-lg shadow-sm"
                                    required
                                />
                            </div>
                            
                            <!-- Enhanced Submit Button -->
                            <div class="pt-2 sm:pt-4">
                                <button
                                    type="submit"
                                    class="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 sm:py-6 px-6 sm:px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden group"
                                >
                                    <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <div class="relative flex items-center justify-center">
                                        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300">
                                            <i class="fas fa-paper-plane text-sm sm:text-lg"></i>
                                        </div>
                                        <span class="text-base sm:text-xl">Kirim Transaksi</span>
                                    </div>
                                </button>
                            </div>
                            
                            <!-- Quick Amount Buttons -->
                            <div class="grid grid-cols-4 gap-2 sm:gap-3 pt-2">
                                <button type="button" onclick="setQuickAmount(10)" class="bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
                                    10K
                                </button>
                                <button type="button" onclick="setQuickAmount(25)" class="bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
                                    25K
                                </button>
                                <button type="button" onclick="setQuickAmount(50)" class="bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
                                    50K
                                </button>
                                <button type="button" onclick="setQuickAmount(100)" class="bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
                                    100K
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes slideUp {
                        from { 
                            opacity: 0;
                            transform: translateY(50px) scale(0.9);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                    
                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out;
                    }
                    
                    .animate-slideUp {
                        animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    }
                    
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                    
                    /* Mobile optimizations */
                    @media (max-width: 640px) {
                        .max-h-\[95vh\] {
                            max-height: 100vh;
                        }
                    }
                </style>
            `;
    }

    // Admin Pages
    function renderAdminDashboard() {
        // Data ini akan di-fetch secara async, jadi kita tampilkan placeholder dulu
        let totalUsers = appState.userManagement.totalUsers || 0;
        let totalTransactions = 0;
        let totalAmount = 0;

        // Simulasi data agregat, idealnya ini dari endpoint Supabase khusus admin
        appState.transactions.forEach(user => {
            const userTransactions = []; // Placeholder
            totalTransactions += userTransactions.length;
            totalAmount += userTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
        });

        return `
            <div class="space-y-6 sm:space-y-8 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center">
                            <i class="fas fa-crown text-yellow-500 mr-3"></i>
                            Admin Dashboard
                        </h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1">Kelola dan pantau seluruh sistem Frixsave</p>
                    </div>
                    <div class="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-2xl border border-yellow-200">
                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span class="text-sm text-yellow-700 font-medium">Sistem Aktif</span>
                    </div>
                </div>

                <!-- Admin Statistics -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 sm:p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-users text-white text-lg sm:text-xl"></i>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Pengguna</p>
                            <p class="text-xl sm:text-2xl font-bold text-blue-600">${totalUsers}</p>
                            <p class="text-xs text-blue-500 mt-1">Pengguna aktif</p>
                        </div>
                    </div>

                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-gradient-to-br from-green-400 to-emerald-500 p-3 sm:p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-receipt text-white text-lg sm:text-xl"></i>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Transaksi</p>
                            <p class="text-xl sm:text-2xl font-bold text-green-600">${totalTransactions}</p>
                            <p class="text-xs text-green-500 mt-1">Semua pengguna</p>
                        </div>
                    </div>

                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-gradient-to-br from-purple-400 to-pink-500 p-3 sm:p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-coins text-white text-lg sm:text-xl"></i>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Volume</p>
                            <p class="text-xl sm:text-2xl font-bold text-purple-600">Rp ${(totalAmount * 1000).toLocaleString('id-ID')}</p>
                            <p class="text-xs text-purple-500 mt-1">Nilai transaksi</p>
                        </div>
                    </div>

                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div class="bg-gradient-to-br from-orange-400 to-red-500 p-3 sm:p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-chart-line text-white text-lg sm:text-xl"></i>
                            </div>
                        </div>
                        <div>
                            <p class="text-xs sm:text-sm font-medium text-gray-600 mb-2">Rata-rata per User</p>
                            <p class="text-xl sm:text-2xl font-bold text-orange-600">${totalUsers > 0 ? Math.round(totalTransactions / totalUsers) : 0}</p>
                            <p class="text-xs text-orange-500 mt-1">Transaksi/user</p>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                    <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                            <i class="fas fa-bolt text-white text-sm"></i>
                        </div>
                        Aksi Cepat Admin
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <button onclick="navigateTo('user-management')" class="flex flex-col items-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-users text-white text-lg sm:text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base mb-1">Kelola Pengguna</h4>
                            <p class="text-xs sm:text-sm text-gray-500 text-center">Lihat dan kelola semua pengguna</p>
                        </button>

                        <button onclick="navigateTo('system-reports')" class="flex flex-col items-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-chart-area text-white text-lg sm:text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base mb-1">Laporan Sistem</h4>
                            <p class="text-xs sm:text-sm text-gray-500 text-center">Analisis mendalam sistem</p>
                        </button>

                        <button onclick="exportAllData()" class="flex flex-col items-center p-4 sm:p-6 bg-white/50 rounded-2xl border border-white/30 hover:bg-white/70 transition-all duration-300 group">
                            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <i class="fas fa-download text-white text-lg sm:text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base mb-1">Ekspor Semua Data</h4>
                            <p class="text-xs sm:text-sm text-gray-500 text-center">Download data seluruh sistem</p>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderUserManagement() {
        const containerId = 'user-management-content'; // ID untuk konten dinamis

        // Immediately return a placeholder with a loading state
        const placeholder = `
            <div class="text-center p-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                <p class="mt-4 text-gray-600">Memuat data pengguna dari database...</p>
            </div>
        `;

        // Asynchronously fetch and render the actual content
        const fetchAndRenderUsers = async () => {
            let usersOnPage = [];
            let errorState = null;
            const { currentPage, usersPerPage } = appState.userManagement;

            if (useSupabase) {
                try {
                    const { data: supabaseUsers, error, count } = await api.getAllUsers(currentPage, usersPerPage);
                    if (error) throw error;
                    usersOnPage = supabaseUsers; // Use Supabase as the source of truth
                    appState.userManagement.totalUsers = count;
                } catch (error) {
                    console.error("Failed to fetch users from Supabase, falling back to localStorage.", error);
                    errorState = 'Gagal memuat data dari cloud. Menampilkan data lokal.';
                }
            }

            // Fallback to localStorage if Supabase fails or is not used
            if (errorState) {
                // Jika Supabase gagal, tampilkan pesan error dan jangan tampilkan data apa pun.
                usersOnPage = [];
                appState.userManagement.totalUsers = 0;
                showSyncStatus('error', errorState);
            }

            const totalUsers = appState.userManagement.totalUsers; // Ambil total user terbaru

            // Konten utama halaman, tidak termasuk placeholder
            const mainContent = `
            <div class="space-y-6 sm:space-y-8">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
                            <i class="fas fa-users text-blue-500 mr-3"></i>
                            Kelola Pengguna
                        </h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1">Pantau aktivitas dan kelola semua pengguna sistem</p>
                    </div>
                    <button onclick="showAddUserModal()" class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 sm:px-6 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        <i class="fas fa-user-plus mr-2"></i>
                        <span class="text-sm sm:text-base">Tambah User</span>
                    </button>
                </div>

                <!-- User Statistics -->
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Users</p>
                                <p class="text-xl sm:text-2xl font-bold text-blue-600">${totalUsers}</p>
                            </div>
                            <div class="bg-gradient-to-br from-blue-400 to-indigo-500 p-2 sm:p-3 rounded-2xl shadow-lg">
                                <i class="fas fa-users text-white text-sm sm:text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Active Today</p>
                                <p class="text-xl sm:text-2xl font-bold text-green-600">${Math.floor(totalUsers * 0.7)}</p>
                            </div>
                            <div class="bg-gradient-to-br from-green-400 to-emerald-500 p-2 sm:p-3 rounded-2xl shadow-lg">
                                <i class="fas fa-user-check text-white text-sm sm:text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">New This Week</p>
                                <p class="text-xl sm:text-2xl font-bold text-purple-600">${Math.floor(totalUsers * 0.2)}</p>
                            </div>
                            <div class="bg-gradient-to-br from-purple-400 to-pink-500 p-2 sm:p-3 rounded-2xl shadow-lg">
                                <i class="fas fa-user-plus text-white text-sm sm:text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Premium Users</p>
                                <p class="text-xl sm:text-2xl font-bold text-orange-600">${Math.floor(totalUsers * 0.3)}</p>
                            </div>
                            <div class="bg-gradient-to-br from-orange-400 to-red-500 p-2 sm:p-3 rounded-2xl shadow-lg">
                                <i class="fas fa-crown text-white text-sm sm:text-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <div class="p-6 sm:p-8">
                        <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                                <i class="fas fa-list text-white text-sm"></i>
                            </div>
                            Daftar Pengguna
                        </h3>

                        <div class="space-y-4">
                            ${usersOnPage.map(user => {
                                const { id: userId, email, role, name, transaction_count, budget_count, goal_count, total_volume } = user;
                                // Data is now coming directly from the database view, no need for localStorage here.
                                const userTransactionsCount = transaction_count || 0;
                                const userBudgetsCount = budget_count || 0;
                                const userGoalsCount = goal_count || 0;
                                const totalAmount = total_volume || 0;
                                const hasPin = !!user.pin;

                                const isAdminUser = role === 'admin';
                                const isDefaultUser = ['demo@frixsave.com', 'user@example.com', 'test@budget.com'].includes(email);

                                return `
                                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
                                        <div class="flex flex-col gap-4 sm:gap-6">
                                            <!-- User Info Header -->
                                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div class="flex items-center space-x-4">
                                                    <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-${email === 'demo@frixsave.com' ? 'blue' : email === 'user@example.com' ? 'purple' : email.includes('admin') ? 'yellow' : 'green'}-400 to-${email === 'demo@frixsave.com' ? 'indigo' : email === 'user@example.com' ? 'pink' : email.includes('admin') ? 'orange' : 'emerald'}-500 rounded-2xl flex items-center justify-center shadow-lg">
                                                        <i class="fas fa-${email.includes('admin') ? 'crown' : 'user'} text-white text-lg sm:text-xl"></i>
                                                    </div>
                                                    <div>
                                                        <div class="flex items-center space-x-2">
                                                            <h4 class="font-semibold text-gray-800 text-sm sm:text-base">${email}</h4>
                                                            ${email === 'admin@frixsave.com' ?
                                                                '<span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-bold">👑 Admin Utama</span>' :
                                                                isDefaultUser ?
                                                                '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Default</span>' :
                                                                '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Custom</span>'}
                                                            ${hasPin ? '<i class="fas fa-lock text-green-500 text-xs" title="PIN Protected"></i>' : '<i class="fas fa-unlock text-red-500 text-xs" title="No PIN"></i>'}
                                                        </div>
                                                        <p class="text-xs sm:text-sm text-gray-500">ID: ${userId}</p>
                                                        <div class="flex items-center space-x-3 mt-2">
                                                            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">${userTransactionsCount} transaksi</span>
                                                            <span class="hidden xs:inline-flex text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">${userBudgetsCount} anggaran</span>
                                                            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">${userGoalsCount} target</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="text-right flex-shrink-0 sm:pl-4">
                                                    <p class="text-lg sm:text-xl font-bold text-gray-800">Rp ${(totalAmount * 1000).toLocaleString('id-ID')}</p>
                                                    <p class="text-xs sm:text-sm text-gray-500">Total volume</p>
                                                    <p class="text-xs text-gray-400 mt-1">Bergabung: ${new Date(user.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</p>
                                                </div>
                                            </div>

                                            <!-- Action Buttons -->
                                            <div class="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                                                <button onclick="viewUserDetails('${email}')" class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                                    <i class="fas fa-eye mr-1"></i>Detail
                                                </button>
                                                <button onclick="resetUserPin('${email}')" class="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                                    <i class="fas fa-key mr-1"></i>Reset PIN
                                                </button>
                                                <button onclick="exportUserData('${email}')" class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                                    <i class="fas fa-download mr-1"></i>Export
                                                </button>
                                                ${email !== 'admin@frixsave.com' && !isDefaultUser ? `
                                                    <button onclick="deleteUser('${email}')" class="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                                        <i class="fas fa-trash mr-1"></i>Hapus
                                                    </button>
                                                    <button onclick="promoteToAdmin('${email}')" class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                                        <i class="fas fa-user-shield mr-1"></i>Jadikan Admin
                                                    </button>
                                                ` : ''}
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        ${renderPaginationControls()}
                    </div>
                </div>
                </div>
            `;

            const container = document.getElementById('page-content');
            if (container) {
                container.innerHTML = mainContent;
            }
        };

        // Panggil fungsi fetch dan render
        fetchAndRenderUsers();

        // Kembalikan struktur dasar dengan placeholder
        return `
            <div class="space-y-6 sm:space-y-8 fade-in" id="user-management-page">
                <div id="user-management-content">
                    ${placeholder}
                </div>
            </div>
        `;
    }

    function renderPaginationControls() {
        const { currentPage, usersPerPage, totalUsers } = appState.userManagement;
        const totalPages = Math.ceil(totalUsers / usersPerPage);

        if (totalPages <= 1) return '';

        return `
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200/80 dark:border-slate-700/80">
                <span class="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                    Menampilkan <strong>${(currentPage - 1) * usersPerPage + 1}</strong>-<strong>${Math.min(currentPage * usersPerPage, totalUsers)}</strong> dari <strong>${totalUsers}</strong>
                </span>
                <div class="flex items-center space-x-2">
                    <button
                        onclick="navigateToUserPage(${currentPage - 1})"
                        class="px-4 py-2 text-sm font-semibold rounded-xl bg-white/80 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                        ${currentPage === 1 ? 'disabled' : ''}
                    >
                        &laquo; Sebelumnya
                    </button>
                    <span class="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl dark:bg-slate-700 dark:text-gray-200">${currentPage} / ${totalPages}</span>
                    <button
                        onclick="navigateToUserPage(${currentPage + 1})"
                        class="px-4 py-2 text-sm font-semibold rounded-xl bg-white/80 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                        ${currentPage >= totalPages ? 'disabled' : ''}
                    >
                        Berikutnya &raquo;
                    </button>
                </div>
            </div>
        `;
    }

    async function navigateToUserPage(page) {
        const { totalUsers, usersPerPage } = appState.userManagement;
        const totalPages = Math.ceil(totalUsers / usersPerPage);

        // Mencegah navigasi ke halaman yang tidak valid
        if (page < 1 || page > totalPages) return;

        appState.userManagement.currentPage = page;

        // Tampilkan loading spinner di dalam tabel
        const userListContainer = document.querySelector('.space-y-4');
        if (userListContainer) {
            userListContainer.innerHTML = `<div class="text-center p-8"><i class="fas fa-spinner fa-spin text-2xl text-indigo-500"></i></div>`;
        }

        // Ambil data baru
        const { data: newUsers, error, count } = await api.getAllUsers(page, usersPerPage);
        if (error) {
            showSyncStatus('error', 'Gagal memuat halaman berikutnya.');
            return;
        }

        // Update state dan render ulang hanya bagian yang perlu
        appState.userManagement.totalUsers = count;
        render(); // Panggil render utama untuk memperbarui seluruh halaman dengan state baru
    }

    function renderSystemReports() {
        const placeholder = `
            <div class="space-y-6 sm:space-y-8 fade-in">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                            <i class="fas fa-chart-area text-purple-500 mr-3"></i>
                            Laporan Sistem
                        </h1>
                        <p class="text-gray-600 text-sm sm:text-base mt-1">Analisis mendalam performa dan penggunaan sistem</p>
                    </div>
                </div>
                <div class="text-center p-12">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    <p class="mt-4 text-gray-600">Memuat laporan sistem dari database...</p>
                </div>
            </div>`;

        const renderContent = async () => {
            const pageContent = document.getElementById('page-content');

            // Fetch all required data in parallel
            const [
                { data: stats, error: statsError },
                { data: topUsers, error: topUsersError },
                { data: userGrowth, error: userGrowthError },
                { data: allTransactions, error: transactionsError }
            ] = await Promise.all([
                api.getSystemStats(),
                api.getTopActiveUsers(),
                api.getMonthlyUserGrowth(),
                api.getTransactionsFromLastMonths(6) // For transaction activity chart
            ]);

            if (statsError || topUsersError || userGrowthError || transactionsError) {
                console.error('Failed to fetch system reports data:', { statsError, topUsersError, userGrowthError, transactionsError });
                showSyncStatus('error', 'Gagal memuat data laporan sistem.');
                if (pageContainer) pageContainer.innerHTML = `<div class="text-center p-12 text-red-500">Gagal memuat data. Coba lagi nanti.</div>`;
                return;
            }

            // --- Process Data ---
            const totalUsers = stats?.total_users || 0;
            const totalTransactions = stats?.total_transactions || 0;
            const totalVolume = stats?.total_volume || 0;
            const topActiveUsers = topUsers || [];
            const visitorCount = 1250 + Math.floor(Math.random() * 100); // Still simulated

            // Process user growth data
            const userGrowthData = userGrowth?.map(d => ({ month: d.month, users: d.user_count })) || [];
            const maxGrowth = Math.max(1, ...userGrowthData.map(d => d.users));

            // Process transaction activity data
            const transactionActivity = {};
            const monthNamesChart = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
            const todayChart = new Date();
            for (let i = 5; i >= 0; i--) {
                const d = new Date(todayChart.getFullYear(), todayChart.getMonth() - i, 1);
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                transactionActivity[key] = { label: monthNamesChart[d.getMonth()], count: 0 };
            }
            allTransactions.forEach(t => {
                const d = new Date(t.date);
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                if (transactionActivity[key]) {
                    transactionActivity[key].count += 1;
                }
            });
            const dynamicTransactionActivityData = Object.values(transactionActivity);
            const maxActivity = Math.max(1, ...dynamicTransactionActivityData.map(d => d.count));

            // --- Render Content ---
            const content = `
                <div class="space-y-6 sm:space-y-8 fade-in">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                                <i class="fas fa-chart-area text-purple-500 mr-3"></i>
                                Laporan Sistem
                            </h1>
                            <p class="text-gray-600 text-sm sm:text-base mt-1">Analisis mendalam performa dan penggunaan sistem</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20"><p class="text-sm font-medium text-gray-600 mb-2">Total Pengguna</p><p class="text-3xl font-bold text-blue-600">${totalUsers}</p></div>
                        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20"><p class="text-sm font-medium text-gray-600 mb-2">Total Transaksi</p><p class="text-3xl font-bold text-green-600">${totalTransactions.toLocaleString('id-ID')}</p></div>
                        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20"><p class="text-sm font-medium text-gray-600 mb-2">Total Volume</p><p class="text-3xl font-bold text-purple-600">Rp ${(totalVolume * 1000).toLocaleString('id-ID')}</p></div>
                        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20"><p class="text-sm font-medium text-gray-600 mb-2">Jumlah Visitor</p><p class="text-3xl font-bold text-orange-600">${visitorCount.toLocaleString('id-ID')}</p></div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                            <h3 class="text-lg font-bold text-gray-800 mb-6">Pertumbuhan Pengguna</h3>
                            <div class="relative h-40 flex items-end justify-around">
                                ${userGrowthData.map(data => `<div class="flex flex-col items-center w-1/6"><div class="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg shadow-lg" style="height: ${(data.users / maxGrowth) * 100}%" title="${data.users} pengguna"></div><div class="mt-2 text-xs text-gray-500">${data.month}</div></div>`).join('')}
                            </div>
                        </div>
                        <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                            <h3 class="text-lg font-bold text-gray-800 mb-6">Aktivitas Transaksi</h3>
                            <div class="relative h-40 flex items-end justify-around">
                                ${dynamicTransactionActivityData.map(data => `<div class="flex flex-col items-center w-1/6"><div class="w-6 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg shadow-lg" style="height: ${(data.count / maxActivity) * 100}%" title="${data.count} transaksi"></div><div class="mt-2 text-xs text-gray-500">${data.label}</div></div>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20">
                        <h3 class="text-lg font-bold text-gray-800 mb-6">Pengguna Paling Aktif</h3>
                        <div class="space-y-4">
                            ${topActiveUsers.map((user, index) => `<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-white/50 rounded-2xl border border-white/30"><div class="flex items-center space-x-4 min-w-0"><span class="font-bold text-gray-500 w-6 text-center">${index + 1}.</span><div class="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"><i class="fas fa-user text-white"></i></div><div class="min-w-0"><p class="font-semibold text-gray-800 truncate" title="${user.email}">${user.email}</p><p class="text-xs text-gray-500">Volume: Rp ${(user.total_volume * 1000).toLocaleString('id-ID')}</p></div></div><div class="text-left sm:text-right pl-12 sm:pl-0"><p class="font-bold text-blue-600">${user.transaction_count} Transaksi</p></div></div>`).join('')}
                            ${topActiveUsers.length === 0 ? `<p class="text-center text-gray-500">Belum ada aktivitas pengguna.</p>` : ''}
                        </div>
                    </div>
                </div>`;

            if (pageContainer) pageContainer.innerHTML = content;
        };

        renderContent();
        return placeholder;
    }

    // Event Handlers
    // Expose functions to the global scope for inline onclick attributes
    window.navigateToTransactionPage = navigateToTransactionPage;
    window.handleLogin = handleLogin;
    window.navigateToUserPage = navigateToUserPage;
    window.quickLogin = quickLogin;
    async function handleLogin() {
        const email = document.getElementById('email-input').value;
        const errorDiv = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');

        if (!email) {
            errorText.textContent = 'Silakan masukkan alamat email';
            errorDiv.classList.remove('hidden');
            return;
        }

        const result = await auth.login(email);
        
        if (result.success) {
            await loadUserData();
            render(); // Render dashboard
        } else if (result.needPin) {
            errorDiv.classList.add('hidden');
            showPinModal(email);
        } else {
            errorText.textContent = result.error || 'Email tidak terdaftar. Gunakan: demo@frixsave.com, user@example.com, atau test@budget.com';
            errorDiv.classList.remove('hidden');
        }
    }

    async function quickLogin(email) {
        console.log('🚀 Quick login attempt for:', email);
        const errorDiv = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');

        const result = await auth.login(email);
        console.log('📋 Login result:', result);

        if (result.success) {
            await loadUserData();
            render();
        } else if (result.needPin) {
            if (errorDiv) errorDiv.classList.add('hidden');
            console.log('🔐 Showing PIN modal for:', email);
            showPinModal(email);
        } else {
            if (errorDiv && errorText) {
                errorText.textContent = result.error || 'Login gagal.';
                errorDiv.classList.remove('hidden');
            }
        }
    }

    window.showPinModal = showPinModal;
    function showPinModal(email) {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn">
                <div class="bg-white/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/40 animate-slideUp">
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i class="fas fa-lock text-white text-3xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">🔐 Masukkan PIN</h3>
                        <p class="text-gray-600">Akun <span class="font-semibold text-indigo-600">${email}</span> dilindungi PIN</p>
                        ${email === 'demo@frixsave.com' ? `
                            <div class="mt-4 p-3 bg-blue-50 rounded-2xl border border-blue-200">
                                <p class="text-blue-700 text-sm">💡 <strong>Hint:</strong> PIN untuk akun demo adalah <strong>123456</strong>.</p>
                            </div>
                        ` : email === 'admin@frugal.com' ? `
                            <div class="mt-4 p-3 bg-yellow-50 rounded-2xl border border-yellow-200">
                                <p class="text-yellow-700 text-sm">👑 <strong>Hint:</strong> PIN untuk akun admin adalah <strong>999999</strong>.</p>
                                <p class="text-yellow-600 text-xs mt-1">Akses penuh ke sistem administrasi</p>
                            </div>
                        ` : `
                            <div class="mt-4 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                                <p class="text-gray-700 text-sm">
                                    💡 <strong>Default PIN:</strong> <span class="font-mono bg-gray-100 px-2 py-1 rounded">000000</span>
                                </p>
                                <p class="text-gray-500 text-xs mt-1">Anda dapat mengubah PIN di pengaturan setelah login</p>
                            </div>
                        `}
                    </div>

                    <form onsubmit="handlePinLogin(event, '${email}')" class="space-y-6">
                        <div class="relative">
                            <label class="block text-sm font-bold text-gray-700 mb-3 text-center">PIN Keamanan (6 digit)</label>
                            <div class="relative">
                                <input
                                    type="password"
                                    id="modal-pin-input"
                                    maxlength="6"
                                    pattern="[0-9]{6}"
                                    class="w-full px-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-center text-3xl tracking-widest font-bold bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm"
                                    placeholder="••••••"
                                    oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                    required
                                    autocomplete="off"
                                />
                                <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <div class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                            <p class="text-xs text-gray-500 text-center mt-2">
                                <i class="fas fa-shield-alt mr-1"></i>
                                PIN Anda aman dan terenkripsi
                            </p>
                        </div>

                        <div id="pin-error" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                            <div class="flex items-center">
                                <i class="fas fa-exclamation-triangle mr-2 text-red-500"></i>
                                <span class="text-sm">PIN yang Anda masukkan salah</span>
                            </div>
                        </div>

                        <div class="flex space-x-3">
                            <button
                                type="submit"
                                class="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                            >
                                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <div class="relative flex items-center justify-center">
                                    <i class="fas fa-unlock mr-2"></i>
                                    Masuk
                                </div>
                            </button>
                            <button
                                type="button"
                                onclick="this.closest('.fixed').remove()"
                                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-2xl font-bold transition-all duration-300"
                            >
                                <i class="fas fa-times mr-2"></i>
                                Batal
                            </button>
                        </div>
                    </form>

                    <!-- Quick PIN buttons -->
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <p class="text-xs text-gray-500 text-center mb-3">Quick Access:</p>
                        <button
                            type="button"
                            onclick="document.getElementById('modal-pin-input').value = '${email === 'demo@frixsave.com' ? '123456' : email === 'admin@frugal.com' ? '999999' : '000000'}'; document.getElementById('modal-pin-input').focus();"
                            class="w-full bg-gradient-to-r from-${email === 'demo@frixsave.com' ? 'blue' : email === 'admin@frugal.com' ? 'yellow' : 'gray'}-100 to-${email === 'demo@frixsave.com' ? 'indigo' : email === 'admin@frugal.com' ? 'orange' : 'gray'}-100 hover:from-${email === 'demo@frixsave.com' ? 'blue' : email === 'admin@frugal.com' ? 'yellow' : 'gray'}-200 hover:to-${email === 'demo@frixsave.com' ? 'indigo' : email === 'admin@frugal.com' ? 'orange' : 'gray'}-200 text-${email === 'demo@frixsave.com' ? 'indigo' : email === 'admin@frugal.com' ? 'orange' : 'gray'}-700 py-2 rounded-xl font-semibold text-sm transition-all duration-300 border border-${email === 'demo@frixsave.com' ? 'indigo' : email === 'admin@frugal.com' ? 'orange' : 'gray'}-200"
                        >
                            <i class="fas fa-${email === 'admin@frugal.com' ? 'crown' : 'magic'} mr-2"></i>
                            Isi PIN ${email === 'demo@frixsave.com' ? 'Demo' : email === 'admin@frugal.com' ? 'Admin' : 'Default'} Otomatis
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            </style>
        `;
        document.body.appendChild(modal);

        // Focus on PIN input after animation
        setTimeout(() => {
            document.getElementById('modal-pin-input').focus();
        }, 100);
    }

    async function handlePinLogin(event, email) {
        event.preventDefault();
        const pin = document.getElementById('modal-pin-input').value;
        const errorDiv = document.getElementById('pin-error');
        const submitButton = event.target.querySelector('button[type="submit"]');

        if (!pin || pin.length !== 6) {
            errorDiv.querySelector('span').textContent = 'PIN harus 6 digit angka';
            errorDiv.classList.remove('hidden');
            return;
        }

        // Show loading state and disable button
        const originalButtonContent = submitButton.innerHTML;
        submitButton.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Mengecek & Sinkronisasi...`;
        submitButton.disabled = true;
        errorDiv.classList.add('hidden');

        const result = await auth.login(email, pin);

        // Restore button state
        submitButton.innerHTML = originalButtonContent;
        submitButton.disabled = false;

        if (result.success) {
            event.target.closest('.fixed').remove();
            await loadUserData();
            render(); // Render dashboard
        } else {
            errorDiv.querySelector('span').textContent = result.error || 'PIN yang Anda masukkan salah';
            errorDiv.classList.remove('hidden');

            // Shake animation for wrong PIN
            const input = document.getElementById('modal-pin-input');
            input.style.animation = 'shake 0.5s ease-in-out';
            input.value = '';
            setTimeout(() => {
                input.style.animation = '';
                input.focus();
            }, 500);
        }
    }

    window.handleLogout = handleLogout;
    async function handleLogout() {
        await auth.logout(); // Cukup panggil fungsi logout, karena navigasi sudah ditangani di dalamnya.
    }

    window.navigateTo = navigateTo;
    function navigateTo(page) {
        if (appState.currentPage === page) return; // Jangan lakukan apa-apa jika halaman sama

        const pageContent = document.getElementById('page-content');
        if (pageContent) {
            pageContent.classList.remove('page-fade-in');
            pageContent.classList.add('page-fade-out');

            setTimeout(() => {
                appState.currentPage = page;
                appState.sidebarOpen = false;
                render();
            }, 300); // Durasi harus cocok dengan animasi pageFadeOut
        } else {
            // Fallback jika page-content tidak ditemukan
            appState.currentPage = page;
            appState.sidebarOpen = false;
            render();
        }
    }

    window.toggleSidebar = toggleSidebar;
    function toggleSidebar() {
        appState.sidebarOpen = !appState.sidebarOpen;
        render();
    }

    // User Dropdown Toggle
    window.toggleUserDropdown = toggleUserDropdown; // Expose ke global scope
    function toggleUserDropdown(event) {
        if (event) {
            event.stopPropagation(); // Mencegah event klik menyebar ke listener document
        }
        appState.userDropdownOpen = !appState.userDropdownOpen;
        render();
    }

    window.showQuickAddModal = showQuickAddModal;
    function showQuickAddModal() {
        appState.showQuickAdd = true;
        render();
    }

    window.hideQuickAddModal = hideQuickAddModal;
    function hideQuickAddModal() {
        appState.showQuickAdd = false;
        render();
    }

    let currentTransactionType = 'expense';

    window.setTransactionType = setTransactionType;
    function setTransactionType(type) {
        currentTransactionType = type;
        const expenseBtn = document.getElementById('expense-btn');
        const incomeBtn = document.getElementById('income-btn');
        const categorySelect = document.getElementById('quick-category');

        if (type === 'expense') {
            expenseBtn.className = 'flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg transform scale-105';
            incomeBtn.className = 'flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 text-gray-600 hover:text-gray-800';
            categorySelect.innerHTML = `
                <option value="">✨ Pilih Kategori</option>
                ${appState.categories
                    .filter(c => c.type === 'expense')
                    .map(c => `<option value="${c.name}">${c.name}</option>`)
                    .join('')}
            `;
        } else {
            incomeBtn.className = 'flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105';
            expenseBtn.className = 'flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 text-gray-600 hover:text-gray-800';
            categorySelect.innerHTML = `
                <option value="">✨ Pilih Kategori</option>
                ${appState.categories
                    .filter(c => c.type === 'income')
                    .map(c => `<option value="${c.name}">${c.name}</option>`)
                    .join('')}
            `;
        }
    }

    window.handleQuickAdd = handleQuickAdd;
    function handleQuickAdd(event) {
        event.preventDefault();

        const transaction = {
            type: currentTransactionType,
            amount: parseFloat(document.getElementById('quick-amount').value) / 1000,
            category: document.getElementById('quick-category').value.trim(),
            description: document.getElementById('quick-description').value.trim(),
            date: document.getElementById('quick-date').value
        };

        saveTransaction(transaction);
        appState.showQuickAdd = false;
        render();
    }

    window.removeTransaction = removeTransaction;
    function removeTransaction(id) {
        deleteTransaction(id);
    }

    window.showAddBudgetForm = showAddBudgetForm;
    function showAddBudgetForm() {
        document.getElementById('budget-form').classList.remove('hidden');
    }

    window.hideAddBudgetForm = hideAddBudgetForm;
    function hideAddBudgetForm() {
        document.getElementById('budget-form').classList.add('hidden');
    }

    window.showConfirmModal = showConfirmModal;
    function showConfirmModal({ title, message, confirmText = 'Konfirmasi', cancelText = 'Batal', onConfirm, isDestructive = false }) {
        const modalId = `confirm-modal-${Date.now()}`;
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn';

        const confirmButtonClass = isDestructive
            ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700';

        const iconClass = isDestructive ? 'fa-exclamation-triangle text-red-500 dark:text-red-400' : 'fa-question-circle text-blue-500 dark:text-blue-400';
        const iconBgClass = isDestructive ? 'bg-red-100 dark:bg-red-500/20' : 'bg-blue-100 dark:bg-blue-500/20';

        modal.innerHTML = `
            <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/40 dark:border-slate-700 animate-slideUp">
                <div class="text-center">
                    <div class="w-16 h-16 ${iconBgClass} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <i class="fas ${iconClass} text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">${message}</p>
                </div>
                <div class="flex space-x-3 mt-8">
                    <button id="confirm-btn-${modalId}" class="flex-1 ${confirmButtonClass} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">${confirmText}</button>
                    <button id="cancel-btn-${modalId}" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-200 py-3 rounded-xl font-semibold transition-all duration-300">${cancelText}</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const closeModal = () => document.getElementById(modalId)?.remove();
        document.getElementById(`confirm-btn-${modalId}`).onclick = () => { closeModal(); if (onConfirm) onConfirm(); };
        document.getElementById(`cancel-btn-${modalId}`).onclick = closeModal;
    }

    window.handleAddBudget = handleAddBudget;
    function handleAddBudget(event) {
        event.preventDefault();

        const budget = {
            category: document.getElementById('budget-category').value.trim(),
            amount: parseFloat(document.getElementById('budget-amount').value) / 1000,
            description: document.getElementById('budget-description').value.trim(),
            period: document.getElementById('budget-period').value
        };

        createBudget(budget);
        hideAddBudgetForm();
        // render() dipanggil di dalam createBudget
    }

    window.showRecordPaymentForBudget = showRecordPaymentForBudget;
    function showRecordPaymentForBudget(budgetId) {
        const budget = appState.budgets.find(b => b.id === budgetId);
        if (!budget) {
            showSyncStatus('error', 'Anggaran tidak ditemukan.');
            return;
        }

        const modalId = `payment-modal-${budgetId}`;
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn';
        modal.innerHTML = `
            <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/40 dark:border-slate-700 animate-slideUp">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">Catat Pembayaran Anggaran</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Untuk kategori: <span class="font-semibold">${budget.category}</span></p>
                    </div>
                    <button onclick="document.getElementById('${modalId}').remove()" class="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <form onsubmit="handleRecordPayment(event, ${budget.id})" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Jumlah (Rp)</label>
                            <input
                                type="number"
                                step="1000"
                                id="payment-amount-${budgetId}"
                                value="${budget.amount * 1000}"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tanggal</label>
                            <input
                                type="date"
                                id="payment-date-${budgetId}"
                                value="${new Date().toISOString().split('T')[0]}"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Deskripsi</label>
                        <input
                            type="text"
                            id="payment-description-${budgetId}"
                            value="Pembayaran untuk ${budget.category}"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            required
                        />
                    </div>
                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg">
                            <i class="fas fa-check mr-2"></i>Simpan Transaksi
                        </button>
                        <button type="button" onclick="document.getElementById('${modalId}').remove()" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-200">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById(`payment-amount-${budgetId}`).focus();
    }

    window.showAddGoalForm = showAddGoalForm;
    function showAddGoalForm() {
        document.getElementById('goal-form').classList.remove('hidden');
    }

    window.hideAddGoalForm = hideAddGoalForm;
    function hideAddGoalForm() {
        document.getElementById('goal-form').classList.add('hidden');
    }

    window.showEditBudgetForm = showEditBudgetForm;
    function showEditBudgetForm(budgetId) {
        const budget = appState.budgets.find(b => b.id === budgetId);
        if (!budget) { showSyncStatus('error', 'Anggaran tidak ditemukan.'); return; }

        const modal = document.createElement('div');
        modal.id = 'edit-budget-modal';
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn';
        modal.innerHTML = `
            <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/40 dark:border-slate-700 animate-slideUp">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">Edit Anggaran</h3>
                    <button onclick="document.getElementById('edit-budget-modal').remove()" class="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <form onsubmit="handleUpdateBudget(event, ${budget.id})" class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Kategori</label>
                        <input
                            type="text"
                            id="edit-budget-category"
                            value="${budget.category}"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Deskripsi</label>
                        <textarea
                            id="edit-budget-description"
                            rows="2"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            placeholder="Deskripsi singkat (opsional)"
                        >${budget.description || ''}</textarea>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Jumlah (Rp)</label>
                            <input
                                type="number"
                                step="1000"
                                id="edit-budget-amount"
                                value="${budget.amount * 1000}"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Periode</label>
                            <select id="edit-budget-period" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <option value="monthly" ${budget.period === 'monthly' ? 'selected' : ''}>Bulanan</option>
                                <option value="weekly" ${budget.period === 'weekly' ? 'selected' : ''}>Mingguan</option>
                                <option value="yearly" ${budget.period === 'yearly' ? 'selected' : ''}>Tahunan</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg">
                            <i class="fas fa-save mr-2"></i>Simpan
                        </button>
                        <button type="button" onclick="document.getElementById('edit-budget-modal').remove()" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-200">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.handleUpdateBudget = handleUpdateBudget;
    function handleUpdateBudget(event, budgetId) {
        event.preventDefault();
        const updates = {
            category: document.getElementById('edit-budget-category').value.trim(),
            amount: parseFloat(document.getElementById('edit-budget-amount').value) / 1000,
            description: document.getElementById('edit-budget-description').value.trim(),
            period: document.getElementById('edit-budget-period').value
        };
        updateBudget(budgetId, updates);
        document.getElementById('edit-budget-modal').remove();
        // render() dipanggil di dalam updateBudget
    }

    window.handleRecordPayment = handleRecordPayment;
    function handleRecordPayment(event, budgetId) {
        event.preventDefault();
        const budget = appState.budgets.find(b => b.id === budgetId);
        if (!budget) return;

        const transaction = {
            type: 'expense',
            amount: parseFloat(document.getElementById(`payment-amount-${budgetId}`).value) / 1000,
            category: budget.category,
            description: document.getElementById(`payment-description-${budgetId}`).value,
            date: document.getElementById(`payment-date-${budgetId}`).value
        };

        saveTransaction(transaction);
        const modalId = `payment-modal-${budgetId}`;
        document.getElementById(modalId)?.remove();
        // render() dipanggil di dalam saveTransaction
    }

    window.handleDeleteBudget = handleDeleteBudget;
    function handleDeleteBudget(budgetId) {
        deleteBudget(budgetId);
    }

    window.showAddReceivableForm = showAddReceivableForm;
    function showAddReceivableForm() {
        document.getElementById('receivable-form').classList.remove('hidden');
    }

    window.hideAddReceivableForm = hideAddReceivableForm;
    function hideAddReceivableForm() {
        document.getElementById('receivable-form').classList.add('hidden');
    }

    window.handleAddReceivable = handleAddReceivable;
    function handleAddReceivable(event) {
        event.preventDefault(); // Corrected from event.preventDefault

        const receivable = {
            debtor_name: document.getElementById('receivable-debtor').value.trim(),
            amount: parseFloat(document.getElementById('receivable-amount').value) / 1000, // Amount is the target amount
            current_amount: 0, // Initialize current_amount to 0
            due_date: document.getElementById('receivable-due-date').value,
            description: document.getElementById('receivable-description').value.trim()
        };

        createReceivable(receivable); // Changed from saveReceivable to match convention
        hideAddReceivableForm();
    }

    window.handleAddDebt = handleAddDebt;
    function handleAddDebt(event) {
        event.preventDefault();
        const debt = {
            creditor_name: document.getElementById('debt-creditor').value.trim(),
            amount: parseFloat(document.getElementById('debt-amount').value) / 1000,
            due_date: document.getElementById('debt-due-date').value,
            description: document.getElementById('debt-description').value.trim()
        };
        saveDebt(debt);
        hideAddDebtForm();
    }

    window.handleMarkDebtAsPaid = handleMarkDebtAsPaid;
    function handleMarkDebtAsPaid(debtId) {
        showConfirmModal({
            title: 'Tandai Lunas?', message: 'Anda akan menandai utang ini sebagai lunas.', confirmText: 'Ya, Lunas',
            onConfirm: async () => {
                const debt = appState.debts.find(d => d.id === debtId);
                if (!debt) return;

                // Create an expense transaction for paying off the debt
                const expenseTransaction = {
                    type: 'expense',
                    amount: debt.amount,
                    category: 'Utang',
                    description: `Pelunasan utang kepada ${debt.creditor_name}`,
                    date: new Date().toISOString().split('T')[0]
                };
                await saveTransaction(expenseTransaction);

                // Update the debt status
                await updateDebtStatus(debtId, 'paid');
            }
        });
    }

    async function saveDebt(debtData) {
        if (!appState.user) return;

        const newDebt = {
            ...debtData,
            user_id: appState.user.id,
            status: 'unpaid',
            created_at: new Date().toISOString(),
        };

        try {
            const { data, error } = await api.createDebt(newDebt);
            if (error) {
                showSyncStatus('error', 'Gagal sync utang ke cloud');
                console.error('Supabase debt create error:', error);
            } else {
                await loadUserData();
                render();
                showSyncStatus('success', 'Utang dicatat & disinkronisasi');
            }
        } catch (error) {
            console.error('Error creating debt:', error);
            showSyncStatus('error', 'Gagal mencatat utang');
        } 
    }

    async function createReceivable(receivable) { // Renamed from saveReceivable
        if (!appState.user) return;

        receivable.id = Date.now();
        receivable.user_id = appState.user.id;
        receivable.status = 'unpaid';
        receivable.created_at = new Date().toISOString();

        try {
            if (useSupabase) {
                const { data, error } = await api.createReceivable(receivable);
                if (error) {
                    showSyncStatus('error', 'Gagal sync piutang ke cloud');
                    console.error('Supabase receivable create error:', error);
                } else {
                    await loadUserData();
                    render();
                    showSyncStatus('success', 'Piutang dicatat & disinkronisasi');
                }
            }
        } catch (error) {
            console.error('Error creating receivable:', error);
            showSyncStatus('error', 'Gagal mencatat piutang');
        }
    }

    window.showAddInstallmentModal = showAddInstallmentModal;
    function showAddInstallmentModal(receivableId) {
        const receivable = appState.receivables.find(r => r.id === receivableId);
        if (!receivable) {
            showSyncStatus('error', 'Piutang tidak ditemukan.');
            return;
        }

        const remainingAmount = (receivable.amount - (receivable.current_amount || 0)) * 1000;

        const modalId = `installment-modal-${receivableId}`;
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn';
        modal.innerHTML = `
            <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/40 dark:border-slate-700 animate-slideUp">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white">Tambah Cicilan Piutang</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Untuk: <span class="font-semibold">${receivable.debtor_name}</span></p>
                    </div>
                    <button onclick="document.getElementById('${modalId}').remove()" class="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <form onsubmit="handleAddInstallment(event, ${receivable.id})" class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Jumlah Cicilan (Rp)</label>
                        <input
                            type="number"
                            step="1000"
                            id="installment-amount-${receivable.id}"
                            placeholder="Masukkan jumlah pembayaran"
                            max="${remainingAmount}"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            required
                        />
                        <p class="text-xs text-gray-500 mt-2">Sisa piutang: Rp ${remainingAmount.toLocaleString('id-ID')}</p>
                    </div>
                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg">
                            <i class="fas fa-check mr-2"></i>Simpan Cicilan
                        </button>
                        <button type="button" onclick="document.getElementById('${modalId}').remove()" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-200">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById(`installment-amount-${receivable.id}`).focus();
    }

    window.handleAddInstallment = handleAddInstallment;
    async function handleAddInstallment(event, receivableId) {
        event.preventDefault();
        const receivable = appState.receivables.find(r => r.id === receivableId);
        if (!receivable) {
            showSyncStatus('error', 'Piutang tidak ditemukan.');
            return;
        }

        const installmentAmountInput = document.getElementById(`installment-amount-${receivableId}`);
        const installmentAmount = parseFloat(installmentAmountInput.value) / 1000;

        if (isNaN(installmentAmount) || installmentAmount <= 0) {
            showSyncStatus('error', 'Jumlah cicilan tidak valid.');
            return;
        }

        const newCurrentAmount = (receivable.current_amount || 0) + installmentAmount;
        const isPaid = newCurrentAmount >= receivable.amount;

        const updates = {
            current_amount: newCurrentAmount,
            status: isPaid ? 'paid' : 'unpaid',
            updated_at: new Date().toISOString()
        };

        // 1. Create a corresponding income transaction for the installment
        const incomeTransaction = {
            type: 'income',
            amount: installmentAmount,
            category: 'Piutang', // A dedicated category for receivable payments
            description: `Cicilan dari ${receivable.debtor_name}`,
            date: new Date().toISOString().split('T')[0],
            user_id: appState.user.id,
            created_at: new Date().toISOString()
        };

        // Use the generic saveTransaction function which handles UI updates
        await saveTransaction(incomeTransaction);

        // 2. Update the receivable record itself
        await updateReceivable(
            receivableId, 
            updates, 
            `Cicilan Rp ${(installmentAmount * 1000).toLocaleString('id-ID')} berhasil dicatat!`
        );

        document.getElementById(`installment-modal-${receivableId}`)?.remove();
    }

    window.showEditReceivableModal = showEditReceivableModal;
    function showEditReceivableModal(receivableId) {
        const receivable = appState.receivables.find(r => r.id === receivableId);
        if (!receivable) {
            showSyncStatus('error', 'Piutang tidak ditemukan.');
            return;
        }

        const modalId = `edit-receivable-modal-${receivableId}`;
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn';
        modal.innerHTML = `
            <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/40 dark:border-slate-700 animate-slideUp">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">Edit Piutang</h3>
                    <button onclick="document.getElementById('${modalId}').remove()" class="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <form onsubmit="handleUpdateReceivable(event, ${receivable.id})" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nama Peminjam</label>
                            <input type="text" id="edit-receivable-debtor" value="${receivable.debtor_name}" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Jumlah Piutang (Rp)</label>
                            <input type="number" step="1000" id="edit-receivable-amount" value="${receivable.amount * 1000}" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tanggal Jatuh Tempo</label>
                        <input type="date" id="edit-receivable-due-date" value="${receivable.due_date}" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Deskripsi</label>
                        <textarea id="edit-receivable-description" rows="2" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white">${receivable.description || ''}</textarea>
                    </div>
                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg"><i class="fas fa-save mr-2"></i>Simpan Perubahan</button>
                        <button type="button" onclick="document.getElementById('${modalId}').remove()" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-200"><i class="fas fa-times mr-2"></i>Batal</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.handleUpdateReceivable = handleUpdateReceivable;
    async function handleUpdateReceivable(event, receivableId) {
        event.preventDefault();

        const updates = {
            debtor_name: document.getElementById('edit-receivable-debtor').value.trim(),
            amount: parseFloat(document.getElementById('edit-receivable-amount').value) / 1000,
            due_date: document.getElementById('edit-receivable-due-date').value,
            description: document.getElementById('edit-receivable-description').value.trim(),
            updated_at: new Date().toISOString()
        };

        await updateReceivable(receivableId, updates, 'Piutang berhasil diperbarui!');
        document.getElementById(`edit-receivable-modal-${receivableId}`)?.remove();
    }

    window.showEditTransactionModal = showEditTransactionModal;
    function showEditTransactionModal(transactionId) {
        const transaction = appState.transactions.find(t => t.id === transactionId);
        if (!transaction) {
            showSyncStatus('error', 'Transaksi tidak ditemukan.');
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'edit-transaction-modal';
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn';

        const isExpense = transaction.type === 'expense';

        const expenseCategories = `
            ${appState.categories.filter(c => c.type === 'expense').map(c => 
                `<option value="${c.name}" ${transaction.category === c.name ? 'selected' : ''}>${c.name}</option>`
            ).join('')}
        `;

        const incomeCategories = `
            ${appState.categories.filter(c => c.type === 'income').map(c => 
                `<option value="${c.name}" ${transaction.category === c.name ? 'selected' : ''}>${c.name}</option>`
            ).join('')}
        `;

        modal.innerHTML = `
            <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/40 dark:border-slate-700 animate-slideUp max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">Edit Transaksi</h3>
                    <button onclick="document.getElementById('edit-transaction-modal').remove()" class="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <form onsubmit="handleUpdateTransaction(event, ${transaction.id})" class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Jenis Transaksi</label>
                        <select id="edit-transaction-type" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white" disabled>
                            <option value="expense" ${isExpense ? 'selected' : ''}>Pengeluaran</option>
                            <option value="income" ${!isExpense ? 'selected' : ''}>Pemasukan</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Jumlah (Rp)</label>
                            <input type="number" step="1000" id="edit-transaction-amount" value="${transaction.amount * 1000}" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tanggal</label>
                            <input type="date" id="edit-transaction-date" value="${transaction.date}" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Kategori</p>
                        <select id="edit-transaction-category" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white" required>
                            ${isExpense ? expenseCategories : incomeCategories}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Deskripsi</p>
                        <input type="text" id="edit-transaction-description" value="${transaction.description}" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white" required />
                    </div>
                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg">
                            <i class="fas fa-save mr-2"></i>Simpan Perubahan
                        </button>
                        <button type="button" onclick="document.getElementById('edit-transaction-modal').remove()" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-gray-200">
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.handleUpdateTransaction = handleUpdateTransaction;
    async function handleUpdateTransaction(event, transactionId) {
        event.preventDefault();

        const updates = {
            amount: parseFloat(document.getElementById('edit-transaction-amount').value) / 1000,
            date: document.getElementById('edit-transaction-date').value,
            category: document.getElementById('edit-transaction-category').value.trim(),
            description: document.getElementById('edit-transaction-description').value.trim(),
            updated_at: new Date().toISOString()
        };

        document.getElementById('edit-transaction-modal').remove();

        if (useSupabase) {
            const { error } = await api.updateTransaction(transactionId, updates);
            if (error) {
                console.error('❌ Error updating transaction:', error); // This line is duplicated, but it's okay.
                showSyncStatus('error', 'Gagal update. Data dikembalikan.');
            } else {
                await loadUserData();
                render();
                showSyncStatus('success', 'Transaksi berhasil diperbarui & disinkronisasi.');
            }
        }
    }

    window.handleMarkAsPaid = handleMarkAsPaid;
    function handleMarkAsPaid(receivableId) {
        const receivable = appState.receivables.find(r => r.id === receivableId);
        if (!receivable) return;

        const remainingAmount = receivable.amount - (receivable.current_amount || 0);

        showConfirmModal({
            title: 'Tandai Lunas?',
            message: `Ini akan melunasi sisa piutang sebesar Rp ${(remainingAmount * 1000).toLocaleString('id-ID')}. Lanjutkan?`,
            confirmText: 'Ya, Lunas',
            onConfirm: async () => {
                // Create income transaction for the remaining amount
                if (remainingAmount > 0) {
                    const incomeTransaction = {
                        type: 'income',
                        amount: remainingAmount,
                        category: 'Piutang',
                        description: `Pelunasan dari ${receivable.debtor_name}`,
                        date: new Date().toISOString().split('T')[0],
                        user_id: appState.user.id,
                        created_at: new Date().toISOString()
                    };
                    await saveTransaction(incomeTransaction);
                }

                const updates = { 
                    current_amount: receivable.amount, 
                    status: 'paid',
                    updated_at: new Date().toISOString()
                };
                await updateReceivable(receivableId, updates, 'Piutang berhasil dilunasi!');
            }
        });
    }

    async function updateReceivable(receivableId, updates, successMessage) {
        if (!appState.user) return;

        const { error } = await api.updateReceivable(receivableId, updates);
        if (error) {
            showSyncStatus('error', 'Gagal sync update piutang');
            console.error('Supabase receivable update error:', error);
        } else {
            // Data will be reloaded by the saveTransaction call, so we just need to show status and render
            await loadUserData(); // Reload to be safe
            render();
            showSyncStatus('success', successMessage || 'Piutang diperbarui & disinkronisasi');
        }
    }

    window.handleDeleteReceivable = handleDeleteReceivable;
    function handleDeleteReceivable(receivableId) {
        deleteReceivable(receivableId);
    }

    window.handleAddGoal = handleAddGoal;
    function handleAddGoal(event) {
        event.preventDefault();

        const goal = {
            title: document.getElementById('goal-title').value.trim(),
            target_amount: parseFloat(document.getElementById('goal-target').value) / 1000,
            current_amount: parseFloat(document.getElementById('goal-current').value || 0) / 1000,
            deadline: document.getElementById('goal-deadline').value
        };

        createGoal(goal);
        hideAddGoalForm();
    }

    window.handleAddFundsToGoal = handleAddFundsToGoal;
    function handleAddFundsToGoal(goalId) {
        const amountInput = document.getElementById(`add-funds-input-${goalId}`);
        if (!amountInput) return;

        const amountToAdd = parseFloat(amountInput.value);

        if (isNaN(amountToAdd) || amountToAdd <= 0) {
            showSyncStatus('error', 'Masukkan jumlah yang valid untuk ditambahkan.');
            amountInput.focus();
            return;
        }

        const goalIndex = appState.goals.findIndex(g => g.id === goalId);
        if (goalIndex === -1) return;

        const goal = appState.goals[goalIndex];
        const newCurrentAmount = goal.current_amount + (amountToAdd / 1000);

        // Create a corresponding transaction for this saving action
        const transaction = {
            type: 'expense', // Saving is considered an 'expense' from the main balance
            amount: amountToAdd / 1000,
            category: 'Tabungan',
            description: `Menabung untuk: ${goal.title}`,
            date: new Date().toISOString().split('T')[0]
        };

        // Update goal and save transaction
        updateGoal(goalId, { current_amount: newCurrentAmount });
        saveTransaction(transaction);

        // The render() call inside saveTransaction will handle the UI update.
        showSyncStatus('success', `Rp ${amountToAdd.toLocaleString('id-ID')} ditambahkan ke target!`);
    }

    window.deleteGoal = deleteGoal;
    async function deleteGoal(goalId) {
        showConfirmModal({
            title: 'Hapus Target?',
            message: 'Apakah Anda yakin ingin menghapus target ini? Tindakan ini tidak dapat dibatalkan.',
            confirmText: 'Ya, Hapus',
            isDestructive: true,
            onConfirm: async () => {
                if (!appState.user) return;

                if (useSupabase) {
                    const { error } = await api.deleteGoal(goalId);
                    if (error) {
                        console.error('❌ Error deleting goal:', error);
                        showSyncStatus('error', 'Gagal menghapus target.');
                    } else {
                        await loadUserData();
                        render();
                        showSyncStatus('success', 'Target dihapus & disinkronisasi.');
                    }
                }
            }
        });
    }

    window.showEditGoalForm = showEditGoalForm;
    function showEditGoalForm(goalId) {
        const goal = appState.goals.find(g => g.id === goalId);
        if (!goal) { showSyncStatus('error', 'Target tidak ditemukan.'); return; }

        const modal = document.createElement('div');
        modal.id = 'edit-goal-modal';
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn';
        modal.innerHTML = `
            <div class="bg-white/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/40 animate-slideUp">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">Edit Target Keuangan</h3>
                    <button onclick="document.getElementById('edit-goal-modal').remove()" class="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <form onsubmit="handleUpdateGoal(event, ${goal.id})" class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Nama Target</label>
                        <input
                            type="text"
                            id="edit-goal-title"
                            value="${goal.title}"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Target Jumlah (Rp)</label>
                            <input
                                type="number"
                                step="1000"
                                id="edit-goal-target"
                                value="${goal.target_amount * 1000}"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Jumlah Saat Ini (Rp)</label>
                            <input
                                type="number"
                                step="1000"
                                id="edit-goal-current"
                                value="${goal.current_amount * 1000}"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Deadline</label>
                        <input
                            type="date"
                            id="edit-goal-deadline"
                            value="${goal.deadline}"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div class="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg"
                        >
                            <i class="fas fa-save mr-2"></i>Simpan Perubahan
                        </button>
                        <button
                            type="button"
                            onclick="document.getElementById('edit-goal-modal').remove()"
                            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
                        >
                            <i class="fas fa-times mr-2"></i>Batal
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.handleUpdateGoal = handleUpdateGoal;
    function handleUpdateGoal(event, goalId) {
        event.preventDefault();

        const goalIndex = appState.goals.findIndex(g => g.id === goalId);
        if (goalIndex === -1) return;

        // Get updated values from the form
        const updates = {
            title: document.getElementById('edit-goal-title').value.trim(),
            target_amount: parseFloat(document.getElementById('edit-goal-target').value) / 1000,
            current_amount: parseFloat(document.getElementById('edit-goal-current').value || 0) / 1000,
            deadline: document.getElementById('edit-goal-deadline').value
        };

        updateGoal(goalId, updates);

        // Close the modal
        document.getElementById('edit-goal-modal').remove();
        // Panggil render secara eksplisit karena updateGoal tidak selalu memanggilnya
        // (tergantung pada alur error handling)
        render();
    }

    async function updateGoal(goalId, updates) {
        if (!appState.user) return;

        try {
            if (useSupabase) {
                const { data, error } = await api.updateGoal(goalId, updates);
                if (error) {
                    showSyncStatus('error', 'Gagal sync update target');
                    console.error('Supabase goal update error:', error);
                } else {
                    await loadUserData();
                    render();
                    showSyncStatus('success', 'Target berhasil diperbarui.');
                }
            }
        } catch (error) {
            console.error('Error updating goal:', error);
            showSyncStatus('error', 'Gagal memperbarui target');
        } finally {
            render();
        }
    }

    window.clearAllData = clearAllData;
    function clearAllData() {
        showConfirmModal({
            title: 'Hapus Semua Data?',
            message: 'PERINGATAN! Anda akan menghapus semua data (transaksi, anggaran, target) untuk akun ini.\n\nTindakan ini tidak dapat dibatalkan.',
            confirmText: 'Ya, Hapus Semua',
            isDestructive: true,
            onConfirm: async () => {
                if (appState.user) {
                    const userId = appState.user.id;
                    // Hapus semua data dari Supabase
                    await Promise.all([
                        supabase.from('transactions').delete().eq('user_id', userId),
                        supabase.from('budgets').delete().eq('user_id', userId),
                        supabase.from('goals').delete().eq('user_id', userId),
                        supabase.from('receivables').delete().eq('user_id', userId),
                    ]);

                    Object.assign(appState, { transactions: [], budgets: [], goals: [], receivables: [] });
                    render();
                    showSyncStatus('success', 'Semua data berhasil dihapus dari cloud.');
                }
            }
        });
    }

    window.setQuickAmount = setQuickAmount;
    function setQuickAmount(amount) {
        const amountInput = document.getElementById('quick-amount');
        if (amountInput) {
            amountInput.value = amount * 1000;
            amountInput.focus();
            
            // Add visual feedback
            amountInput.classList.add('ring-4', 'ring-green-500/20', 'border-green-500');
            setTimeout(() => {
                amountInput.classList.remove('ring-4', 'ring-green-500/20', 'border-green-500');
            }, 1000);
        }
    }

    // PIN Management Functions
    window.showSetPinModal = showSetPinModal;
    function showSetPinModal() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50">
                <div class="bg-white/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/40">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i class="fas fa-lock text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Atur PIN Keamanan</h3>
                        <p class="text-gray-600 text-sm">Buat PIN 6 digit untuk melindungi akun Anda</p>
                    </div>
                    
                    <form onsubmit="handleSetPin(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-3">PIN Baru (6 digit)</label>
                            <input
                                type="password"
                                id="new-pin"
                                maxlength="6"
                                pattern="[0-9]{6}"
                                class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 text-center text-2xl tracking-widest font-bold"
                                placeholder="••••••"
                                required
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-3">Konfirmasi PIN</label>
                            <input
                                type="password"
                                id="confirm-pin"
                                maxlength="6"
                                pattern="[0-9]{6}"
                                class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 text-center text-2xl tracking-widest font-bold"
                                placeholder="••••••"
                                required
                            />
                        </div>
                        
                        <div class="flex space-x-3">
                            <button
                                type="submit"
                                class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <i class="fas fa-check mr-2"></i>Atur PIN
                            </button>
                            <button
                                type="button"
                                onclick="this.closest('.fixed').remove()"
                                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-2xl font-semibold transition-all duration-300"
                            >
                                <i class="fas fa-times mr-2"></i>Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('new-pin').focus();
    }

    window.showChangePinModal = showChangePinModal;
    function showChangePinModal() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50">
                <div class="bg-white/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/40">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i class="fas fa-edit text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Ubah PIN Keamanan</h3>
                        <p class="text-gray-600 text-sm">Masukkan PIN lama dan PIN baru</p>
                    </div>
                    
                    <form onsubmit="handleChangePin(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-3">PIN Lama</label>
                            <input
                                type="password"
                                id="old-pin"
                                maxlength="6"
                                pattern="[0-9]{6}"
                                class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-center text-2xl tracking-widest font-bold"
                                placeholder="••••••"
                                required
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-3">PIN Baru (6 digit)</label>
                            <input
                                type="password"
                                id="new-pin-change"
                                maxlength="6"
                                pattern="[0-9]{6}"
                                class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-center text-2xl tracking-widest font-bold"
                                placeholder="••••••"
                                required
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-3">Konfirmasi PIN Baru</label>
                            <input
                                type="password"
                                id="confirm-pin-change"
                                maxlength="6"
                                pattern="[0-9]{6}"
                                class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-center text-2xl tracking-widest font-bold"
                                placeholder="••••••"
                                required
                            />
                        </div>
                        
                        <div class="flex space-x-3">
                            <button
                                type="submit"
                                class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <i class="fas fa-check mr-2"></i>Ubah PIN
                            </button>
                            <button
                                type="button"
                                onclick="this.closest('.fixed').remove()"
                                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-2xl font-semibold transition-all duration-300"
                            >
                                <i class="fas fa-times mr-2"></i>Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('old-pin').focus();
    }

    window.handleSetPin = handleSetPin;
    async function handleSetPin(event) {
        event.preventDefault();
        const newPin = document.getElementById('new-pin').value;
        const confirmPin = document.getElementById('confirm-pin').value;
        
        if (newPin !== confirmPin) {
            showSyncStatus('error', 'PIN tidak cocok. Silakan coba lagi.');
            return;
        }
        
        if (newPin.length !== 6 || !/^\d{6}$/.test(newPin)) {
            showSyncStatus('error', 'PIN harus 6 digit angka.');
            return;
        }
        
        const success = await auth.setPin(newPin);
        if (success) {
            showSyncStatus('success', 'PIN berhasil diatur & disinkronisasi!');
            event.target.closest('.fixed').remove();
            render();
        } else {
            // Error message is shown by auth.setPin
        }
    }

    window.handlePinLogin = handlePinLogin;
    async function handleChangePin(event) {
        event.preventDefault();
        const oldPin = document.getElementById('old-pin').value;
        const newPin = document.getElementById('new-pin-change').value;
        const confirmPin = document.getElementById('confirm-pin-change').value;
        
        // Verify old PIN by hashing it and comparing with the stored hash
        const currentPinHash = localStorage.getItem(`pin_${appState.user.id}`);
        const hashedOldPin = await hasher.hashPin(oldPin, appState.user.id);
        if (hashedOldPin !== currentPinHash) {
            showSyncStatus('error', 'PIN lama tidak benar.');
            return;
        }
        
        if (newPin !== confirmPin) {
            showSyncStatus('error', 'PIN baru tidak cocok. Silakan coba lagi.');
            return;
        }
        
        if (newPin.length !== 6 || !/^\d{6}$/.test(newPin)) {
            showSyncStatus('error', 'PIN baru harus 6 digit angka.');
            return;
        }
        
        const success = await auth.setPin(newPin);
        if (success) {
            showSyncStatus('success', 'PIN berhasil diubah & disinkronisasi!');
            event.target.closest('.fixed').remove();
            render();
        } else {
            // Error message is shown by auth.setPin
        }
    }

    window.removePinSecurity = removePinSecurity;
    function removePinSecurity() {
        showConfirmModal({
            title: 'Hapus PIN Keamanan?',
            message: 'Akun Anda akan menjadi kurang aman dan dapat diakses tanpa PIN. Apakah Anda yakin?',
            confirmText: 'Ya, Hapus PIN',
            isDestructive: true,
            onConfirm: async () => {
                const success = await auth.removePin();
                if (success) {
                    showSyncStatus('success', 'PIN keamanan berhasil dihapus.');
                    render();
                }
            }
        });
    }

    window.saveProfileSettings = saveProfileSettings;
    async function saveProfileSettings(isAppearanceOnly = false) {
        const name = document.getElementById('full-name')?.value;
        const currency = document.getElementById('currency')?.value;
        const theme = document.getElementById('theme')?.value;

        if (appState.user) {
            const userId = appState.user.id;
            const updates = { name, currency, theme, updated_at: new Date().toISOString() };

            try {
                // Save to Supabase and wait for the result
                const { data, error } = await api.updateUser(userId, updates);

                if (error || !data || data.length === 0) {
                    console.error('❌ Supabase profile update error:', error);
                    showSyncStatus('error', 'Gagal menyimpan pengaturan profil.');
                    return;
                }

                // Update local state with the new data from the database
                appState.user = data[0];
                // Also update the derived profile state to ensure consistency
                appState.profile.name = appState.user.name;
                appState.profile.currency = appState.user.currency;
                appState.profile.theme = appState.user.theme;
                localStorage.setItem('frixsave_user', JSON.stringify(appState.user));
                
                // Apply the new appearance settings
                applyAppearance(appState.profile.theme, appState.profile.accentColor);

                showSyncStatus('success', 'Pengaturan profil berhasil disimpan & disinkronisasi!');
                render(); // Re-render the page to show the updated name
            } catch (e) {
                console.error('❌ Exception during profile update:', e);
                showSyncStatus('error', 'Terjadi kesalahan saat menyimpan.');
            }
        }
    }

    window.exportData = exportData;
    function exportData() {
        if (!appState.user) return;

        const data = {
            user: appState.user,
            profile: appState.profile,
            data: {
                transactions: appState.transactions,
                budgets: appState.budgets,
                goals: appState.goals,
                receivables: appState.receivables,
            },
            exportDate: new Date().toISOString()
        };

        // Export transactions to CSV
        const csvContent = "data:text/csv;charset=utf-8," + transactionsToCSV(appState.transactions);
        const encodedUri = encodeURI(csvContent);
        triggerDownload(encodedUri, `frugal-transactions-${new Date().toISOString().split('T')[0]}.csv`);

        // Export all data to JSON
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `frugal-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showSyncStatus('success', 'Data CSV & JSON berhasil diekspor!');
    }

    function transactionsToCSV(transactions) {
        const headers = ['date', 'type', 'category', 'amount', 'description'];
        const csvRows = [headers.join(',')];

        for (const t of transactions) {
            const values = headers.map(header => {
                const escaped = ('' + t[header]).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
    }

    function triggerDownload(uri, filename) {
        const link = document.createElement("a");
        link.setAttribute("href", uri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    window.showImportModal = showImportModal;
    function showImportModal() {
        const modalId = 'import-csv-modal';
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn';
        modal.innerHTML = `
            <div class="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/40 dark:border-slate-700 animate-slideUp">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Impor Transaksi dari CSV</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Pilih file CSV dengan format kolom: <strong>date,type,category,amount,description</strong>.
                    <br>Contoh: <code>2024-01-15,expense,Makanan,15.5,Makan Siang</code>
                </p>
                <input type="file" id="csv-file-input" accept=".csv" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                <div class="flex space-x-3 mt-6">
                    <button onclick="handleImportCSV()" class="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold">Impor</button>
                    <button onclick="document.getElementById('${modalId}').remove()" class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold">Batal</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.handleImportCSV = handleImportCSV;
    function handleImportCSV() {
        const input = document.getElementById('csv-file-input');
        if (!input.files.length) {
            showSyncStatus('error', 'Silakan pilih file CSV terlebih dahulu.');
            return;
        }
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const csv = event.target.result;
            const lines = csv.split('\n').filter(l => l.trim() !== '');
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            const requiredHeaders = ['date', 'type', 'category', 'amount', 'description'];

            if (!requiredHeaders.every(h => headers.includes(h))) {
                showSyncStatus('error', 'Format CSV salah. Pastikan ada kolom: ' + requiredHeaders.join(', '));
                return;
            }

            const transactionsToImport = [];
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
                const transaction = {};
                headers.forEach((header, index) => {
                    transaction[header] = values[index];
                });

                // Basic validation
                if (transaction.date && transaction.type && transaction.amount) {
                    transactionsToImport.push({
                        date: transaction.date,
                        type: transaction.type.toLowerCase(),
                        category: transaction.category,
                        amount: parseFloat(transaction.amount),
                        description: transaction.description
                    });
                }
            }

            showConfirmModal({
                title: 'Konfirmasi Impor',
                message: `Ditemukan ${transactionsToImport.length} transaksi untuk diimpor. Lanjutkan?`,
                onConfirm: () => {
                    transactionsToImport.forEach(t => saveTransaction(t));
                    document.getElementById('import-csv-modal')?.remove();
                    render();
                }
            });
        };

        reader.readAsText(file);
    }

    window.backupData = backupData;
    function backupData() {
        showSyncStatus('info', 'Fitur backup ke cloud akan segera tersedia!');
    }

    window.exportAllData = exportAllData;
    function exportAllData() {
        if (appState.user?.role !== 'admin') {
            showSyncStatus('error', 'Akses ditolak. Hanya admin yang dapat mengekspor semua data.');
            return;
        }

        // Get all users dynamically
        const allUsers = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('pin_')) {
                const emailParts = key.replace('pin_', '').split('_');
                if (emailParts.length >= 3) {
                    const reconstructedEmail = emailParts[0] + '@' + emailParts.slice(1, -1).join('.') + '.' + emailParts[emailParts.length - 1];
                    if (!allUsers.includes(reconstructedEmail)) {
                        allUsers.push(reconstructedEmail);
                    }
                }
            }
        }
        const allData = {};

        allUsers.forEach(email => {
            const userId = email.replace(/[@.]/g, '_');
            allData[email] = {
                transactions: JSON.parse(localStorage.getItem(`transactions_${userId}`) || '[]'),
                budgets: JSON.parse(localStorage.getItem(`budgets_${userId}`) || '[]'),
                goals: JSON.parse(localStorage.getItem(`goals_${userId}`) || '[]')
            };
        });

        const exportData = {
            exportDate: new Date().toISOString(),
            exportedBy: appState.user.email,
            users: allData
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `frugal-all-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showSyncStatus('success', 'Semua data sistem berhasil diekspor!');
    }

    // Admin User Management Functions
    window.showAddUserModal = showAddUserModal;
    function showAddUserModal() {
        if (appState.user?.role !== 'admin') {
            showSyncStatus('error', 'Akses ditolak. Hanya admin yang dapat menambah user.');
            return;
        }

        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn">
                <div class="bg-white/95 backdrop-blur-3xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/40 animate-slideUp">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i class="fas fa-user-plus text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">👥 Tambah User Baru</h3>
                        <p class="text-gray-600 text-sm">Buat akun pengguna baru untuk sistem</p>
                    </div>

                    <form onsubmit="handleAddUser(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-3">Email Pengguna</label>
                            <input
                                type="email"
                                id="new-user-email"
                                placeholder="contoh@email.com"
                                class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 font-medium"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-3">PIN Default (6 digit)</label>
                            <input
                                type="password"
                                id="new-user-pin"
                                maxlength="6"
                                pattern="[0-9]{6}"
                                placeholder="000000"
                                value="000000"
                                class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 text-center text-xl tracking-widest font-bold"
                                required
                            />
                            <p class="text-xs text-gray-500 mt-2">User dapat mengubah PIN setelah login pertama</p>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-3">Nama Lengkap (Opsional)</label>
                            <input
                                type="text"
                                id="new-user-name"
                                placeholder="Nama Lengkap"
                                class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 font-medium"
                            />
                        </div>

                        <div class="flex space-x-3">
                            <button
                                type="submit"
                                class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <i class="fas fa-user-plus mr-2"></i>Buat User
                            </button>
                            <button
                                type="button"
                                onclick="this.closest('.fixed').remove()"
                                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-2xl font-semibold transition-all duration-300"
                            >
                                <i class="fas fa-times mr-2"></i>Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('new-user-email').focus();
    }

    window.handleAddUser = handleAddUser;
    async function handleAddUser(event) {
        event.preventDefault();

        const email = document.getElementById('new-user-email').value;
        const pin = document.getElementById('new-user-pin').value;
        const name = document.getElementById('new-user-name').value;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showSyncStatus('error', 'Format email tidak valid!');
            return;
        }

        // Check if user already exists
        const userId = email.replace(/[@.]/g, '_');
        if (localStorage.getItem(`pin_${userId}`)) {
            showSyncStatus('error', 'User dengan email ini sudah ada!');
            return;
        }

        // Validate PIN
        if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
            showSyncStatus('error', 'PIN harus 6 digit angka!');
            return;
        }

        try {
            const hashedPin = await hasher.hashPin(pin, userId); // Hash PIN

            // If Supabase is used, create the user there as well
            if (useSupabase) {
                console.log('➕ Creating user in Supabase...');
                const { data, error } = await api.createUser({
                    id: userId,
                    email: email,
                    name: name || null,
                    pin: hashedPin, // Store hashed PIN in Supabase
                    role: 'user'
                });

                if (error) {
                    console.error('❌ Supabase user creation error:', error);
                    showSyncStatus('error', 'User dibuat lokal, gagal sync ke cloud.');
                } else {
                    console.log('✅ User created in Supabase:', data);
                    showSyncStatus('success', `User ${email} berhasil dibuat & disinkronisasi!`);
                }
            }

            // Close modal and re-render
            event.target.closest('.fixed').remove();
            render(); // Re-render user management page
        } catch (error) {
            console.error('❌ Error creating user:', error);
            showSyncStatus('error', 'Gagal membuat user.');
        }
    }

    window.resetUserPin = resetUserPin;
    async function resetUserPin(email) {
        showConfirmModal({
            title: 'Reset PIN Pengguna?',
            message: `Anda akan mereset PIN untuk pengguna ${email} menjadi "000000".`,
            confirmText: 'Ya, Reset PIN',
            onConfirm: async () => {
                if (appState.user?.role !== 'admin') return;
                const userId = email.replace(/[@.]/g, '_');
                const pin = '000000';

                try {
                    const hashedPin = await hasher.hashPin(pin, userId);

                    if (useSupabase) {
                        const { error } = await api.updateUser(userId, { pin: hashedPin });
                        if (error) throw new Error(error.message);
                    }

                    showSyncStatus('success', `PIN user ${email} berhasil direset ke "000000"`);
                } catch (error) {
                    console.error('Error resetting PIN:', error);
                    showSyncStatus('error', 'Gagal mereset PIN.');
                }
            }
        });
    }

    window.exportUserData = exportUserData;
    function exportUserData(email) {
        if (appState.user?.role !== 'admin') {
            showSyncStatus('error', 'Akses ditolak. Hanya admin yang dapat export data user.');
            return;
        }

        const userId = email.replace(/[@.]/g, '_');
        const userData = {
            email: email,
            transactions: JSON.parse(localStorage.getItem(`transactions_${userId}`) || '[]'),
            budgets: JSON.parse(localStorage.getItem(`budgets_${userId}`) || '[]'),
            goals: JSON.parse(localStorage.getItem(`goals_${userId}`) || '[]'),
            profile: JSON.parse(localStorage.getItem(`profile_${userId}`) || '{}'),
            exportDate: new Date().toISOString(),
            exportedBy: appState.user.email
        };

        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `frugal-user-${email.replace('@', '-').replace('.', '-')}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showSyncStatus('success', `Data user ${email} berhasil diekspor!`);
    }

    window.deleteUser = deleteUser;
    function deleteUser(email) {
        if (appState.user?.role !== 'admin') {
            showSyncStatus('error', 'Akses ditolak. Hanya admin yang dapat menghapus user.');
            return;
        }

        const isAdminUser = email === 'admin@frixsave.com';
        if (isAdminUser) {
            showSyncStatus('error', 'Akun admin utama tidak dapat dihapus!');
            return;
        }

        const isDefaultUser = ['demo@frugal.com', 'user@example.com', 'test@budget.com'].includes(email);
        if (isDefaultUser) {
            showSyncStatus('error', 'User default tidak dapat dihapus!');
            return;
        }

        showConfirmModal({
            title: 'Hapus Pengguna?',
            message: `PERINGATAN!\n\nAnda akan menghapus pengguna ${email} dan SEMUA datanya secara permanen.\n\nTindakan ini tidak dapat dibatalkan.`,
            confirmText: 'Ya, Hapus Pengguna Ini',
            isDestructive: true,
            onConfirm: async () => {
                if (appState.user?.role !== 'admin') return;
                const userId = email.replace(/[@.]/g, '_');

                // Remove user from Supabase
                if (useSupabase) {
                    const { error } = await api.deleteUser(userId);
                    if (error) {
                        console.error('Supabase user deletion error:', error);
                        showSyncStatus('error', 'Gagal hapus user di cloud.');
                        // Note: We don't rollback a delete action.
                    }
                }

                showSyncStatus('success', `User ${email} dan semua datanya berhasil dihapus!`);
                render(); // Refresh the user list
            }
        });
    }

    window.promoteToAdmin = promoteToAdmin;
    async function promoteToAdmin(email) {
        if (appState.user?.role !== 'admin') {
            showSyncStatus('error', 'Akses ditolak. Hanya admin yang dapat melakukan tindakan ini.');
            return;
        }

        if (email === 'admin@frixsave.com') {
            showSyncStatus('info', 'User ini sudah menjadi admin utama.');
            return;
        }

        showConfirmModal({
            title: 'Jadikan Admin?',
            message: `Apakah Anda yakin ingin menjadikan ${email} sebagai admin?\n\nPengguna ini akan memiliki akses penuh ke semua fitur administrasi.`,
            confirmText: 'Ya, Jadikan Admin',
            onConfirm: async () => {
                const userId = email.replace(/[@.]/g, '_');

                if (useSupabase) {
                    console.log(`👑 Promoting user ${email} to admin...`);
                    const { data, error } = await api.updateUser(userId, { role: 'admin' });

                    if (error) {
                        console.error('❌ Supabase role update error:', error);
                        showSyncStatus('error', 'Gagal memperbarui peran pengguna di cloud.');
                    } else {
                        console.log('✅ User role updated in Supabase:', data);
                        showSyncStatus('success', `Peran untuk ${email} berhasil diubah menjadi admin!`);
                        render();
                    }
                } else {
                    showSyncStatus('error', 'Fitur ini memerlukan koneksi Supabase.');
                }
            }
        });
    }

    window.handleManualHash = handleManualHash;
    async function handleManualHash() {
        const emailInput = document.getElementById('manual-hash-email');
        const pinInput = document.getElementById('manual-hash-pin');
        const outputContainer = document.getElementById('manual-hash-output-container');
        const outputElement = document.getElementById('manual-hash-output');

        if (!emailInput || !pinInput || !outputContainer || !outputElement) {
            console.error('Hasher elements not found in the DOM.');
            return;
        }

        const email = emailInput.value.trim();
        const pin = pinInput.value.trim();

        if (!email || !pin) {
            showSyncStatus('error', 'Email dan PIN harus diisi untuk generate hash.');
            return;
        }

        if (pin.length !== 6) {
            showSyncStatus('error', 'PIN harus 6 digit.');
            return;
        }

        try {
            const userId = email.replace(/[@.]/g, '_'); // The salt is the user ID derived from the email
            const hashedPin = await hasher.hashPin(pin, userId);

            outputElement.textContent = hashedPin;
            outputContainer.classList.remove('hidden');

            showSyncStatus('success', 'Hash berhasil digenerate!');
        } catch (error) {
            console.error('Error generating manual hash:', error);
            showSyncStatus('error', 'Gagal generate hash. Lihat konsol.');
        }
    }

    window.copyToClipboard = copyToClipboard;
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showSyncStatus('success', 'Hash disalin ke clipboard!');
        }, () => {
            showSyncStatus('error', 'Gagal menyalin hash.');
        });
    }

    window.viewUserDetails = viewUserDetails;
    async function viewUserDetails(email) {
        // Fetch user details directly from the database view
        const { data: user, error } = await supabase.from('users_with_stats').select('*').eq('email', email).single();

        if (error || !user) {
            showSyncStatus('error', 'Gagal mengambil detail pengguna.');
            console.error("Error fetching user details:", error);
            return;
        }

        // Use the aggregated data from the view
        const totalIncome = user.total_income || 0;
        const totalExpense = user.total_expense || 0;
        const balance = totalIncome - totalExpense;

        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn">
                <div class="bg-white/95 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40 animate-slideUp">
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center shadow-lg">
                                <i class="fas fa-user text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">${email}</h3>
                                <p class="text-gray-600 text-sm">Detail Pengguna & Aktivitas</p>
                            </div>
                        </div>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <!-- User Stats -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-medium text-green-600 mb-1">Total Volume</p>
                                    <p class="text-lg font-bold text-green-700">Rp ${(user.total_volume || 0).toLocaleString('id-ID')}</p>
                                </div>
                                <i class="fas fa-arrow-up text-green-500 text-xl"></i>
                            </div>
                        </div>

                        <div class="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-2xl border border-red-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-medium text-red-600 mb-1">Total Transaksi</p>
                                    <p class="text-lg font-bold text-red-700">${user.transaction_count || 0}</p>
                                </div>
                                <i class="fas fa-arrow-down text-red-500 text-xl"></i>
                            </div>
                        </div>

                        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-medium text-blue-600 mb-1">Bergabung</p>
                                    <p class="text-lg font-bold text-blue-700">${new Date(user.created_at).toLocaleDateString('id-ID')}</p>
                                </div>
                                <i class="fas fa-wallet text-blue-500 text-xl"></i>
                            </div>
                        </div>
                    </div>

                    <!-- User Info -->
                    <div class="bg-gray-50 rounded-2xl p-4 mb-6">
                        <h4 class="font-semibold text-gray-800 mb-3">Informasi Akun</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Email:</span>
                                <span class="font-medium">${email}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">User ID:</span>
                                <span class="font-medium font-mono text-xs">${user.id}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Nama:</span>
                                <span class="font-medium">${user.name || 'Tidak diset'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Keamanan PIN:</span>
                                <span class="font-medium ${user.pin ? 'text-green-600' : 'text-red-600'}">
                                    ${user.pin ? '🔒 Aktif' : '🔓 Tidak aktif'}
                                </span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Mata Uang:</span>
                                <span class="font-medium">${user.currency || 'IDR'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tema:</span>
                                <span class="font-medium capitalize">${user.theme || 'Light'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Activity Summary -->
                    <div class="bg-gray-50 rounded-2xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-3">Ringkasan Aktivitas</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div class="text-center p-3 bg-white rounded-xl">
                                <div class="text-2xl font-bold text-blue-600">${user.transaction_count || 0}</div>
                                <div class="text-gray-600">Transaksi</div>
                            </div>
                            <div class="text-center p-3 bg-white rounded-xl">
                                <div class="text-2xl font-bold text-green-600">${user.budget_count || 0}</div>
                                <div class="text-gray-600">Anggaran</div>
                            </div>
                            <div class="text-center p-3 bg-white rounded-xl">
                                <div class="text-2xl font-bold text-purple-600">${user.goal_count || 0}</div>
                                <div class="text-gray-600">Target</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Transaction search and filter state
    let transactionFilter = 'all';
    let searchQuery = '';

    // Function to render transactions list
    function renderTransactionsList(transactions) {
        if (transactions.length === 0) {
            return `
                <div class="p-8 sm:p-12 text-center">
                    <div class="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-receipt text-3xl text-indigo-400"></i>
                    </div>
                    <h4 class="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Belum Ada Transaksi</h4>
                    <p class="text-gray-500 mb-6 text-sm sm:text-base">Mulai catat transaksi pertama Anda untuk melacak keuangan</p>
                    <button onclick="showQuickAddModal()" class="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                        <i class="fas fa-plus mr-2"></i>Tambah Transaksi Pertama
                    </button>
                </div>
            `;
        }

        return `
            <!-- Mobile Card View -->
            <div class="block sm:hidden">
                <div class="p-4 space-y-4">
                    ${transactions.map(transaction => `
                        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 transaction-item">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-gradient-to-br from-${transaction.type === 'income' ? 'green' : 'red'}-400 to-${transaction.type === 'income' ? 'emerald' : 'rose'}-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <i class="fas fa-${transaction.type === 'income' ? 'arrow-up' : 'arrow-down'} text-white text-sm"></i>
                                    </div>
                                    <div>
                                        <p class="font-semibold text-gray-800 text-sm">${transaction.description}</p>
                                        <p class="text-xs text-gray-500">${new Date(transaction.date).toLocaleDateString('id-ID')}</p>
                                    </div>
                                </div>
                                <div class="flex-shrink-0">
                                    <button
                                        onclick="showEditTransactionModal(${transaction.id})"
                                        class="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-xl transition-all duration-300"
                                    >
                                        <i class="fas fa-edit text-sm"></i>
                                    </button>
                                    <button
                                        onclick="deleteTransaction(${transaction.id})"
                                        class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all duration-300"
                                    >
                                        <i class="fas fa-trash text-sm"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-${transaction.type === 'income' ? 'green' : 'red'}-100 text-${transaction.type === 'income' ? 'green' : 'red'}-800">
                                    ${transaction.category}
                                </span>
                                <span class="text-lg font-bold text-${transaction.type === 'income' ? 'green' : 'red'}-600">
                                    ${transaction.type === 'income' ? '+' : '-'}Rp ${(transaction.amount * 1000).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Desktop Table View -->
            <div class="hidden sm:block p-2">
                <!-- Header -->
                <div class="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div class="col-span-4">Deskripsi</div>
                    <div class="col-span-2">Kategori</div>
                    <div class="col-span-2">Tanggal</div>
                    <div class="col-span-2 text-right">Jumlah</div>
                    <div class="col-span-2 text-center">Aksi</div>
                </div>
                <!-- List -->
                <div class="space-y-2">
                    ${transactions.map(transaction => `
                        <div class="grid grid-cols-12 gap-4 items-center p-4 bg-white/80 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl shadow-md border border-white/30 dark:border-slate-600/50 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all duration-300 group transaction-item">
                            <!-- Deskripsi -->
                            <div class="col-span-4 flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gradient-to-br from-${transaction.type === 'income' ? 'green' : 'red'}-400 to-${transaction.type === 'income' ? 'emerald' : 'rose'}-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <i class="fas fa-${transaction.type === 'income' ? 'arrow-up' : 'arrow-down'} text-white text-sm"></i>
                                </div>
                                <p class="font-semibold text-gray-800 dark:text-gray-100 text-sm truncate" title="${transaction.description}">${transaction.description}</p>
                            </div>
                            <!-- Kategori -->
                            <div class="col-span-2">
                                <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-${transaction.type === 'income' ? 'green' : 'red'}-100 text-${transaction.type === 'income' ? 'green' : 'red'}-800 dark:bg-opacity-20 dark:text-${transaction.type === 'income' ? 'green' : 'red'}-300 shadow-sm">
                                    ${transaction.category}
                                </span>
                            </div>
                            <!-- Tanggal -->
                            <div class="col-span-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                ${new Date(transaction.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                            <!-- Jumlah -->
                            <div class="col-span-2 text-right text-sm font-bold">
                                <span class="text-${transaction.type === 'income' ? 'green' : 'red'}-600 dark:text-${transaction.type === 'income' ? 'green' : 'red'}-400">
                                    ${transaction.type === 'income' ? '+' : '-'}Rp ${(transaction.amount * 1000).toLocaleString('id-ID')}
                                </span>
                            </div>
                            <!-- Aksi -->
                            <td class="col-span-2 text-center">
                                <div class="flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onclick="showEditTransactionModal(${transaction.id})"
                                        class="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-500/20 p-2 rounded-xl transition-all duration-300"
                                        title="Edit Transaksi"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onclick="deleteTransaction(${transaction.id})"
                                        class="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/20 p-2 rounded-xl transition-all duration-300"
                                        title="Hapus Transaksi"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Filter transactions based on search and filter criteria
    function getFilteredTransactions() {
        let filtered = [...appState.transactions];

        // Apply type filter
        if (transactionFilter !== 'all') {
            filtered = filtered.filter(t => t.type === transactionFilter);
        }

        // Apply search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(t => 
                t.description.toLowerCase().includes(query) ||
                t.category.toLowerCase().includes(query) ||
                t.amount.toString().includes(query) ||
                new Date(t.date).toLocaleDateString('id-ID').includes(query)
            );
        }

        return filtered;
    }

    // Update transactions display
    function updateTransactionsDisplay() {
        const container = document.getElementById('transactions-container');
        const resultsInfo = document.getElementById('search-results-info');
        const resultsCount = document.getElementById('results-count');

        if (!container) return;

        const filteredTransactions = getFilteredTransactions();
        container.innerHTML = renderTransactionsList(filteredTransactions);

        // Update search results info and add pagination controls
        if (searchQuery.trim() || transactionFilter !== 'all') {
            const totalTransactions = appState.transactions.length;
            const filteredCount = filteredTransactions.length;

            resultsCount.textContent = `Menampilkan ${filteredCount} dari ${totalTransactions} transaksi`;
            resultsInfo.classList.remove('hidden');
        } else {
            resultsInfo.classList.add('hidden');
        }

        // Append pagination controls
        container.insertAdjacentHTML('beforeend', renderTransactionPaginationControls());
    }

    // Search function
    window.filterTransactions = filterTransactions;
    function filterTransactions() {
        const searchInput = document.getElementById('transaction-search');
        if (searchInput) {
            searchQuery = searchInput.value;
            updateTransactionsDisplay();
        }
    }

    // Set transaction filter
    window.setTransactionFilter = setTransactionFilter;
    function setTransactionFilter(filter) {
        transactionFilter = filter;

        // Update button styles
        const buttons = ['filter-all', 'filter-income', 'filter-expense'];
        buttons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                if (btnId === `filter-${filter}`) {
                    btn.className = 'px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg';
                } else {
                    const baseClass = 'px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-gray-200 text-gray-700';
                    const hoverClass = btnId === 'filter-income' ? 'hover:bg-green-100 hover:text-green-700' :
                                     btnId === 'filter-expense' ? 'hover:bg-red-100 hover:text-red-700' :
                                     'hover:bg-indigo-100 hover:text-indigo-700';
                    btn.className = `${baseClass} ${hoverClass}`;
                }
            }
        });

        updateTransactionsDisplay();
    }

    // Handle date filter change
    window.handleDateFilterChange = handleDateFilterChange;
    async function handleDateFilterChange() {
        const startDate = document.getElementById('start-date-filter').value;
        const endDate = document.getElementById('end-date-filter').value;

        appState.transactionManagement.startDate = startDate;
        appState.transactionManagement.endDate = endDate;
        appState.transactionManagement.currentPage = 1; // Reset to first page

        // Reload data with the new date filters
        await loadUserData();

        // Re-render the page to show the filtered data
        render();
    }

    // Clear all filters
    window.clearTransactionFilters = clearTransactionFilters;
    function clearTransactionFilters() {
        // 1. Reset search query
        const searchInput = document.getElementById('transaction-search');
        if (searchInput) {
            searchInput.value = '';
        }
        searchQuery = '';

        // 2. Reset transaction type filter to 'all'
        setTransactionFilter('all');

        // 3. Reset date inputs and state to the current month
        const startDateInput = document.getElementById('start-date-filter');
        const endDateInput = document.getElementById('end-date-filter');
        const today = new Date(); // Re-declare for this scope
        const endDate = today.toISOString().split('T')[0];
        const startDate = new Date(today);
        startDate.setMonth(startDate.getMonth() - 1);
        const startDateString = startDate.toISOString().split('T')[0];
        
        appState.transactionManagement.startDate = startDateString;
        appState.transactionManagement.endDate = endDate;
        if(startDateInput) startDateInput.value = startDateString;
        if(endDateInput) endDateInput.value = endDate;

        // This will trigger a reload and re-render
        handleDateFilterChange();
    }

    // Sync status notification system
    window.showSyncStatus = showSyncStatus;
    function showSyncStatus(type, message) {
        // Remove existing notifications
        const existing = document.querySelector('.sync-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `sync-notification fixed top-4 right-4 z-50 px-6 py-3 rounded-2xl shadow-xl transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;

        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span class="font-medium text-sm">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Data verification functions
    window.checkDataIntegrity = checkDataIntegrity;
    function checkDataIntegrity() {
        if (!appState.user) return false;

        const userId = appState.user.id;
        const storedTransactions = localStorage.getItem(`transactions_${userId}`);
        const storedBudgets = localStorage.getItem(`budgets_${userId}`);
        const storedGoals = localStorage.getItem(`goals_${userId}`);

        console.log('🔍 Data Integrity Check for user:', userId);
        console.log('📊 Stored Transactions:', storedTransactions ? JSON.parse(storedTransactions).length : 0);
        console.log('💰 Stored Budgets:', storedBudgets ? JSON.parse(storedBudgets).length : 0);
        console.log('🎯 Stored Goals:', storedGoals ? JSON.parse(storedGoals).length : 0);
        console.log('🔄 Current App State:', {
            transactions: appState.transactions.length,
            budgets: appState.budgets.length,
            goals: appState.goals.length
        });

        return {
            transactions: storedTransactions ? JSON.parse(storedTransactions) : [],
            budgets: storedBudgets ? JSON.parse(storedBudgets) : [],
            goals: storedGoals ? JSON.parse(storedGoals) : [],
            receivables: JSON.parse(localStorage.getItem(`receivables_${userId}`) || '[]')
        };
    }

    // Export all localStorage data for debugging
    window.exportDebugData = exportDebugData;
    function exportDebugData() {
        const debugData = {
            currentUser: appState.user,
            appState: {
                transactions: appState.transactions,
                budgets: appState.budgets,
                goals: appState.goals,
                receivables: appState.receivables
            },
            localStorage: {}
        };

        // Get all localStorage data
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            debugData.localStorage[key] = localStorage.getItem(key);
        }

        console.log('🐛 Debug Data Export:', debugData);

        const blob = new Blob([JSON.stringify(debugData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `frugal-debug-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showSyncStatus('success', 'Debug data exported! Check console for details.');
    }

    // Main render function
    function render() {
        const app = document.getElementById('app');

        if (appState.isLoading) {
            app.innerHTML = renderLoadingScreen();
            return;
        }

        if (!useSupabase) {
            app.innerHTML = renderSetupRequiredPage();
            return;
        }

        if (!appState.user) {
            app.innerHTML = renderLoginPage();
        } else {
            app.innerHTML = renderDashboard();
            // Initialize charts if on the reports page
            if (appState.currentPage === 'reports') {
                setTimeout(initReportsCharts, 0); // Use timeout to ensure canvas is in DOM
            }
            // Update transaction list if on that page
            if (appState.currentPage === 'transactions') {
                setTimeout(updateTransactionsDisplay, 0);
            }
        }
    }

    // Additional debug functions
    window.showStorageInfo = showStorageInfo;
    function showStorageInfo() {
        const storageData = {};
        let totalSize = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            const size = new Blob([value]).size;
            storageData[key] = {
                size: size,
                sizeFormatted: (size / 1024).toFixed(2) + ' KB',
                preview: value.length > 100 ? value.substring(0, 100) + '...' : value
            };
            totalSize += size;
        }

        console.log('💾 LocalStorage Info:');
        console.log('📊 Total Size:', (totalSize / 1024).toFixed(2) + ' KB');
        console.log('📁 Items:', localStorage.length);
        console.log('🗂️ Detailed breakdown:', storageData);

        showSyncStatus('info', `Storage: ${(totalSize / 1024).toFixed(2)} KB, ${localStorage.length} items`);
    }

    window.refreshAppData = refreshAppData;
    function refreshAppData() {
        if (!appState.user) {
            showSyncStatus('error', 'Tidak ada user yang login');
            return;
        }

        console.log('🔄 Refreshing app data from localStorage...');

        // Backup current state
        const backup = {
            transactions: [...appState.transactions],
            budgets: [...appState.budgets],
            goals: [...appState.goals],
            receivables: [...appState.receivables]
        };

        // Reload from localStorage
        loadUserData();

        console.log('📊 Data refreshed:');
        console.log('Before:', backup);
        console.log('After:', {
            transactions: appState.transactions,
            budgets: appState.budgets,
            goals: appState.goals,
            receivables: appState.receivables
        });

        // Re-render the page
        render();

        showSyncStatus('success', 'Data berhasil dimuat ulang dari storage');
    }

    // Chart.js initialization
    function initReportsCharts() {
        // Destroy existing charts to prevent memory leaks and rendering issues
        if (window.monthlyTrendChartInstance) window.monthlyTrendChartInstance.destroy();
        if (window.categoryDoughnutChartInstance) window.categoryDoughnutChartInstance.destroy();

        // --- Monthly Trend Chart (Bar Chart) ---
        const trendCtx = document.getElementById('monthlyTrendChart');
        if (trendCtx) {
            const trendData = {};
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
            const today = new Date();
            for (let i = 5; i >= 0; i--) {
                const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                trendData[key] = { label: monthNames[d.getMonth()], income: 0, expense: 0 };
            }
            appState.transactions.forEach(t => {
                const d = new Date(t.date);
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                if (trendData[key]) { trendData[key][t.type] += t.amount; }
            });

            const trendValues = Object.values(trendData);
            const labels = trendValues.map(d => d.label);
            const incomeData = trendValues.map(d => d.income);
            const expenseData = trendValues.map(d => d.expense);

            window.monthlyTrendChartInstance = new Chart(trendCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Pemasukan', data: incomeData, backgroundColor: 'rgba(34, 197, 94, 0.7)', borderColor: 'rgba(22, 163, 74, 1)', borderWidth: 2, borderRadius: 5 },
                        { label: 'Pengeluaran', data: expenseData, backgroundColor: 'rgba(239, 68, 68, 0.7)', borderColor: 'rgba(220, 38, 38, 1)', borderWidth: 2, borderRadius: 5 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, ticks: { callback: value => 'Rp ' + (value * 1000).toLocaleString('id-ID') } } },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: context => `${context.dataset.label}: Rp ${(context.parsed.y * 1000).toLocaleString('id-ID')}`
                            }
                        }
                    }
                }
            });
        }

        // --- Category Doughnut Chart ---
        const categoryCtx = document.getElementById('categoryDoughnutChart');
        if (categoryCtx) {
            const expensesByCategory = {};
            appState.transactions.filter(t => t.type === 'expense').forEach(t => {
                expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
            });
            const topCategories = Object.entries(expensesByCategory).sort(([,a], [,b]) => b - a).slice(0, 5);

            if (topCategories.length > 0) {
                const labels = topCategories.map(([category]) => category);
                const data = topCategories.map(([, amount]) => amount);

                window.categoryDoughnutChartInstance = new Chart(categoryCtx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Pengeluaran',
                            data: data,
                            backgroundColor: [
                                'rgba(59, 130, 246, 0.8)',  // blue-500
                                'rgba(34, 197, 94, 0.8)',   // green-500
                                'rgba(168, 85, 247, 0.8)',  // purple-500
                                'rgba(239, 68, 68, 0.8)',   // red-500
                                'rgba(249, 115, 22, 0.8)'   // orange-500
                            ],
                            borderColor: '#ffffff',
                            borderWidth: 4,
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false, cutout: '60%',
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: context => {
                                        const label = context.label || '';
                                        const value = context.parsed || 0;
                                        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                        return `${label}: Rp ${(value * 1000).toLocaleString('id-ID')} (${percentage}%)`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    // Global debug functions for console access
    window.debugFrugal = {
        checkData: checkDataIntegrity,
        exportDebug: exportDebugData,
        showStorage: showStorageInfo,
        refreshData: refreshAppData,
        getCurrentState: () => ({
            user: appState.user,
            transactions: appState.transactions,
            budgets: appState.budgets,
            goals: appState.goals,
            receivables: appState.receivables
        }),
        getStorageData: (userId) => {
            const id = userId || (appState.user ? appState.user.id : null);
            if (!id) return null;
            return {
                transactions: JSON.parse(localStorage.getItem(`transactions_${id}`) || '[]'),
                budgets: JSON.parse(localStorage.getItem(`budgets_${id}`) || '[]'),
                goals: JSON.parse(localStorage.getItem(`goals_${id}`) || '[]'),
                receivables: JSON.parse(localStorage.getItem(`receivables_${id}`) || '[]'),
            };
        }
    };

    // Initialize app
    async function startApp() {
        // 1. Cek apakah ada sesi user yang tersimpan di localStorage
        const storedUser = localStorage.getItem('frixsave_user');
        if (storedUser) {
            try {
                appState.user = JSON.parse(storedUser);
                console.log('🔄 Melanjutkan sesi untuk user:', appState.user.email);
                
                // Langsung tampilkan loading screen, muat data, lalu render dashboard
                appState.isLoading = true;
                render();
                await loadUserData();
                appState.isLoading = false;
                render();
                return; // Hentikan eksekusi agar tidak menampilkan login page
            } catch (e) {
                console.error('Gagal mem-parse data user, sesi dibersihkan.', e);
                localStorage.removeItem('frixsave_user');
            }
        }

        // 2. Jika tidak ada sesi, jalankan alur normal (tampilkan loading lalu login page)
        appState.isLoading = true;
        render(); // Tampilkan loading screen

        // Tambahkan jeda untuk efek visual
        setTimeout(async () => {
            appState.isLoading = false;
            // Jika Supabase tidak terkonfigurasi, render akan menampilkan halaman setup
            // Jika sudah, render akan menampilkan halaman login
            render();
        }, 1500);
    }

    startApp();

    // Log debug info on startup
    console.log('🚀 Frugal Living App Initialized');
    console.log('🔧 Debug tools available in console: window.debugFrugal');

    // Close user dropdown when clicking outside
    document.addEventListener('click', (event) => {
        const dropdownContainer = document.getElementById('user-dropdown-container');
        if (appState.userDropdownOpen && dropdownContainer && !dropdownContainer.contains(event.target)) {
            appState.userDropdownOpen = false;
            render();
        }
    });
}

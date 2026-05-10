document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const closeSidebar = document.getElementById('closeSidebar');
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const sections = document.querySelectorAll('.content-section');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const updateStatusBtn = document.getElementById('updateStatusBtn');

    // --- Sidebar Toggle (Mobile) ---
    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
    };

    if (hamburger) hamburger.addEventListener('click', toggleSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);

    // --- Section Switching Utility ---
    const showSection = (sectionId) => {
        // Update active nav item
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            }
        });

        // Show active section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        // Close sidebar on mobile after clicking
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger chart animation if dashboard
        if (sectionId === 'dashboard') {
            animateBars();
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const sectionId = item.getAttribute('data-section');
            if (sectionId) {
                e.preventDefault();
                showSection(sectionId);
            }
        });
    });

    // --- Dashboard Specifics ---
    const viewAllOrders = document.querySelector('.view-all');
    if (viewAllOrders) {
        viewAllOrders.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('orders');
        });
    }

    const detailBtns = document.querySelectorAll('.btn-sm');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Opening Order Details: This order contains Fresh Organic Produce from Kisan Market local farmers.');
        });
    });

    // --- Search Functionality (Simulated) ---
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const orderCards = document.querySelectorAll('.order-card');
            orderCards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- Dark Mode ---
    const enableDarkMode = () => {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (darkModeToggle) darkModeToggle.checked = true;
    };

    const disableDarkMode = () => {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (darkModeToggle) darkModeToggle.checked = false;
    };

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode();
    }

    // --- Chat Functionality ---
    const appendMessage = (text, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        
        const now = new Date();
        const timeStr = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
        
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
                <span class="time">${timeStr}</span>
            </div>
        `;
        
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const msg = messageInput.value.trim();
            if (msg) {
                appendMessage(msg, 'sent');
                messageInput.value = '';
                
                // Simulate auto-reply from Kisan Market Support
                setTimeout(() => {
                    const replies = [
                        "I'll be ready for pickup at the main gate.",
                        "Please ensure the organic tomatoes are handled carefully.",
                        "Thank you for the quick delivery!",
                        "Where are you exactly? I'm waiting near the gate."
                    ];
                    const randomReply = replies[Math.floor(Math.random() * replies.length)];
                    appendMessage(randomReply, 'received');
                }, 1500);
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
    }

    // --- Delivery Status Simulation ---
    let statusStep = 1;
    const statusLabels = [
        "Order Received",
        "Picked Up",
        "Out for Delivery",
        "Delivered"
    ];

    if (updateStatusBtn) {
        updateStatusBtn.addEventListener('click', () => {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            if (statusStep < timelineItems.length) {
                const currentItem = timelineItems[statusStep];
                currentItem.classList.add('active');
                timelineItems[statusStep - 1].classList.remove('active');
                timelineItems[statusStep - 1].classList.add('completed');
                
                statusStep++;
                
                if (statusStep < timelineItems.length) {
                    updateStatusBtn.innerText = `Next Step: ${statusLabels[statusStep]}`;
                } else {
                    updateStatusBtn.innerText = "Delivery Completed!";
                    updateStatusBtn.disabled = true;
                    updateStatusBtn.style.opacity = '0.7';
                    alert('Congratulations! Order #KM-1025 has been successfully delivered to the customer.');
                }
            }
        });
    }

    // --- Order Action Buttons ---
    const orderActionBtns = document.querySelectorAll('.order-card .btn');
    orderActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.order-card');
            const orderId = card.querySelector('.order-id').innerText;
            const action = this.innerText;

            if (action === 'Accept') {
                this.innerText = 'Accepted';
                this.style.backgroundColor = '#4a7c59';
                this.style.borderColor = '#4a7c59';
                this.disabled = true;
                alert(`Order ${orderId} Accepted! Please proceed to the warehouse for pickup.`);
            } else if (action === 'Cancel') {
                if (confirm(`Are you sure you want to cancel ${orderId}?`)) {
                    card.style.opacity = '0.5';
                    card.style.pointerEvents = 'none';
                    alert(`Order ${orderId} has been cancelled.`);
                }
            } else if (action === 'Mark Picked Up') {
                this.innerText = 'Picked Up';
                this.className = 'btn btn-success';
                alert(`Order ${orderId} Picked Up! Navigate to the customer's location.`);
            } else if (action === 'Out for Delivery') {
                alert(`Order ${orderId} is now Out for Delivery. Good luck!`);
                showSection('status');
            } else if (action === 'Delivered') {
                card.querySelector('.badge').innerText = 'Delivered';
                card.querySelector('.badge').className = 'badge success';
                this.style.display = 'none';
                alert(`Order ${orderId} marked as Delivered! Well done.`);
            }
        });
    });

    // --- Profile & Settings ---
    const saveProfileBtn = document.querySelector('.profile-form .btn-primary');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            alert('Kisan Market Vendor Profile updated successfully!');
        });
    }

    const editImgBtn = document.querySelector('.edit-img');
    if (editImgBtn) {
        editImgBtn.addEventListener('click', () => {
            alert('Upload feature coming soon! Please select a valid ID proof image.');
        });
    }

    const updatePasswordBtn = document.querySelector('.settings-card .btn-outline-primary');
    if (updatePasswordBtn) {
        updatePasswordBtn.addEventListener('click', () => {
            alert('Password changed successfully. Please login again if required.');
        });
    }

    // --- Map Actions ---
    const mapControls = document.querySelectorAll('.map-controls button');
    mapControls.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Map functionality is restricted to viewing only in this demo.');
        });
    });

    const startNavBtn = document.querySelector('.route-info .btn-primary');
    if (startNavBtn) {
        startNavBtn.addEventListener('click', () => {
            alert('Starting Navigation... Please follow the brown route line to reach Sector 45, Noida.');
        });
    }

    // --- Notification & Logout ---
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout from Kisan Market Vendor Dashboard?')) {
                window.location.href = '../index.html';
            }
        });
    }

    const notificationBell = document.querySelector('.nav-icon');
    if (notificationBell) {
        notificationBell.addEventListener('click', () => {
            showSection('notifications');
        });
    }

    // --- Notification Simulation ---
    const notificationCounter = document.querySelector('.sidebar .badge');
    const navNotificationDot = document.querySelector('.dot');

    const clearNotifications = () => {
        if (notificationCounter) notificationCounter.style.display = 'none';
        if (navNotificationDot) navNotificationDot.style.display = 'none';
    };

    const notiNavItem = document.querySelector('[data-section="notifications"]');
    if (notiNavItem) notiNavItem.addEventListener('click', clearNotifications);

    // --- Progress Animation ---
    const animateBars = () => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const h = bar.getAttribute('style').match(/height:\s*(\d+)%/)[1];
            bar.style.height = '0';
            setTimeout(() => {
                bar.style.height = h + '%';
            }, 100);
        });
    };

    const dashboardNavItem = document.querySelector('[data-section="dashboard"]');
    if (dashboardNavItem) dashboardNavItem.addEventListener('click', animateBars);
    
    // Initial animation
    animateBars();
});

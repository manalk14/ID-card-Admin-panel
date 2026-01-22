// sidebar.js - WORKING VERSION
function enforceLogin() {
    const appId = localStorage.getItem("app_id");
    if (!appId) {
        window.location.replace("login.html");
    }
}

function initializeSidebar() {
    console.log(" Initializing sidebar...");
    
    const currentPage = window.location.pathname.split('/').pop();
    console.log("Current page:", currentPage);
    
    // 1. Highlight all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
            console.log(` Highlighted nav item: ${href}`);
        }
    });
    
    // 2. Initialize collapsible sections
    initializeCollapsibleSections(currentPage);
    
    console.log(" Sidebar initialized successfully");
}

function initializeCollapsibleSections(currentPage) {
    // Find all collapsible headers
    const headers = document.querySelectorAll('.collapsible-header');
    console.log(`Found ${headers.length} collapsible headers`);
    
    headers.forEach(header => {
        const section = header.closest('.collapsible-section');
        if (!section) return;
        
        const content = section.querySelector('.collapsible-content');
        if (!content) return;
        
        // Check if this section should be expanded
        let shouldExpand = false;
        
        // Check all links in this section
        const links = section.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                shouldExpand = true;
                console.log(`📂 Expanding section for: ${currentPage}`);
            }
        });
        
        // Auto-expand if needed
        if (shouldExpand) {
            header.classList.add('active');
            content.classList.add('expanded');
        }
        
        // Setup toggle - replace existing event listener
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        newHeader.addEventListener('click', function() {
            this.classList.toggle('active');
            content.classList.toggle('expanded');
            console.log(`🎯 Toggled collapsible section`);
        });
    });
}

// Make functions available globally
if (typeof window !== 'undefined') {
    window.enforceLogin = enforceLogin;
    window.initializeSidebar = initializeSidebar;
    window.initializeCollapsibleSections = initializeCollapsibleSections;
}

// Auto-enforce login
enforceLogin();
const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
const logoutBtn = document.getElementById('logoutBtn');
const main = document.querySelector('.main');
function closeSidebar(){
  
    if (sidebar) sidebar.classList.remove('open', 'closed');
    if (overlay) overlay.style.display = 'none';
    if (main) main.classList.remove('full');
}

if (openBtn) {
    openBtn.addEventListener('click', () => {
      
        if (window.innerWidth <= 720) {
            if (sidebar) sidebar.classList.add('open');
            if (overlay) overlay.style.display = 'block';
        } 
        else {
            if (main) main.classList.toggle('full');
            if (sidebar) sidebar.classList.toggle('closed');
        }
    });
}

if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {

        window.location.href = 'login.html'; 
    });
}

window.addEventListener('resize', closeSidebar);
function tabClickHandler() {
    const targetId = this.getAttribute('data-tab');
    
    const settingsTabs = document.querySelectorAll('.settings-nav-item');
    const settingsContents = document.querySelectorAll('.setting-tab-content');
    settingsTabs.forEach(t => t.classList.remove('active'));
    settingsContents.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}
function activateSettingsTabs() {
    const settingsNav = document.getElementById('settingsNav');
    const settingsTabs = document.querySelectorAll('.settings-nav-item');
    
    if (settingsNav && settingsTabs.length > 0) {
        settingsTabs.forEach(tab => {
            tab.removeEventListener('click', tabClickHandler); 
            tab.addEventListener('click', tabClickHandler);
        });
        
        const activeContent = document.querySelector('.setting-tab-content.active');
        if (!activeContent) {
            const firstContent = document.querySelector('.setting-tab-content');
            if (firstContent) {
                firstContent.classList.add('active');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', activateSettingsTabs);
window.addEventListener('pageshow', function(event) {
    if (event.persisted) { 
        activateSettingsTabs();
    }
});

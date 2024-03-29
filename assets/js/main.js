const popup = document.getElementById('popup');
const userButton = document.getElementById('user-button');

const formSignInHtml = `
    <div id="form-signin" class="form">
        <span id="close-form" class="fa-solid fa-xmark"></span>

        <h2>Đăng nhập</h2>

        <form action="#">
            <div class="input-box">
                <input type="text" placeholder="Nhập username hoặc email" required>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Nhập mật khẩu" required>
            </div>
            <div class="input-box button">
                <input type="Submit" value="Đăng nhập">
            </div>
            <div class="text">
                <h3>Bạn chưa có tài khoản? 
                    <span id="register-link" class="">Đăng ký ngay</span>
                </h3>
            </div>

            <div class="text mt-3">
                <h3>
                    <a href="">Quên mật khẩu</a>
                </h3>
            </div>
        </form>
    </div>
`;

const formSignUpHtml = `
    <div id="form-signup" class="form">
        <span id="close-form" class="fa-solid fa-xmark"></span>

        <h2>Đăng ký</h2>

        <form action="#">
            <div class="input-box">
                <input type="text" placeholder="Nhập username" required>
            </div>
            <div class="input-box">
                <input type="text" placeholder="Nhập email của bạn" required>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Nhập mật khẩu của bạn" required>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Xác nhận lại mật khẩu" required>
            </div>
            <div class="policy">
                <input type="checkbox" aria-label="checkbox" required>
                <h3 class="mb-0">Tôi đồng ý với mọi <a href="#">điều khoản và điều kiện</a></h3>
            </div>
            <div class="input-box button">
                <input type="Submit" value="Đăng ký ngay">
            </div>
            <div class="text">
                <h3>Bạn đã có tài khoản?
                    <span id="login-link" class="">Đăng nhập</span>
                </h3>
            </div>
        </form>
    </div>
`;

function closePopup(){
    const closeForm = document.getElementById('close-form');

    closeForm.addEventListener('click', function(){
        popup.style.display = 'none';
    });
}

function viewSignUp(){
    popup.innerHTML = formSignUpHtml;
    const loginLink = document.getElementById('login-link');

    loginLink.addEventListener('click', function(){
        viewSignIn();
    });

    closePopup();
}

function viewSignIn(){
    popup.innerHTML = formSignInHtml;
    const registerLink = document.getElementById('register-link');

    registerLink.addEventListener('click', function(){
        viewSignUp();
    });

    closePopup();
}

userButton.addEventListener('click', function(){
    popup.style.display = 'block';
    viewSignIn();
});
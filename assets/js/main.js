const popup = document.getElementById('popup');
const userButton = document.getElementById('user-button');

const formSignInHtml = `
    <div id="form-signin" class="form">
        <span id="close-form" class="fa-solid fa-xmark"></span>

        <h2>Đăng nhập</h2>

        <form id="form-login" action="#" class="mt-4">
            <div class="input-box">
                <span class="label-error"></span>
                <input type="text" placeholder="Nhập username hoặc email" id="account" name="account">
            </div>
            <div class="input-box">
                <span class="label-error"></span>
                <input type="password" placeholder="Nhập mật khẩu" id="password" name="password">
            </div>
            <div class="input-box button">
                <button type="submit">Đăng nhập</button>
            </div>
        </form>

        <div class="text pt-2">
            <h3 class="mb-0">Bạn chưa có tài khoản? 
                <span id="register-link" class="">Đăng ký ngay</span>
            </h3>
        </div>

        <div class="text mt-3">
            <h3 class="mb-0">
                <a href="">Quên mật khẩu</a>
            </h3>
        </div>
    </div>
`;

const formSignUpHtml = `
    <div id="form-signup" class="form">
        <span id="close-form" class="fa-solid fa-xmark"></span>

        <h2>Đăng ký</h2>

        <form id="form-register" action="#" class="mt-4">
            <div class="input-box">
                <span class="label-error"></span>
                <input type="text" placeholder="Nhập username" id="username" name="username">
            </div>
            <div class="input-box">
                <span class="label-error"></span>
                <input type="text" placeholder="Nhập email của bạn" id="email" name="email">
            </div>
            <div class="input-box">
                <span class="label-error"></span>
                <input type="password" placeholder="Nhập mật khẩu của bạn" id="password" name="password">
            </div>
            <div class="input-box">
                <span class="label-error"></span>
                <input type="password" placeholder="Xác nhận lại mật khẩu" id="repeat-password" name="repeat-password">
            </div>
            <div class="policy">
                <input type="checkbox" aria-label="checkbox" name="policy" required>
                <h3 class="mb-0">Tôi đồng ý với mọi <a href="#">điều khoản và điều kiện</a></h3>
            </div>
            <div class="input-box button">
                <button type="submit">Đăng ký ngay</button>
            </div>
        </form>

        <div class="text">
            <h3>Bạn đã có tài khoản?
                <span id="login-link" class="">Đăng nhập</span>
            </h3>
        </div>
    </div>
`;

userButton.addEventListener('click', function(){
    popup.style.display = 'block';
    viewSignIn();
});

function viewSignUp(){
    popup.innerHTML = formSignUpHtml;
    const loginLink = document.getElementById('login-link');

    loginLink.addEventListener('click', function(){
        viewSignIn();
    });

    validateRegister();
    closePopup();
}

function viewSignIn(){
    popup.innerHTML = formSignInHtml;
    const registerLink = document.getElementById('register-link');

    registerLink.addEventListener('click', function(){
        viewSignUp();
    });

    validateLogin();
    closePopup();
}

function closePopup(){
    const closeForm = document.getElementById('close-form');

    closeForm.addEventListener('click', function(){
        popup.innerHTML = '';
        popup.style.display = 'none';
    });
}
  
function validateRegister(){
    // Validate data for register form
    Validator({
        form: 'form-register',
        formInput: '.input-box',
        errorMessage: '.label-error',
        rules: [
            Validator.isRequired('#username', 'Vui lòng nhập tên người dùng!'),
            Validator.isRequired('#email', 'Vui lòng nhập email của bạn!'),
            Validator.isRequired('#password', 'Vui lòng nhập mật khẩu của bạn!'),
            Validator.isRequired('#repeat-password', 'Vui lòng nhập lại mật khẩu của bạn!'),
            Validator.isEmail('#email', 'Vui lòng nhập một email hợp lệ!'),
            Validator.minLength('#password', 8, 'Vui lòng nhập tối thiểu 8 kí tự!'),
            Validator.minLength('#repeat-password', 8, 'Vui lòng nhập tối thiểu 8 kí tự!'),
            Validator.isConfirmed('#repeat-password', '#password', 'Vui lòng nhập lại đúng mật khẩu!')
        ],
        onSubmit: function(data){
            const user = {
                username: data['username'],
                email: data['email'],
                password: data['password']
            };

            alert('Register success!');
			console.log(user);
            // Register when validate success here
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(email);
}

function validateLogin(){
    // Validate data for login form
    Validator({
        form: 'form-login',
        formInput: '.input-box',
        errorMessage: '.label-error',
        rules: [
            Validator.isRequired('#account', 'Vui lòng nhập username hoặc email!'),
            Validator.isRequired('#password', 'Vui lòng nhập mật khẩu của bạn!'),
            Validator.minLength('#password', 8, 'Vui lòng nhập tối thiểu 8 kí tự!'),
        ],
        onSubmit: function(data){
            let account = data['account'];
            let user = {
                password: data['password']
            }

            if (isValidEmail(account)){
                user.email = account;       // Login with email
            } else {
                user.username = account;    // Login with username
            }

			alert('Login success!');
            console.log(user);
            // Login when validate success here
        }
    });
}
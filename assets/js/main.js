const popup = document.getElementById('popup');
const userButton = document.getElementById('user-button');

const formSignInHtml = `
    <div id="form-signin" class="form">
        <span id="close-form" class="fa-solid fa-xmark"></span>

        <h2>Đăng nhập</h2>

        <form action="#" class="mt-4">
            <div class="input-box">
                <span class="label-error"></span>
                <input type="text" placeholder="Nhập username hoặc email">
            </div>
            <div class="input-box">
                <span class="label-error"></span>
                <input type="password" placeholder="Nhập mật khẩu">
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
            <div class="text">
                <h3>Bạn đã có tài khoản?
                    <span id="login-link" class="">Đăng nhập</span>
                </h3>
            </div>
        </form>
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

    closePopup();
}

function closePopup(){
    const closeForm = document.getElementById('close-form');

    closeForm.addEventListener('click', function(){
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
            }

			// register(user);   // Register when validate success 
        }
    });
}

function register(user) {
	
    fetch('/bookstore/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
}
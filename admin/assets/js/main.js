
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

            window.location.href = 'dashboard.html';
			alert('Login success!');
        }
    });
}

validateLogin();
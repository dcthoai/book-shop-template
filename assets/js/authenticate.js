
function validateRegister(){

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

            console.log(user);
			register();   // Register when validate success 
        }
    });
}

function validateLogin(){

    Validator({
        form: 'form-login',
        formInput: '.input-box',
        errorMessage: '.label-error',
        rules: [
            Validator.isRequired('#username', 'Vui lòng nhập username hoặc email!'),
            Validator.isRequired('#password', 'Vui lòng nhập mật khẩu của bạn!'),
            Validator.minLength('#password', 8, 'Vui lòng nhập tối thiểu 8 kí tự!'),
        ],
        onSubmit: function(data){
            let user = {
				username: data['username'],
                password: data['password']
            }
        
            console.log(user);
			login();
        }
    });
}

function register(){
    closePopup();
    openLoadingAnimation();

    setTimeout(function(){
        closeLoadingAnimation();
        changeToLogin();
        openPopupNotify('Đăng ký thành công!', 'Đăng nhập để trải nghiệm ngay nào.', 'success');
    }, 2000);
}

function login(){
    closePopup();
    openLoadingAnimation();

    setTimeout(function(){
        closeLoadingAnimation();
        setLoginState();
        setViewsByAuthenticationState();

        openPopupNotify('Đăng nhập thành công', 
                        'Chào mừng bạn đến với Bookstore, chúc bạn có một trải nghiệm thật tốt với dịch vụ của chúng tôi.', 
                        'success');
    }, 2000);
}

function logout(){
    openLoadingAnimation();

    setTimeout(function(){
        closeLoadingAnimation();
        setLogoutState();
        setViewsByAuthenticationState();

        openPopupNotify('Đăng xuất thành công!', 
                        'Rất tiếc khi bạn rời đi, nếu có gì không hài lòng vui lòng cho chúng tôi biết hoặc liên hệ trợ giúp để được hướng dẫn.', 
                        'success');
    }, 2000);
}

function welcomeWebsite(){
	const currentState = getAuthenticationSate();
    const welcomeStatus = sessionStorage.getItem('welcomeStatus');

    if (welcomeStatus !== 'true') {
        if (currentState) {
            openPopupNotify('Hello', 
            				'Rất vui khi bạn quay lại, cùng nhau mua sắm sách thỏa thích nào.', 'notify');
        } else {
            openPopupNotify('Chào mừng bạn đến với BookStore', 
            				'Hãy đăng nhập để sử dụng đầy đủ tiện ích của chúng tôi.', 'notify');
        }
        sessionStorage.setItem('welcomeStatus', 'true');
    }
}

openLoadingAnimation();

document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){
        setViewsByAuthenticationState();
        closeLoadingAnimation();
        welcomeWebsite();
    }, 500);
})
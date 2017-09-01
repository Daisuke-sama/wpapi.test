(function ($) {

    const RESTROOT = 'https://' + window.location.host + '/wp-json';
    const $ENTRYTITLE = $('.post-title');
    const $LOGIN = $('#loginform');
    const $LOGOUT = $('#logout');

    $LOGIN.toggle();

    $('#login_button').click(function (e) {
        e.preventDefault();
        let $uname = $('#user_login').val();
        let $upwd = $('#user_pass').val();
        login($uname, $upwd);
    });

    $('#logout').click(logout);


    function login(username, password) {
        $.ajax({
            url: RESTROOT + '/jwt-auth/v1/token',
            method: 'POST',
            data: {
                'username': username,
                'password': password
            }
        })
            .done(function (response) {
                sessionStorage.setItem('theToken', response.token);
                $LOGIN.toggle();
                $LOGOUT.toggle();
            })
            .fail(function (response) {
                console.error("REST error.");
            })
    }

    function logout() {
        sessionStorage.clear();
        $LOGIN.toggle();
        $LOGOUT.toggle();
    }

})(jQuery);

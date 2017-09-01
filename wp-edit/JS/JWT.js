(function ($) {

    /**
     * Variables section
     */

    const RESTROOT = 'https://' + window.location.host + '/wp-json';
    const $THETITLE = $('.post-title');
    const $LOGIN = $('#loginform');
    const $LOGOUT = $('#logout');

    var theToken = sessionStorage.getItem('theToken');

    /**
     * Tuning section
     */

    $('#login_button').click(function (e) {
        e.preventDefault();
        let $uname = $('#user_login').val();
        let $upwd = $('#user_pass').val();
        login($uname, $upwd);
    });

    $('#logout').click(logout);

    if (theToken === null) {
        $LOGIN.toggle();
    } else {
        $LOGOUT.toggle();
        editPostTitle();
    }


    /**
     * Functions section
     */

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

                editPostTitle();
            })
            .fail(function (response) {
                console.error("REST error.");
            })
    }

    function logout() {
        sessionStorage.clear();
        $LOGIN.toggle();
        $LOGOUT.toggle();
        $('.edit-button').remove();
    }

    function editPostTitle() {
        $THETITLE.after('<button class="edit-button edit">Edit Title</button>'
            + '<button class="edit-button save" style="display: none;">Save title</button>');


        $('.edit-button.edit').click(function () {
            let $currentTitle = $THETITLE.text();
            $THETITLE.toggle();
            $THETITLE.after('<input id="edit-title-input">');
            $('#edit-title-input').val($currentTitle);
            $(this).toggle();
            $('.edit-button.save').toggle();
        });

        $('.edit-button.save').click(function () {
            let $postID = $('.post').attr('data-id');
            let $newTitle = $('#edit-title-input').val();

            saveToDb($postID, $newTitle);
        });
    }

    function saveToDb(postID, newTitle) {
        $.ajax({
            url: RESTROOT + '/wp/v2/posts/' + postID,
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('theToken'));
            },
            data: {
                title: newTitle
            }
        }).done(function (response) {
            console.log(response);
            $('#edit-title-input').toggle();
            $THETITLE.text(newTitle).toggle();
            $('.navigation-list a[data-id="' + postID + '"]').text(newTitle);
            $('.edit-button.edit').toggle();
            $('.edit-button.save').toggle();
        }).fail(function (response) {
            console.log(response);
        })
    }

})(jQuery);

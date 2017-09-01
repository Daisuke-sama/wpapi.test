// Based on https://github.com/andreassolberg/jso/tree/version3

var ROOT = 'https://' + window.location.host;
const RESTROOT = ROOT + '/wp-json';
const $THETITLE = $('.post-title');

var jso = new JSO({
    providerID: "wpapi.test",
    client_id: "ROKiusVWdXTqiUfYLleTpJZKFHqIGp",
    redirect_uri: "https://wpapi.test/wp-oaedit/",
    authorization: ROOT + '/wp-content/plugins/miniorange-oauth-20-server/web/moserver/authorize'
});

// Catch the response after login
jso.callback();

var token = localStorage.getItem('tokens-wpapi.test');

// Create the login button:
$('.site-branding').after('<button id="login" class="login-button login">Login</button>');

// Send POST request to the REST API via AJAX:
function runAjax(postID, newTitle) {

    JSO.enablejQuery();
    jso.ajax({
        url: RESTROOT + '/wp/v2/posts/' + postID,
        method: 'POST',
        data: {
            'title': newTitle
        }
    })

        .done(function (response) {
            console.log(response);
            $('#edit-title-input').toggle();
            $THETITLE.text(newTitle).toggle();
            $('.navigation-list a[data-id="' + postID + '"]').text(newTitle);
            $('.edit-button.edit').toggle();
            $('.edit-button.save').toggle();
        })

        .fail(function (response) {
            $('#edit-title-input').toggle();
            $THETITLE.toggle();
            $('.edit-button.save').toggle();
            $THETITLE.after('<aside class="error" style="background-color: #8b0000; color: white;">Something went wrong.');
        });
}

// Enable editing via the REST API:
function enableEditor() {
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


function oauthLogin() {
    jso.getToken();
}

// Wipe sessionStorage and tokens on logout:
function oauthLogout() {
    jso.wipeTokens();
    $('.edit-button.edit').toggle();
}


$('#login').click(function () {
    console.info("click");
    if ($(this).hasClass("login")) {
        oauthLogin();
    } else {
        $(this).text("Log in").removeClass("logout").addClass("login");
        oauthLogout();
    }
});


(function () {
    if ( token !== null ) {
        $('#login').text("Log out").removeClass("login").addClass("logout");
        enableEditor();
    }
})();
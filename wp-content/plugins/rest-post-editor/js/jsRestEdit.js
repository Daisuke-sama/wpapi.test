(function ($) {

    const $THETITLE = $('.entry-title');

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
        let $newTitle = $('#edit-title-input').toggle().val();
        $THETITLE.text($newTitle);
        $THETITLE.toggle();
        $(this).toggle();
        $('.edit-button.edit').toggle();

        saveToDb($newTitle);
    });

    function saveToDb(newTitle) {
        $.ajax({
            url: postRest.rootUrl + 'wp/v2/posts/' + postRest.postID,
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', postRest.nonce);
            },
            data: {
                title: newTitle
            }
        }).done(function (response) {
            console.log(response);
        }).fail(function (response) {
            console.log(response);
        })
    }

})(jQuery);
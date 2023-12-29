$(document).ready(function () {
    $('.toggle-password').on('click', function () {
        var passwordField = $(this).prev('input');
        var fieldType = passwordField.attr('type');

        if (fieldType === 'password') {
            passwordField.attr('type', 'text');
        } else {
            passwordField.attr('type', 'password');
        }
    });
});

const createErrorNotification = require('base/components/errorNotification');

/**
 * Add a callback function to handle the reCAPTCHA token .
 * @param {String} token The given reCAPTCHA token
 */
function onSubmitHandleToken(token) {
    const form = $('form.js-registration-form');
    const submitBtn = form.find('.js-registration-submit-btn');
    const verifyUrl = submitBtn.data('verify-url');

    form.spinner().start();

    $.ajax({
        url: verifyUrl,
        type: 'post',
        dataType: 'json',
        data: { token },
        success: function (data) {
            form.spinner().stop();

            if (!data.success) {
                createErrorNotification($('.error-messaging'), data.errorMessage);
            } else {
                form.trigger('submit');
            }
        },
        error: function (err) {
            form.spinner().stop();
            createErrorNotification($('.error-messaging'), err.responseJSON.errorMessage);
        },
    });
}

window.onSubmitHandleToken = onSubmitHandleToken;


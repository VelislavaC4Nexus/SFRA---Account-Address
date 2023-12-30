$(document).ready(function () {
    $('.company-name-vat').hide();
    $('input[type="radio"]').change(function () {
        if ($(this).val() === 'Business Address') {
            $('.company-name-vat').show(); 
            $('.privateAddress-radion-button').prop('checked', false);
        } else {
            $('.company-name-vat').hide(); 
            $('.businessAddress-radion-button').prop('checked', false);
        }
    });
});
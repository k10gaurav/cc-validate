$(function() {
	$("#status").css("visibility:hidden");

    var owner = $('#owner');
    var cardNumber = $('#cardNumber');
    var cardNumberField = $('#card-number-field');
    var CVV = $("#cvv");
    var mastercard = $("#mastercard");
    var confirmButton = $('#confirm-purchase');
    var visa = $("#visa");
    var amex = $("#amex");

    // Use the payform library to format and validate
    // the payment fields.

    cardNumber.payform('formatCardNumber');
    CVV.payform('formatCardCVC');


    cardNumber.keyup(function() {

        amex.removeClass('transparent');
        visa.removeClass('transparent');
        mastercard.removeClass('transparent');

        if ($.payform.validateCardNumber(cardNumber.val()) == false) {
            cardNumberField.addClass('has-error');
        } else {
            cardNumberField.removeClass('has-error');
            cardNumberField.addClass('has-success');
        }

        if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
            mastercard.addClass('transparent');
            amex.addClass('transparent');
        } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
            mastercard.addClass('transparent');
            visa.addClass('transparent');
        } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
            amex.addClass('transparent');
            visa.addClass('transparent');
        }
    });

    confirmButton.click(function(e) {
		$("#status").css("visibility:visible");
		$("#status").removeClass('status-ok');
		$("#status").removeClass('status-fail');
		
        e.preventDefault();
			
        var isCardValid = $.payform.validateCardNumber(cardNumber.val());
        var isCvvValid = $.payform.validateCardCVC(CVV.val());
		
        if(owner.val().length < 5){
            //alert("Wrong owner name");
			$("#status").addClass("status-fail").html("Wrong owner name");
        } else if (!isCardValid) {
            //alert("Wrong card number");
			$("#status").addClass("status-fail").html("Wrong card number");
        } else if (!isCvvValid) {
            //alert("Wrong CVV");
			$("#status").addClass("status-fail").html("Wrong CVV");
        } else {
            // Everything is correct. Add your form submission code here.
            //alert("Everything is correct");
			$("#status").addClass("status-ok").html("Congrats! Everything is correct");
        }
    });
});

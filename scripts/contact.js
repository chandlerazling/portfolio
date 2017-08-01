   $("#send-message").click(function() {        
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var phone = $("#phone").val();
        $("#return-message").empty();
        if (name == '' || email == '' || message == '') {
            alert("Please fill the required fields");
            if (name == '') {
                $("#name").css({border:"1px solid #EA4136"});
            }
            if (email == '') {
                $("#email").css({border:"1px solid #EA4136"});
            }
            if (message == '') {
                $("#message").css({border:"1px solid #EA4136"});
            } 
        } else {
            $.post("scripts/mail.php", {
                name1: name,
                email1: email,
                phone1: phone,
                message1: message,
            }, function(data) {
            $("#return-message").append(data); 
            if (data == "Your message has been sent! I will get back to you as soon as I can.") {
                $("#contact-form").hide();
                $("#contact")[0].reset();
            } else {
                $("#email").css({border:'1px solid #EA4136'});
            }
        })
        }});
$('textarea').on('input', function(e) {
    $(this).css({border: '1px solid #3a4a46'});
});

$('input').on('input', function(e) {
   $(this).css({border: '1px solid #3a4a46'});
})
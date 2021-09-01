$(document).ready(function () {

    $("#forgotP").click(function() {
        $("#errorMsg").text("ID = 'user', password = 'password'");
    });

    $("#submit").click(function () {
        window.localStorage.setItem("userID", $("#userID").val());
        $.ajax({
            url: "/authenticate",
            type: "POST",
            dataType: "JSON",
            data: {
                userID: $("#userID").val(),
                password: $("#password").val()
            },
            success: function (data) {
                if (data['status'] == "success") {
                    // redirect
                    window.location.replace("/display-main");
                } else {
                    // show error message
                    $("#errorMsg").html(data['msg']);
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("body").text(jqXHR.statusText);
            }
        });

    });

});
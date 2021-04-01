(function ($) {
    'use strict';

    console.log("In serve");

    $.ajax({
        url: "http://localhost:8080/api/branches",
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            // console.log(result);
            // var text= '<option disabled="disabled" selected="selected">Choose branch</option>';
            var text = '';
            $.each(result, function(key, val){
                text+="<option value="+val.id+">"+val.name+"</option>";
                });
            $("#branch_select").html(text);
        }
    })

    
    $.ajax({
        url: "http://localhost:8080/api/departments",
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            // console.log(result);
            var text= '<option disabled="disabled" selected="selected">Choose department</option>';

            $.each(result, function(key, val){
                text+="<option value="+val.id+">"+val.name+"</option>";
                });
            $("#dept").html(text);
        }
    })

   $("form").submit(function(e) {
       e.preventDefault();//prevent the form from actually submitting
        // window.location = 'yourpath';
       console.log("Submit");
       console.log($("form").serialize());
       $.ajax({
            type: 'POST',
            url: "http://localhost:8080/api/members",
            data: $("form").serialize(),
            dataType: 'json',
            success: function(response) {
                console.log(response)
                // window.location.href = "http://www.google.com";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 500) {
                    console.log('Internal error: ' + jqXHR.responseText);
                } else {
                    console.log('Unexpected error.');
                }
            }
        });
        return false;
    });


    $('#form').validate({
        rules: {
            fname: "required",
            lname: "required",
            street: "required",
            city: "required",
            state: "required",
            country: "required",
            email: "required",
            phone: "required"

        },
        messages: {
            fname: "Please enter first name",
            lname: "Please enter last name",
            bday: "Please enter birthday",
            street: "Please enter home address",
            city: "Please enter city",
            state: "Please enter state",
            country: "Please enter country",
            email: "Please enter email",
            phone: "Please enter phone number"

        },
        submitHandler: function(form) {
            // e.preventDefault();
            form.submit();
        }

        // any other options and/or rules
    });
    
})(jQuery);
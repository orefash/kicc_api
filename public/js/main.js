(function ($) {
    'use strict';
    $("#givno").hide();
    $("#bptd").hide();
    $("#lst").hide();
    $("#dpt").hide();
    $("#anniversary_div").hide();

    
    $("input[name='mstatus']").click(function() {
       
        var test = $(this).val();

        console.log(test);

        if(test == "married"){
            $("#anniversary_div").show();
        }else{
            
            $("#anniversary_div").hide();
        }
    }); 

    $("input[name='gno']").click(function() {
       
        var test = $(this).val();

        console.log(test);

        if(test == "yes"){
            $("#givno").show();
        }else{
            
            $("#givno").hide();
        }
    }); 

    $("input[name='baptized']").click(function() {
       
        var test = $(this).val();

        console.log(test);

        if(test == "0"){
            $("#bptd").show();
        }else{
            
            $("#bptd").hide();
        }
    }); 
    
    $("input[name='stw']").click(function() {
       
        var test = $(this).val();

        console.log(test);

        if(test == "no"){
            $("#lst").show();
            $("#dpt").hide();
        }else{
            
            $("#dpt").show();
            $("#lst").hide();
        }
    }); 
    
    $("input[name='stew']").click(function() {
       
        var test = $(this).val();

        console.log(test);

        if(test == "no"){
            $("#dpt").hide();
        }else{
            
            $("#dpt").show();
            // $("#lst").hide();
        }
    }); 

})(jQuery);
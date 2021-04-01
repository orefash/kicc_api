(function ($) {
    'use strict';
    $("#givno").hide();
    $("#bptd").hide();
    $("#lst").hide();
    $("#dpt").hide();

    $("input[name='gno']").click(function() {
       
        var test = $(this).val();

        console.log(test);

        if(test == "yes"){
            $("#givno").show();
        }else{
            
            $("#givno").hide();
        }
    }); 

    $("input[name='bpt']").click(function() {
       
        var test = $(this).val();

        console.log(test);

        if(test == "no"){
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
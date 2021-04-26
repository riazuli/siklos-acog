(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        // Sliders
        $(".slides").owlCarousel({
            loop: true,
            items: 1,
            margin: 10,
            dots: true,
            nav: false,
            autoHeight: true
        });

        var owl = $(".owl-carousel");
        owl.owlCarousel();
        // Go to the next item
        $(".customNextBtn").click(function () {
            owl.trigger("next.owl.carousel");
            setTimeout(function(){ $(window).scrollTop(0); }, 100);
        });
        // Go to the previous item
        $(".customPrevBtn").click(function () {
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            owl.trigger("prev.owl.carousel");//owl.trigger("prev.owl.carousel", [300]);
            setTimeout(function(){ $(window).scrollTop(0); }, 100);
            
        });

        //infolettre form
        $(".infolettre").submit(function (e) {
            e.preventDefault();
            var formId = $(this).attr("id");

            var email = $("#"+formId+" input[name=email]").val();
            
            if(email == ""){
                $("#"+formId+" .champ-erreur").removeClass("d-none");
                return;
            }

            var formData = {
                email: email,
            };

            var reponseSucces = function (data) {
                $("#"+formId+" input[name=email]").val("");
                $(".subcription-box .success-text").show();
                $(".subcription-box h4").hide();
                $("#"+formId).hide();
            };
            var functionErreur = function (data) {
            };

            connexionAjax(URL_EMAIL, "POST", formData, reponseSucces, false, functionErreur);
        });

        //sign form
        $("#signpost").submit(function (e) {
            e.preventDefault();
            var formId = "signpost";

            var name = $("#"+formId+" input[name=name]").val();
            var email = $("#"+formId+" input[name=email]").val();
            var tel = $("#"+formId+" input[name=phone]").val();
            
            if(name == "" || email == "" || tel == ""){
                $("#"+formId+" .champ-erreur").removeClass("d-none");
                return;
            }

            var formData = {
                name: name,
                email: email,
                tel: tel,
            };

            $("#contact_confirmation").modal("show");

            var reponseSucces = function (data) {
                $("#"+formId+" input[name=name]").val("");
                $("#"+formId+" input[name=email]").val("");
                $("#"+formId+" input[name=phone]").val("");
                $(".subcription-box .success-text").show();
                $("#"+formId).hide();
            };
            var functionErreur = function (data) {
            };

            connexionAjax(URL_SIGNUP, "POST", formData, reponseSucces, false, functionErreur);
        });
    });
})(jQuery);

//Begin : ISI Function
$(window).scroll(function () {
    var elementPos = $("#ISIarea").offset().top;
    var elementHeight = $("#fixedISI").height();
    var windowHeight = $(window).height();
    var windowPos = $(window).scrollTop();
    if (windowHeight + windowPos > elementPos + (elementHeight + 20)) {
        $("#fixedISI").addClass("no-sticky");
    } else {
        $("#fixedISI").removeClass("no-sticky");
    }
});

var URL_EMAIL  = "http://ec2-34-223-107-197.us-west-2.compute.amazonaws.com/Siklos/public/api/infolettre";
var URL_SIGNUP = "http://ec2-34-223-107-197.us-west-2.compute.amazonaws.com/Siklos/public/api/signpost";
//var URL_EMAIL  = "http://siklos-logic.local/api/infolettre";
//var URL_SIGNUP = "http://siklos-logic.local/api/signpost";

function connexionAjax(
        url,
        methode,
        donnees,
        functionSucces,
        async = false,
        functionErreur
        ) {
    $.ajax({
        headers: {},
        url: url,
        type: methode,
        crossDomain: true,
        data: donnees,
        dataType: "json",
        success: function (data) {
            console.log(data);
            functionSucces(data);
        },
        error: function (request, status, error) {
            console.log(request.responseText);
            functionErreur(request);
        },
    });
}

$(document).ready(function() {


    // console.log($(window).width());
    // console.log($(window).height());

    //Enable Popup Fancybox
    $('.fancybox').fancybox();

    var video = $(".fancybox");
    video[0].click();




    //Load images svgs until 6 elements
    loadImages(Vicky.countItems, Vicky.countItems + 6);

    //Enable elements drag
    dragElement(true);
    resize();
    PositionIcon();

    $(window).resize(function() {
        //Move button photo
        resize();
        PositionIcon();
    });


    $("#buttonFacebook").click(function() {
        window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent("http://www.caudillosdemexico.com"));
    });
    $("#buttonTwitter").click(function() {
        window.open("https://twitter.com/share?text=Pon a prueba tus conocimientos con Banco Azteca.&url=" + encodeURIComponent("http://caudillosdemexico.com"));
    });

    // Events DOM
    $("#btnImagen").on("click", function() {
        $("#fileU").click();
    });

    $("#captura").on("click", function() {
        capturarPantalla();
    });

    $("#fileU").on("change", function(evt) {
        var files = evt.target.files; // FileList object

        // Get file image  "file".
        for (var i = 0, f; f = files[i]; i++) {
            //Only images.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            reader.onload = (function(theFile) {
                return function(e) {
                    // Add image to div
                    document.getElementById("imagenDif").innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                };
            })(f);

            reader.readAsDataURL(f);
        }

    });

    $("#refresh").on("click", function() {

        $("#element img.draggable-ofrenda").remove();
        $("#imagenDif").empty();

    });

    $("#replay").on("click", function() {
        var video = $(".fancybox");
        video[0].click();
    });

    $("#ocultarMenu").on("click", function() {
        $(".decoraciones").animate({
            left: '-100px'
        });
        $("#mostrarMenu").fadeIn("slow");
    });

    $("#mostrarMenu").on("click", function() {
        $("#mostrarMenu").fadeOut("slow");
        $(".decoraciones").animate({
            left: '0px'
        });
    });

    $("#mas").on("click", function() {
        loadImages(Vicky.countItems, Vicky.countItems + 6);
    });

    $("#menos").on("click", function() {
        loadImages(Vicky.countItems, Vicky.countItems - 12);
    });

    $(".droppable-ofrenda").droppable({
        drop: function(event, ui) {
            // console.log("Drop IN");
            if (!ui.helper.hasClass("inOfrenda")) {

                $(ui.helper[0]).clone().addClass("inOfrenda").appendTo(this.parentElement);
            }

        },
        out: function(event, ui) {
            $(this).removeClass("ui-state-highlight");
            $(this).find("p").html("Selecciona!");
            // console.log("Drop OUT");
        }
    });

    $(".droppable-basura").droppable({
        activeClass: "animBasura",
        hoverClass: "wobble-vertical",
        drop: function(event, ui) {
            // console.log("Drop BASURA");
            ui.draggable.fadeOut(1500);
            setTimeout(function() {
                ui.draggable.remove();
            }, 1500);

        },
        out: function(event, ui) {
            $(this).removeClass("ui-state-highlight");
            $(this).find("p").html("Selecciona!");
            // console.log("Drop OUT");
        }
    });
    // function for enable drag elements
    function dragElement(isClone) {

        if (isClone) {

            $(".draggable-ofrenda").draggable({
                helper: "clone",
                containment: "window",
                start: function(event, ui) {

                },
                stop: function(event, ui) {
                    newId = 10;
                    //$(this).clone().attr('id', this.id).appendTo(this.parentElement);

                    dragElement(false);
                }
            });

        } else {

            $(".draggable-ofrenda").draggable({
                containment: "window",
                start: function(event, ui) {

                },
                stop: function(event, ui) {
                    newId = 10;
                    //$(this).clone().attr('id', this.id).appendTo(this.parentElement);

                    dragElement(false);
                }
            });

        }

    }

});





// function for load images in the tool bar
function loadImages(vinit, vfinal) {

    $("ul.listaDrag li").css("display", "none");

    if (vfinal == -5) {
        vinit = 30;
        vfinal = 19;
    }
    if (vfinal == -11) {
        vinit = 25;
        vfinal = 13;
    }

    if (vfinal > vinit) {
        for (vinit; vinit < vfinal; vinit++) {
            $("#r" + vinit).css("display", "inline");
        }
        Vicky.countItems = Vicky.countItems + 6;
    } else {
        for (vfinal; vfinal < (vinit - 6); vfinal++) {
            $("#r" + vfinal).css("display", "inline");
        }
        Vicky.countItems = Vicky.countItems - 6;
    }

    // $("#ratras").css("display", "block");
    $("#rmas").css("display", "inline");
    $("#rmenos").css("display", "inline");
    $("#btnGuardar").css("display", "inline");
    $("#btnbasura").css("display", "inline");




    if (Vicky.countItems > 22) {
        Vicky.countItems = 1;
    } else if (Vicky.countItems < 0) {
        Vicky.countItems = 19;
    }

}

// function preload() {

//     Vicky.imagesHeroes[preload.arguments[0]][(i - 1)] = new Image()
//     Vicky.imagesHeroes[preload.arguments[0]][(i - 1)].src = "images/heroes/" + preload.arguments[1] + "" + i + ".png"
//     Vicky.imagesHeroes[preload.arguments[0]][(i - 1)].width = "150";
//     Vicky.imagesHeroes[preload.arguments[0]][(i - 1)].id = "heroe";


// }

// function for move image button 
function resize() {
    var ancho = $(window).width();
    var alto = $(window).height();

    var centro = ancho / 2;
    var centroAlto = alto / 2;

    var centroX = $(".ofrenda").width();
    var centroY = $("#ofrendaPrincipal").height();

    var porcentaje = centroY * 11.2 / 100;

    $("#btnImagen").css("margin-left", (centroX / 2) - 30);
    $("#btnImagen").css("margin-top", "5%");

    $("#imagenDif").css("margin-left", (centroX / 2) - 40);
    $("#imagenDif").css("margin-top", porcentaje + "px");

    if (ancho < 1024) {
        // $("#ofrendaPrincipal").attr("width", ancho);
        $(".droppable-ofrenda").css("width", ancho);
        $(".decoraciones").css("width", ancho);
        $(".decoraciones table").css("width", ancho);
    } else {
        $(".droppable-ofrenda").css("width", "1024");
        $(".decoraciones").css("width", "1024");
        $(".decoraciones table").css("width", "1024");
    }

    // if (ancho < 800) {
    //     $("#ofrendaPrincipal").attr("src", "images/mobiles_ofrenda.jpg");
    // } else {
    //     $("#ofrendaPrincipal").attr("src", "images/ofreda_SIN.jpg");
    // }

}

// function for image capture 
function capturarPantalla() {
    html2canvas($("#element"), {
        logging: false,
        onrendered: function(canvas) {
            var img = canvas.toDataURL()
            var adown = $("#imagenDow").attr("href", img);
            adown[0].click();
        }
    });
}

function PositionIcon() {
    var position = ($(window).width() - $("#ofrendaPrincipal").width()) / 2;
    if (position > 0) {
        $("#iconleft").css("left", parseInt(position) - 40 + "px");
        $("#iconright").css("right", parseInt(position) + "px");
    } else {
        $("#iconleft").css("left", "5px");
        $("#iconright").css("right", "5px");
    }
}
/*

***************************************
*                                     *
*          Vicky FRAMEWORK          *
*                                     *
***************************************

*/


///Objeto principal del Framework codename: "Vicky".
var Vicky = {};

Vicky.countItems = 1;



///Método que cifra la cadena proporcionada en Base64
Vicky.CifraBase64 = function (cadena) {
    return btoa(cadena);
}
///Método que descifra la cadena proporcionada en Base64
///Devuelve un objeto indicando si ocurrió algún Error, la Excepcion que se disparó, así como la CadenaDescifrada.
Vicky.DescifraBase64 = function (cadena) {
    var cadenaDescifrada = "";
    var error = false;
    var excepcion;
    try {
        cadenaDescifrada = atob(cadena.replace("%2b/g", "+"));
    } catch (ex) {
        error = true;
        excepcion = ex;
    }

    return { Cadena: cadenaDescifrada, Error: error, Excepcion: excepcion };
}

///Método que deserializa los parámetros de la URL en un objeto
Vicky.QueryString = function () {
    var query = window.location.search.substring(1);
    return Vicky.DescifraQueryString(query);
};

///Método que deserializa los parámetros de una cadena en un objeto
Vicky.DescifraQueryString = function (query) {
    var query_string = {};
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
};


///Método que devuelve la cadena en formato #,### del número indicado
Vicky.FormatoMiles = function (numero) {
    if (numero == null) {
        return "0";
    } else {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

///Obtiene la variable GET seleccionada como parametro.
Vicky.RequestGET = function (Parametro) {
    var URLPagina = window.location.search.substring(1);
    var GETVars = URLPagina.split('&');
    for (var i = 0; i < GETVars.length; i++) {
        var sParameterName = GETVars[i].split('=');
        if (sParameterName[0] == Parametro) {
            return sParameterName[1];
        }
    }
}

///Método que consume un servicio REST
///Recibe un objeto cuyos miembros son:
///     uri,
///     [method]->default = "GET",
///     [(Object)data]->default = null,
///     [async]->default = true,
///     (function)callback
Vicky.Ajax = function (params) {
    var uri = params.uri;
    var method = params.method;
    var data = params.data;
    var async = params.async;
    var callback = params.callback;

    if (typeof (callback) == "undefined") {
        callback({ Error: true, MensajeError: "No ha indicado la Callback", Resultado: null });
        //console.log(e.message);
    }

    if (typeof (uri) == "undefined") {
        callback({ Error: true, MensajeError: "No ha indicado el URI", Resultado: null });
        //console.log(e.message);
    }

    if (typeof (method) == "undefined") {
        method = "GET";
    }

    if (typeof (async) == "undefined") {
        async = true;
    }

    if (typeof (data) != "undefined") {
        data = JSON.stringify(data);
    }

    $.ajax({
        type: method,
        url: uri,
        data: data,
        async: async,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            callback({ Error: false, MensajeError: "", Resultado: result });
        },
        error: function (e) {
            callback({ Error: true, MensajeError: e.message, Resultado: null });
            //console.log(e.message);
        }
    });
}





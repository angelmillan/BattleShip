/*jslint browser:true, devel:true */
/*global $:false */

// JSON con los barcos
var barcos = null;

// variable para almacenar el tablero de juego
// la matriz del tablero
var tablero = null;
var filas = 10;
var columnas = 10;

/**
 * Esta función responde al evento "ready" y carga la 
 * configuración inicial de mi APP. Si no hay configuración,
 * cargamos una configuración por defecto.
*/
$(document).ready(function(){
    //¿hay localStorage disponible? (almacenamos la conf. ahí)
    if (typeof(Storage) !== "undefined") {
        barcos = JSON.parse(localStorage.getItem("barcos"));
        
        if (barcos === null) {
            barcos = [
                {tam:2, letra:'f', nombre:'fragata'},
                {tam:3, letra:'b', nombre:'buque'},
                {tam:3, letra:'s', nombre:'submarino'},
                {tam:4, letra:'d', nombre:'destructor'},
                {tam:5, letra:'p', nombre:'portaaviones'},
            ];            localStorage.setItem("barcos",JSON.stringify(barcos));
        }
        
        filas = parseInt(localStorage.getItem("filas"));
        columnas = parseInt(localStorage.getItem("columnas"));
        
        if (isNaN(filas) || isNaN(columnas)) {
            filas = 10;
            columnas = 10;
            localStorage.setItem("filas",10);
            localStorage.setItem("columnas",10);
        }
        
    } else { 
        // NO hay localStorage, no podemos guardar 
        // conf. ni información de las partidas (puntuaciones)
        console.log("No tenemos LocalStorage");
    }
});

/**
    Esta función crea una matriz (en JS es un 
    Array de Arrays)
*/
function crearMatriz (fil, col) {
    var matriz = new Array(fil);
    
    for(var i=0; i<fil; i++){
        matriz[i] = new Array(col);
        
    }
        
    return matriz;
}

/**
    Esta función crea una matriz RELLENA (en JS es un 
    Array de Arrays) CODIGO ÓPTIMO -AVANZADO-
*/
function crearMatrizRellena (fil, col,relleno) {
    var matriz = new Array(fil);
    
    for(var i=0; i<fil; i++){
        matriz[i] = new Array(col);
        for (var j=0; j<col; j++){
            matriz[i][j]=relleno;
        }
    }
        
    return matriz;
}


/** 
* Rellenamos con datos cada uno de los elementos
* de la matriz que se le pasa como paŕametro
*/

function inicializaMatriz(dato, matriz){
    for (var i = 0; i<matriz.length; i++){
        for(var j = 0; j<matriz[i].length; j++)
            matriz[i][j]=dato;
    }
}

/**
* Vuelca el contenido de la matriz a consola
*/

function matriz2console(matriz){
    var aux;
    
    for (var i=0;i<matriz.length;i++){
        aux="";
        for (var j=0; j<matriz[i].length;j++) {
            aux+=matriz[i][j]+'\t';
        }
        console.log(aux);
    }
            
}

/**
    Devuelve un numero aleatorio desde 0 hasta tamaño - 1.
    Será usado dos veces para el valor de la fila y de la columna
*/
function dado(tamanio){
    var aleatorio;
        aleatorio = Math.floor(Math.random() * (tamanio));        
    return aleatorio;
}

/**
    Devuelve 0 o 1 para horizontal o vertical
*/
function moneda(){    
    return dado(2);
}


/**
* Codificación para el tablero:
* a = agua
* s = submarino (3)
* f = fragata (2)
* p = portaaviones (5)
* d = destructor (4)
* b = buque (3)
*/
function colocarBarcos(matriz){
    //Compruebo que haya más de ocho filas y que la primera fila(igual a las demás) sean más de 8 columnas.
    var fila, col, i, j;
    for (i=0; i<barcos.length;i++){
        var barco = barcos[i];
        var libre;
        do { 
            // intento colocar el barco hasta 
            // que encuentro espacio libre para él
            libre=true;
            var direccion = moneda();
            if (direccion===0) { // horizontal 
                fila = dado(matriz.length);
                col = dado(matriz[fila].length-barco.tam);
                for (j=0; j<barco.tam;j++){
                    if(matriz[fila][j+col]!='a') {
                        libre=false;
                    }
                }
                if (libre) {
                   for (j=0; j<barco.tam;j++){
                        matriz[fila][j+col]=barco.letra;
                   }
                }
            } else { // vertical
                fila = dado(matriz.length-barco.tam);
                col = dado(matriz[fila].length);
                for (j=0; j<barco.tam;j++){
                    if(matriz[j+fila][col]!='a') {
                        libre=false;
                    }
                }
                if (libre) {
                   for (j=0; j<barco.tam;j++){
                        matriz[j+fila][col]=barco.letra;
                   }
                }
            }
        } while (!libre);
    }
    
}

function generarTablero(){
    var html = '<TABLE>';
    for (var i = 0; i<filas; i++){
        html = html + '<TR>';
        for (var j = 0; j < columnas ; j++){
            html += '<TD id="celda_'+i+'_'+j+'" class="vacio" onclick=disparo("celda_'+i+'_'+j+'",'+i+','+j+')></TD>';
        }
        html += '</TR>';
    }
    html += '</TABLE>';
    document.getElementById("partida").innerHTML = html;
    //

function generarTableroJQ(){
    var tabla = $("<table/>");
        for (var i = 0; i<filas; i++){
            var tr = $("<tr/>");
            for (var j = 0; j<columnas; j++){
                var td= $("<td id='celda_"+i+"_"+j+"'/>");
                td.bind("onclick",disparo);
                td.addClass("vacio");
                tr.append(td);
            }
            tabla.append(tr);
        }
        $("#partida").append(tabla);
    }
    
}    
/**

*/
function crearPartida(){
    // crear una matriz de fil x col
    tablero = crearMatriz(filas,columnas);
    // rellenar la matriz "a"
    inicializaMatriz('a',tablero);
    colocarBarcos(tablero);
    // volcar la matriz a consola
    matriz2console(tablero);
    generarTablero();
}


function disparo(celda,i,j){
    //alert (celda);
    //tablero[i][j]= tablero[i][j].toUpperCase;
    
    switch (tablero[i][j]){
        case 'a':
            tablero[i][j]='A';
            $("#"+celda).removeClass('vacio');
            $("#"+celda).addClass('agua');                        
            break;
        case 'b':
            tablero[i][j]='B';
            $("#"+celda).removeClass('vacio');
            $("#"+celda).addClass('buque');                        
            break;
        case 'p':
            tablero[i][j] = 'P';
            $("#"+celda).removeClass('vacio');
            $("#"+celda).addClass('portaaviones');
            break;
        case 'f':
            tablero[i][j] = 'F';
            $("#"+celda).removeClass('vacio');
            $("#"+celda).addClass('fragata');
            break;
        case 's':
            tablero[i][j] = 'S';
            $("#"+celda).removeClass('vacio');
            $("#"+celda).addClass('submarino');
            break;
        case 'd':
            tablero[i][j] = 'D';
            $("#"+celda).removeClass('vacio');
            $("#"+celda).addClass('destructor');
            break;    
        default:
            break; 
        
    }

}



    
    
    
    
    
    
    
    
    
    
        
/*jslint devel:true */

// JSON con los barcos
// posteriormente lo almacenamos en localStorage
var barcos = [
    {'f':2},
    {'s':3},
    {'b':3},
    {'d':4},
    {'p':5}
];

// variable para almacenar el tablero de juego
// la matriz del tablero
var tablero = null;

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
    if(matriz.length < 8 || matriz[0].length < 8){
        return null;
    }
    
}

    
/**

*/
function crearPartida(fil,col){
    // crear una matriz de fil x col
    tablero = crearMatriz(fil,col);
    // rellenar la matriz "a"
    inicializaMatriz('a',tablero);
    // volcar la matriz a consola
    matriz2console(tablero);
}



    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

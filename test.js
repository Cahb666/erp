 "use strict";

 var sh= new StoreHouse.getInstance();
console.log("Almacen 'sh' creado");
console.log("Nombre de Almacen: "+(sh.name='StoreHouse'));


 var Televisores=new Category("Televisores");
 var Ordenadores=new Category("Ordenadores");
 var SmartPhone=new Category("SmartPhone");
 console.log ("*------Añadimos las categorias------*");
 console.log("Categoria 'Televisores' añadida a almacen sh, Categorias="+sh.addCategory(Televisores));
 console.log("Categoria 'Ordenadores' añadido a almacen sh, Categorias="+sh.addCategory(Ordenadores));
 console.log("Categoria 'SmartPhone' añadido a almacen sh, Categorias="+sh.addCategory(SmartPhone));
 
 function showCategories(){
    //Recorremos las categorías.
    console.log ("*------Recorremos las categorias------*");
    var categories = sh.categories;
    var category = categories.next();
    while (category.done !== true){
        console.log ("Categoria: " + category.value.name);		
        category = categories.next();
    }		
}
showCategories();


var tienda1= new Shop("A12345678","Tienda 1","C/Falsa Nº123","963852741");
var tienda2= new Shop("B12345678","Tienda Dos","C/Arriba Nº24","963852741");
var tienda3= new Shop("C12345678","Tienda T3","C/Abajo Nº35","963852741");
console.log ("*------Añadimos las Tiendas------*");


function showShops(){
   //Recorremos los Tiendas.
    console.log ("*------Recorremos las Tiendas------*");
    var shops = sh.shops;
    var shop = shops.next();
    while (shop.done !== true){
        //Author: nickname
        console.log ("Tienda: " + shop.value.name);
        shop = shops.next();
    }	
}
showShops();



//Productos
var tv1= new TV("lg43p21","TV LG 43","297","21");
var pc1= new PC("a10708g","ASUS 1070 8G","629","21");
var sp1= new SP("ix133321","IPHONE X","1333","21");
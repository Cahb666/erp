"use strict";

// Objeto Coords
function Coords(latitude = 0, longitude = 0){
	if (!(this instanceof Coords)) 
		throw new InvalidAccessConstructorException();

	latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
	if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
		throw new InvalidValueException("latitude", latitude);
	longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
	if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
		throw new InvalidValueException("longitude", longitude);

	var _latitude = latitude;
	var _longitude = longitude;

	Object.defineProperty(this, 'latitude', {
		get:function(){
			return _latitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -90 || value > 90) 
				throw new InvalidValueException("latitude", value);
			_latitude = value;
		}		
	});		

	Object.defineProperty(this, 'longitude', {
		get:function(){
			return _longitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -180 || value > 180) 
				throw new InvalidValueException("latitude", value);
			_longitude = value;
		}		
	});		

}
Coords.prototype = {};
Coords.prototype.constructor = Coords;

Coords.prototype.getSexagesimalLatitude = function (){	
	var direction = this.latitude >= 0 ? "N" : "S";
	var latitude = Math.abs(this.latitude);
	var grades =  Math.floor (latitude);
	var tmpMinutes = (latitude - grades) * 60;
	var minutes = Math.floor (tmpMinutes);
	var tmpSeconds = (tmpMinutes - minutes) * 60;
	var seconds = Math.round (tmpSeconds);

	return grades + "°" + minutes + "'" + seconds + "''" + direction; 
}

Coords.prototype.getSexagesimalLongitude = function (){	
	var direction = this.longitude >= 0 ? "E" : "W";
	var longitude = Math.abs(this.longitude);
	var grades =  Math.floor (longitude);
	var tmpMinutes = (longitude - grades) * 60;
	var minutes = Math.floor (tmpMinutes);
	var tmpSeconds = (tmpMinutes - minutes) * 60;
	var seconds = Math.round (tmpSeconds);

	return grades + "°" + minutes + "'" + seconds + "''" + direction; 
}












/*--------------------------------------------------------------------------------------------*/
// Objeto Shop

function Shop(cif, name, direccion, tlf){
	if (!(this instanceof Shop)) 
		throw new InvalidAccessConstructorException();
	
	cif = cif.trim();
	name = name.trim();
//	direccion = direccion.trim();
//	tlf = tlf.trim();

	var _cif = cif;
	var _name = name;
	var _direccion = direccion;
	var _tlf = tlf;

	Object.defineProperty(this, 'cif', {
		get:function(){
			return _cif;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("cif");
			_cif = value;
		}		
	});	

	Object.defineProperty(this, 'name', {
		get:function(){
			return _name;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("name");
			_name = value;
		}		
	});		

	Object.defineProperty(this, 'direccion', {
		get:function(){
			return _direccion;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("direccion");
			_direccion = value;
		}		
	});		
	
	Object.defineProperty(this, 'tlf', {
		get:function(){
			return _tlf;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("tlf");
			_tlf = value;
		}		
	});	


	var _coords = null;
	Object.defineProperty(this, 'coords', {
		get:function(){
			return _coords;
		},
		set:function(value){
			if (value === 'undefined' || value == null) throw new EmptyValueException("coords");	
			if (!value instanceof Coords) throw new InvalidValueException("coords", value);		
			_coords = value;
		}		
	});	

				
}
Shop.prototype = {};
Shop.prototype.constructor = Shop;

Shop.prototype.toString = function (){	
	return "Shop: " + this.name + "; Direccion: " + this.direccion + "; Tlf: "+this.tlf; 
}









/*--------------------------------------------------------------------------------------------*/

//Objeto Product. abstracto
function Product(SN, name, price, tax){

	if (!(this instanceof Product)) 
		throw new InvalidAccessConstructorException();

    if ((this.constructor === Product)) {
        throw new AbstractClassException("Product");
    }

	SN = SN.trim();
	name = name.trim();
	price = price.trim();
	tax = tax.trim();

	var _SN = SN;
	var _name = name;
	var _description = "";
	var _price = price;
	var _tax = tax;
	
	Object.defineProperty(this, 'SN', {
		get:function(){
			return _SN;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("SN");
			_SN = value;
		}		
	});		

	Object.defineProperty(this, 'name', {
		get:function(){
			return _name;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("name");
			_name = value;
		}		
	});	
	

	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			if (value === 'undefined') throw new EmptyValueException("description");	
			_description = value;
		}		
	});		
	
	Object.defineProperty(this, 'price', {
		get:function(){
			return _price;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("price");
			_price = value;
		}		
	});	

	Object.defineProperty(this, 'tax', {
		get:function(){
			return _tax;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("tax");
			_tax = value;
		}		
	});	
	

}
Product.prototype = {};
Product.prototype.constructor = Product;

Product.prototype.toString = function (){	
	return this.constructor.name + ": " + this.name + " price:" + this.price + "€ "; 
}


/*--------------------------------------------------------------------------------------------*/


// Objeto TV hereda de Product
function TV(SN, name, price, tax){
	//Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
	Product.call(this,SN, name, price, tax);	
}
TV.prototype = Object.create(Product.prototype);
TV.prototype.constructor = TV;

// Objeto PC hereda de Product
function PC(SN, name, price, tax){
	//Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
	Product.call(this,SN, name, price, tax);	
}
PC.prototype = Object.create(Product.prototype);
PC.prototype.constructor = PC;

// Objeto SP hereda de Product
function SP(SN, name, price, tax){
	//Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
	Product.call(this,SN, name, price, tax);	
}
SP.prototype = Object.create(Product.prototype);
SP.prototype.constructor = SP;






/*--------------------------------------------------------------------------------------------*/

//Objeto Category
function Category(name = "Anon"){

	if (!(this instanceof Category)) 
		throw new InvalidAccessConstructorException();

	name = name.trim();
	if (name === 'undefined' || name === 'Anon') throw new EmptyValueException("name");					

	var _name = name;	
	var _description = "";

	Object.defineProperty(this, 'name', {
		get:function(){
			return _name;
		},
		set:function(name = "Anonimous"){
			name = name.trim();
			if (name === 'undefined' || name === 'Anon') throw new EmptyValueException("name");					
			_name = name;
		}		
	});		
	
	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			if (value === 'undefined') throw new EmptyValueException("description");	
			_description = value;
		}		
	});				

}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function (){	
	return "Category: " + this.name + " (" + this.description + ")"; 
}

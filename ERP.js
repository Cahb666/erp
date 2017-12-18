"use strict";
//Objeto StoreHouse

function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error: Product Manger Generic Exception.";
}
StoreHouseException.prototype = new BaseException(); 													//Hereda de BaseException
StoreHouseException.prototype.constructor = StoreHouseException;

function ShopStoreHouseException() {
	this.name = "ShopStoreHouseException";
	this.message = "Error: The method needs a Shop parameter.";
}
ShopStoreHouseException.prototype = new StoreHouseException(); 											//Hereda de StoreHouseException
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

function ShopExistsStoreHouseException() {
	this.name = "ShopExistsStoreHouseException";
	this.message = "Error: The shop exists in the product manager.";
}
ShopExistsStoreHouseException.prototype = new StoreHouseException(); 									//Hereda de StoreHouseException
ShopExistsStoreHouseException.prototype.constructor = ShopExistsStoreHouseException;

function ShopNotExistsStoreHouseException() {
	this.name = "ShopNotExistsStoreHouseException";
	this.message = "Error: The shop doesn't exist in the product manager.";
}
ShopNotExistsStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
ShopNotExistsStoreHouseException.prototype.constructor = ShopNotExistsStoreHouseException;

function DefaultShopStoreHouseException() {
	this.name = "DefaultShopStoreHouseException";
	this.message = "Error: The deafult shop can't be removed.";
}
DefaultShopStoreHouseException.prototype = new StoreHouseException(); 									//Hereda de StoreHouseException
DefaultShopStoreHouseException.prototype.constructor = DefaultShopStoreHouseException;

function CategoryStoreHouseException() {
	this.name = "CategoryStoreHouseException";
	this.message = "Error: The method needs a Category parameter.";
}
CategoryStoreHouseException.prototype = new StoreHouseException(); 										//Hereda de StoreHouseException
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

function CategoryExistsStoreHouseException() {
	this.name = "CategoryExistsStoreHouseException";
	this.message = "Error: The category exists in the product manager.";
}
CategoryExistsStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
CategoryExistsStoreHouseException.prototype.constructor = CategoryExistsStoreHouseException;

function CategoryNotExistsStoreHouseException() {
	this.name = "CategoryNotExistsStoreHouseException";
	this.message = "Error: The category doesn't exist in the product manager.";
}
CategoryNotExistsStoreHouseException.prototype = new StoreHouseException(); 							//Hereda de StoreHouseException
CategoryNotExistsStoreHouseException.prototype.constructor = CategoryNotExistsStoreHouseException;

function DefaultCategoryStoreHouseException() {
	this.name = "DefaultCategoryStoreHouseException";
	this.message = "Error: The deafult category can't be removed.";
}
DefaultCategoryStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
DefaultCategoryStoreHouseException.prototype.constructor = DefaultCategoryStoreHouseException;

function ProductStoreHouseException() {
	this.name = "ProductStoreHouseException";
	this.message = "Error: The method needs a Product parameter.";
}
ProductStoreHouseException.prototype = new StoreHouseException(); 										//Hereda de StoreHouseException
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

function ProductExistsStoreHouseException(category) {
	this.name = "ProductExistsStoreHouseException";
	this.message = "Error: The product exists in the category '" + category.name + "'.";
}
ProductExistsStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
ProductExistsStoreHouseException.prototype.constructor = ProductExistsStoreHouseException;

function ProductNotExistsStoreHouseException(category) {
	var cat = (!category) ? '' : category.name;
	this.name = "ProductNotExistsStoreHouseException";
	this.message = "Error: The product doesn't exist in the category '" + cat + "'.";
}
ProductNotExistsStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
ProductNotExistsStoreHouseException.prototype.constructor = ProductNotExistsStoreHouseException;

var StoreHouse = (function () { 																		//La funcion anonima devuelve un metodo getInstance que permite obtener el objeto unico
	
	var instantiated; 																					//Objeto con la instancia unica StoreHouse

	function init() { 																					//Inicializacion del Singleton

		function StoreHouse(){																			//Declaracion de la funcion constructora de la instancia StoreHouse
			if (!(this instanceof StoreHouse)) 
				throw new InvalidAccessConstructorException();

			/*--------------------------------------------------------------------------------------------*/ 

			//Nombre Almacen
			var _name = "Anonimous";
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

			/*--------------------------------------------------------------------------------------------*/ 

			//Tiendas
			var _shops = [];
			//Iterator de Tiendas
			Object.defineProperty(this, 'shops', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _shops.length ?
				               {value: _shops[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				}	
			});	

			//Añade Tienda
			this.addShop = function(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException ();
				}		
				var position = getShopPosition(shop); 	
				if (position === -1){
					_shops.push(shop);
				} else{
					throw new ShopExistsStoreHouseException();
				}	

				return _shops.length;
			}

			//Elimina Tienda
			this.removeShop = function(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException ();
				}		
				var position = getShopPosition(shop); 	
				if (position !== -1){
					if (shop.nickname !== _defaultShop.nickname){
						_shops.splice(position, 1);
					} else{
						throw new DefaultShopStoreHouseException();
					}															
				} else{
					throw new ShopNotExistsStoreHouseException();
				}	
				return _shops.length;
			}

			//Posicion de la Tienda en el Array
			function getShopPosition(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException ();
				}		

				function compareElements(element) {
				  return (element.nickname === shop.nickname)
				}
				
				return _shops.findIndex(compareElements);		
			}

			//Tienda por defecto
			var _defaultShop = new Shop("x12345678","Default Shop"); //Tienda por defecto
			this.addShop(_defaultShop);

			Object.defineProperty(this, 'defaultShop', {
				get:function(){
					return _defaultShop;
				}	
			});	

			/*--------------------------------------------------------------------------------------------*/ 

			//Categorias
			var _categories = []; 

			//Iterator de Categorias
			Object.defineProperty(this, 'categories', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _categories.length ?
				               {value: _categories[nextIndex++].category, done: false} :
				               {done: true};
				       }
				    }
				}	
			});	

			//Añade Categoria
			this.addCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		
				var position = getCategoryPosition(category); 	
				if (position === -1){
					_categories.push(
						{
							category: category,
							products:[]
						}
					);
				} else{
					throw new CategoryExistsStoreHouseException();
				}	

				return _categories.length;
			}

			//Elimina Categoria
			this.removeCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		
				var position = getCategoryPosition(category); 	
				if (position !== -1){
					if (category.name !== _defaultCategory.name){
						_categories.splice(position, 1);
					} else{
						throw new DefaultCategoryStoreHouseException();
					}					
				} else{
					throw new CategoryNotExistsStoreHouseException();
				}	
				return _categories.length;
			}

			//Posicion de la Categoria en el Array
			function getCategoryPosition(category){
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		

				function compareElements(element) {
				  return (element.category.name === category.name)
				}
				
				return _categories.findIndex(compareElements);		
			}

			//Categoria por defecto
			var _defaultCategory = new Category ("Default Category"); //Categoría por defecto
			this.addCategory(_defaultCategory);

			Object.defineProperty(this, 'defaultCategory', {
				get:function(){
					return _defaultCategory;
				}	
			});	

			/*--------------------------------------------------------------------------------------------*/ 

			//Añade un nuevo Producto a una Categoria con una Tienda. Tiene en cuenta Tienda y Categorias por defecto
			this.addProduct = function(product, category, shop){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}	
				if (category === null || category === 'undefined' || category === ''){
					category = this.defaultCategory;
				}	
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		
				if (shop === null || shop === 'undefined' || shop === ''){
					shop = this.defaultShop;
				}	
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException ();
				}		

				//Obtenemos posicion de la Categoria, si no existe se añade
				var categoryPosition = getCategoryPosition(category); 
				if (categoryPosition === -1){
					categoryPosition = this.addCategory(category)-1;
				}	

				//Obtenemos posicion de la Tienda, si no existe se añade
				var shopPosition = getShopPosition(shop); 
				if (shopPosition === -1){
					shopPosition = this.addShop(shop)-1;
				}

				//Obtenemos posicion del Producto en la Categoria, si no existe se añade y si existe se lanza excepcion
				var productPosition = getProductPosition(product, _categories[categoryPosition].products); 	
				if (productPosition === -1){
					_categories[categoryPosition].products.push(
						{
							product: product,
							shop: _shops[shopPosition].nickname
						}
					);
				} else{
					throw new ProductExistsStoreHouseException(category);
				}	

				return _categories[categoryPosition].products.length;
			}

			//Dado un Producto devuelve su posicion en la Categoria
			function getProductPosition(product, categoryProducts){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}		

				function compareElements(element) {
				  return (element.product.url === product.url)
				}
				
				return categoryProducts.findIndex(compareElements);		
			}

			//Elimina un Producto de una Categoria
			this.removeProductCategory = function(product, category){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}						
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		

				var categoryPosition = getCategoryPosition(category); 	
				if (categoryPosition !== -1){
					var productPosition = getProductPosition(product, _categories[categoryPosition].products); 	
					if (productPosition !== -1){
						_categories[categoryPosition].products.splice(productPosition, 1);
					} else{
						throw new ProductNotExistsStoreHouseException(category);
					}	
				} else{
					throw new CategoryNotExistsStoreHouseException();
				}	
				return _categories[categoryPosition].products.length; 
			}

			//Elimina Producto
			this.removeProduct = function(product){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}				

				var i = _categories.length - 1, position = -1;
				while (i >= 0 && position === -1){					
					position = getProductPosition(product, _categories[i].products); 
					i--;
				}		

				if (position !== -1){
					_categories[i+1].products.splice(position, 1);
				} else {
					throw new ProductNotExistsStoreHouseException();
				}
			}

			//Devuelve todos los Prpductos de una determinada Categoria
			this.getCategoryProducts = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		

				var categoryPosition = getCategoryPosition(category); 	
				if (categoryPosition === -1) throw new CategoryNotExistsStoreHouseException();
				var nextIndex = 0;
			    return {
			       next: function(){
			           return nextIndex < _categories[categoryPosition].products.length ?
			               {value: _categories[categoryPosition].products[nextIndex++].product, done: false} :
			               {done: true};
			       }
			    }
			}

			//Devuelve todos los Productos de una determinada Tienda
			this.getShopProducts = function(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException ();
				}		
				var shopPosition = getShopPosition(shop);  	
				if (shopPosition === -1) throw new ShopNotExistsStoreHouseException();
				var categoryPosition = 0;
				var productPosition = 0;

			    return {
			       next: function(){	
			       		var product = null;
			       		while (categoryPosition < _categories.length && product === null){
			       			if (productPosition < _categories[categoryPosition].products.length &&
			       				_categories[categoryPosition].products[productPosition].shop === shop.nickname){
			       				product = _categories[categoryPosition].products[productPosition].product;
			       			}
			       			productPosition++;
			       			if (productPosition >= _categories[categoryPosition].products.length){
			       				productPosition = 0;
			       				categoryPosition++;
			       			}
			       		}
			       		if (product !== null){
			       			return {value: product, done: false}
			       		}
			       		if (categoryPosition >= _categories.length) return {done: true};
			       }
			    }
			}

			//Devuelve todos los Productos de una determinada Categoria para una Tienda determinada
			this.getCategoryShopProducts = function(category, shop){
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException ();
				}		
				var categoryPosition = getCategoryPosition(category); 	
				if (categoryPosition === -1) throw new CategoryNotExistsStoreHouseException();
				var nextIndex = 0;
			    return {
			       next: function(){
			       		var product = null;
			       		while (nextIndex < _categories[categoryPosition].products.length && product === null){
			       			if (_categories[categoryPosition].products[nextIndex].shop === shop.nickname){
			       				product = _categories[categoryPosition].products[nextIndex].product;
			       			}
			       			nextIndex++;
			       		}
			       		if (product !== null){
			       			return {value: product, done: false}
			       		}
			       		if (nextIndex >= _categories[categoryPosition].products.length) return {done: true};
			       }
			    }
			}

		

		} //Fin constructor StoreHouse
		StoreHouse.prototype = {}; 
		StoreHouse.prototype.constructor = StoreHouse;

		var instance = new StoreHouse();//Devolvemos el objeto StoreHouse para que sea una instancia única.
		Object.freeze(instance);
		return instance;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () { 
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();
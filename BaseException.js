function BaseException() {																				//Excepcion BASE
}
BaseException.prototype = new Error(); 																	//Hereda del objeto Error
BaseException.prototype.constructor = BaseException; 													//Constructor
BaseException.prototype.toString = function(){															//Sobrescribimos el metodo toString para personalizarlo
	return this.name + ": " + this.message;
};

function ParameterValidationException() {																//Excepciones de validacion de parametros
	this.name = "ParameterValidationException";
	this.message = "Error: Parameter Validation Exception.";
}
ParameterValidationException.prototype = new BaseException(); 											//Hereda de BaseException
ParameterValidationException.prototype.constructor = ParameterValidationException;

function EmptyValueException(param) {																	//Excepcion personalizada para indicar valores vacios
	this.name = "EmptyValueException";
	this.message = "Error: The parameter " + param + " can't be empty.";
}
EmptyValueException.prototype = new ParameterValidationException(); 									//Hereda de ParameterValidationException
EmptyValueException.prototype.constructor = EmptyValueException;

function InvalidValueException(param, value) {															//Excepcion de valor invalido
	this.name = "InvalidValueException";
	this.message = "Error: The paramenter " + param + " has an invalid value. (" + param + ": " + value + ")";
}
InvalidValueException.prototype = new ParameterValidationException(); 									//Hereda de ParameterValidationException
InvalidValueException.prototype.constructor = InvalidValueException;

function InvalidAccessConstructorException() {															//Excepcion acceso invalido a constructor
	this.name = "InvalidAccessConstructorException";
	this.message = "Constructor can’t be called as a function.";
}
InvalidAccessConstructorException.prototype = new BaseException(); 
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

function UninstantiatedObjectException(param) {															//Excepcion acceso invalido a constructor
	this.name = "UninstantiatedObjectException";
	this.message = "You can't instantiate a " + param + " object";
}
UninstantiatedObjectException.prototype = new BaseException(); 
UninstantiatedObjectException.prototype.constructor = UninstantiatedObjectException;

function AbstractClassException(classValue) {															//Excepcion intento de instacia clase abstracta
	this.name = "AbstractClassException";
	this.message = classValue + " is a abstract class.";
}
AbstractClassException.prototype = new BaseException(); 
AbstractClassException.prototype.constructor = AbstractClassException;

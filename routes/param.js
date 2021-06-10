/**
 * This class represents the HTTP parameter.
 */
class Param {

	_name;

	_className;

	/**
	 * Creates an Param class instance with the specified parameter name.
	 * @param {string} name - A String containing the parameter name.
	 * @param {string} className - A String containing the class name.
	 */
	constructor(name, className = null) {
		this._name = name;
		this._className = className;
	}

	/**
	 * This is a getter method to get parameter name.
	 * @returns {string} A String representing the parameter name.
	 */
	getName() {
		return this._name;
	}

	/**
	 * This is a getter method to get class name.
	 * @returns {string} A String representing the class name.
	 */
	getClassName() {
		return this._className;
	}
}

module.exports = {
	MasterModel: Param,
	Param: Param
}
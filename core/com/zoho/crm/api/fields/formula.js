const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Formula{

	returnType;
	expression;
	keyModified = new Map();
	/**
	 * The method to get the returnType
	 * @returns {String} A String representing the returnType
	 */
	getReturnType()	{
		return this.returnType;

	}

	/**
	 * The method to set the value to returnType
	 * @param {String} returnType A String representing the returnType
	 */
	setReturnType(returnType)	{
		if((returnType != null) && (!(Object.prototype.toString.call(returnType) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: returnType EXPECTED TYPE: String", null, null);
		}
		this.returnType = returnType;
		this.keyModified.set("return_type", 1);

	}

	/**
	 * The method to get the expression
	 * @returns {String} A String representing the expression
	 */
	getExpression()	{
		return this.expression;

	}

	/**
	 * The method to set the value to expression
	 * @param {String} expression A String representing the expression
	 */
	setExpression(expression)	{
		if((expression != null) && (!(Object.prototype.toString.call(expression) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: expression EXPECTED TYPE: String", null, null);
		}
		this.expression = expression;
		this.keyModified.set("expression", 1);

	}

	/**
	 * The method to check if the user has modified the given key
	 * @param {String} key A String representing the key
	 * @returns {number} A number representing the modification
	 */
	isKeyModified(key)	{
		if((key != null) && (!(Object.prototype.toString.call(key) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: key EXPECTED TYPE: String", null, null);
		}
		if(this.keyModified.has(key))	{
			return this.keyModified.get(key);
		}
		return null;

	}

	/**
	 * The method to mark the given key as modified
	 * @param {String} key A String representing the key
	 * @param {number} modification A number representing the modification
	 */
	setKeyModified(key, modification)	{
		if((key != null) && (!(Object.prototype.toString.call(key) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: key EXPECTED TYPE: String", null, null);
		}
		if((modification != null) && (!(Object.prototype.toString.call(modification) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: modification EXPECTED TYPE: number", null, null);
		}
		this.keyModified.set(key, modification);

	}

}
module.exports = {
	MasterModel : Formula,
	Formula : Formula
}

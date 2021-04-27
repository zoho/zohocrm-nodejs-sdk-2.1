const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class PickListValue{

	displayValue;
	delete1;
	sequenceNumber;
	actualValue;
	id;
	forecastType;
	forecastCategory;
	keyModified = new Map();
	/**
	 * The method to get the displayValue
	 * @returns {String} A String representing the displayValue
	 */
	getDisplayValue()	{
		return this.displayValue;

	}

	/**
	 * The method to set the value to displayValue
	 * @param {String} displayValue A String representing the displayValue
	 */
	setDisplayValue(displayValue)	{
		if((displayValue != null) && (!(Object.prototype.toString.call(displayValue) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: displayValue EXPECTED TYPE: String", null, null);
		}
		this.displayValue = displayValue;
		this.keyModified.set("display_value", 1);

	}

	/**
	 * The method to get the delete
	 * @returns {Boolean} A Boolean representing the delete1
	 */
	getDelete()	{
		return this.delete1;

	}

	/**
	 * The method to set the value to delete
	 * @param {Boolean} delete1 A Boolean representing the delete1
	 */
	setDelete(delete1)	{
		if((delete1 != null) && (!(Object.prototype.toString.call(delete1) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: delete1 EXPECTED TYPE: Boolean", null, null);
		}
		this.delete1 = delete1;
		this.keyModified.set("_delete", 1);

	}

	/**
	 * The method to get the sequenceNumber
	 * @returns {number} A number representing the sequenceNumber
	 */
	getSequenceNumber()	{
		return this.sequenceNumber;

	}

	/**
	 * The method to set the value to sequenceNumber
	 * @param {number} sequenceNumber A number representing the sequenceNumber
	 */
	setSequenceNumber(sequenceNumber)	{
		if((sequenceNumber != null) && (!(Object.prototype.toString.call(sequenceNumber) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sequenceNumber EXPECTED TYPE: number", null, null);
		}
		this.sequenceNumber = sequenceNumber;
		this.keyModified.set("sequence_number", 1);

	}

	/**
	 * The method to get the actualValue
	 * @returns {String} A String representing the actualValue
	 */
	getActualValue()	{
		return this.actualValue;

	}

	/**
	 * The method to set the value to actualValue
	 * @param {String} actualValue A String representing the actualValue
	 */
	setActualValue(actualValue)	{
		if((actualValue != null) && (!(Object.prototype.toString.call(actualValue) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: actualValue EXPECTED TYPE: String", null, null);
		}
		this.actualValue = actualValue;
		this.keyModified.set("actual_value", 1);

	}

	/**
	 * The method to get the id
	 * @returns {BigInt} A BigInt representing the id
	 */
	getId()	{
		return this.id;

	}

	/**
	 * The method to set the value to id
	 * @param {BigInt} id A BigInt representing the id
	 */
	setId(id)	{
		if((id != null) && (!(Object.prototype.toString.call(id) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: id EXPECTED TYPE: BigInt", null, null);
		}
		this.id = id;
		this.keyModified.set("id", 1);

	}

	/**
	 * The method to get the forecastType
	 * @returns {String} A String representing the forecastType
	 */
	getForecastType()	{
		return this.forecastType;

	}

	/**
	 * The method to set the value to forecastType
	 * @param {String} forecastType A String representing the forecastType
	 */
	setForecastType(forecastType)	{
		if((forecastType != null) && (!(Object.prototype.toString.call(forecastType) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: forecastType EXPECTED TYPE: String", null, null);
		}
		this.forecastType = forecastType;
		this.keyModified.set("forecast_type", 1);

	}

	/**
	 * The method to get the forecastCategory
	 * @returns {ForecastCategory} An instance of ForecastCategory
	 */
	getForecastCategory()	{
		return this.forecastCategory;

	}

	/**
	 * The method to set the value to forecastCategory
	 * @param {ForecastCategory} forecastCategory An instance of ForecastCategory
	 */
	setForecastCategory(forecastCategory)	{
		const ForecastCategory = require("./forecast_category").MasterModel;
		if((forecastCategory != null) && (!(forecastCategory instanceof ForecastCategory)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: forecastCategory EXPECTED TYPE: ForecastCategory", null, null);
		}
		this.forecastCategory = forecastCategory;
		this.keyModified.set("forecast_category", 1);

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
	MasterModel : PickListValue,
	PickListValue : PickListValue
}

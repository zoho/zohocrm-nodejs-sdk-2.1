import {Maps} from "./maps.js";
import {SDKException} from "../exception/sdk_exception.js";
import {Constants} from "../../../../../../utils/util/constants.js";

class PickListValue{

	displayValue;
	probability;
	forecastCategory;
	actualValue;
	id;
	forecastType;
	sequenceNumber;
	expectedDataType;
	maps;
	sysRefName;
	type;
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
	 * The method to get the probability
	 * @returns {number} A number representing the probability
	 */
	getProbability()	{
		return this.probability;

	}

	/**
	 * The method to set the value to probability
	 * @param {number} probability A number representing the probability
	 */
	setProbability(probability)	{
		if((probability != null) && (!(Object.prototype.toString.call(probability) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: probability EXPECTED TYPE: number", null, null);
		}
		this.probability = probability;
		this.keyModified.set("probability", 1);

	}

	/**
	 * The method to get the forecastCategory
	 * @returns {BigInt} A BigInt representing the forecastCategory
	 */
	getForecastCategory()	{
		return this.forecastCategory;

	}

	/**
	 * The method to set the value to forecastCategory
	 * @param {BigInt} forecastCategory A BigInt representing the forecastCategory
	 */
	setForecastCategory(forecastCategory)	{
		if((forecastCategory != null) && (!(Object.prototype.toString.call(forecastCategory) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: forecastCategory EXPECTED TYPE: BigInt", null, null);
		}
		this.forecastCategory = forecastCategory;
		this.keyModified.set("forecast_category", 1);

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
	 * The method to get the expectedDataType
	 * @returns {String} A String representing the expectedDataType
	 */
	getExpectedDataType()	{
		return this.expectedDataType;

	}

	/**
	 * The method to set the value to expectedDataType
	 * @param {String} expectedDataType A String representing the expectedDataType
	 */
	setExpectedDataType(expectedDataType)	{
		if((expectedDataType != null) && (!(Object.prototype.toString.call(expectedDataType) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: expectedDataType EXPECTED TYPE: String", null, null);
		}
		this.expectedDataType = expectedDataType;
		this.keyModified.set("expected_data_type", 1);

	}

	/**
	 * The method to get the maps
	 * @returns {Array} An Array representing the maps
	 */
	getMaps()	{
		return this.maps;

	}

	/**
	 * The method to set the value to maps
	 * @param {Array} maps An Array representing the maps
	 */
	setMaps(maps)	{
		if((maps != null) && (!(Object.prototype.toString.call(maps) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: maps EXPECTED TYPE: Array", null, null);
		}
		this.maps = maps;
		this.keyModified.set("maps", 1);

	}

	/**
	 * The method to get the sysRefName
	 * @returns {String} A String representing the sysRefName
	 */
	getSysRefName()	{
		return this.sysRefName;

	}

	/**
	 * The method to set the value to sysRefName
	 * @param {String} sysRefName A String representing the sysRefName
	 */
	setSysRefName(sysRefName)	{
		if((sysRefName != null) && (!(Object.prototype.toString.call(sysRefName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sysRefName EXPECTED TYPE: String", null, null);
		}
		this.sysRefName = sysRefName;
		this.keyModified.set("sys_ref_name", 1);

	}

	/**
	 * The method to get the type
	 * @returns {String} A String representing the type
	 */
	getType()	{
		return this.type;

	}

	/**
	 * The method to set the value to type
	 * @param {String} type A String representing the type
	 */
	setType(type)	{
		if((type != null) && (!(Object.prototype.toString.call(type) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: type EXPECTED TYPE: String", null, null);
		}
		this.type = type;
		this.keyModified.set("type", 1);

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
export {
	PickListValue as MasterModel,
	PickListValue as PickListValue
}

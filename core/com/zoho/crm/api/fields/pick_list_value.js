const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class PickListValue{

	displayValue;
	sequenceNumber;
	expectedDataType;
	maps;
	actualValue;
	sysRefName;
	type;
	id;
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

const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class ProcessInfo{

	fieldId;
	isContinuous;
	apiName;
	continuous;
	fieldLabel;
	name;
	columnName;
	fieldValue;
	id;
	fieldName;
	escalation;
	keyModified = new Map();
	/**
	 * The method to get the fieldId
	 * @returns {String} A String representing the fieldId
	 */
	getFieldId()	{
		return this.fieldId;

	}

	/**
	 * The method to set the value to fieldId
	 * @param {String} fieldId A String representing the fieldId
	 */
	setFieldId(fieldId)	{
		if((fieldId != null) && (!(Object.prototype.toString.call(fieldId) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldId EXPECTED TYPE: String", null, null);
		}
		this.fieldId = fieldId;
		this.keyModified.set("field_id", 1);

	}

	/**
	 * The method to get the isContinuous
	 * @returns {Boolean} A Boolean representing the isContinuous
	 */
	getIsContinuous()	{
		return this.isContinuous;

	}

	/**
	 * The method to set the value to isContinuous
	 * @param {Boolean} isContinuous A Boolean representing the isContinuous
	 */
	setIsContinuous(isContinuous)	{
		if((isContinuous != null) && (!(Object.prototype.toString.call(isContinuous) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: isContinuous EXPECTED TYPE: Boolean", null, null);
		}
		this.isContinuous = isContinuous;
		this.keyModified.set("is_continuous", 1);

	}

	/**
	 * The method to get the apiName
	 * @returns {String} A String representing the apiName
	 */
	getAPIName()	{
		return this.apiName;

	}

	/**
	 * The method to set the value to apiName
	 * @param {String} apiName A String representing the apiName
	 */
	setAPIName(apiName)	{
		if((apiName != null) && (!(Object.prototype.toString.call(apiName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: apiName EXPECTED TYPE: String", null, null);
		}
		this.apiName = apiName;
		this.keyModified.set("api_name", 1);

	}

	/**
	 * The method to get the continuous
	 * @returns {Boolean} A Boolean representing the continuous
	 */
	getContinuous()	{
		return this.continuous;

	}

	/**
	 * The method to set the value to continuous
	 * @param {Boolean} continuous A Boolean representing the continuous
	 */
	setContinuous(continuous)	{
		if((continuous != null) && (!(Object.prototype.toString.call(continuous) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: continuous EXPECTED TYPE: Boolean", null, null);
		}
		this.continuous = continuous;
		this.keyModified.set("continuous", 1);

	}

	/**
	 * The method to get the fieldLabel
	 * @returns {String} A String representing the fieldLabel
	 */
	getFieldLabel()	{
		return this.fieldLabel;

	}

	/**
	 * The method to set the value to fieldLabel
	 * @param {String} fieldLabel A String representing the fieldLabel
	 */
	setFieldLabel(fieldLabel)	{
		if((fieldLabel != null) && (!(Object.prototype.toString.call(fieldLabel) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldLabel EXPECTED TYPE: String", null, null);
		}
		this.fieldLabel = fieldLabel;
		this.keyModified.set("field_label", 1);

	}

	/**
	 * The method to get the name
	 * @returns {String} A String representing the name
	 */
	getName()	{
		return this.name;

	}

	/**
	 * The method to set the value to name
	 * @param {String} name A String representing the name
	 */
	setName(name)	{
		if((name != null) && (!(Object.prototype.toString.call(name) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: name EXPECTED TYPE: String", null, null);
		}
		this.name = name;
		this.keyModified.set("name", 1);

	}

	/**
	 * The method to get the columnName
	 * @returns {String} A String representing the columnName
	 */
	getColumnName()	{
		return this.columnName;

	}

	/**
	 * The method to set the value to columnName
	 * @param {String} columnName A String representing the columnName
	 */
	setColumnName(columnName)	{
		if((columnName != null) && (!(Object.prototype.toString.call(columnName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: columnName EXPECTED TYPE: String", null, null);
		}
		this.columnName = columnName;
		this.keyModified.set("column_name", 1);

	}

	/**
	 * The method to get the fieldValue
	 * @returns {String} A String representing the fieldValue
	 */
	getFieldValue()	{
		return this.fieldValue;

	}

	/**
	 * The method to set the value to fieldValue
	 * @param {String} fieldValue A String representing the fieldValue
	 */
	setFieldValue(fieldValue)	{
		if((fieldValue != null) && (!(Object.prototype.toString.call(fieldValue) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldValue EXPECTED TYPE: String", null, null);
		}
		this.fieldValue = fieldValue;
		this.keyModified.set("field_value", 1);

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
	 * The method to get the fieldName
	 * @returns {String} A String representing the fieldName
	 */
	getFieldName()	{
		return this.fieldName;

	}

	/**
	 * The method to set the value to fieldName
	 * @param {String} fieldName A String representing the fieldName
	 */
	setFieldName(fieldName)	{
		if((fieldName != null) && (!(Object.prototype.toString.call(fieldName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldName EXPECTED TYPE: String", null, null);
		}
		this.fieldName = fieldName;
		this.keyModified.set("field_name", 1);

	}

	/**
	 * The method to get the escalation
	 * @returns {Escalation} An instance of Escalation
	 */
	getEscalation()	{
		return this.escalation;

	}

	/**
	 * The method to set the value to escalation
	 * @param {Escalation} escalation An instance of Escalation
	 */
	setEscalation(escalation)	{
		const Escalation = require("./escalation").MasterModel;
		if((escalation != null) && (!(escalation instanceof Escalation)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: escalation EXPECTED TYPE: Escalation", null, null);
		}
		this.escalation = escalation;
		this.keyModified.set("escalation", 1);

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
	MasterModel : ProcessInfo,
	ProcessInfo : ProcessInfo
}

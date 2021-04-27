const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Transition{

	nextTransitions;
	parentTransition;
	percentPartialSave;
	data;
	nextFieldValue;
	name;
	criteriaMatched;
	id;
	fields;
	criteriaMessage;
	type;
	executionTime;
	keyModified = new Map();
	/**
	 * The method to get the nextTransitions
	 * @returns {Array} An Array representing the nextTransitions
	 */
	getNextTransitions()	{
		return this.nextTransitions;

	}

	/**
	 * The method to set the value to nextTransitions
	 * @param {Array} nextTransitions An Array representing the nextTransitions
	 */
	setNextTransitions(nextTransitions)	{
		if((nextTransitions != null) && (!(Object.prototype.toString.call(nextTransitions) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: nextTransitions EXPECTED TYPE: Array", null, null);
		}
		this.nextTransitions = nextTransitions;
		this.keyModified.set("next_transitions", 1);

	}

	/**
	 * The method to get the parentTransition
	 * @returns {Transition} An instance of Transition
	 */
	getParentTransition()	{
		return this.parentTransition;

	}

	/**
	 * The method to set the value to parentTransition
	 * @param {Transition} parentTransition An instance of Transition
	 */
	setParentTransition(parentTransition)	{
		if((parentTransition != null) && (!(parentTransition instanceof Transition)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: parentTransition EXPECTED TYPE: Transition", null, null);
		}
		this.parentTransition = parentTransition;
		this.keyModified.set("parent_transition", 1);

	}

	/**
	 * The method to get the percentPartialSave
	 * @returns {Float} A Float representing the percentPartialSave
	 */
	getPercentPartialSave()	{
		return this.percentPartialSave;

	}

	/**
	 * The method to set the value to percentPartialSave
	 * @param {Float} percentPartialSave A Float representing the percentPartialSave
	 */
	setPercentPartialSave(percentPartialSave)	{
		if((percentPartialSave != null) && (!(Object.prototype.toString.call(percentPartialSave) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: percentPartialSave EXPECTED TYPE: Float", null, null);
		}
		this.percentPartialSave = percentPartialSave;
		this.keyModified.set("percent_partial_save", 1);

	}

	/**
	 * The method to get the data
	 * @returns {Record} An instance of Record
	 */
	getData()	{
		return this.data;

	}

	/**
	 * The method to set the value to data
	 * @param {Record} data An instance of Record
	 */
	setData(data)	{
		const Record = require("../record/record").MasterModel;
		if((data != null) && (!(data instanceof Record)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: data EXPECTED TYPE: Record", null, null);
		}
		this.data = data;
		this.keyModified.set("data", 1);

	}

	/**
	 * The method to get the nextFieldValue
	 * @returns {String} A String representing the nextFieldValue
	 */
	getNextFieldValue()	{
		return this.nextFieldValue;

	}

	/**
	 * The method to set the value to nextFieldValue
	 * @param {String} nextFieldValue A String representing the nextFieldValue
	 */
	setNextFieldValue(nextFieldValue)	{
		if((nextFieldValue != null) && (!(Object.prototype.toString.call(nextFieldValue) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: nextFieldValue EXPECTED TYPE: String", null, null);
		}
		this.nextFieldValue = nextFieldValue;
		this.keyModified.set("next_field_value", 1);

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
	 * The method to get the criteriaMatched
	 * @returns {Boolean} A Boolean representing the criteriaMatched
	 */
	getCriteriaMatched()	{
		return this.criteriaMatched;

	}

	/**
	 * The method to set the value to criteriaMatched
	 * @param {Boolean} criteriaMatched A Boolean representing the criteriaMatched
	 */
	setCriteriaMatched(criteriaMatched)	{
		if((criteriaMatched != null) && (!(Object.prototype.toString.call(criteriaMatched) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: criteriaMatched EXPECTED TYPE: Boolean", null, null);
		}
		this.criteriaMatched = criteriaMatched;
		this.keyModified.set("criteria_matched", 1);

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
	 * The method to get the fields
	 * @returns {Array} An Array representing the fields
	 */
	getFields()	{
		return this.fields;

	}

	/**
	 * The method to set the value to fields
	 * @param {Array} fields An Array representing the fields
	 */
	setFields(fields)	{
		if((fields != null) && (!(Object.prototype.toString.call(fields) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fields EXPECTED TYPE: Array", null, null);
		}
		this.fields = fields;
		this.keyModified.set("fields", 1);

	}

	/**
	 * The method to get the criteriaMessage
	 * @returns {String} A String representing the criteriaMessage
	 */
	getCriteriaMessage()	{
		return this.criteriaMessage;

	}

	/**
	 * The method to set the value to criteriaMessage
	 * @param {String} criteriaMessage A String representing the criteriaMessage
	 */
	setCriteriaMessage(criteriaMessage)	{
		if((criteriaMessage != null) && (!(Object.prototype.toString.call(criteriaMessage) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: criteriaMessage EXPECTED TYPE: String", null, null);
		}
		this.criteriaMessage = criteriaMessage;
		this.keyModified.set("criteria_message", 1);

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
	 * The method to get the executionTime
	 * @returns {Date} An instance of Date
	 */
	getExecutionTime()	{
		return this.executionTime;

	}

	/**
	 * The method to set the value to executionTime
	 * @param {Date} executionTime An instance of Date
	 */
	setExecutionTime(executionTime)	{
		if((executionTime != null) && (!(executionTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: executionTime EXPECTED TYPE: Date", null, null);
		}
		this.executionTime = executionTime;
		this.keyModified.set("execution_time", 1);

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
	MasterModel : Transition,
	Transition : Transition
}

const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Pipeline{

	from;
	to;
	parent;
	childAvailable;
	displayValue;
	default1;
	maps;
	actualValue;
	id;
	keyModified = new Map();
	/**
	 * The method to get the from
	 * @returns {BigInt} A BigInt representing the from
	 */
	getFrom()	{
		return this.from;

	}

	/**
	 * The method to set the value to from
	 * @param {BigInt} from A BigInt representing the from
	 */
	setFrom(from)	{
		if((from != null) && (!(Object.prototype.toString.call(from) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: from EXPECTED TYPE: BigInt", null, null);
		}
		this.from = from;
		this.keyModified.set("from", 1);

	}

	/**
	 * The method to get the to
	 * @returns {BigInt} A BigInt representing the to
	 */
	getTo()	{
		return this.to;

	}

	/**
	 * The method to set the value to to
	 * @param {BigInt} to A BigInt representing the to
	 */
	setTo(to)	{
		if((to != null) && (!(Object.prototype.toString.call(to) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: to EXPECTED TYPE: BigInt", null, null);
		}
		this.to = to;
		this.keyModified.set("to", 1);

	}

	/**
	 * The method to get the parent
	 * @returns {Pipeline} An instance of Pipeline
	 */
	getParent()	{
		return this.parent;

	}

	/**
	 * The method to set the value to parent
	 * @param {Pipeline} parent An instance of Pipeline
	 */
	setParent(parent)	{
		if((parent != null) && (!(parent instanceof Pipeline)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: parent EXPECTED TYPE: Pipeline", null, null);
		}
		this.parent = parent;
		this.keyModified.set("parent", 1);

	}

	/**
	 * The method to get the childAvailable
	 * @returns {Boolean} A Boolean representing the childAvailable
	 */
	getChildAvailable()	{
		return this.childAvailable;

	}

	/**
	 * The method to set the value to childAvailable
	 * @param {Boolean} childAvailable A Boolean representing the childAvailable
	 */
	setChildAvailable(childAvailable)	{
		if((childAvailable != null) && (!(Object.prototype.toString.call(childAvailable) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: childAvailable EXPECTED TYPE: Boolean", null, null);
		}
		this.childAvailable = childAvailable;
		this.keyModified.set("child_available", 1);

	}

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
	 * The method to get the default
	 * @returns {Boolean} A Boolean representing the default1
	 */
	getDefault()	{
		return this.default1;

	}

	/**
	 * The method to set the value to default
	 * @param {Boolean} default1 A Boolean representing the default1
	 */
	setDefault(default1)	{
		if((default1 != null) && (!(Object.prototype.toString.call(default1) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: default1 EXPECTED TYPE: Boolean", null, null);
		}
		this.default1 = default1;
		this.keyModified.set("default", 1);

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
	MasterModel : Pipeline,
	Pipeline : Pipeline
}

const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class MultiSelectLookup{

	displayLabel;
	linkingModule;
	lookupApiname;
	apiName;
	connectedModule;
	connectedlookupApiname;
	id;
	keyModified = new Map();
	/**
	 * The method to get the displayLabel
	 * @returns {String} A String representing the displayLabel
	 */
	getDisplayLabel()	{
		return this.displayLabel;

	}

	/**
	 * The method to set the value to displayLabel
	 * @param {String} displayLabel A String representing the displayLabel
	 */
	setDisplayLabel(displayLabel)	{
		if((displayLabel != null) && (!(Object.prototype.toString.call(displayLabel) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: displayLabel EXPECTED TYPE: String", null, null);
		}
		this.displayLabel = displayLabel;
		this.keyModified.set("display_label", 1);

	}

	/**
	 * The method to get the linkingModule
	 * @returns {String} A String representing the linkingModule
	 */
	getLinkingModule()	{
		return this.linkingModule;

	}

	/**
	 * The method to set the value to linkingModule
	 * @param {String} linkingModule A String representing the linkingModule
	 */
	setLinkingModule(linkingModule)	{
		if((linkingModule != null) && (!(Object.prototype.toString.call(linkingModule) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: linkingModule EXPECTED TYPE: String", null, null);
		}
		this.linkingModule = linkingModule;
		this.keyModified.set("linking_module", 1);

	}

	/**
	 * The method to get the lookupApiname
	 * @returns {String} A String representing the lookupApiname
	 */
	getLookupApiname()	{
		return this.lookupApiname;

	}

	/**
	 * The method to set the value to lookupApiname
	 * @param {String} lookupApiname A String representing the lookupApiname
	 */
	setLookupApiname(lookupApiname)	{
		if((lookupApiname != null) && (!(Object.prototype.toString.call(lookupApiname) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: lookupApiname EXPECTED TYPE: String", null, null);
		}
		this.lookupApiname = lookupApiname;
		this.keyModified.set("lookup_apiname", 1);

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
	 * The method to get the connectedModule
	 * @returns {String} A String representing the connectedModule
	 */
	getConnectedModule()	{
		return this.connectedModule;

	}

	/**
	 * The method to set the value to connectedModule
	 * @param {String} connectedModule A String representing the connectedModule
	 */
	setConnectedModule(connectedModule)	{
		if((connectedModule != null) && (!(Object.prototype.toString.call(connectedModule) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: connectedModule EXPECTED TYPE: String", null, null);
		}
		this.connectedModule = connectedModule;
		this.keyModified.set("connected_module", 1);

	}

	/**
	 * The method to get the connectedlookupApiname
	 * @returns {String} A String representing the connectedlookupApiname
	 */
	getConnectedlookupApiname()	{
		return this.connectedlookupApiname;

	}

	/**
	 * The method to set the value to connectedlookupApiname
	 * @param {String} connectedlookupApiname A String representing the connectedlookupApiname
	 */
	setConnectedlookupApiname(connectedlookupApiname)	{
		if((connectedlookupApiname != null) && (!(Object.prototype.toString.call(connectedlookupApiname) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: connectedlookupApiname EXPECTED TYPE: String", null, null);
		}
		this.connectedlookupApiname = connectedlookupApiname;
		this.keyModified.set("connectedlookup_apiname", 1);

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
	MasterModel : MultiSelectLookup,
	MultiSelectLookup : MultiSelectLookup
}

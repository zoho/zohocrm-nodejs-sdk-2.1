const Choice = require("../../../../../../utils/util/choice").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Resource{

	status;
	type;
	module;
	code;
	fileId;
	ignoreEmpty;
	findBy;
	fieldMappings;
	file;
	keyModified = new Map();
	/**
	 * The method to get the status
	 * @returns {Choice} An instance of Choice
	 */
	getStatus()	{
		return this.status;

	}

	/**
	 * The method to set the value to status
	 * @param {Choice} status An instance of Choice
	 */
	setStatus(status)	{
		if((status != null) && (!(status instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: status EXPECTED TYPE: Choice", null, null);
		}
		this.status = status;
		this.keyModified.set("status", 1);

	}

	/**
	 * The method to get the type
	 * @returns {Choice} An instance of Choice
	 */
	getType()	{
		return this.type;

	}

	/**
	 * The method to set the value to type
	 * @param {Choice} type An instance of Choice
	 */
	setType(type)	{
		if((type != null) && (!(type instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: type EXPECTED TYPE: Choice", null, null);
		}
		this.type = type;
		this.keyModified.set("type", 1);

	}

	/**
	 * The method to get the module
	 * @returns {Module} An instance of Module
	 */
	getModule()	{
		return this.module;

	}

	/**
	 * The method to set the value to module
	 * @param {Module} module An instance of Module
	 */
	setModule(module)	{
		const Module = require("../modules/module").MasterModel;
		if((module != null) && (!(module instanceof Module)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: module EXPECTED TYPE: Module", null, null);
		}
		this.module = module;
		this.keyModified.set("module", 1);

	}

	/**
	 * The method to get the code
	 * @returns {String} A String representing the code
	 */
	getCode()	{
		return this.code;

	}

	/**
	 * The method to set the value to code
	 * @param {String} code A String representing the code
	 */
	setCode(code)	{
		if((code != null) && (!(Object.prototype.toString.call(code) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: code EXPECTED TYPE: String", null, null);
		}
		this.code = code;
		this.keyModified.set("code", 1);

	}

	/**
	 * The method to get the fileId
	 * @returns {String} A String representing the fileId
	 */
	getFileId()	{
		return this.fileId;

	}

	/**
	 * The method to set the value to fileId
	 * @param {String} fileId A String representing the fileId
	 */
	setFileId(fileId)	{
		if((fileId != null) && (!(Object.prototype.toString.call(fileId) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fileId EXPECTED TYPE: String", null, null);
		}
		this.fileId = fileId;
		this.keyModified.set("file_id", 1);

	}

	/**
	 * The method to get the ignoreEmpty
	 * @returns {Boolean} A Boolean representing the ignoreEmpty
	 */
	getIgnoreEmpty()	{
		return this.ignoreEmpty;

	}

	/**
	 * The method to set the value to ignoreEmpty
	 * @param {Boolean} ignoreEmpty A Boolean representing the ignoreEmpty
	 */
	setIgnoreEmpty(ignoreEmpty)	{
		if((ignoreEmpty != null) && (!(Object.prototype.toString.call(ignoreEmpty) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: ignoreEmpty EXPECTED TYPE: Boolean", null, null);
		}
		this.ignoreEmpty = ignoreEmpty;
		this.keyModified.set("ignore_empty", 1);

	}

	/**
	 * The method to get the findBy
	 * @returns {String} A String representing the findBy
	 */
	getFindBy()	{
		return this.findBy;

	}

	/**
	 * The method to set the value to findBy
	 * @param {String} findBy A String representing the findBy
	 */
	setFindBy(findBy)	{
		if((findBy != null) && (!(Object.prototype.toString.call(findBy) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: findBy EXPECTED TYPE: String", null, null);
		}
		this.findBy = findBy;
		this.keyModified.set("find_by", 1);

	}

	/**
	 * The method to get the fieldMappings
	 * @returns {Array} An Array representing the fieldMappings
	 */
	getFieldMappings()	{
		return this.fieldMappings;

	}

	/**
	 * The method to set the value to fieldMappings
	 * @param {Array} fieldMappings An Array representing the fieldMappings
	 */
	setFieldMappings(fieldMappings)	{
		if((fieldMappings != null) && (!(Object.prototype.toString.call(fieldMappings) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldMappings EXPECTED TYPE: Array", null, null);
		}
		this.fieldMappings = fieldMappings;
		this.keyModified.set("field_mappings", 1);

	}

	/**
	 * The method to get the file
	 * @returns {File} An instance of File
	 */
	getFile()	{
		return this.file;

	}

	/**
	 * The method to set the value to file
	 * @param {File} file An instance of File
	 */
	setFile(file)	{
		const File = require("./file").MasterModel;
		if((file != null) && (!(file instanceof File)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: file EXPECTED TYPE: File", null, null);
		}
		this.file = file;
		this.keyModified.set("file", 1);

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
	MasterModel : Resource,
	Resource : Resource
}

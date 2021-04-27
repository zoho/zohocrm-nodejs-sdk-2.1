const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class EmailTemplate{

	content;
	createdTime;
	subject;
	module;
	type;
	createdBy;
	modifiedTime;
	lastUsageTime;
	associated;
	name;
	modifiedBy;
	description;
	id;
	editorMode;
	favorite;
	attachments;
	folder;
	consentLinked;
	keyModified = new Map();
	/**
	 * The method to get the content
	 * @returns {String} A String representing the content
	 */
	getContent()	{
		return this.content;

	}

	/**
	 * The method to set the value to content
	 * @param {String} content A String representing the content
	 */
	setContent(content)	{
		if((content != null) && (!(Object.prototype.toString.call(content) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: content EXPECTED TYPE: String", null, null);
		}
		this.content = content;
		this.keyModified.set("content", 1);

	}

	/**
	 * The method to get the createdTime
	 * @returns {Date} An instance of Date
	 */
	getCreatedTime()	{
		return this.createdTime;

	}

	/**
	 * The method to set the value to createdTime
	 * @param {Date} createdTime An instance of Date
	 */
	setCreatedTime(createdTime)	{
		if((createdTime != null) && (!(createdTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: createdTime EXPECTED TYPE: Date", null, null);
		}
		this.createdTime = createdTime;
		this.keyModified.set("created_time", 1);

	}

	/**
	 * The method to get the subject
	 * @returns {String} A String representing the subject
	 */
	getSubject()	{
		return this.subject;

	}

	/**
	 * The method to set the value to subject
	 * @param {String} subject A String representing the subject
	 */
	setSubject(subject)	{
		if((subject != null) && (!(Object.prototype.toString.call(subject) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: subject EXPECTED TYPE: String", null, null);
		}
		this.subject = subject;
		this.keyModified.set("subject", 1);

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
	 * The method to get the createdBy
	 * @returns {User} An instance of User
	 */
	getCreatedBy()	{
		return this.createdBy;

	}

	/**
	 * The method to set the value to createdBy
	 * @param {User} createdBy An instance of User
	 */
	setCreatedBy(createdBy)	{
		const User = require("../users/user").MasterModel;
		if((createdBy != null) && (!(createdBy instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: createdBy EXPECTED TYPE: User", null, null);
		}
		this.createdBy = createdBy;
		this.keyModified.set("created_by", 1);

	}

	/**
	 * The method to get the modifiedTime
	 * @returns {Date} An instance of Date
	 */
	getModifiedTime()	{
		return this.modifiedTime;

	}

	/**
	 * The method to set the value to modifiedTime
	 * @param {Date} modifiedTime An instance of Date
	 */
	setModifiedTime(modifiedTime)	{
		if((modifiedTime != null) && (!(modifiedTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: modifiedTime EXPECTED TYPE: Date", null, null);
		}
		this.modifiedTime = modifiedTime;
		this.keyModified.set("modified_time", 1);

	}

	/**
	 * The method to get the lastUsageTime
	 * @returns {Date} An instance of Date
	 */
	getLastUsageTime()	{
		return this.lastUsageTime;

	}

	/**
	 * The method to set the value to lastUsageTime
	 * @param {Date} lastUsageTime An instance of Date
	 */
	setLastUsageTime(lastUsageTime)	{
		if((lastUsageTime != null) && (!(lastUsageTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: lastUsageTime EXPECTED TYPE: Date", null, null);
		}
		this.lastUsageTime = lastUsageTime;
		this.keyModified.set("last_usage_time", 1);

	}

	/**
	 * The method to get the associated
	 * @returns {Boolean} A Boolean representing the associated
	 */
	getAssociated()	{
		return this.associated;

	}

	/**
	 * The method to set the value to associated
	 * @param {Boolean} associated A Boolean representing the associated
	 */
	setAssociated(associated)	{
		if((associated != null) && (!(Object.prototype.toString.call(associated) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: associated EXPECTED TYPE: Boolean", null, null);
		}
		this.associated = associated;
		this.keyModified.set("associated", 1);

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
	 * The method to get the modifiedBy
	 * @returns {User} An instance of User
	 */
	getModifiedBy()	{
		return this.modifiedBy;

	}

	/**
	 * The method to set the value to modifiedBy
	 * @param {User} modifiedBy An instance of User
	 */
	setModifiedBy(modifiedBy)	{
		const User = require("../users/user").MasterModel;
		if((modifiedBy != null) && (!(modifiedBy instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: modifiedBy EXPECTED TYPE: User", null, null);
		}
		this.modifiedBy = modifiedBy;
		this.keyModified.set("modified_by", 1);

	}

	/**
	 * The method to get the description
	 * @returns {String} A String representing the description
	 */
	getDescription()	{
		return this.description;

	}

	/**
	 * The method to set the value to description
	 * @param {String} description A String representing the description
	 */
	setDescription(description)	{
		if((description != null) && (!(Object.prototype.toString.call(description) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: description EXPECTED TYPE: String", null, null);
		}
		this.description = description;
		this.keyModified.set("description", 1);

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
	 * The method to get the editorMode
	 * @returns {String} A String representing the editorMode
	 */
	getEditorMode()	{
		return this.editorMode;

	}

	/**
	 * The method to set the value to editorMode
	 * @param {String} editorMode A String representing the editorMode
	 */
	setEditorMode(editorMode)	{
		if((editorMode != null) && (!(Object.prototype.toString.call(editorMode) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: editorMode EXPECTED TYPE: String", null, null);
		}
		this.editorMode = editorMode;
		this.keyModified.set("editor_mode", 1);

	}

	/**
	 * The method to get the favorite
	 * @returns {Boolean} A Boolean representing the favorite
	 */
	getFavorite()	{
		return this.favorite;

	}

	/**
	 * The method to set the value to favorite
	 * @param {Boolean} favorite A Boolean representing the favorite
	 */
	setFavorite(favorite)	{
		if((favorite != null) && (!(Object.prototype.toString.call(favorite) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: favorite EXPECTED TYPE: Boolean", null, null);
		}
		this.favorite = favorite;
		this.keyModified.set("favorite", 1);

	}

	/**
	 * The method to get the attachments
	 * @returns {Array} An Array representing the attachments
	 */
	getAttachments()	{
		return this.attachments;

	}

	/**
	 * The method to set the value to attachments
	 * @param {Array} attachments An Array representing the attachments
	 */
	setAttachments(attachments)	{
		if((attachments != null) && (!(Object.prototype.toString.call(attachments) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: attachments EXPECTED TYPE: Array", null, null);
		}
		this.attachments = attachments;
		this.keyModified.set("attachments", 1);

	}

	/**
	 * The method to get the folder
	 * @returns {EmailTemplate} An instance of EmailTemplate
	 */
	getFolder()	{
		return this.folder;

	}

	/**
	 * The method to set the value to folder
	 * @param {EmailTemplate} folder An instance of EmailTemplate
	 */
	setFolder(folder)	{
		if((folder != null) && (!(folder instanceof EmailTemplate)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: folder EXPECTED TYPE: EmailTemplate", null, null);
		}
		this.folder = folder;
		this.keyModified.set("folder", 1);

	}

	/**
	 * The method to get the consentLinked
	 * @returns {Boolean} A Boolean representing the consentLinked
	 */
	getConsentLinked()	{
		return this.consentLinked;

	}

	/**
	 * The method to set the value to consentLinked
	 * @param {Boolean} consentLinked A Boolean representing the consentLinked
	 */
	setConsentLinked(consentLinked)	{
		if((consentLinked != null) && (!(Object.prototype.toString.call(consentLinked) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: consentLinked EXPECTED TYPE: Boolean", null, null);
		}
		this.consentLinked = consentLinked;
		this.keyModified.set("consent_linked", 1);

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
	MasterModel : EmailTemplate,
	EmailTemplate : EmailTemplate
}

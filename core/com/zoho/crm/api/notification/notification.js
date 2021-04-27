const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Notification{

	channelExpiry;
	resourceUri;
	resourceId;
	notifyUrl;
	resourceName;
	channelId;
	events;
	token;
	notifyOnRelatedAction;
	fields;
	deleteevents;
	keyModified = new Map();
	/**
	 * The method to get the channelExpiry
	 * @returns {Date} An instance of Date
	 */
	getChannelExpiry()	{
		return this.channelExpiry;

	}

	/**
	 * The method to set the value to channelExpiry
	 * @param {Date} channelExpiry An instance of Date
	 */
	setChannelExpiry(channelExpiry)	{
		if((channelExpiry != null) && (!(channelExpiry instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: channelExpiry EXPECTED TYPE: Date", null, null);
		}
		this.channelExpiry = channelExpiry;
		this.keyModified.set("channel_expiry", 1);

	}

	/**
	 * The method to get the resourceUri
	 * @returns {String} A String representing the resourceUri
	 */
	getResourceUri()	{
		return this.resourceUri;

	}

	/**
	 * The method to set the value to resourceUri
	 * @param {String} resourceUri A String representing the resourceUri
	 */
	setResourceUri(resourceUri)	{
		if((resourceUri != null) && (!(Object.prototype.toString.call(resourceUri) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: resourceUri EXPECTED TYPE: String", null, null);
		}
		this.resourceUri = resourceUri;
		this.keyModified.set("resource_uri", 1);

	}

	/**
	 * The method to get the resourceId
	 * @returns {String} A String representing the resourceId
	 */
	getResourceId()	{
		return this.resourceId;

	}

	/**
	 * The method to set the value to resourceId
	 * @param {String} resourceId A String representing the resourceId
	 */
	setResourceId(resourceId)	{
		if((resourceId != null) && (!(Object.prototype.toString.call(resourceId) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: resourceId EXPECTED TYPE: String", null, null);
		}
		this.resourceId = resourceId;
		this.keyModified.set("resource_id", 1);

	}

	/**
	 * The method to get the notifyUrl
	 * @returns {String} A String representing the notifyUrl
	 */
	getNotifyUrl()	{
		return this.notifyUrl;

	}

	/**
	 * The method to set the value to notifyUrl
	 * @param {String} notifyUrl A String representing the notifyUrl
	 */
	setNotifyUrl(notifyUrl)	{
		if((notifyUrl != null) && (!(Object.prototype.toString.call(notifyUrl) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: notifyUrl EXPECTED TYPE: String", null, null);
		}
		this.notifyUrl = notifyUrl;
		this.keyModified.set("notify_url", 1);

	}

	/**
	 * The method to get the resourceName
	 * @returns {String} A String representing the resourceName
	 */
	getResourceName()	{
		return this.resourceName;

	}

	/**
	 * The method to set the value to resourceName
	 * @param {String} resourceName A String representing the resourceName
	 */
	setResourceName(resourceName)	{
		if((resourceName != null) && (!(Object.prototype.toString.call(resourceName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: resourceName EXPECTED TYPE: String", null, null);
		}
		this.resourceName = resourceName;
		this.keyModified.set("resource_name", 1);

	}

	/**
	 * The method to get the channelId
	 * @returns {BigInt} A BigInt representing the channelId
	 */
	getChannelId()	{
		return this.channelId;

	}

	/**
	 * The method to set the value to channelId
	 * @param {BigInt} channelId A BigInt representing the channelId
	 */
	setChannelId(channelId)	{
		if((channelId != null) && (!(Object.prototype.toString.call(channelId) == "[object BigInt]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: channelId EXPECTED TYPE: BigInt", null, null);
		}
		this.channelId = channelId;
		this.keyModified.set("channel_id", 1);

	}

	/**
	 * The method to get the events
	 * @returns {Array} An Array representing the events
	 */
	getEvents()	{
		return this.events;

	}

	/**
	 * The method to set the value to events
	 * @param {Array} events An Array representing the events
	 */
	setEvents(events)	{
		if((events != null) && (!(Object.prototype.toString.call(events) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: events EXPECTED TYPE: Array", null, null);
		}
		this.events = events;
		this.keyModified.set("events", 1);

	}

	/**
	 * The method to get the token
	 * @returns {String} A String representing the token
	 */
	getToken()	{
		return this.token;

	}

	/**
	 * The method to set the value to token
	 * @param {String} token A String representing the token
	 */
	setToken(token)	{
		if((token != null) && (!(Object.prototype.toString.call(token) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: token EXPECTED TYPE: String", null, null);
		}
		this.token = token;
		this.keyModified.set("token", 1);

	}

	/**
	 * The method to get the notifyOnRelatedAction
	 * @returns {Boolean} A Boolean representing the notifyOnRelatedAction
	 */
	getNotifyOnRelatedAction()	{
		return this.notifyOnRelatedAction;

	}

	/**
	 * The method to set the value to notifyOnRelatedAction
	 * @param {Boolean} notifyOnRelatedAction A Boolean representing the notifyOnRelatedAction
	 */
	setNotifyOnRelatedAction(notifyOnRelatedAction)	{
		if((notifyOnRelatedAction != null) && (!(Object.prototype.toString.call(notifyOnRelatedAction) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: notifyOnRelatedAction EXPECTED TYPE: Boolean", null, null);
		}
		this.notifyOnRelatedAction = notifyOnRelatedAction;
		this.keyModified.set("notify_on_related_action", 1);

	}

	/**
	 * The method to get the fields
	 * @returns {Map} A Map representing the fields
	 */
	getFields()	{
		return this.fields;

	}

	/**
	 * The method to set the value to fields
	 * @param {Map} fields A Map representing the fields
	 */
	setFields(fields)	{
		if((fields != null) && (!(Object.prototype.toString.call(fields) == "[object Map]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fields EXPECTED TYPE: Map", null, null);
		}
		this.fields = fields;
		this.keyModified.set("fields", 1);

	}

	/**
	 * The method to get the deleteevents
	 * @returns {Boolean} A Boolean representing the deleteevents
	 */
	getDeleteevents()	{
		return this.deleteevents;

	}

	/**
	 * The method to set the value to deleteevents
	 * @param {Boolean} deleteevents A Boolean representing the deleteevents
	 */
	setDeleteevents(deleteevents)	{
		if((deleteevents != null) && (!(Object.prototype.toString.call(deleteevents) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: deleteevents EXPECTED TYPE: Boolean", null, null);
		}
		this.deleteevents = deleteevents;
		this.keyModified.set("_delete_events", 1);

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
	MasterModel : Notification,
	Notification : Notification
}

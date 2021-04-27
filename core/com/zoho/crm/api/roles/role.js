const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Role{

	displayLabel;
	forecastManager;
	shareWithPeers;
	name;
	description;
	id;
	reportingTo;
	adminUser;
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
	 * The method to get the forecastManager
	 * @returns {User} An instance of User
	 */
	getForecastManager()	{
		return this.forecastManager;

	}

	/**
	 * The method to set the value to forecastManager
	 * @param {User} forecastManager An instance of User
	 */
	setForecastManager(forecastManager)	{
		const User = require("../users/user").MasterModel;
		if((forecastManager != null) && (!(forecastManager instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: forecastManager EXPECTED TYPE: User", null, null);
		}
		this.forecastManager = forecastManager;
		this.keyModified.set("forecast_manager", 1);

	}

	/**
	 * The method to get the shareWithPeers
	 * @returns {Boolean} A Boolean representing the shareWithPeers
	 */
	getShareWithPeers()	{
		return this.shareWithPeers;

	}

	/**
	 * The method to set the value to shareWithPeers
	 * @param {Boolean} shareWithPeers A Boolean representing the shareWithPeers
	 */
	setShareWithPeers(shareWithPeers)	{
		if((shareWithPeers != null) && (!(Object.prototype.toString.call(shareWithPeers) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: shareWithPeers EXPECTED TYPE: Boolean", null, null);
		}
		this.shareWithPeers = shareWithPeers;
		this.keyModified.set("share_with_peers", 1);

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
	 * The method to get the reportingTo
	 * @returns {User} An instance of User
	 */
	getReportingTo()	{
		return this.reportingTo;

	}

	/**
	 * The method to set the value to reportingTo
	 * @param {User} reportingTo An instance of User
	 */
	setReportingTo(reportingTo)	{
		const User = require("../users/user").MasterModel;
		if((reportingTo != null) && (!(reportingTo instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: reportingTo EXPECTED TYPE: User", null, null);
		}
		this.reportingTo = reportingTo;
		this.keyModified.set("reporting_to", 1);

	}

	/**
	 * The method to get the adminUser
	 * @returns {Boolean} A Boolean representing the adminUser
	 */
	getAdminUser()	{
		return this.adminUser;

	}

	/**
	 * The method to set the value to adminUser
	 * @param {Boolean} adminUser A Boolean representing the adminUser
	 */
	setAdminUser(adminUser)	{
		if((adminUser != null) && (!(Object.prototype.toString.call(adminUser) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: adminUser EXPECTED TYPE: Boolean", null, null);
		}
		this.adminUser = adminUser;
		this.keyModified.set("admin_user", 1);

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
	MasterModel : Role,
	Role : Role
}

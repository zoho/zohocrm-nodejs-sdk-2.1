const Record = require("./record").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Participants extends Record{

	/**
	 * The method to get the name
	 * @returns {String} A String representing the name
	 */
	getName()	{
		return this.getKeyValue("name");

	}

	/**
	 * The method to set the value to name
	 * @param {String} name A String representing the name
	 */
	setName(name)	{
		if((name != null) && (!(Object.prototype.toString.call(name) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: name EXPECTED TYPE: String", null, null);
		}
		this.addKeyValue("name", name);

	}

	/**
	 * The method to get the email
	 * @returns {String} A String representing the email
	 */
	getEmail()	{
		return this.getKeyValue("Email");

	}

	/**
	 * The method to set the value to email
	 * @param {String} email A String representing the email
	 */
	setEmail(email)	{
		if((email != null) && (!(Object.prototype.toString.call(email) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: email EXPECTED TYPE: String", null, null);
		}
		this.addKeyValue("Email", email);

	}

	/**
	 * The method to get the invited
	 * @returns {Boolean} A Boolean representing the invited
	 */
	getInvited()	{
		return this.getKeyValue("invited");

	}

	/**
	 * The method to set the value to invited
	 * @param {Boolean} invited A Boolean representing the invited
	 */
	setInvited(invited)	{
		if((invited != null) && (!(Object.prototype.toString.call(invited) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: invited EXPECTED TYPE: Boolean", null, null);
		}
		this.addKeyValue("invited", invited);

	}

	/**
	 * The method to get the type
	 * @returns {String} A String representing the type
	 */
	getType()	{
		return this.getKeyValue("type");

	}

	/**
	 * The method to set the value to type
	 * @param {String} type A String representing the type
	 */
	setType(type)	{
		if((type != null) && (!(Object.prototype.toString.call(type) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: type EXPECTED TYPE: String", null, null);
		}
		this.addKeyValue("type", type);

	}

	/**
	 * The method to get the participant
	 * @returns {String} A String representing the participant
	 */
	getParticipant()	{
		return this.getKeyValue("participant");

	}

	/**
	 * The method to set the value to participant
	 * @param {String} participant A String representing the participant
	 */
	setParticipant(participant)	{
		if((participant != null) && (!(Object.prototype.toString.call(participant) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: participant EXPECTED TYPE: String", null, null);
		}
		this.addKeyValue("participant", participant);

	}

	/**
	 * The method to get the status
	 * @returns {String} A String representing the status
	 */
	getStatus()	{
		return this.getKeyValue("status");

	}

	/**
	 * The method to set the value to status
	 * @param {String} status A String representing the status
	 */
	setStatus(status)	{
		if((status != null) && (!(Object.prototype.toString.call(status) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: status EXPECTED TYPE: String", null, null);
		}
		this.addKeyValue("status", status);

	}

}
module.exports = {
	MasterModel : Participants,
	Participants : Participants
}

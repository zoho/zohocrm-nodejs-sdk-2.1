const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class SuccessfulConvert{

	contacts;
	deals;
	accounts;
	keyModified = new Map();
	/**
	 * The method to get the contacts
	 * @returns {String} A String representing the contacts
	 */
	getContacts()	{
		return this.contacts;

	}

	/**
	 * The method to set the value to contacts
	 * @param {String} contacts A String representing the contacts
	 */
	setContacts(contacts)	{
		if((contacts != null) && (!(Object.prototype.toString.call(contacts) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: contacts EXPECTED TYPE: String", null, null);
		}
		this.contacts = contacts;
		this.keyModified.set("Contacts", 1);

	}

	/**
	 * The method to get the deals
	 * @returns {String} A String representing the deals
	 */
	getDeals()	{
		return this.deals;

	}

	/**
	 * The method to set the value to deals
	 * @param {String} deals A String representing the deals
	 */
	setDeals(deals)	{
		if((deals != null) && (!(Object.prototype.toString.call(deals) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: deals EXPECTED TYPE: String", null, null);
		}
		this.deals = deals;
		this.keyModified.set("Deals", 1);

	}

	/**
	 * The method to get the accounts
	 * @returns {String} A String representing the accounts
	 */
	getAccounts()	{
		return this.accounts;

	}

	/**
	 * The method to set the value to accounts
	 * @param {String} accounts A String representing the accounts
	 */
	setAccounts(accounts)	{
		if((accounts != null) && (!(Object.prototype.toString.call(accounts) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: accounts EXPECTED TYPE: String", null, null);
		}
		this.accounts = accounts;
		this.keyModified.set("Accounts", 1);

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
	MasterModel : SuccessfulConvert,
	SuccessfulConvert : SuccessfulConvert
}

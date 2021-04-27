const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Info{

	perPage;
	default1;
	count;
	page;
	moreRecords;
	translation;
	keyModified = new Map();
	/**
	 * The method to get the perPage
	 * @returns {number} A number representing the perPage
	 */
	getPerPage()	{
		return this.perPage;

	}

	/**
	 * The method to set the value to perPage
	 * @param {number} perPage A number representing the perPage
	 */
	setPerPage(perPage)	{
		if((perPage != null) && (!(Object.prototype.toString.call(perPage) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: perPage EXPECTED TYPE: number", null, null);
		}
		this.perPage = perPage;
		this.keyModified.set("per_page", 1);

	}

	/**
	 * The method to get the default
	 * @returns {String} A String representing the default1
	 */
	getDefault()	{
		return this.default1;

	}

	/**
	 * The method to set the value to default
	 * @param {String} default1 A String representing the default1
	 */
	setDefault(default1)	{
		if((default1 != null) && (!(Object.prototype.toString.call(default1) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: default1 EXPECTED TYPE: String", null, null);
		}
		this.default1 = default1;
		this.keyModified.set("default", 1);

	}

	/**
	 * The method to get the count
	 * @returns {number} A number representing the count
	 */
	getCount()	{
		return this.count;

	}

	/**
	 * The method to set the value to count
	 * @param {number} count A number representing the count
	 */
	setCount(count)	{
		if((count != null) && (!(Object.prototype.toString.call(count) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: count EXPECTED TYPE: number", null, null);
		}
		this.count = count;
		this.keyModified.set("count", 1);

	}

	/**
	 * The method to get the page
	 * @returns {number} A number representing the page
	 */
	getPage()	{
		return this.page;

	}

	/**
	 * The method to set the value to page
	 * @param {number} page A number representing the page
	 */
	setPage(page)	{
		if((page != null) && (!(Object.prototype.toString.call(page) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: page EXPECTED TYPE: number", null, null);
		}
		this.page = page;
		this.keyModified.set("page", 1);

	}

	/**
	 * The method to get the moreRecords
	 * @returns {Boolean} A Boolean representing the moreRecords
	 */
	getMoreRecords()	{
		return this.moreRecords;

	}

	/**
	 * The method to set the value to moreRecords
	 * @param {Boolean} moreRecords A Boolean representing the moreRecords
	 */
	setMoreRecords(moreRecords)	{
		if((moreRecords != null) && (!(Object.prototype.toString.call(moreRecords) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: moreRecords EXPECTED TYPE: Boolean", null, null);
		}
		this.moreRecords = moreRecords;
		this.keyModified.set("more_records", 1);

	}

	/**
	 * The method to get the translation
	 * @returns {Translation} An instance of Translation
	 */
	getTranslation()	{
		return this.translation;

	}

	/**
	 * The method to set the value to translation
	 * @param {Translation} translation An instance of Translation
	 */
	setTranslation(translation)	{
		const Translation = require("./translation").MasterModel;
		if((translation != null) && (!(translation instanceof Translation)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: translation EXPECTED TYPE: Translation", null, null);
		}
		this.translation = translation;
		this.keyModified.set("translation", 1);

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
	MasterModel : Info,
	Info : Info
}

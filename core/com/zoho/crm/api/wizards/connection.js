const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Connection{

	sourceButton;
	targetScreen;
	keyModified = new Map();
	/**
	 * The method to get the sourceButton
	 * @returns {Button} An instance of Button
	 */
	getSourceButton()	{
		return this.sourceButton;

	}

	/**
	 * The method to set the value to sourceButton
	 * @param {Button} sourceButton An instance of Button
	 */
	setSourceButton(sourceButton)	{
		const Button = require("./button").MasterModel;
		if((sourceButton != null) && (!(sourceButton instanceof Button)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sourceButton EXPECTED TYPE: Button", null, null);
		}
		this.sourceButton = sourceButton;
		this.keyModified.set("source_button", 1);

	}

	/**
	 * The method to get the targetScreen
	 * @returns {Screen} An instance of Screen
	 */
	getTargetScreen()	{
		return this.targetScreen;

	}

	/**
	 * The method to set the value to targetScreen
	 * @param {Screen} targetScreen An instance of Screen
	 */
	setTargetScreen(targetScreen)	{
		const Screen = require("./screen").MasterModel;
		if((targetScreen != null) && (!(targetScreen instanceof Screen)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: targetScreen EXPECTED TYPE: Screen", null, null);
		}
		this.targetScreen = targetScreen;
		this.keyModified.set("target_screen", 1);

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
	MasterModel : Connection,
	Connection : Connection
}

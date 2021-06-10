const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Theme{

	normalTab;
	selectedTab;
	newBackground;
	background;
	screen;
	type;
	keyModified = new Map();
	/**
	 * The method to get the normalTab
	 * @returns {TabTheme} An instance of TabTheme
	 */
	getNormalTab()	{
		return this.normalTab;

	}

	/**
	 * The method to set the value to normalTab
	 * @param {TabTheme} normalTab An instance of TabTheme
	 */
	setNormalTab(normalTab)	{
		const TabTheme = require("./tab_theme").MasterModel;
		if((normalTab != null) && (!(normalTab instanceof TabTheme)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: normalTab EXPECTED TYPE: TabTheme", null, null);
		}
		this.normalTab = normalTab;
		this.keyModified.set("normal_tab", 1);

	}

	/**
	 * The method to get the selectedTab
	 * @returns {TabTheme} An instance of TabTheme
	 */
	getSelectedTab()	{
		return this.selectedTab;

	}

	/**
	 * The method to set the value to selectedTab
	 * @param {TabTheme} selectedTab An instance of TabTheme
	 */
	setSelectedTab(selectedTab)	{
		const TabTheme = require("./tab_theme").MasterModel;
		if((selectedTab != null) && (!(selectedTab instanceof TabTheme)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: selectedTab EXPECTED TYPE: TabTheme", null, null);
		}
		this.selectedTab = selectedTab;
		this.keyModified.set("selected_tab", 1);

	}

	/**
	 * The method to get the newBackground
	 * @returns {String} A String representing the newBackground
	 */
	getNewBackground()	{
		return this.newBackground;

	}

	/**
	 * The method to set the value to newBackground
	 * @param {String} newBackground A String representing the newBackground
	 */
	setNewBackground(newBackground)	{
		if((newBackground != null) && (!(Object.prototype.toString.call(newBackground) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: newBackground EXPECTED TYPE: String", null, null);
		}
		this.newBackground = newBackground;
		this.keyModified.set("new_background", 1);

	}

	/**
	 * The method to get the background
	 * @returns {String} A String representing the background
	 */
	getBackground()	{
		return this.background;

	}

	/**
	 * The method to set the value to background
	 * @param {String} background A String representing the background
	 */
	setBackground(background)	{
		if((background != null) && (!(Object.prototype.toString.call(background) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: background EXPECTED TYPE: String", null, null);
		}
		this.background = background;
		this.keyModified.set("background", 1);

	}

	/**
	 * The method to get the screen
	 * @returns {String} A String representing the screen
	 */
	getScreen()	{
		return this.screen;

	}

	/**
	 * The method to set the value to screen
	 * @param {String} screen A String representing the screen
	 */
	setScreen(screen)	{
		if((screen != null) && (!(Object.prototype.toString.call(screen) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: screen EXPECTED TYPE: String", null, null);
		}
		this.screen = screen;
		this.keyModified.set("screen", 1);

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
	MasterModel : Theme,
	Theme : Theme
}

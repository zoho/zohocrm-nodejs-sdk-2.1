const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Node{

	posY;
	posX;
	startNode;
	screen;
	keyModified = new Map();
	/**
	 * The method to get the posY
	 * @returns {number} A number representing the posY
	 */
	getPosY()	{
		return this.posY;

	}

	/**
	 * The method to set the value to posY
	 * @param {number} posY A number representing the posY
	 */
	setPosY(posY)	{
		if((posY != null) && (!(Object.prototype.toString.call(posY) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: posY EXPECTED TYPE: number", null, null);
		}
		this.posY = posY;
		this.keyModified.set("pos_y", 1);

	}

	/**
	 * The method to get the posX
	 * @returns {number} A number representing the posX
	 */
	getPosX()	{
		return this.posX;

	}

	/**
	 * The method to set the value to posX
	 * @param {number} posX A number representing the posX
	 */
	setPosX(posX)	{
		if((posX != null) && (!(Object.prototype.toString.call(posX) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: posX EXPECTED TYPE: number", null, null);
		}
		this.posX = posX;
		this.keyModified.set("pos_x", 1);

	}

	/**
	 * The method to get the startNode
	 * @returns {Boolean} A Boolean representing the startNode
	 */
	getStartNode()	{
		return this.startNode;

	}

	/**
	 * The method to set the value to startNode
	 * @param {Boolean} startNode A Boolean representing the startNode
	 */
	setStartNode(startNode)	{
		if((startNode != null) && (!(Object.prototype.toString.call(startNode) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: startNode EXPECTED TYPE: Boolean", null, null);
		}
		this.startNode = startNode;
		this.keyModified.set("start_node", 1);

	}

	/**
	 * The method to get the screen
	 * @returns {Screen} An instance of Screen
	 */
	getScreen()	{
		return this.screen;

	}

	/**
	 * The method to set the value to screen
	 * @param {Screen} screen An instance of Screen
	 */
	setScreen(screen)	{
		const Screen = require("./screen").MasterModel;
		if((screen != null) && (!(screen instanceof Screen)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: screen EXPECTED TYPE: Screen", null, null);
		}
		this.screen = screen;
		this.keyModified.set("screen", 1);

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
	MasterModel : Node,
	Node : Node
}

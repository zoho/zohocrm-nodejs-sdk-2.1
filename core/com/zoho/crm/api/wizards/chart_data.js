const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class ChartData{

	nodes;
	connections;
	canvasWidth;
	canvasHeight;
	keyModified = new Map();
	/**
	 * The method to get the nodes
	 * @returns {Array} An Array representing the nodes
	 */
	getNodes()	{
		return this.nodes;

	}

	/**
	 * The method to set the value to nodes
	 * @param {Array} nodes An Array representing the nodes
	 */
	setNodes(nodes)	{
		if((nodes != null) && (!(Object.prototype.toString.call(nodes) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: nodes EXPECTED TYPE: Array", null, null);
		}
		this.nodes = nodes;
		this.keyModified.set("nodes", 1);

	}

	/**
	 * The method to get the connections
	 * @returns {Array} An Array representing the connections
	 */
	getConnections()	{
		return this.connections;

	}

	/**
	 * The method to set the value to connections
	 * @param {Array} connections An Array representing the connections
	 */
	setConnections(connections)	{
		if((connections != null) && (!(Object.prototype.toString.call(connections) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: connections EXPECTED TYPE: Array", null, null);
		}
		this.connections = connections;
		this.keyModified.set("connections", 1);

	}

	/**
	 * The method to get the canvasWidth
	 * @returns {number} A number representing the canvasWidth
	 */
	getCanvasWidth()	{
		return this.canvasWidth;

	}

	/**
	 * The method to set the value to canvasWidth
	 * @param {number} canvasWidth A number representing the canvasWidth
	 */
	setCanvasWidth(canvasWidth)	{
		if((canvasWidth != null) && (!(Object.prototype.toString.call(canvasWidth) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: canvasWidth EXPECTED TYPE: number", null, null);
		}
		this.canvasWidth = canvasWidth;
		this.keyModified.set("canvas_width", 1);

	}

	/**
	 * The method to get the canvasHeight
	 * @returns {number} A number representing the canvasHeight
	 */
	getCanvasHeight()	{
		return this.canvasHeight;

	}

	/**
	 * The method to set the value to canvasHeight
	 * @param {number} canvasHeight A number representing the canvasHeight
	 */
	setCanvasHeight(canvasHeight)	{
		if((canvasHeight != null) && (!(Object.prototype.toString.call(canvasHeight) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: canvasHeight EXPECTED TYPE: number", null, null);
		}
		this.canvasHeight = canvasHeight;
		this.keyModified.set("canvas_height", 1);

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
	MasterModel : ChartData,
	ChartData : ChartData
}

const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Container{

	id;
	layout;
	chartData;
	screens;
	keyModified = new Map();
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
	 * The method to get the layout
	 * @returns {Layout} An instance of Layout
	 */
	getLayout()	{
		return this.layout;

	}

	/**
	 * The method to set the value to layout
	 * @param {Layout} layout An instance of Layout
	 */
	setLayout(layout)	{
		const Layout = require("../layouts/layout").MasterModel;
		if((layout != null) && (!(layout instanceof Layout)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: layout EXPECTED TYPE: Layout", null, null);
		}
		this.layout = layout;
		this.keyModified.set("layout", 1);

	}

	/**
	 * The method to get the chartData
	 * @returns {ChartData} An instance of ChartData
	 */
	getChartData()	{
		return this.chartData;

	}

	/**
	 * The method to set the value to chartData
	 * @param {ChartData} chartData An instance of ChartData
	 */
	setChartData(chartData)	{
		const ChartData = require("./chart_data").MasterModel;
		if((chartData != null) && (!(chartData instanceof ChartData)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: chartData EXPECTED TYPE: ChartData", null, null);
		}
		this.chartData = chartData;
		this.keyModified.set("chart_data", 1);

	}

	/**
	 * The method to get the screens
	 * @returns {Array} An Array representing the screens
	 */
	getScreens()	{
		return this.screens;

	}

	/**
	 * The method to set the value to screens
	 * @param {Array} screens An Array representing the screens
	 */
	setScreens(screens)	{
		if((screens != null) && (!(Object.prototype.toString.call(screens) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: screens EXPECTED TYPE: Array", null, null);
		}
		this.screens = screens;
		this.keyModified.set("screens", 1);

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
	MasterModel : Container,
	Container : Container
}

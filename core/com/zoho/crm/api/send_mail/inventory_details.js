const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class InventoryDetails{

	inventoryTemplate;
	paperType;
	viewType;
	keyModified = new Map();
	/**
	 * The method to get the inventoryTemplate
	 * @returns {InventoryTemplate} An instance of InventoryTemplate
	 */
	getInventoryTemplate()	{
		return this.inventoryTemplate;

	}

	/**
	 * The method to set the value to inventoryTemplate
	 * @param {InventoryTemplate} inventoryTemplate An instance of InventoryTemplate
	 */
	setInventoryTemplate(inventoryTemplate)	{
		const InventoryTemplate = require("../inventory_templates/inventory_template").MasterModel;
		if((inventoryTemplate != null) && (!(inventoryTemplate instanceof InventoryTemplate)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: inventoryTemplate EXPECTED TYPE: InventoryTemplate", null, null);
		}
		this.inventoryTemplate = inventoryTemplate;
		this.keyModified.set("inventory_template", 1);

	}

	/**
	 * The method to get the paperType
	 * @returns {String} A String representing the paperType
	 */
	getPaperType()	{
		return this.paperType;

	}

	/**
	 * The method to set the value to paperType
	 * @param {String} paperType A String representing the paperType
	 */
	setPaperType(paperType)	{
		if((paperType != null) && (!(Object.prototype.toString.call(paperType) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: paperType EXPECTED TYPE: String", null, null);
		}
		this.paperType = paperType;
		this.keyModified.set("paper_type", 1);

	}

	/**
	 * The method to get the viewType
	 * @returns {String} A String representing the viewType
	 */
	getViewType()	{
		return this.viewType;

	}

	/**
	 * The method to set the value to viewType
	 * @param {String} viewType A String representing the viewType
	 */
	setViewType(viewType)	{
		if((viewType != null) && (!(Object.prototype.toString.call(viewType) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: viewType EXPECTED TYPE: String", null, null);
		}
		this.viewType = viewType;
		this.keyModified.set("view_type", 1);

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
	MasterModel : InventoryDetails,
	InventoryDetails : InventoryDetails
}

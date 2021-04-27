const Record = require("./record").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class InventoryLineItems extends Record{

	/**
	 * The method to get the productName
	 * @returns {LineItemProduct} An instance of LineItemProduct
	 */
	getProductName()	{
		return this.getKeyValue("Product_Name");

	}

	/**
	 * The method to set the value to productName
	 * @param {LineItemProduct} productName An instance of LineItemProduct
	 */
	setProductName(productName)	{
		const LineItemProduct = require("./line_item_product").MasterModel;
		if((productName != null) && (!(productName instanceof LineItemProduct)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: productName EXPECTED TYPE: LineItemProduct", null, null);
		}
		this.addKeyValue("Product_Name", productName);

	}

	/**
	 * The method to get the parentId
	 * @returns {Record} An instance of Record
	 */
	getParentId()	{
		return this.getKeyValue("parent_id");

	}

	/**
	 * The method to set the value to parentId
	 * @param {Record} parentId An instance of Record
	 */
	setParentId(parentId)	{
		if((parentId != null) && (!(parentId instanceof Record)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: parentId EXPECTED TYPE: Record", null, null);
		}
		this.addKeyValue("parent_id", parentId);

	}

	/**
	 * The method to get the quantity
	 * @returns {Float} A Float representing the quantity
	 */
	getQuantity()	{
		return this.getKeyValue("Quantity");

	}

	/**
	 * The method to set the value to quantity
	 * @param {Float} quantity A Float representing the quantity
	 */
	setQuantity(quantity)	{
		if((quantity != null) && (!(Object.prototype.toString.call(quantity) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: quantity EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("Quantity", quantity);

	}

	/**
	 * The method to get the discount
	 * @returns {String} A String representing the discount
	 */
	getDiscount()	{
		return this.getKeyValue("Discount");

	}

	/**
	 * The method to set the value to discount
	 * @param {String} discount A String representing the discount
	 */
	setDiscount(discount)	{
		if((discount != null) && (!(Object.prototype.toString.call(discount) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: discount EXPECTED TYPE: String", null, null);
		}
		this.addKeyValue("Discount", discount);

	}

	/**
	 * The method to get the totalAfterDiscount
	 * @returns {Float} A Float representing the totalAfterDiscount
	 */
	getTotalAfterDiscount()	{
		return this.getKeyValue("Total_After_Discount");

	}

	/**
	 * The method to set the value to totalAfterDiscount
	 * @param {Float} totalAfterDiscount A Float representing the totalAfterDiscount
	 */
	setTotalAfterDiscount(totalAfterDiscount)	{
		if((totalAfterDiscount != null) && (!(Object.prototype.toString.call(totalAfterDiscount) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: totalAfterDiscount EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("Total_After_Discount", totalAfterDiscount);

	}

	/**
	 * The method to get the netTotal
	 * @returns {Float} A Float representing the netTotal
	 */
	getNetTotal()	{
		return this.getKeyValue("Net_Total");

	}

	/**
	 * The method to set the value to netTotal
	 * @param {Float} netTotal A Float representing the netTotal
	 */
	setNetTotal(netTotal)	{
		if((netTotal != null) && (!(Object.prototype.toString.call(netTotal) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: netTotal EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("Net_Total", netTotal);

	}

	/**
	 * The method to get the priceBookName
	 * @returns {Float} A Float representing the priceBookName
	 */
	getPriceBookName()	{
		return this.getKeyValue("Price_Book_Name");

	}

	/**
	 * The method to set the value to priceBookName
	 * @param {Float} priceBookName A Float representing the priceBookName
	 */
	setPriceBookName(priceBookName)	{
		if((priceBookName != null) && (!(Object.prototype.toString.call(priceBookName) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: priceBookName EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("Price_Book_Name", priceBookName);

	}

	/**
	 * The method to get the tax
	 * @returns {Float} A Float representing the tax
	 */
	getTax()	{
		return this.getKeyValue("Tax");

	}

	/**
	 * The method to set the value to tax
	 * @param {Float} tax A Float representing the tax
	 */
	setTax(tax)	{
		if((tax != null) && (!(Object.prototype.toString.call(tax) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: tax EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("Tax", tax);

	}

	/**
	 * The method to get the listPrice
	 * @returns {Float} A Float representing the listPrice
	 */
	getListPrice()	{
		return this.getKeyValue("List_Price");

	}

	/**
	 * The method to set the value to listPrice
	 * @param {Float} listPrice A Float representing the listPrice
	 */
	setListPrice(listPrice)	{
		if((listPrice != null) && (!(Object.prototype.toString.call(listPrice) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: listPrice EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("List_Price", listPrice);

	}

	/**
	 * The method to get the unitPrice
	 * @returns {Float} A Float representing the unitPrice
	 */
	getUnitPrice()	{
		return this.getKeyValue("unit_price");

	}

	/**
	 * The method to set the value to unitPrice
	 * @param {Float} unitPrice A Float representing the unitPrice
	 */
	setUnitPrice(unitPrice)	{
		if((unitPrice != null) && (!(Object.prototype.toString.call(unitPrice) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: unitPrice EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("unit_price", unitPrice);

	}

	/**
	 * The method to get the quantityInStock
	 * @returns {Float} A Float representing the quantityInStock
	 */
	getQuantityInStock()	{
		return this.getKeyValue("quantity_in_stock");

	}

	/**
	 * The method to set the value to quantityInStock
	 * @param {Float} quantityInStock A Float representing the quantityInStock
	 */
	setQuantityInStock(quantityInStock)	{
		if((quantityInStock != null) && (!(Object.prototype.toString.call(quantityInStock) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: quantityInStock EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("quantity_in_stock", quantityInStock);

	}

	/**
	 * The method to get the total
	 * @returns {Float} A Float representing the total
	 */
	getTotal()	{
		return this.getKeyValue("Total");

	}

	/**
	 * The method to set the value to total
	 * @param {Float} total A Float representing the total
	 */
	setTotal(total)	{
		if((total != null) && (!(Object.prototype.toString.call(total) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: total EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("Total", total);

	}

	/**
	 * The method to get the description
	 * @returns {String} A String representing the description
	 */
	getDescription()	{
		return this.getKeyValue("Description");

	}

	/**
	 * The method to set the value to description
	 * @param {String} description A String representing the description
	 */
	setDescription(description)	{
		if((description != null) && (!(Object.prototype.toString.call(description) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: description EXPECTED TYPE: String", null, null);
		}
		this.addKeyValue("Description", description);

	}

	/**
	 * The method to get the lineTax
	 * @returns {Array} An Array representing the lineTax
	 */
	getLineTax()	{
		return this.getKeyValue("Line_Tax");

	}

	/**
	 * The method to set the value to lineTax
	 * @param {Array} lineTax An Array representing the lineTax
	 */
	setLineTax(lineTax)	{
		if((lineTax != null) && (!(Object.prototype.toString.call(lineTax) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: lineTax EXPECTED TYPE: Array", null, null);
		}
		this.addKeyValue("Line_Tax", lineTax);

	}

}
module.exports = {
	MasterModel : InventoryLineItems,
	InventoryLineItems : InventoryLineItems
}

const Record = require("./record").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class PricingDetails extends Record{

	/**
	 * The method to get the toRange
	 * @returns {Float} A Float representing the toRange
	 */
	getToRange()	{
		return this.getKeyValue("to_range");

	}

	/**
	 * The method to set the value to toRange
	 * @param {Float} toRange A Float representing the toRange
	 */
	setToRange(toRange)	{
		if((toRange != null) && (!(Object.prototype.toString.call(toRange) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: toRange EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("to_range", toRange);

	}

	/**
	 * The method to get the discount
	 * @returns {Float} A Float representing the discount
	 */
	getDiscount()	{
		return this.getKeyValue("discount");

	}

	/**
	 * The method to set the value to discount
	 * @param {Float} discount A Float representing the discount
	 */
	setDiscount(discount)	{
		if((discount != null) && (!(Object.prototype.toString.call(discount) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: discount EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("discount", discount);

	}

	/**
	 * The method to get the fromRange
	 * @returns {Float} A Float representing the fromRange
	 */
	getFromRange()	{
		return this.getKeyValue("from_range");

	}

	/**
	 * The method to set the value to fromRange
	 * @param {Float} fromRange A Float representing the fromRange
	 */
	setFromRange(fromRange)	{
		if((fromRange != null) && (!(Object.prototype.toString.call(fromRange) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fromRange EXPECTED TYPE: Float", null, null);
		}
		this.addKeyValue("from_range", fromRange);

	}

}
module.exports = {
	MasterModel : PricingDetails,
	PricingDetails : PricingDetails
}

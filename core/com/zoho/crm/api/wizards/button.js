const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Button{

	id;
	sequenceNumber;
	displayLabel;
	criteria;
	targetScreen;
	type;
	color;
	shape;
	backgroundColor;
	visibility;
	transition;
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
	 * The method to get the sequenceNumber
	 * @returns {number} A number representing the sequenceNumber
	 */
	getSequenceNumber()	{
		return this.sequenceNumber;

	}

	/**
	 * The method to set the value to sequenceNumber
	 * @param {number} sequenceNumber A number representing the sequenceNumber
	 */
	setSequenceNumber(sequenceNumber)	{
		if((sequenceNumber != null) && (!(Object.prototype.toString.call(sequenceNumber) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sequenceNumber EXPECTED TYPE: number", null, null);
		}
		this.sequenceNumber = sequenceNumber;
		this.keyModified.set("sequence_number", 1);

	}

	/**
	 * The method to get the displayLabel
	 * @returns {String} A String representing the displayLabel
	 */
	getDisplayLabel()	{
		return this.displayLabel;

	}

	/**
	 * The method to set the value to displayLabel
	 * @param {String} displayLabel A String representing the displayLabel
	 */
	setDisplayLabel(displayLabel)	{
		if((displayLabel != null) && (!(Object.prototype.toString.call(displayLabel) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: displayLabel EXPECTED TYPE: String", null, null);
		}
		this.displayLabel = displayLabel;
		this.keyModified.set("display_label", 1);

	}

	/**
	 * The method to get the criteria
	 * @returns {Criteria} An instance of Criteria
	 */
	getCriteria()	{
		return this.criteria;

	}

	/**
	 * The method to set the value to criteria
	 * @param {Criteria} criteria An instance of Criteria
	 */
	setCriteria(criteria)	{
		const Criteria = require("../custom_views/criteria").MasterModel;
		if((criteria != null) && (!(criteria instanceof Criteria)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: criteria EXPECTED TYPE: Criteria", null, null);
		}
		this.criteria = criteria;
		this.keyModified.set("criteria", 1);

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
	 * The method to get the color
	 * @returns {String} A String representing the color
	 */
	getColor()	{
		return this.color;

	}

	/**
	 * The method to set the value to color
	 * @param {String} color A String representing the color
	 */
	setColor(color)	{
		if((color != null) && (!(Object.prototype.toString.call(color) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: color EXPECTED TYPE: String", null, null);
		}
		this.color = color;
		this.keyModified.set("color", 1);

	}

	/**
	 * The method to get the shape
	 * @returns {String} A String representing the shape
	 */
	getShape()	{
		return this.shape;

	}

	/**
	 * The method to set the value to shape
	 * @param {String} shape A String representing the shape
	 */
	setShape(shape)	{
		if((shape != null) && (!(Object.prototype.toString.call(shape) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: shape EXPECTED TYPE: String", null, null);
		}
		this.shape = shape;
		this.keyModified.set("shape", 1);

	}

	/**
	 * The method to get the backgroundColor
	 * @returns {String} A String representing the backgroundColor
	 */
	getBackgroundColor()	{
		return this.backgroundColor;

	}

	/**
	 * The method to set the value to backgroundColor
	 * @param {String} backgroundColor A String representing the backgroundColor
	 */
	setBackgroundColor(backgroundColor)	{
		if((backgroundColor != null) && (!(Object.prototype.toString.call(backgroundColor) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: backgroundColor EXPECTED TYPE: String", null, null);
		}
		this.backgroundColor = backgroundColor;
		this.keyModified.set("background_color", 1);

	}

	/**
	 * The method to get the visibility
	 * @returns {String} A String representing the visibility
	 */
	getVisibility()	{
		return this.visibility;

	}

	/**
	 * The method to set the value to visibility
	 * @param {String} visibility A String representing the visibility
	 */
	setVisibility(visibility)	{
		if((visibility != null) && (!(Object.prototype.toString.call(visibility) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: visibility EXPECTED TYPE: String", null, null);
		}
		this.visibility = visibility;
		this.keyModified.set("visibility", 1);

	}

	/**
	 * The method to get the transition
	 * @returns {Transition} An instance of Transition
	 */
	getTransition()	{
		return this.transition;

	}

	/**
	 * The method to set the value to transition
	 * @param {Transition} transition An instance of Transition
	 */
	setTransition(transition)	{
		const Transition = require("./transition").MasterModel;
		if((transition != null) && (!(transition instanceof Transition)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: transition EXPECTED TYPE: Transition", null, null);
		}
		this.transition = transition;
		this.keyModified.set("transition", 1);

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
	MasterModel : Button,
	Button : Button
}

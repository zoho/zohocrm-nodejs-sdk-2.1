const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Comment{

	commentedBy;
	commentedTime;
	commentContent;
	id;
	keyModified = new Map();
	/**
	 * The method to get the commentedBy
	 * @returns {String} A String representing the commentedBy
	 */
	getCommentedBy()	{
		return this.commentedBy;

	}

	/**
	 * The method to set the value to commentedBy
	 * @param {String} commentedBy A String representing the commentedBy
	 */
	setCommentedBy(commentedBy)	{
		if((commentedBy != null) && (!(Object.prototype.toString.call(commentedBy) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: commentedBy EXPECTED TYPE: String", null, null);
		}
		this.commentedBy = commentedBy;
		this.keyModified.set("commented_by", 1);

	}

	/**
	 * The method to get the commentedTime
	 * @returns {Date} An instance of Date
	 */
	getCommentedTime()	{
		return this.commentedTime;

	}

	/**
	 * The method to set the value to commentedTime
	 * @param {Date} commentedTime An instance of Date
	 */
	setCommentedTime(commentedTime)	{
		if((commentedTime != null) && (!(commentedTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: commentedTime EXPECTED TYPE: Date", null, null);
		}
		this.commentedTime = commentedTime;
		this.keyModified.set("commented_time", 1);

	}

	/**
	 * The method to get the commentContent
	 * @returns {String} A String representing the commentContent
	 */
	getCommentContent()	{
		return this.commentContent;

	}

	/**
	 * The method to set the value to commentContent
	 * @param {String} commentContent A String representing the commentContent
	 */
	setCommentContent(commentContent)	{
		if((commentContent != null) && (!(Object.prototype.toString.call(commentContent) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: commentContent EXPECTED TYPE: String", null, null);
		}
		this.commentContent = commentContent;
		this.keyModified.set("comment_content", 1);

	}

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
	MasterModel : Comment,
	Comment : Comment
}

const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Mail{

	from;
	to;
	cc;
	bcc;
	replyTo;
	template;
	email;
	id;
	inReplyTo;
	scheduledTime;
	subject;
	content;
	paperType;
	viewType;
	mailFormat;
	consentEmail;
	orgEmail;
	attachments;
	inventoryDetails;
	dataSubjectRequest;
	keyModified = new Map();
	/**
	 * The method to get the from
	 * @returns {UserAddress} An instance of UserAddress
	 */
	getFrom()	{
		return this.from;

	}

	/**
	 * The method to set the value to from
	 * @param {UserAddress} from An instance of UserAddress
	 */
	setFrom(from)	{
		const UserAddress = require("./user_address").MasterModel;
		if((from != null) && (!(from instanceof UserAddress)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: from EXPECTED TYPE: UserAddress", null, null);
		}
		this.from = from;
		this.keyModified.set("from", 1);

	}

	/**
	 * The method to get the to
	 * @returns {Array} An Array representing the to
	 */
	getTo()	{
		return this.to;

	}

	/**
	 * The method to set the value to to
	 * @param {Array} to An Array representing the to
	 */
	setTo(to)	{
		if((to != null) && (!(Object.prototype.toString.call(to) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: to EXPECTED TYPE: Array", null, null);
		}
		this.to = to;
		this.keyModified.set("to", 1);

	}

	/**
	 * The method to get the cc
	 * @returns {Array} An Array representing the cc
	 */
	getCc()	{
		return this.cc;

	}

	/**
	 * The method to set the value to cc
	 * @param {Array} cc An Array representing the cc
	 */
	setCc(cc)	{
		if((cc != null) && (!(Object.prototype.toString.call(cc) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: cc EXPECTED TYPE: Array", null, null);
		}
		this.cc = cc;
		this.keyModified.set("cc", 1);

	}

	/**
	 * The method to get the bcc
	 * @returns {Array} An Array representing the bcc
	 */
	getBcc()	{
		return this.bcc;

	}

	/**
	 * The method to set the value to bcc
	 * @param {Array} bcc An Array representing the bcc
	 */
	setBcc(bcc)	{
		if((bcc != null) && (!(Object.prototype.toString.call(bcc) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: bcc EXPECTED TYPE: Array", null, null);
		}
		this.bcc = bcc;
		this.keyModified.set("bcc", 1);

	}

	/**
	 * The method to get the replyTo
	 * @returns {UserAddress} An instance of UserAddress
	 */
	getReplyTo()	{
		return this.replyTo;

	}

	/**
	 * The method to set the value to replyTo
	 * @param {UserAddress} replyTo An instance of UserAddress
	 */
	setReplyTo(replyTo)	{
		const UserAddress = require("./user_address").MasterModel;
		if((replyTo != null) && (!(replyTo instanceof UserAddress)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: replyTo EXPECTED TYPE: UserAddress", null, null);
		}
		this.replyTo = replyTo;
		this.keyModified.set("reply_to", 1);

	}

	/**
	 * The method to get the template
	 * @returns {Template} An instance of Template
	 */
	getTemplate()	{
		return this.template;

	}

	/**
	 * The method to set the value to template
	 * @param {Template} template An instance of Template
	 */
	setTemplate(template)	{
		this.template = template;
		this.keyModified.set("template", 1);

	}

	/**
	 * The method to get the email
	 * @returns {number} A number representing the email
	 */
	getEmail()	{
		return this.email;

	}

	/**
	 * The method to set the value to email
	 * @param {number} email A number representing the email
	 */
	setEmail(email)	{
		if((email != null) && (!(Object.prototype.toString.call(email) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: email EXPECTED TYPE: number", null, null);
		}
		this.email = email;
		this.keyModified.set("email", 1);

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
	 * The method to get the inReplyTo
	 * @returns {String} A String representing the inReplyTo
	 */
	getInReplyTo()	{
		return this.inReplyTo;

	}

	/**
	 * The method to set the value to inReplyTo
	 * @param {String} inReplyTo A String representing the inReplyTo
	 */
	setInReplyTo(inReplyTo)	{
		if((inReplyTo != null) && (!(Object.prototype.toString.call(inReplyTo) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: inReplyTo EXPECTED TYPE: String", null, null);
		}
		this.inReplyTo = inReplyTo;
		this.keyModified.set("in_reply_to", 1);

	}

	/**
	 * The method to get the scheduledTime
	 * @returns {Date} An instance of Date
	 */
	getScheduledTime()	{
		return this.scheduledTime;

	}

	/**
	 * The method to set the value to scheduledTime
	 * @param {Date} scheduledTime An instance of Date
	 */
	setScheduledTime(scheduledTime)	{
		if((scheduledTime != null) && (!(scheduledTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: scheduledTime EXPECTED TYPE: Date", null, null);
		}
		this.scheduledTime = scheduledTime;
		this.keyModified.set("scheduled_time", 1);

	}

	/**
	 * The method to get the subject
	 * @returns {String} A String representing the subject
	 */
	getSubject()	{
		return this.subject;

	}

	/**
	 * The method to set the value to subject
	 * @param {String} subject A String representing the subject
	 */
	setSubject(subject)	{
		if((subject != null) && (!(Object.prototype.toString.call(subject) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: subject EXPECTED TYPE: String", null, null);
		}
		this.subject = subject;
		this.keyModified.set("subject", 1);

	}

	/**
	 * The method to get the content
	 * @returns {String} A String representing the content
	 */
	getContent()	{
		return this.content;

	}

	/**
	 * The method to set the value to content
	 * @param {String} content A String representing the content
	 */
	setContent(content)	{
		if((content != null) && (!(Object.prototype.toString.call(content) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: content EXPECTED TYPE: String", null, null);
		}
		this.content = content;
		this.keyModified.set("content", 1);

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
	 * The method to get the mailFormat
	 * @returns {String} A String representing the mailFormat
	 */
	getMailFormat()	{
		return this.mailFormat;

	}

	/**
	 * The method to set the value to mailFormat
	 * @param {String} mailFormat A String representing the mailFormat
	 */
	setMailFormat(mailFormat)	{
		if((mailFormat != null) && (!(Object.prototype.toString.call(mailFormat) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: mailFormat EXPECTED TYPE: String", null, null);
		}
		this.mailFormat = mailFormat;
		this.keyModified.set("mail_format", 1);

	}

	/**
	 * The method to get the consentEmail
	 * @returns {Boolean} A Boolean representing the consentEmail
	 */
	getConsentEmail()	{
		return this.consentEmail;

	}

	/**
	 * The method to set the value to consentEmail
	 * @param {Boolean} consentEmail A Boolean representing the consentEmail
	 */
	setConsentEmail(consentEmail)	{
		if((consentEmail != null) && (!(Object.prototype.toString.call(consentEmail) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: consentEmail EXPECTED TYPE: Boolean", null, null);
		}
		this.consentEmail = consentEmail;
		this.keyModified.set("consent_email", 1);

	}

	/**
	 * The method to get the orgEmail
	 * @returns {Boolean} A Boolean representing the orgEmail
	 */
	getOrgEmail()	{
		return this.orgEmail;

	}

	/**
	 * The method to set the value to orgEmail
	 * @param {Boolean} orgEmail A Boolean representing the orgEmail
	 */
	setOrgEmail(orgEmail)	{
		if((orgEmail != null) && (!(Object.prototype.toString.call(orgEmail) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: orgEmail EXPECTED TYPE: Boolean", null, null);
		}
		this.orgEmail = orgEmail;
		this.keyModified.set("org_email", 1);

	}

	/**
	 * The method to get the attachments
	 * @returns {Array} An Array representing the attachments
	 */
	getAttachments()	{
		return this.attachments;

	}

	/**
	 * The method to set the value to attachments
	 * @param {Array} attachments An Array representing the attachments
	 */
	setAttachments(attachments)	{
		if((attachments != null) && (!(Object.prototype.toString.call(attachments) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: attachments EXPECTED TYPE: Array", null, null);
		}
		this.attachments = attachments;
		this.keyModified.set("attachments", 1);

	}

	/**
	 * The method to get the inventoryDetails
	 * @returns {InventoryDetails} An instance of InventoryDetails
	 */
	getInventoryDetails()	{
		return this.inventoryDetails;

	}

	/**
	 * The method to set the value to inventoryDetails
	 * @param {InventoryDetails} inventoryDetails An instance of InventoryDetails
	 */
	setInventoryDetails(inventoryDetails)	{
		const InventoryDetails = require("./inventory_details").MasterModel;
		if((inventoryDetails != null) && (!(inventoryDetails instanceof InventoryDetails)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: inventoryDetails EXPECTED TYPE: InventoryDetails", null, null);
		}
		this.inventoryDetails = inventoryDetails;
		this.keyModified.set("inventory_details", 1);

	}

	/**
	 * The method to get the dataSubjectRequest
	 * @returns {DataSubjectRequest} An instance of DataSubjectRequest
	 */
	getDataSubjectRequest()	{
		return this.dataSubjectRequest;

	}

	/**
	 * The method to set the value to dataSubjectRequest
	 * @param {DataSubjectRequest} dataSubjectRequest An instance of DataSubjectRequest
	 */
	setDataSubjectRequest(dataSubjectRequest)	{
		const DataSubjectRequest = require("./data_subject_request").MasterModel;
		if((dataSubjectRequest != null) && (!(dataSubjectRequest instanceof DataSubjectRequest)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: dataSubjectRequest EXPECTED TYPE: DataSubjectRequest", null, null);
		}
		this.dataSubjectRequest = dataSubjectRequest;
		this.keyModified.set("data_subject_request", 1);

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
	MasterModel : Mail,
	Mail : Mail
}

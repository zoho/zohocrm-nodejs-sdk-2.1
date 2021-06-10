const Choice = require("../../../../../../utils/util/choice").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Field{

	systemMandatory;
	webhook;
	private1;
	layouts;
	profiles;
	sequenceNumber;
	content;
	columnName;
	transitionSequence;
	personalityName;
	message;
	mandatory;
	criteria;
	relatedDetails;
	jsonType;
	crypt;
	fieldLabel;
	tooltip;
	createdSource;
	fieldReadOnly;
	displayLabel;
	uiType;
	readOnly;
	associationDetails;
	quickSequenceNumber;
	businesscardSupported;
	multiModuleLookup;
	currency;
	id;
	customField;
	lookup;
	filterable;
	visible;
	pickListValuesSortedLexically;
	length;
	viewType;
	subform;
	apiName;
	sortable;
	unique;
	dataType;
	formula;
	decimalPlace;
	massUpdate;
	blueprintSupported;
	multiselectlookup;
	multiuserlookup;
	pickListValues;
	autoNumber;
	defaultValue;
	validationRule;
	convertMapping;
	type;
	external;
	historyTracking;
	displayType;
	keyModified = new Map();
	/**
	 * The method to get the systemMandatory
	 * @returns {Boolean} A Boolean representing the systemMandatory
	 */
	getSystemMandatory()	{
		return this.systemMandatory;

	}

	/**
	 * The method to set the value to systemMandatory
	 * @param {Boolean} systemMandatory A Boolean representing the systemMandatory
	 */
	setSystemMandatory(systemMandatory)	{
		if((systemMandatory != null) && (!(Object.prototype.toString.call(systemMandatory) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: systemMandatory EXPECTED TYPE: Boolean", null, null);
		}
		this.systemMandatory = systemMandatory;
		this.keyModified.set("system_mandatory", 1);

	}

	/**
	 * The method to get the webhook
	 * @returns {Boolean} A Boolean representing the webhook
	 */
	getWebhook()	{
		return this.webhook;

	}

	/**
	 * The method to set the value to webhook
	 * @param {Boolean} webhook A Boolean representing the webhook
	 */
	setWebhook(webhook)	{
		if((webhook != null) && (!(Object.prototype.toString.call(webhook) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: webhook EXPECTED TYPE: Boolean", null, null);
		}
		this.webhook = webhook;
		this.keyModified.set("webhook", 1);

	}

	/**
	 * The method to get the private
	 * @returns {Private} An instance of Private
	 */
	getPrivate()	{
		return this.private1;

	}

	/**
	 * The method to set the value to private
	 * @param {Private} private1 An instance of Private
	 */
	setPrivate(private1)	{
		const Private = require("./private").MasterModel;
		if((private1 != null) && (!(private1 instanceof Private)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: private1 EXPECTED TYPE: Private", null, null);
		}
		this.private1 = private1;
		this.keyModified.set("private", 1);

	}

	/**
	 * The method to get the layouts
	 * @returns {Layout} An instance of Layout
	 */
	getLayouts()	{
		return this.layouts;

	}

	/**
	 * The method to set the value to layouts
	 * @param {Layout} layouts An instance of Layout
	 */
	setLayouts(layouts)	{
		const Layout = require("../layouts/layout").MasterModel;
		if((layouts != null) && (!(layouts instanceof Layout)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: layouts EXPECTED TYPE: Layout", null, null);
		}
		this.layouts = layouts;
		this.keyModified.set("layouts", 1);

	}

	/**
	 * The method to get the profiles
	 * @returns {Array} An Array representing the profiles
	 */
	getProfiles()	{
		return this.profiles;

	}

	/**
	 * The method to set the value to profiles
	 * @param {Array} profiles An Array representing the profiles
	 */
	setProfiles(profiles)	{
		if((profiles != null) && (!(Object.prototype.toString.call(profiles) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: profiles EXPECTED TYPE: Array", null, null);
		}
		this.profiles = profiles;
		this.keyModified.set("profiles", 1);

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
	 * The method to get the columnName
	 * @returns {String} A String representing the columnName
	 */
	getColumnName()	{
		return this.columnName;

	}

	/**
	 * The method to set the value to columnName
	 * @param {String} columnName A String representing the columnName
	 */
	setColumnName(columnName)	{
		if((columnName != null) && (!(Object.prototype.toString.call(columnName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: columnName EXPECTED TYPE: String", null, null);
		}
		this.columnName = columnName;
		this.keyModified.set("column_name", 1);

	}

	/**
	 * The method to get the transitionSequence
	 * @returns {number} A number representing the transitionSequence
	 */
	getTransitionSequence()	{
		return this.transitionSequence;

	}

	/**
	 * The method to set the value to transitionSequence
	 * @param {number} transitionSequence A number representing the transitionSequence
	 */
	setTransitionSequence(transitionSequence)	{
		if((transitionSequence != null) && (!(Object.prototype.toString.call(transitionSequence) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: transitionSequence EXPECTED TYPE: number", null, null);
		}
		this.transitionSequence = transitionSequence;
		this.keyModified.set("transition_sequence", 1);

	}

	/**
	 * The method to get the personalityName
	 * @returns {String} A String representing the personalityName
	 */
	getPersonalityName()	{
		return this.personalityName;

	}

	/**
	 * The method to set the value to personalityName
	 * @param {String} personalityName A String representing the personalityName
	 */
	setPersonalityName(personalityName)	{
		if((personalityName != null) && (!(Object.prototype.toString.call(personalityName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: personalityName EXPECTED TYPE: String", null, null);
		}
		this.personalityName = personalityName;
		this.keyModified.set("personality_name", 1);

	}

	/**
	 * The method to get the message
	 * @returns {String} A String representing the message
	 */
	getMessage()	{
		return this.message;

	}

	/**
	 * The method to set the value to message
	 * @param {String} message A String representing the message
	 */
	setMessage(message)	{
		if((message != null) && (!(Object.prototype.toString.call(message) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: message EXPECTED TYPE: String", null, null);
		}
		this.message = message;
		this.keyModified.set("message", 1);

	}

	/**
	 * The method to get the mandatory
	 * @returns {Boolean} A Boolean representing the mandatory
	 */
	getMandatory()	{
		return this.mandatory;

	}

	/**
	 * The method to set the value to mandatory
	 * @param {Boolean} mandatory A Boolean representing the mandatory
	 */
	setMandatory(mandatory)	{
		if((mandatory != null) && (!(Object.prototype.toString.call(mandatory) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: mandatory EXPECTED TYPE: Boolean", null, null);
		}
		this.mandatory = mandatory;
		this.keyModified.set("mandatory", 1);

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
	 * The method to get the relatedDetails
	 * @returns {RelatedDetails} An instance of RelatedDetails
	 */
	getRelatedDetails()	{
		return this.relatedDetails;

	}

	/**
	 * The method to set the value to relatedDetails
	 * @param {RelatedDetails} relatedDetails An instance of RelatedDetails
	 */
	setRelatedDetails(relatedDetails)	{
		const RelatedDetails = require("./related_details").MasterModel;
		if((relatedDetails != null) && (!(relatedDetails instanceof RelatedDetails)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: relatedDetails EXPECTED TYPE: RelatedDetails", null, null);
		}
		this.relatedDetails = relatedDetails;
		this.keyModified.set("related_details", 1);

	}

	/**
	 * The method to get the jsonType
	 * @returns {String} A String representing the jsonType
	 */
	getJsonType()	{
		return this.jsonType;

	}

	/**
	 * The method to set the value to jsonType
	 * @param {String} jsonType A String representing the jsonType
	 */
	setJsonType(jsonType)	{
		if((jsonType != null) && (!(Object.prototype.toString.call(jsonType) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: jsonType EXPECTED TYPE: String", null, null);
		}
		this.jsonType = jsonType;
		this.keyModified.set("json_type", 1);

	}

	/**
	 * The method to get the crypt
	 * @returns {Crypt} An instance of Crypt
	 */
	getCrypt()	{
		return this.crypt;

	}

	/**
	 * The method to set the value to crypt
	 * @param {Crypt} crypt An instance of Crypt
	 */
	setCrypt(crypt)	{
		const Crypt = require("./crypt").MasterModel;
		if((crypt != null) && (!(crypt instanceof Crypt)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: crypt EXPECTED TYPE: Crypt", null, null);
		}
		this.crypt = crypt;
		this.keyModified.set("crypt", 1);

	}

	/**
	 * The method to get the fieldLabel
	 * @returns {String} A String representing the fieldLabel
	 */
	getFieldLabel()	{
		return this.fieldLabel;

	}

	/**
	 * The method to set the value to fieldLabel
	 * @param {String} fieldLabel A String representing the fieldLabel
	 */
	setFieldLabel(fieldLabel)	{
		if((fieldLabel != null) && (!(Object.prototype.toString.call(fieldLabel) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldLabel EXPECTED TYPE: String", null, null);
		}
		this.fieldLabel = fieldLabel;
		this.keyModified.set("field_label", 1);

	}

	/**
	 * The method to get the tooltip
	 * @returns {ToolTip} An instance of ToolTip
	 */
	getTooltip()	{
		return this.tooltip;

	}

	/**
	 * The method to set the value to tooltip
	 * @param {ToolTip} tooltip An instance of ToolTip
	 */
	setTooltip(tooltip)	{
		const ToolTip = require("./tool_tip").MasterModel;
		if((tooltip != null) && (!(tooltip instanceof ToolTip)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: tooltip EXPECTED TYPE: ToolTip", null, null);
		}
		this.tooltip = tooltip;
		this.keyModified.set("tooltip", 1);

	}

	/**
	 * The method to get the createdSource
	 * @returns {String} A String representing the createdSource
	 */
	getCreatedSource()	{
		return this.createdSource;

	}

	/**
	 * The method to set the value to createdSource
	 * @param {String} createdSource A String representing the createdSource
	 */
	setCreatedSource(createdSource)	{
		if((createdSource != null) && (!(Object.prototype.toString.call(createdSource) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: createdSource EXPECTED TYPE: String", null, null);
		}
		this.createdSource = createdSource;
		this.keyModified.set("created_source", 1);

	}

	/**
	 * The method to get the fieldReadOnly
	 * @returns {Boolean} A Boolean representing the fieldReadOnly
	 */
	getFieldReadOnly()	{
		return this.fieldReadOnly;

	}

	/**
	 * The method to set the value to fieldReadOnly
	 * @param {Boolean} fieldReadOnly A Boolean representing the fieldReadOnly
	 */
	setFieldReadOnly(fieldReadOnly)	{
		if((fieldReadOnly != null) && (!(Object.prototype.toString.call(fieldReadOnly) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: fieldReadOnly EXPECTED TYPE: Boolean", null, null);
		}
		this.fieldReadOnly = fieldReadOnly;
		this.keyModified.set("field_read_only", 1);

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
	 * The method to get the uiType
	 * @returns {number} A number representing the uiType
	 */
	getUiType()	{
		return this.uiType;

	}

	/**
	 * The method to set the value to uiType
	 * @param {number} uiType A number representing the uiType
	 */
	setUiType(uiType)	{
		if((uiType != null) && (!(Object.prototype.toString.call(uiType) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: uiType EXPECTED TYPE: number", null, null);
		}
		this.uiType = uiType;
		this.keyModified.set("ui_type", 1);

	}

	/**
	 * The method to get the readOnly
	 * @returns {Boolean} A Boolean representing the readOnly
	 */
	getReadOnly()	{
		return this.readOnly;

	}

	/**
	 * The method to set the value to readOnly
	 * @param {Boolean} readOnly A Boolean representing the readOnly
	 */
	setReadOnly(readOnly)	{
		if((readOnly != null) && (!(Object.prototype.toString.call(readOnly) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: readOnly EXPECTED TYPE: Boolean", null, null);
		}
		this.readOnly = readOnly;
		this.keyModified.set("read_only", 1);

	}

	/**
	 * The method to get the associationDetails
	 * @returns {AssociationDetails} An instance of AssociationDetails
	 */
	getAssociationDetails()	{
		return this.associationDetails;

	}

	/**
	 * The method to set the value to associationDetails
	 * @param {AssociationDetails} associationDetails An instance of AssociationDetails
	 */
	setAssociationDetails(associationDetails)	{
		const AssociationDetails = require("./association_details").MasterModel;
		if((associationDetails != null) && (!(associationDetails instanceof AssociationDetails)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: associationDetails EXPECTED TYPE: AssociationDetails", null, null);
		}
		this.associationDetails = associationDetails;
		this.keyModified.set("association_details", 1);

	}

	/**
	 * The method to get the quickSequenceNumber
	 * @returns {number} A number representing the quickSequenceNumber
	 */
	getQuickSequenceNumber()	{
		return this.quickSequenceNumber;

	}

	/**
	 * The method to set the value to quickSequenceNumber
	 * @param {number} quickSequenceNumber A number representing the quickSequenceNumber
	 */
	setQuickSequenceNumber(quickSequenceNumber)	{
		if((quickSequenceNumber != null) && (!(Object.prototype.toString.call(quickSequenceNumber) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: quickSequenceNumber EXPECTED TYPE: number", null, null);
		}
		this.quickSequenceNumber = quickSequenceNumber;
		this.keyModified.set("quick_sequence_number", 1);

	}

	/**
	 * The method to get the businesscardSupported
	 * @returns {Boolean} A Boolean representing the businesscardSupported
	 */
	getBusinesscardSupported()	{
		return this.businesscardSupported;

	}

	/**
	 * The method to set the value to businesscardSupported
	 * @param {Boolean} businesscardSupported A Boolean representing the businesscardSupported
	 */
	setBusinesscardSupported(businesscardSupported)	{
		if((businesscardSupported != null) && (!(Object.prototype.toString.call(businesscardSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: businesscardSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.businesscardSupported = businesscardSupported;
		this.keyModified.set("businesscard_supported", 1);

	}

	/**
	 * The method to get the multiModuleLookup
	 * @returns {MultiModuleLookup} An instance of MultiModuleLookup
	 */
	getMultiModuleLookup()	{
		return this.multiModuleLookup;

	}

	/**
	 * The method to set the value to multiModuleLookup
	 * @param {MultiModuleLookup} multiModuleLookup An instance of MultiModuleLookup
	 */
	setMultiModuleLookup(multiModuleLookup)	{
		const MultiModuleLookup = require("./multi_module_lookup").MasterModel;
		if((multiModuleLookup != null) && (!(multiModuleLookup instanceof MultiModuleLookup)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: multiModuleLookup EXPECTED TYPE: MultiModuleLookup", null, null);
		}
		this.multiModuleLookup = multiModuleLookup;
		this.keyModified.set("multi_module_lookup", 1);

	}

	/**
	 * The method to get the currency
	 * @returns {Currency} An instance of Currency
	 */
	getCurrency()	{
		return this.currency;

	}

	/**
	 * The method to set the value to currency
	 * @param {Currency} currency An instance of Currency
	 */
	setCurrency(currency)	{
		const Currency = require("./currency").MasterModel;
		if((currency != null) && (!(currency instanceof Currency)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: currency EXPECTED TYPE: Currency", null, null);
		}
		this.currency = currency;
		this.keyModified.set("currency", 1);

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
	 * The method to get the customField
	 * @returns {Boolean} A Boolean representing the customField
	 */
	getCustomField()	{
		return this.customField;

	}

	/**
	 * The method to set the value to customField
	 * @param {Boolean} customField A Boolean representing the customField
	 */
	setCustomField(customField)	{
		if((customField != null) && (!(Object.prototype.toString.call(customField) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: customField EXPECTED TYPE: Boolean", null, null);
		}
		this.customField = customField;
		this.keyModified.set("custom_field", 1);

	}

	/**
	 * The method to get the lookup
	 * @returns {Module} An instance of Module
	 */
	getLookup()	{
		return this.lookup;

	}

	/**
	 * The method to set the value to lookup
	 * @param {Module} lookup An instance of Module
	 */
	setLookup(lookup)	{
		const Module = require("./module").MasterModel;
		if((lookup != null) && (!(lookup instanceof Module)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: lookup EXPECTED TYPE: Module", null, null);
		}
		this.lookup = lookup;
		this.keyModified.set("lookup", 1);

	}

	/**
	 * The method to get the filterable
	 * @returns {Boolean} A Boolean representing the filterable
	 */
	getFilterable()	{
		return this.filterable;

	}

	/**
	 * The method to set the value to filterable
	 * @param {Boolean} filterable A Boolean representing the filterable
	 */
	setFilterable(filterable)	{
		if((filterable != null) && (!(Object.prototype.toString.call(filterable) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: filterable EXPECTED TYPE: Boolean", null, null);
		}
		this.filterable = filterable;
		this.keyModified.set("filterable", 1);

	}

	/**
	 * The method to get the visible
	 * @returns {Boolean} A Boolean representing the visible
	 */
	getVisible()	{
		return this.visible;

	}

	/**
	 * The method to set the value to visible
	 * @param {Boolean} visible A Boolean representing the visible
	 */
	setVisible(visible)	{
		if((visible != null) && (!(Object.prototype.toString.call(visible) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: visible EXPECTED TYPE: Boolean", null, null);
		}
		this.visible = visible;
		this.keyModified.set("visible", 1);

	}

	/**
	 * The method to get the pickListValuesSortedLexically
	 * @returns {Boolean} A Boolean representing the pickListValuesSortedLexically
	 */
	getPickListValuesSortedLexically()	{
		return this.pickListValuesSortedLexically;

	}

	/**
	 * The method to set the value to pickListValuesSortedLexically
	 * @param {Boolean} pickListValuesSortedLexically A Boolean representing the pickListValuesSortedLexically
	 */
	setPickListValuesSortedLexically(pickListValuesSortedLexically)	{
		if((pickListValuesSortedLexically != null) && (!(Object.prototype.toString.call(pickListValuesSortedLexically) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: pickListValuesSortedLexically EXPECTED TYPE: Boolean", null, null);
		}
		this.pickListValuesSortedLexically = pickListValuesSortedLexically;
		this.keyModified.set("pick_list_values_sorted_lexically", 1);

	}

	/**
	 * The method to get the length
	 * @returns {number} A number representing the length
	 */
	getLength()	{
		return this.length;

	}

	/**
	 * The method to set the value to length
	 * @param {number} length A number representing the length
	 */
	setLength(length)	{
		if((length != null) && (!(Object.prototype.toString.call(length) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: length EXPECTED TYPE: number", null, null);
		}
		this.length = length;
		this.keyModified.set("length", 1);

	}

	/**
	 * The method to get the viewType
	 * @returns {ViewType} An instance of ViewType
	 */
	getViewType()	{
		return this.viewType;

	}

	/**
	 * The method to set the value to viewType
	 * @param {ViewType} viewType An instance of ViewType
	 */
	setViewType(viewType)	{
		const ViewType = require("./view_type").MasterModel;
		if((viewType != null) && (!(viewType instanceof ViewType)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: viewType EXPECTED TYPE: ViewType", null, null);
		}
		this.viewType = viewType;
		this.keyModified.set("view_type", 1);

	}

	/**
	 * The method to get the subform
	 * @returns {Module} An instance of Module
	 */
	getSubform()	{
		return this.subform;

	}

	/**
	 * The method to set the value to subform
	 * @param {Module} subform An instance of Module
	 */
	setSubform(subform)	{
		const Module = require("./module").MasterModel;
		if((subform != null) && (!(subform instanceof Module)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: subform EXPECTED TYPE: Module", null, null);
		}
		this.subform = subform;
		this.keyModified.set("subform", 1);

	}

	/**
	 * The method to get the apiName
	 * @returns {String} A String representing the apiName
	 */
	getAPIName()	{
		return this.apiName;

	}

	/**
	 * The method to set the value to apiName
	 * @param {String} apiName A String representing the apiName
	 */
	setAPIName(apiName)	{
		if((apiName != null) && (!(Object.prototype.toString.call(apiName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: apiName EXPECTED TYPE: String", null, null);
		}
		this.apiName = apiName;
		this.keyModified.set("api_name", 1);

	}

	/**
	 * The method to get the sortable
	 * @returns {Boolean} A Boolean representing the sortable
	 */
	getSortable()	{
		return this.sortable;

	}

	/**
	 * The method to set the value to sortable
	 * @param {Boolean} sortable A Boolean representing the sortable
	 */
	setSortable(sortable)	{
		if((sortable != null) && (!(Object.prototype.toString.call(sortable) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: sortable EXPECTED TYPE: Boolean", null, null);
		}
		this.sortable = sortable;
		this.keyModified.set("sortable", 1);

	}

	/**
	 * The method to get the unique
	 * @returns {Unique} An instance of Unique
	 */
	getUnique()	{
		return this.unique;

	}

	/**
	 * The method to set the value to unique
	 * @param {Unique} unique An instance of Unique
	 */
	setUnique(unique)	{
		const Unique = require("./unique").MasterModel;
		if((unique != null) && (!(unique instanceof Unique)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: unique EXPECTED TYPE: Unique", null, null);
		}
		this.unique = unique;
		this.keyModified.set("unique", 1);

	}

	/**
	 * The method to get the dataType
	 * @returns {String} A String representing the dataType
	 */
	getDataType()	{
		return this.dataType;

	}

	/**
	 * The method to set the value to dataType
	 * @param {String} dataType A String representing the dataType
	 */
	setDataType(dataType)	{
		if((dataType != null) && (!(Object.prototype.toString.call(dataType) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: dataType EXPECTED TYPE: String", null, null);
		}
		this.dataType = dataType;
		this.keyModified.set("data_type", 1);

	}

	/**
	 * The method to get the formula
	 * @returns {Formula} An instance of Formula
	 */
	getFormula()	{
		return this.formula;

	}

	/**
	 * The method to set the value to formula
	 * @param {Formula} formula An instance of Formula
	 */
	setFormula(formula)	{
		const Formula = require("./formula").MasterModel;
		if((formula != null) && (!(formula instanceof Formula)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: formula EXPECTED TYPE: Formula", null, null);
		}
		this.formula = formula;
		this.keyModified.set("formula", 1);

	}

	/**
	 * The method to get the decimalPlace
	 * @returns {number} A number representing the decimalPlace
	 */
	getDecimalPlace()	{
		return this.decimalPlace;

	}

	/**
	 * The method to set the value to decimalPlace
	 * @param {number} decimalPlace A number representing the decimalPlace
	 */
	setDecimalPlace(decimalPlace)	{
		if((decimalPlace != null) && (!(Object.prototype.toString.call(decimalPlace) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: decimalPlace EXPECTED TYPE: number", null, null);
		}
		this.decimalPlace = decimalPlace;
		this.keyModified.set("decimal_place", 1);

	}

	/**
	 * The method to get the massUpdate
	 * @returns {Boolean} A Boolean representing the massUpdate
	 */
	getMassUpdate()	{
		return this.massUpdate;

	}

	/**
	 * The method to set the value to massUpdate
	 * @param {Boolean} massUpdate A Boolean representing the massUpdate
	 */
	setMassUpdate(massUpdate)	{
		if((massUpdate != null) && (!(Object.prototype.toString.call(massUpdate) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: massUpdate EXPECTED TYPE: Boolean", null, null);
		}
		this.massUpdate = massUpdate;
		this.keyModified.set("mass_update", 1);

	}

	/**
	 * The method to get the blueprintSupported
	 * @returns {Boolean} A Boolean representing the blueprintSupported
	 */
	getBlueprintSupported()	{
		return this.blueprintSupported;

	}

	/**
	 * The method to set the value to blueprintSupported
	 * @param {Boolean} blueprintSupported A Boolean representing the blueprintSupported
	 */
	setBlueprintSupported(blueprintSupported)	{
		if((blueprintSupported != null) && (!(Object.prototype.toString.call(blueprintSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: blueprintSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.blueprintSupported = blueprintSupported;
		this.keyModified.set("blueprint_supported", 1);

	}

	/**
	 * The method to get the multiselectlookup
	 * @returns {MultiSelectLookup} An instance of MultiSelectLookup
	 */
	getMultiselectlookup()	{
		return this.multiselectlookup;

	}

	/**
	 * The method to set the value to multiselectlookup
	 * @param {MultiSelectLookup} multiselectlookup An instance of MultiSelectLookup
	 */
	setMultiselectlookup(multiselectlookup)	{
		const MultiSelectLookup = require("./multi_select_lookup").MasterModel;
		if((multiselectlookup != null) && (!(multiselectlookup instanceof MultiSelectLookup)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: multiselectlookup EXPECTED TYPE: MultiSelectLookup", null, null);
		}
		this.multiselectlookup = multiselectlookup;
		this.keyModified.set("multiselectlookup", 1);

	}

	/**
	 * The method to get the multiuserlookup
	 * @returns {MultiUserLookup} An instance of MultiUserLookup
	 */
	getMultiuserlookup()	{
		return this.multiuserlookup;

	}

	/**
	 * The method to set the value to multiuserlookup
	 * @param {MultiUserLookup} multiuserlookup An instance of MultiUserLookup
	 */
	setMultiuserlookup(multiuserlookup)	{
		const MultiUserLookup = require("./multi_user_lookup").MasterModel;
		if((multiuserlookup != null) && (!(multiuserlookup instanceof MultiUserLookup)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: multiuserlookup EXPECTED TYPE: MultiUserLookup", null, null);
		}
		this.multiuserlookup = multiuserlookup;
		this.keyModified.set("multiuserlookup", 1);

	}

	/**
	 * The method to get the pickListValues
	 * @returns {Array} An Array representing the pickListValues
	 */
	getPickListValues()	{
		return this.pickListValues;

	}

	/**
	 * The method to set the value to pickListValues
	 * @param {Array} pickListValues An Array representing the pickListValues
	 */
	setPickListValues(pickListValues)	{
		if((pickListValues != null) && (!(Object.prototype.toString.call(pickListValues) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: pickListValues EXPECTED TYPE: Array", null, null);
		}
		this.pickListValues = pickListValues;
		this.keyModified.set("pick_list_values", 1);

	}

	/**
	 * The method to get the autoNumber
	 * @returns {AutoNumber} An instance of AutoNumber
	 */
	getAutoNumber()	{
		return this.autoNumber;

	}

	/**
	 * The method to set the value to autoNumber
	 * @param {AutoNumber} autoNumber An instance of AutoNumber
	 */
	setAutoNumber(autoNumber)	{
		const AutoNumber = require("./auto_number").MasterModel;
		if((autoNumber != null) && (!(autoNumber instanceof AutoNumber)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: autoNumber EXPECTED TYPE: AutoNumber", null, null);
		}
		this.autoNumber = autoNumber;
		this.keyModified.set("auto_number", 1);

	}

	/**
	 * The method to get the defaultValue
	 * @returns {String} A String representing the defaultValue
	 */
	getDefaultValue()	{
		return this.defaultValue;

	}

	/**
	 * The method to set the value to defaultValue
	 * @param {String} defaultValue A String representing the defaultValue
	 */
	setDefaultValue(defaultValue)	{
		if((defaultValue != null) && (!(Object.prototype.toString.call(defaultValue) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: defaultValue EXPECTED TYPE: String", null, null);
		}
		this.defaultValue = defaultValue;
		this.keyModified.set("default_value", 1);

	}

	/**
	 * The method to get the validationRule
	 * @returns {Map} A Map representing the validationRule
	 */
	getValidationRule()	{
		return this.validationRule;

	}

	/**
	 * The method to set the value to validationRule
	 * @param {Map} validationRule A Map representing the validationRule
	 */
	setValidationRule(validationRule)	{
		if((validationRule != null) && (!(Object.prototype.toString.call(validationRule) == "[object Map]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: validationRule EXPECTED TYPE: Map", null, null);
		}
		this.validationRule = validationRule;
		this.keyModified.set("validation_rule", 1);

	}

	/**
	 * The method to get the convertMapping
	 * @returns {Map} A Map representing the convertMapping
	 */
	getConvertMapping()	{
		return this.convertMapping;

	}

	/**
	 * The method to set the value to convertMapping
	 * @param {Map} convertMapping A Map representing the convertMapping
	 */
	setConvertMapping(convertMapping)	{
		if((convertMapping != null) && (!(Object.prototype.toString.call(convertMapping) == "[object Map]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: convertMapping EXPECTED TYPE: Map", null, null);
		}
		this.convertMapping = convertMapping;
		this.keyModified.set("convert_mapping", 1);

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
	 * The method to get the external
	 * @returns {External} An instance of External
	 */
	getExternal()	{
		return this.external;

	}

	/**
	 * The method to set the value to external
	 * @param {External} external An instance of External
	 */
	setExternal(external)	{
		const External = require("./external").MasterModel;
		if((external != null) && (!(external instanceof External)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: external EXPECTED TYPE: External", null, null);
		}
		this.external = external;
		this.keyModified.set("external", 1);

	}

	/**
	 * The method to get the historyTracking
	 * @returns {HistoryTracking} An instance of HistoryTracking
	 */
	getHistoryTracking()	{
		return this.historyTracking;

	}

	/**
	 * The method to set the value to historyTracking
	 * @param {HistoryTracking} historyTracking An instance of HistoryTracking
	 */
	setHistoryTracking(historyTracking)	{
		const HistoryTracking = require("./history_tracking").MasterModel;
		if((historyTracking != null) && (!(historyTracking instanceof HistoryTracking)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: historyTracking EXPECTED TYPE: HistoryTracking", null, null);
		}
		this.historyTracking = historyTracking;
		this.keyModified.set("history_tracking", 1);

	}

	/**
	 * The method to get the displayType
	 * @returns {Choice} An instance of Choice
	 */
	getDisplayType()	{
		return this.displayType;

	}

	/**
	 * The method to set the value to displayType
	 * @param {Choice} displayType An instance of Choice
	 */
	setDisplayType(displayType)	{
		if((displayType != null) && (!(displayType instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: displayType EXPECTED TYPE: Choice", null, null);
		}
		this.displayType = displayType;
		this.keyModified.set("display_type", 1);

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
	MasterModel : Field,
	Field : Field
}

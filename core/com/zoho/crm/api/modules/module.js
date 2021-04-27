const Choice = require("../../../../../../utils/util/choice").MasterModel;
const Constants = require("../../../../../../utils/util/constants").MasterModel;
const SDKException = require("../exception/sdk_exception").MasterModel;

class Module{

	name;
	globalSearchSupported;
	kanbanView;
	deletable;
	description;
	creatable;
	filterStatus;
	inventoryTemplateSupported;
	modifiedTime;
	pluralLabel;
	presenceSubMenu;
	isblueprintsupported;
	triggersSupported;
	id;
	relatedListProperties;
	properties;
	onDemandProperties;
	perPage;
	visibility;
	visible;
	convertable;
	editable;
	emailtemplateSupport;
	profiles;
	filterSupported;
	displayField;
	searchLayoutFields;
	kanbanViewSupported;
	showAsTab;
	webLink;
	sequenceNumber;
	singularLabel;
	viewable;
	apiSupported;
	apiName;
	quickCreate;
	modifiedBy;
	generatedType;
	feedsRequired;
	scoringSupported;
	webformSupported;
	arguments1;
	moduleName;
	businessCardFieldLimit;
	customView;
	parentModule;
	territory;
	keyModified = new Map();
	/**
	 * The method to get the name
	 * @returns {String} A String representing the name
	 */
	getName()	{
		return this.name;

	}

	/**
	 * The method to set the value to name
	 * @param {String} name A String representing the name
	 */
	setName(name)	{
		if((name != null) && (!(Object.prototype.toString.call(name) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: name EXPECTED TYPE: String", null, null);
		}
		this.name = name;
		this.keyModified.set("name", 1);

	}

	/**
	 * The method to get the globalSearchSupported
	 * @returns {Boolean} A Boolean representing the globalSearchSupported
	 */
	getGlobalSearchSupported()	{
		return this.globalSearchSupported;

	}

	/**
	 * The method to set the value to globalSearchSupported
	 * @param {Boolean} globalSearchSupported A Boolean representing the globalSearchSupported
	 */
	setGlobalSearchSupported(globalSearchSupported)	{
		if((globalSearchSupported != null) && (!(Object.prototype.toString.call(globalSearchSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: globalSearchSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.globalSearchSupported = globalSearchSupported;
		this.keyModified.set("global_search_supported", 1);

	}

	/**
	 * The method to get the kanbanView
	 * @returns {Boolean} A Boolean representing the kanbanView
	 */
	getKanbanView()	{
		return this.kanbanView;

	}

	/**
	 * The method to set the value to kanbanView
	 * @param {Boolean} kanbanView A Boolean representing the kanbanView
	 */
	setKanbanView(kanbanView)	{
		if((kanbanView != null) && (!(Object.prototype.toString.call(kanbanView) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: kanbanView EXPECTED TYPE: Boolean", null, null);
		}
		this.kanbanView = kanbanView;
		this.keyModified.set("kanban_view", 1);

	}

	/**
	 * The method to get the deletable
	 * @returns {Boolean} A Boolean representing the deletable
	 */
	getDeletable()	{
		return this.deletable;

	}

	/**
	 * The method to set the value to deletable
	 * @param {Boolean} deletable A Boolean representing the deletable
	 */
	setDeletable(deletable)	{
		if((deletable != null) && (!(Object.prototype.toString.call(deletable) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: deletable EXPECTED TYPE: Boolean", null, null);
		}
		this.deletable = deletable;
		this.keyModified.set("deletable", 1);

	}

	/**
	 * The method to get the description
	 * @returns {String} A String representing the description
	 */
	getDescription()	{
		return this.description;

	}

	/**
	 * The method to set the value to description
	 * @param {String} description A String representing the description
	 */
	setDescription(description)	{
		if((description != null) && (!(Object.prototype.toString.call(description) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: description EXPECTED TYPE: String", null, null);
		}
		this.description = description;
		this.keyModified.set("description", 1);

	}

	/**
	 * The method to get the creatable
	 * @returns {Boolean} A Boolean representing the creatable
	 */
	getCreatable()	{
		return this.creatable;

	}

	/**
	 * The method to set the value to creatable
	 * @param {Boolean} creatable A Boolean representing the creatable
	 */
	setCreatable(creatable)	{
		if((creatable != null) && (!(Object.prototype.toString.call(creatable) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: creatable EXPECTED TYPE: Boolean", null, null);
		}
		this.creatable = creatable;
		this.keyModified.set("creatable", 1);

	}

	/**
	 * The method to get the filterStatus
	 * @returns {Boolean} A Boolean representing the filterStatus
	 */
	getFilterStatus()	{
		return this.filterStatus;

	}

	/**
	 * The method to set the value to filterStatus
	 * @param {Boolean} filterStatus A Boolean representing the filterStatus
	 */
	setFilterStatus(filterStatus)	{
		if((filterStatus != null) && (!(Object.prototype.toString.call(filterStatus) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: filterStatus EXPECTED TYPE: Boolean", null, null);
		}
		this.filterStatus = filterStatus;
		this.keyModified.set("filter_status", 1);

	}

	/**
	 * The method to get the inventoryTemplateSupported
	 * @returns {Boolean} A Boolean representing the inventoryTemplateSupported
	 */
	getInventoryTemplateSupported()	{
		return this.inventoryTemplateSupported;

	}

	/**
	 * The method to set the value to inventoryTemplateSupported
	 * @param {Boolean} inventoryTemplateSupported A Boolean representing the inventoryTemplateSupported
	 */
	setInventoryTemplateSupported(inventoryTemplateSupported)	{
		if((inventoryTemplateSupported != null) && (!(Object.prototype.toString.call(inventoryTemplateSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: inventoryTemplateSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.inventoryTemplateSupported = inventoryTemplateSupported;
		this.keyModified.set("inventory_template_supported", 1);

	}

	/**
	 * The method to get the modifiedTime
	 * @returns {Date} An instance of Date
	 */
	getModifiedTime()	{
		return this.modifiedTime;

	}

	/**
	 * The method to set the value to modifiedTime
	 * @param {Date} modifiedTime An instance of Date
	 */
	setModifiedTime(modifiedTime)	{
		if((modifiedTime != null) && (!(modifiedTime instanceof Date)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: modifiedTime EXPECTED TYPE: Date", null, null);
		}
		this.modifiedTime = modifiedTime;
		this.keyModified.set("modified_time", 1);

	}

	/**
	 * The method to get the pluralLabel
	 * @returns {String} A String representing the pluralLabel
	 */
	getPluralLabel()	{
		return this.pluralLabel;

	}

	/**
	 * The method to set the value to pluralLabel
	 * @param {String} pluralLabel A String representing the pluralLabel
	 */
	setPluralLabel(pluralLabel)	{
		if((pluralLabel != null) && (!(Object.prototype.toString.call(pluralLabel) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: pluralLabel EXPECTED TYPE: String", null, null);
		}
		this.pluralLabel = pluralLabel;
		this.keyModified.set("plural_label", 1);

	}

	/**
	 * The method to get the presenceSubMenu
	 * @returns {Boolean} A Boolean representing the presenceSubMenu
	 */
	getPresenceSubMenu()	{
		return this.presenceSubMenu;

	}

	/**
	 * The method to set the value to presenceSubMenu
	 * @param {Boolean} presenceSubMenu A Boolean representing the presenceSubMenu
	 */
	setPresenceSubMenu(presenceSubMenu)	{
		if((presenceSubMenu != null) && (!(Object.prototype.toString.call(presenceSubMenu) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: presenceSubMenu EXPECTED TYPE: Boolean", null, null);
		}
		this.presenceSubMenu = presenceSubMenu;
		this.keyModified.set("presence_sub_menu", 1);

	}

	/**
	 * The method to get the isblueprintsupported
	 * @returns {Boolean} A Boolean representing the isblueprintsupported
	 */
	getIsblueprintsupported()	{
		return this.isblueprintsupported;

	}

	/**
	 * The method to set the value to isblueprintsupported
	 * @param {Boolean} isblueprintsupported A Boolean representing the isblueprintsupported
	 */
	setIsblueprintsupported(isblueprintsupported)	{
		if((isblueprintsupported != null) && (!(Object.prototype.toString.call(isblueprintsupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: isblueprintsupported EXPECTED TYPE: Boolean", null, null);
		}
		this.isblueprintsupported = isblueprintsupported;
		this.keyModified.set("isBlueprintSupported", 1);

	}

	/**
	 * The method to get the triggersSupported
	 * @returns {Boolean} A Boolean representing the triggersSupported
	 */
	getTriggersSupported()	{
		return this.triggersSupported;

	}

	/**
	 * The method to set the value to triggersSupported
	 * @param {Boolean} triggersSupported A Boolean representing the triggersSupported
	 */
	setTriggersSupported(triggersSupported)	{
		if((triggersSupported != null) && (!(Object.prototype.toString.call(triggersSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: triggersSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.triggersSupported = triggersSupported;
		this.keyModified.set("triggers_supported", 1);

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
	 * The method to get the relatedListProperties
	 * @returns {RelatedListProperties} An instance of RelatedListProperties
	 */
	getRelatedListProperties()	{
		return this.relatedListProperties;

	}

	/**
	 * The method to set the value to relatedListProperties
	 * @param {RelatedListProperties} relatedListProperties An instance of RelatedListProperties
	 */
	setRelatedListProperties(relatedListProperties)	{
		const RelatedListProperties = require("./related_list_properties").MasterModel;
		if((relatedListProperties != null) && (!(relatedListProperties instanceof RelatedListProperties)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: relatedListProperties EXPECTED TYPE: RelatedListProperties", null, null);
		}
		this.relatedListProperties = relatedListProperties;
		this.keyModified.set("related_list_properties", 1);

	}

	/**
	 * The method to get the properties
	 * @returns {Array} An Array representing the properties
	 */
	getProperties()	{
		return this.properties;

	}

	/**
	 * The method to set the value to properties
	 * @param {Array} properties An Array representing the properties
	 */
	setProperties(properties)	{
		if((properties != null) && (!(Object.prototype.toString.call(properties) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: properties EXPECTED TYPE: Array", null, null);
		}
		this.properties = properties;
		this.keyModified.set("$properties", 1);

	}

	/**
	 * The method to get the onDemandProperties
	 * @returns {Array} An Array representing the onDemandProperties
	 */
	getOnDemandProperties()	{
		return this.onDemandProperties;

	}

	/**
	 * The method to set the value to onDemandProperties
	 * @param {Array} onDemandProperties An Array representing the onDemandProperties
	 */
	setOnDemandProperties(onDemandProperties)	{
		if((onDemandProperties != null) && (!(Object.prototype.toString.call(onDemandProperties) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: onDemandProperties EXPECTED TYPE: Array", null, null);
		}
		this.onDemandProperties = onDemandProperties;
		this.keyModified.set("$on_demand_properties", 1);

	}

	/**
	 * The method to get the perPage
	 * @returns {number} A number representing the perPage
	 */
	getPerPage()	{
		return this.perPage;

	}

	/**
	 * The method to set the value to perPage
	 * @param {number} perPage A number representing the perPage
	 */
	setPerPage(perPage)	{
		if((perPage != null) && (!(Object.prototype.toString.call(perPage) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: perPage EXPECTED TYPE: number", null, null);
		}
		this.perPage = perPage;
		this.keyModified.set("per_page", 1);

	}

	/**
	 * The method to get the visibility
	 * @returns {number} A number representing the visibility
	 */
	getVisibility()	{
		return this.visibility;

	}

	/**
	 * The method to set the value to visibility
	 * @param {number} visibility A number representing the visibility
	 */
	setVisibility(visibility)	{
		if((visibility != null) && (!(Object.prototype.toString.call(visibility) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: visibility EXPECTED TYPE: number", null, null);
		}
		this.visibility = visibility;
		this.keyModified.set("visibility", 1);

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
	 * The method to get the convertable
	 * @returns {Boolean} A Boolean representing the convertable
	 */
	getConvertable()	{
		return this.convertable;

	}

	/**
	 * The method to set the value to convertable
	 * @param {Boolean} convertable A Boolean representing the convertable
	 */
	setConvertable(convertable)	{
		if((convertable != null) && (!(Object.prototype.toString.call(convertable) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: convertable EXPECTED TYPE: Boolean", null, null);
		}
		this.convertable = convertable;
		this.keyModified.set("convertable", 1);

	}

	/**
	 * The method to get the editable
	 * @returns {Boolean} A Boolean representing the editable
	 */
	getEditable()	{
		return this.editable;

	}

	/**
	 * The method to set the value to editable
	 * @param {Boolean} editable A Boolean representing the editable
	 */
	setEditable(editable)	{
		if((editable != null) && (!(Object.prototype.toString.call(editable) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: editable EXPECTED TYPE: Boolean", null, null);
		}
		this.editable = editable;
		this.keyModified.set("editable", 1);

	}

	/**
	 * The method to get the emailtemplateSupport
	 * @returns {Boolean} A Boolean representing the emailtemplateSupport
	 */
	getEmailtemplateSupport()	{
		return this.emailtemplateSupport;

	}

	/**
	 * The method to set the value to emailtemplateSupport
	 * @param {Boolean} emailtemplateSupport A Boolean representing the emailtemplateSupport
	 */
	setEmailtemplateSupport(emailtemplateSupport)	{
		if((emailtemplateSupport != null) && (!(Object.prototype.toString.call(emailtemplateSupport) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: emailtemplateSupport EXPECTED TYPE: Boolean", null, null);
		}
		this.emailtemplateSupport = emailtemplateSupport;
		this.keyModified.set("emailTemplate_support", 1);

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
	 * The method to get the filterSupported
	 * @returns {Boolean} A Boolean representing the filterSupported
	 */
	getFilterSupported()	{
		return this.filterSupported;

	}

	/**
	 * The method to set the value to filterSupported
	 * @param {Boolean} filterSupported A Boolean representing the filterSupported
	 */
	setFilterSupported(filterSupported)	{
		if((filterSupported != null) && (!(Object.prototype.toString.call(filterSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: filterSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.filterSupported = filterSupported;
		this.keyModified.set("filter_supported", 1);

	}

	/**
	 * The method to get the displayField
	 * @returns {String} A String representing the displayField
	 */
	getDisplayField()	{
		return this.displayField;

	}

	/**
	 * The method to set the value to displayField
	 * @param {String} displayField A String representing the displayField
	 */
	setDisplayField(displayField)	{
		if((displayField != null) && (!(Object.prototype.toString.call(displayField) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: displayField EXPECTED TYPE: String", null, null);
		}
		this.displayField = displayField;
		this.keyModified.set("display_field", 1);

	}

	/**
	 * The method to get the searchLayoutFields
	 * @returns {Array} An Array representing the searchLayoutFields
	 */
	getSearchLayoutFields()	{
		return this.searchLayoutFields;

	}

	/**
	 * The method to set the value to searchLayoutFields
	 * @param {Array} searchLayoutFields An Array representing the searchLayoutFields
	 */
	setSearchLayoutFields(searchLayoutFields)	{
		if((searchLayoutFields != null) && (!(Object.prototype.toString.call(searchLayoutFields) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: searchLayoutFields EXPECTED TYPE: Array", null, null);
		}
		this.searchLayoutFields = searchLayoutFields;
		this.keyModified.set("search_layout_fields", 1);

	}

	/**
	 * The method to get the kanbanViewSupported
	 * @returns {Boolean} A Boolean representing the kanbanViewSupported
	 */
	getKanbanViewSupported()	{
		return this.kanbanViewSupported;

	}

	/**
	 * The method to set the value to kanbanViewSupported
	 * @param {Boolean} kanbanViewSupported A Boolean representing the kanbanViewSupported
	 */
	setKanbanViewSupported(kanbanViewSupported)	{
		if((kanbanViewSupported != null) && (!(Object.prototype.toString.call(kanbanViewSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: kanbanViewSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.kanbanViewSupported = kanbanViewSupported;
		this.keyModified.set("kanban_view_supported", 1);

	}

	/**
	 * The method to get the showAsTab
	 * @returns {Boolean} A Boolean representing the showAsTab
	 */
	getShowAsTab()	{
		return this.showAsTab;

	}

	/**
	 * The method to set the value to showAsTab
	 * @param {Boolean} showAsTab A Boolean representing the showAsTab
	 */
	setShowAsTab(showAsTab)	{
		if((showAsTab != null) && (!(Object.prototype.toString.call(showAsTab) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: showAsTab EXPECTED TYPE: Boolean", null, null);
		}
		this.showAsTab = showAsTab;
		this.keyModified.set("show_as_tab", 1);

	}

	/**
	 * The method to get the webLink
	 * @returns {String} A String representing the webLink
	 */
	getWebLink()	{
		return this.webLink;

	}

	/**
	 * The method to set the value to webLink
	 * @param {String} webLink A String representing the webLink
	 */
	setWebLink(webLink)	{
		if((webLink != null) && (!(Object.prototype.toString.call(webLink) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: webLink EXPECTED TYPE: String", null, null);
		}
		this.webLink = webLink;
		this.keyModified.set("web_link", 1);

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
	 * The method to get the singularLabel
	 * @returns {String} A String representing the singularLabel
	 */
	getSingularLabel()	{
		return this.singularLabel;

	}

	/**
	 * The method to set the value to singularLabel
	 * @param {String} singularLabel A String representing the singularLabel
	 */
	setSingularLabel(singularLabel)	{
		if((singularLabel != null) && (!(Object.prototype.toString.call(singularLabel) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: singularLabel EXPECTED TYPE: String", null, null);
		}
		this.singularLabel = singularLabel;
		this.keyModified.set("singular_label", 1);

	}

	/**
	 * The method to get the viewable
	 * @returns {Boolean} A Boolean representing the viewable
	 */
	getViewable()	{
		return this.viewable;

	}

	/**
	 * The method to set the value to viewable
	 * @param {Boolean} viewable A Boolean representing the viewable
	 */
	setViewable(viewable)	{
		if((viewable != null) && (!(Object.prototype.toString.call(viewable) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: viewable EXPECTED TYPE: Boolean", null, null);
		}
		this.viewable = viewable;
		this.keyModified.set("viewable", 1);

	}

	/**
	 * The method to get the apiSupported
	 * @returns {Boolean} A Boolean representing the apiSupported
	 */
	getAPISupported()	{
		return this.apiSupported;

	}

	/**
	 * The method to set the value to apiSupported
	 * @param {Boolean} apiSupported A Boolean representing the apiSupported
	 */
	setAPISupported(apiSupported)	{
		if((apiSupported != null) && (!(Object.prototype.toString.call(apiSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: apiSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.apiSupported = apiSupported;
		this.keyModified.set("api_supported", 1);

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
	 * The method to get the quickCreate
	 * @returns {Boolean} A Boolean representing the quickCreate
	 */
	getQuickCreate()	{
		return this.quickCreate;

	}

	/**
	 * The method to set the value to quickCreate
	 * @param {Boolean} quickCreate A Boolean representing the quickCreate
	 */
	setQuickCreate(quickCreate)	{
		if((quickCreate != null) && (!(Object.prototype.toString.call(quickCreate) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: quickCreate EXPECTED TYPE: Boolean", null, null);
		}
		this.quickCreate = quickCreate;
		this.keyModified.set("quick_create", 1);

	}

	/**
	 * The method to get the modifiedBy
	 * @returns {User} An instance of User
	 */
	getModifiedBy()	{
		return this.modifiedBy;

	}

	/**
	 * The method to set the value to modifiedBy
	 * @param {User} modifiedBy An instance of User
	 */
	setModifiedBy(modifiedBy)	{
		const User = require("../users/user").MasterModel;
		if((modifiedBy != null) && (!(modifiedBy instanceof User)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: modifiedBy EXPECTED TYPE: User", null, null);
		}
		this.modifiedBy = modifiedBy;
		this.keyModified.set("modified_by", 1);

	}

	/**
	 * The method to get the generatedType
	 * @returns {Choice} An instance of Choice
	 */
	getGeneratedType()	{
		return this.generatedType;

	}

	/**
	 * The method to set the value to generatedType
	 * @param {Choice} generatedType An instance of Choice
	 */
	setGeneratedType(generatedType)	{
		if((generatedType != null) && (!(generatedType instanceof Choice)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: generatedType EXPECTED TYPE: Choice", null, null);
		}
		this.generatedType = generatedType;
		this.keyModified.set("generated_type", 1);

	}

	/**
	 * The method to get the feedsRequired
	 * @returns {Boolean} A Boolean representing the feedsRequired
	 */
	getFeedsRequired()	{
		return this.feedsRequired;

	}

	/**
	 * The method to set the value to feedsRequired
	 * @param {Boolean} feedsRequired A Boolean representing the feedsRequired
	 */
	setFeedsRequired(feedsRequired)	{
		if((feedsRequired != null) && (!(Object.prototype.toString.call(feedsRequired) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: feedsRequired EXPECTED TYPE: Boolean", null, null);
		}
		this.feedsRequired = feedsRequired;
		this.keyModified.set("feeds_required", 1);

	}

	/**
	 * The method to get the scoringSupported
	 * @returns {Boolean} A Boolean representing the scoringSupported
	 */
	getScoringSupported()	{
		return this.scoringSupported;

	}

	/**
	 * The method to set the value to scoringSupported
	 * @param {Boolean} scoringSupported A Boolean representing the scoringSupported
	 */
	setScoringSupported(scoringSupported)	{
		if((scoringSupported != null) && (!(Object.prototype.toString.call(scoringSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: scoringSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.scoringSupported = scoringSupported;
		this.keyModified.set("scoring_supported", 1);

	}

	/**
	 * The method to get the webformSupported
	 * @returns {Boolean} A Boolean representing the webformSupported
	 */
	getWebformSupported()	{
		return this.webformSupported;

	}

	/**
	 * The method to set the value to webformSupported
	 * @param {Boolean} webformSupported A Boolean representing the webformSupported
	 */
	setWebformSupported(webformSupported)	{
		if((webformSupported != null) && (!(Object.prototype.toString.call(webformSupported) == "[object Boolean]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: webformSupported EXPECTED TYPE: Boolean", null, null);
		}
		this.webformSupported = webformSupported;
		this.keyModified.set("webform_supported", 1);

	}

	/**
	 * The method to get the arguments
	 * @returns {Array} An Array representing the arguments1
	 */
	getArguments()	{
		return this.arguments1;

	}

	/**
	 * The method to set the value to arguments
	 * @param {Array} arguments1 An Array representing the arguments1
	 */
	setArguments(arguments1)	{
		if((arguments1 != null) && (!(Object.prototype.toString.call(arguments1) == "[object Array]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: arguments1 EXPECTED TYPE: Array", null, null);
		}
		this.arguments1 = arguments1;
		this.keyModified.set("arguments", 1);

	}

	/**
	 * The method to get the moduleName
	 * @returns {String} A String representing the moduleName
	 */
	getModuleName()	{
		return this.moduleName;

	}

	/**
	 * The method to set the value to moduleName
	 * @param {String} moduleName A String representing the moduleName
	 */
	setModuleName(moduleName)	{
		if((moduleName != null) && (!(Object.prototype.toString.call(moduleName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: moduleName EXPECTED TYPE: String", null, null);
		}
		this.moduleName = moduleName;
		this.keyModified.set("module_name", 1);

	}

	/**
	 * The method to get the businessCardFieldLimit
	 * @returns {number} A number representing the businessCardFieldLimit
	 */
	getBusinessCardFieldLimit()	{
		return this.businessCardFieldLimit;

	}

	/**
	 * The method to set the value to businessCardFieldLimit
	 * @param {number} businessCardFieldLimit A number representing the businessCardFieldLimit
	 */
	setBusinessCardFieldLimit(businessCardFieldLimit)	{
		if((businessCardFieldLimit != null) && (!(Object.prototype.toString.call(businessCardFieldLimit) == "[object Number]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: businessCardFieldLimit EXPECTED TYPE: number", null, null);
		}
		this.businessCardFieldLimit = businessCardFieldLimit;
		this.keyModified.set("business_card_field_limit", 1);

	}

	/**
	 * The method to get the customView
	 * @returns {CustomView} An instance of CustomView
	 */
	getCustomView()	{
		return this.customView;

	}

	/**
	 * The method to set the value to customView
	 * @param {CustomView} customView An instance of CustomView
	 */
	setCustomView(customView)	{
		const CustomView = require("../custom_views/custom_view").MasterModel;
		if((customView != null) && (!(customView instanceof CustomView)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: customView EXPECTED TYPE: CustomView", null, null);
		}
		this.customView = customView;
		this.keyModified.set("custom_view", 1);

	}

	/**
	 * The method to get the parentModule
	 * @returns {Module} An instance of Module
	 */
	getParentModule()	{
		return this.parentModule;

	}

	/**
	 * The method to set the value to parentModule
	 * @param {Module} parentModule An instance of Module
	 */
	setParentModule(parentModule)	{
		if((parentModule != null) && (!(parentModule instanceof Module)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: parentModule EXPECTED TYPE: Module", null, null);
		}
		this.parentModule = parentModule;
		this.keyModified.set("parent_module", 1);

	}

	/**
	 * The method to get the territory
	 * @returns {Territory} An instance of Territory
	 */
	getTerritory()	{
		return this.territory;

	}

	/**
	 * The method to set the value to territory
	 * @param {Territory} territory An instance of Territory
	 */
	setTerritory(territory)	{
		const Territory = require("./territory").MasterModel;
		if((territory != null) && (!(territory instanceof Territory)))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: territory EXPECTED TYPE: Territory", null, null);
		}
		this.territory = territory;
		this.keyModified.set("territory", 1);

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
	MasterModel : Module,
	Module : Module
}

const SDKInitializer = require("../sample/initializer/initialize").SDKInitializer;
const AssignmentRules = require("../sample/assignment_rules/assignment_rules").AssignmentRules;
const Attachments = require("../sample/attachments/attachment").Attachment;
const BluePrint = require("../sample/blue_print/blue_print").BluePrint;
const BulkRead = require("../sample/bulk_read/bulk_read").BulkRead;
const BulkWrite = require("../sample/bulk_write/bulk_write").BulkWrite;
const ContactRoles = require("../sample/contact_roles/contact_role").ContactRole;
const Currencies = require("../sample/currencies/currency").Currency;
const CustomViews = require("../sample/custom_views/custom_view").CustomView;
const EmailTemplate = require("../sample/email_templates/email_template").EmailTemplate;
const FieldAttachment = require("../sample/field_attachments/field_attachment").FieldAttachment;
const Fields = require("../sample/fields/field").Field;
const File = require("../sample/files/file").File;
const InventoryTemplate = require("../sample/inventory_templates/inventory_template").InventoryTemplate;
const Layouts = require("../sample/layouts/layout").Layout;
const Modules = require("../sample/modules/module").Module;
const Notes = require("../sample/notes/note").Note;
const Notification = require("../sample/notification/notification").Notification;
const Org = require("../sample/organization/organization").Organization;
const PipeLine = require("../sample/pipe_line/pipe_line").PipeLine;
const Profiles = require("../sample/profiles/profile").Profile;
const Query = require("../sample/query/query").Query;
const Records = require("../sample/records/record").Record;
const RelatedLists = require("../sample/related_lists/related_list").RelatedList;
const RelatedRecords = require("../sample/related_records/related_record").RelatedRecord;
const Roles = require("../sample/roles/role").Role;
const SendMail = require("../sample/send_mail/send_mail").SendMail;
const ShareRecords = require("../sample/share_records/share_record").ShareRecord;
const Tags = require("../sample/tags/tag").Tag;
const Taxes = require("../sample/taxes/tax").Tax;
const Territories = require("../sample/territories/territory").Territory;
const Users = require("../sample/users/user").User;
const Variables = require("../sample/variables/variable").Variable;
const Wizard = require("../sample/wizards/wizard").Wizard;
const VariableGroups = require("../sample/variable_groups/variable_group").VariableGroup;
const StreamWrapper = require("@zohocrm/nodejs-sdk-2.1/utils/util/stream_wrapper").StreamWrapper;
const got = require("got");
const FormData = require("form-data");
let fs = require('fs');
let path = require('path');

class Test {
    static async call() {
        await SDKInitializer.initializeSDK();

        this.assignmentRules();

        this.attachment();

        this.bluePrint();

        this.bulkRead();

        this.bulkWrite();

        this.contactRole();

        this.currency();

        this.customView();

        this.emailTemplate();

        this.fieldAttachment();

        this.field();

        this.file();

        this.inventoryTemplate();

        this.layout();

        this.module();

        this.note();

        this.notification();

        this.org();

        this.pipeLine();

        this.profile();

        this.query();

        this.record();

        this.relatedList();

        this.relatedRecord();

        this.role();

        this.sendMail();

        this.shareRecord();

        this.tag();

        this.tax();

        this.territory();

        this.user();

        this.variableGroup();

        this.variable();

        this.wizard();

        this.fileUpload();
    }

    static async assignmentRules() {
        let ruleId = 347706104353013n;

        await AssignmentRules.getAssignmentRules();

        await AssignmentRules.getAssignmentRule(ruleId);
    }

    static async attachment() {
        let moduleAPIName = "Leads";

        let recordId = 3477061124211n;

        let attachmentId = 347706112493n;//611941

        let destinationFolder = "/Users/Documents/file";

        let absoluteFilePath = "/Users/Documents/file/download.png";

        let attachmentURL = "https://5.imimg.com/data5/KJ/UP/MY-8655440/zoho-crm-5x5.png";

        console.log("-----Calling getAttachments()-----");
        await Attachments.getAttachments(moduleAPIName, recordId);

        console.log("-----Calling uploadAttachments()-----");
        await Attachments.uploadAttachments(moduleAPIName, recordId, absoluteFilePath);

        console.log("-----Calling uploadLinkAttachment()-----");
        await Attachments.uploadLinkAttachment(moduleAPIName, recordId, attachmentURL);

        console.log("-----Calling deleteAttachments()-----");
        await Attachments.deleteAttachments(moduleAPIName, recordId, [3477061124961n, 347761118972n, 739487589374589n, 89358395n]);

        console.log("-----Calling downloadAttachment()-----");
        await Attachments.downloadAttachment(moduleAPIName, recordId, attachmentId, destinationFolder);

        console.log("-----Calling deleteAttachment()-----");
        await Attachments.deleteAttachment(moduleAPIName, recordId, attachmentId);
    }

    static async bluePrint() {
        let moduleAPIName = "Leads";

        let recordId = 3477061043812n;

        let transitionId = 3477061173093n;

        console.log("-----Calling getBlueprint()-----")
        await BluePrint.getBlueprint(moduleAPIName, recordId);

        console.log("-----Calling updateBlueprint()-----")
        await BluePrint.updateBlueprint(moduleAPIName, recordId, transitionId);
    }

    static async bulkRead() {
        let moduleAPIName = "Leads";

        let jobId = 34770611256n;

        console.log("-----Calling createBulkReadJob()-----")
        await BulkRead.createBulkReadJob(moduleAPIName);

        console.log("-----Calling getBulkReadJobDetails()-----")
        await BulkRead.getBulkReadJobDetails(jobId);

        console.log("-----Calling downloadResult()-----")
        await BulkRead.downloadResult(34770611256n, "/Users/Documents/file")
    }

    static async bulkWrite() {
        let filePath = "/Users/Documents/file/Leads.zip";

        let orgId = "xxxxxx";

        let downloadUrl = "https://download-accl.zoho.com/v2/crm/673573045/bulk-write/3477061125051/3477061125051.zip";

        await BulkWrite.uploadFile(orgId, filePath);

        await BulkWrite.createBulkWriteJob("Leads", "3477061125051");

        await BulkWrite.getBulkWriteJobDetails(3477061125051n);

        await BulkWrite.downloadBulkWriteResult(downloadUrl, "/Users/Documents/file")
    }

    static async contactRole() {
        let contactRoleId = 3477061123691n;

        let contactRoleIds = ["347706112369011", "3477061123695", "3477061123697"];

        let contactId = 3477061122635n;
        
        let dealId = 347706112416012n;

        console.log("-----Calling getContactRoles()-----")
        await ContactRoles.getContactRoles();

        console.log("-----Calling createContactRoles()-----")
        await ContactRoles.createContactRoles();

        console.log("-----Calling updateContactRoles()-----")
        await ContactRoles.updateContactRoles();

        console.log("-----Calling deleteContactRoles()-----")
        await ContactRoles.deleteContactRoles(contactRoleIds);

        console.log("-----Calling getContactRole()-----")
        await ContactRoles.getContactRole(contactRoleId);

        console.log("-----Calling updateContactRole()-----")
        await ContactRoles.updateContactRole(contactRoleId);

        console.log("-----Calling deleteContactRole()-----")
        await ContactRoles.deleteContactRole(contactRoleId);

        await ContactRoles.getAllContactRolesOfDeal(dealId);

		await ContactRoles.getContactRoleOfDeal(contactId, dealId);

		await ContactRoles.addContactRoleToDeal(contactId, dealId);

		await ContactRoles.removeContactRoleFromDeal(contactId, dealId);
    }

    static async currency() {
        let currencyId = 347706107368016n;

        console.log("-----Calling enableMultipleCurrencies()-----")
        await Currencies.enableMultipleCurrencies();

        console.log("-----Calling getCurrencies()-----")
        await Currencies.getCurrencies();

        console.log("-----Calling getCurrency()-----")
        await Currencies.getCurrency(currencyId);

        console.log("-----Calling addCurrencies()-----")
        await Currencies.addCurrencies();

        console.log("-----Calling updateCurrencies()-----")
        await Currencies.updateCurrencies();

        console.log("-----Calling updateCurrency()-----")
        await Currencies.updateCurrency(currencyId);

        console.log("-----Calling updateBaseCurrency()-----")
        await Currencies.updateBaseCurrency();
    }

    static async customView() {
        let moduleAPIName = "Sales_orders"

        let customViewId = 6187671n;

        let names = ["Products", "Tasks", "Vendors", "Calls", "Leads", "Deals", "Campaigns", "Quotes", "Invoices", "Attachments", "Price_Books", "Sales_Orders", "Contacts", "Solutions", "Events", "Purchase_Orders", "Accounts", "Cases", "Notes" ];

        names.forEach(async name => {
        	await CustomViews.getCustomViews(name);
        });

        console.log("-----Calling getCustomViews()-----")
        await CustomViews.getCustomViews(moduleAPIName);

        console.log("-----Calling getCustomView()-----")
        await CustomViews.getCustomView(moduleAPIName, customViewId);
    }

    static async emailTemplate() {
        let id = 347706179n;

        await EmailTemplate.getEmailTemplates("Deals");

        await EmailTemplate.getEmailTemplateById(id);
    }

    static async fieldAttachment() {
        let destinationFolder = "/Users/Documents/file";

        await FieldAttachment.getFieldAttachments("Leads", 3477061116132n, 347706111613032n, destinationFolder);
    }

    static async field() {
        let moduleAPIName = "Contacts"

        let fieldId = 34770614146n;

        let names = ["Products", "Tasks", "Vendors", "Calls", "Leads", "Deals", "Campaigns", "Quotes", "Invoices", "Attachments", "Price_Books", "Sales_Orders", "Contacts", "Solutions", "Events", "Purchase_Orders", "Accounts", "Cases", "Notes" ];

        for(let name of names) {
            await Fields.getFields(name);
        }

        console.log("-----Calling getFields()-----")
        await Fields.getFields(moduleAPIName);

        console.log("-----Calling getField()-----")
        await Fields.getField(moduleAPIName, fieldId);
    }

    static async file() {
        let destinationFolder = "/Users/Documents/file";

        let fileId = "ae9c7cefa418aec1d6a5cc2d9ab35c32c7a3d156711baba63d4bccb18e3e4847";

        console.log("-----Calling uploadFile()-----");
        await File.uploadFiles();

        console.log("-----Calling getFile()-----");
        await File.getFile(fileId, destinationFolder);
    }

    static async inventoryTemplate() {
        let id = 34770611743n;

        await InventoryTemplate.getInventoryTemplates();

        await InventoryTemplate.getInventoryTemplateById(id);
    }

    static async layout() {
        let moduleAPIName = "Leads";

        let layoutId = 347706105902025n;

        let names = ["Products", "Tasks", "Vendors", "Calls", "Leads", "Deals", "Campaigns", "Quotes", "Invoices", "Attachments", "Price_Books", "Sales_Orders", "Contacts", "Solutions", "Events", "Purchase_Orders", "Accounts", "Cases", "Notes" ];

        for(let name of names){
        	await Layouts.getLayouts(name);
        }

        console.log("-----Calling getLayouts()-----")
        await Layouts.getLayouts(moduleAPIName);

        console.log("-----Calling getLayout()-----")
        await Layouts.getLayout(moduleAPIName, layoutId);
    }

    static async module() {
        let moduleAPIName = "apiName2";

        let moduleId = 3477061039053n;

        console.log("-----Calling getModules()-----")
        await Modules.getModules();

        console.log("-----Calling getModule()-----")
        await Modules.getModule(moduleAPIName);

        console.log("-----Calling updateModuleByAPIName()-----")
        await Modules.updateModuleByAPIName(moduleAPIName);

        console.log("-----Calling updateModuleById()-----")
        await Modules.updateModuleById(moduleId);
    }

    static async note() {
        let noteId = 347706112376n;

        let noteIds = [347706112375n, 347706112374n, 347706112373n, 347706112372n, 3477061122265n];

        console.log("-----Calling getNotes()-----")
        await Notes.getNotes();

        console.log("-----Calling createNotes()-----")
        await Notes.createNotes();

        console.log("-----Calling updateNotes()-----")
        await Notes.updateNotes();

        console.log("-----Calling deleteNotes()-----")
        await Notes.deleteNotes(noteIds);

        console.log("-----Calling getNote()-----")
        await Notes.getNote(noteId);

        console.log("-----Calling updateNote()-----")
        await Notes.updateNote(noteId);

        console.log("-----Calling deleteNote()-----")
        await Notes.deleteNote(noteId);
    }

    static async notification() {
        let channelIds = [168211n, 168232n];

        console.log("-----Calling enableNotifications()-----")
        await Notification.enableNotifications();

        console.log("-----Calling getNotificationDetails()-----")
        await Notification.getNotificationDetails();

        console.log("-----Calling updateNotifications()-----")
        await Notification.updateNotifications();

        console.log("-----Calling updateNotification()-----")
        await Notification.updateNotification();

        console.log("-----Calling disableNotifications()-----")
        await Notification.disableNotifications(channelIds);

        console.log("-----Calling disableNotification()-----")
        await Notification.disableNotification();
    }

    static async org() {
        let filePath = "/Users/Documents/file/download.png";

        console.log("-----Calling getOrganization()-----")
        await Org.getOrganization();

        console.log("-----Calling uploadOrganizationPhoto()-----")
        await Org.uploadOrganizationPhoto(filePath);
    }

    static async pipeLine() {
        let layoutId = 347706191023n;

        let pipelineID = 347706112543n;

        PipeLine.createPipelines(layoutId);

        PipeLine.updatePipelines(layoutId);

        PipeLine.getPipelines(layoutId);

        PipeLine.getPipeline(layoutId, pipelineID);

        PipeLine.updatePipeline(layoutId, pipelineID);

        PipeLine.transferAndDelete(layoutId);
    }

    static async profile() {
        let profileId = 347706126011n;

        console.log("-----Calling getProfiles()-----")
        await Profiles.getProfiles();

        console.log("-----Calling getProfile()-----")
        await Profiles.getProfile(profileId)
    }

    static async query() {
        await Query.getRecords();
    }

    static async record() {
        let moduleAPIName = "leads";

        let recordId = 3477061121843n;

        let externalFieldValue = "TestExternal678901";

        let destinationFolder = "/Users/Documents/file";

        let filePath = "/Users/Documents/file/download.png";

        let recordIds = ["3477061124211", "External121123456", "6198721"];

        let jobId = "347706107416301";

        let names = ["Products", "Tasks", "Vendors", "Calls", "Leads", "Deals", "Campaigns", "Quotes",
            "Invoices", "Price_Books", "Sales_Orders", "Contacts", "Solutions", "Events",
            "Purchase_Orders", "Accounts", "Cases", "Notes"];

        for (let name of names) {
            await Records.getRecords(name);
        }

        console.log("-----Calling getRecord()-----")
        await Records.getRecord(moduleAPIName, recordId, destinationFolder);

        await Records.updateRecord(moduleAPIName, recordId);

        await Records.deleteRecord(moduleAPIName, recordId);

        await Records.getRecordUsingExternalId(moduleAPIName, externalFieldValue, destinationFolder);

        await Records.updateRecordUsingExternalId(moduleAPIName, externalFieldValue);
        
        await Records.deleteRecordUsingExternalId(moduleAPIName, externalFieldValue);

        console.log("-----Calling getRecords()-----")
        await Records.getRecords(moduleAPIName);

        console.log("-----Calling createRecords()-----");
        await Records.createRecords(moduleAPIName);

        await Records.updateRecords(moduleAPIName);

        await Records.deleteRecords(moduleAPIName, recordIds);

        await Records.upsertRecords(moduleAPIName);

        await Records.getDeletedRecords(moduleAPIName);

        await Records.searchRecords(moduleAPIName);

        await Records.convertLead(3477061121844n);

        console.log("-----Calling uploadPhoto()-----");
        await Records.uploadPhoto(moduleAPIName, recordId, filePath);

        console.log("-----Calling getPhoto()-----");
        await Records.getPhoto(moduleAPIName, recordId, destinationFolder);

        await Records.deletePhoto(moduleAPIName, recordId);

        await Records.massUpdateRecords(moduleAPIName);

        await Records.getMassUpdateStatus(moduleAPIName, jobId);

        await Records.getRecordCount();
			
        await Records.assignTerritoriesToMultipleRecords(moduleAPIName);
        
        await Records.assignTerritoryToRecord(moduleAPIName, recordId);
        
        await Records.removeTerritoriesFromMultipleRecords(moduleAPIName);
        
        await Records.removeTerritoriesFromRecord(moduleAPIName, recordId);
    }

    static async relatedList() {
        let moduleAPIName = "Leads";

        let relatedListId = 347706106819126n;

        let names = ["Products", "Tasks", "Vendors", "Calls", "Leads", "Deals", "Campaigns", "Quotes", "Invoices", "Attachments", "Price_Books", "Sales_Orders", "Contacts", "Solutions", "Events", "Purchase_Orders", "Accounts", "Cases", "Notes" ];

		names.forEach(async name => {
			await RelatedLists.getRelatedLists(name);
		});

        console.log("-----Calling getRelatedLists()-----")
        await RelatedLists.getRelatedLists(moduleAPIName);

        console.log("-----Calling getRelatedList()-----")
        await RelatedLists.getRelatedList(moduleAPIName, relatedListId)
    }

    static async relatedRecord() {
        let moduleAPIName = "leads";

        let recordId = 3477061121091n;

        let relatedModuleAPIName = "products";

        let relatedId = 3477061125629n;

        let relatedIds = ["347706104994113", "Products_External"];

        let externalValue = "TestExternal123";

        let externalFieldValue = "Products_External";

        let destinationFolder = "/Users/Documents/file";

        console.log("-----Calling getRelatedRecords()-----")
        await RelatedRecords.getRelatedRecords(moduleAPIName, recordId, relatedModuleAPIName);

        console.log("-----Calling updateRelatedRecords()-----")
        await RelatedRecords.updateRelatedRecords(moduleAPIName, recordId, relatedModuleAPIName);

        console.log("-----Calling deLinkRecords()-----")
        await RelatedRecords.deLinkRecords(moduleAPIName, recordId, relatedModuleAPIName, relatedIds);

        await RelatedRecords.getRelatedRecordsUsingExternalId(moduleAPIName, externalValue, relatedModuleAPIName);
        
        await RelatedRecords.updateRelatedRecordsUsingExternalId(moduleAPIName, externalValue, relatedModuleAPIName);
        
        await RelatedRecords.deleteRelatedRecordsUsingExternalId(moduleAPIName, externalValue, relatedModuleAPIName, relatedIds);

        console.log("-----Calling getRelatedRecord()-----")
        await RelatedRecords.getRelatedRecord(moduleAPIName, recordId, relatedModuleAPIName, relatedId, destinationFolder)

        console.log("-----Calling updateRelatedRecord()-----")
        await RelatedRecords.updateRelatedRecord(moduleAPIName, recordId, relatedModuleAPIName, relatedId);

        console.log("-----Calling deLinkRecord()-----")
        await RelatedRecords.deLinkRecord(moduleAPIName, recordId, relatedModuleAPIName, relatedId);

        await RelatedRecords.getRelatedRecordUsingExternalId(moduleAPIName, externalValue, relatedModuleAPIName, externalFieldValue, destinationFolder);
        
        await RelatedRecords.updateRelatedRecordUsingExternalId(moduleAPIName, externalValue, relatedModuleAPIName, externalFieldValue);
        
        await RelatedRecords.deleteRelatedRecordUsingExternalId(moduleAPIName, externalValue, relatedModuleAPIName, externalFieldValue);
    }

    static async role() {
        let roleId = 3477061265n;

        console.log("-----Calling getRoles()-----")
        await Roles.getRoles();

        console.log("-----Calling getRole()-----")
        await Roles.getRole(roleId);
    }

    static async sendMail() {
        await SendMail.getEmailAddresses();

        await SendMail.sendMail(347706112558011n, "Leads");
    }

    static async shareRecord() {
        let moduleAPIName = "Leads";

        let recordId = 347706105623115n;

        console.log("-----Calling updateSharePermissions()-----")
        await ShareRecords.updateSharePermissions(moduleAPIName, recordId);

        console.log("-----Calling shareRecord()-----")
        await ShareRecords.shareRecord(moduleAPIName, recordId);

        console.log("-----Calling getSharedRecordDetails()-----")
        await ShareRecords.getSharedRecordDetails(moduleAPIName, recordId);

        console.log("-----Calling revokeSharedRecord()-----")
        await ShareRecords.revokeSharedRecord(moduleAPIName, recordId);
    }

    static async tag() {
        let moduleAPIName = "Leads";

        let tagId = 3477061101834n;

        let recordId = 347706112558011n;

        let tagNames = ["edited-tagname,addtag12"];

        let recordIds = [347706112557027n, 347706105623115n, 3477061101834n];

        let conflictId = "3477061125813";

        console.log("-----Calling getTags()-----")
        await Tags.getTags(moduleAPIName);

        console.log("-----Calling createTags()-----")
        await Tags.createTags(moduleAPIName);

        console.log("-----Calling updateTags()-----")
        await Tags.updateTags(moduleAPIName);

        console.log("-----Calling updateTag()-----")
        await Tags.updateTag(moduleAPIName, tagId);

        console.log("-----Calling mergeTags()-----")
        await Tags.mergeTags(tagId, conflictId);

        console.log("-----Calling addTagsToRecord()-----")
        await Tags.addTagsToRecord(moduleAPIName, recordId, tagNames);

        console.log("-----Calling removeTagsFromRecord()-----")
        await Tags.removeTagsFromRecord(moduleAPIName, recordId, tagNames);

        console.log("-----Calling addTagsToMultipleRecords()-----")
        await Tags.addTagsToMultipleRecords(moduleAPIName, recordIds, tagNames);

        console.log("-----Calling removeTagsFromMultipleRecords()-----")
        await Tags.removeTagsFromMultipleRecords(moduleAPIName, recordIds, tagNames);

        console.log("-----Calling getRecordCountForTag()-----")
        await Tags.getRecordCountForTag(moduleAPIName, tagId);

        console.log("-----Calling deleteTag()-----")
        await Tags.deleteTag(tagId);
    }

    static async tax() {
        let taxId = 347706112444011n;

        console.log("-----Calling getTaxes()-----")
        await Taxes.getTaxes();

        console.log("-----Calling getTax()-----")
        await Taxes.getTax(taxId);

        console.log("-----Calling createTaxes()-----")
        await Taxes.createTaxes();

        console.log("-----Calling updateTaxes()-----")
        await Taxes.updateTaxes();

        console.log("-----Calling deleteTaxes()-----")
        await Taxes.deleteTaxes([347706112588013n, 619942037n])

        console.log("-----Calling deleteTax()-----")
        await Taxes.deleteTax(taxId)
    }

    static async territory() {
        let territoryId = 347706103051397n;

        console.log("-----Calling getTerritories()-----")
        await Territories.getTerritories();

        console.log("-----Calling getTerritory()-----")
        await Territories.getTerritory(territoryId);
    }

    static async user() {
        let userId = 3477061125926n;

        console.log("-----Calling getUsers()-----")
        await Users.getUsers();

        console.log("-----Calling getUser()-----")
        await Users.getuser(userId);

        console.log("-----Calling updateUsers()-----")
        await Users.updateUsers();

        console.log("-----Calling updateUser()-----")
        await Users.updateUser(userId);

        console.log("-----Calling deleteUser()-----")
        await Users.deleteUser(userId);

        console.log("-----Calling createUser()-----")
        await Users.createUser(userId);
    }

    static async variableGroup() {
        let variableGroupId = 6130891n;

        let variableGroupAPIName = "General";

        console.log("-----Calling getVariableGroups()-----")
        await VariableGroups.getVariableGroups();

        console.log("-----Calling getVariableGroupById()-----")
        await VariableGroups.getVariableGroupById(variableGroupId);

        console.log("-----Calling getVariableGroupByAPIName()-----")
        await VariableGroups.getVariableGroupByAPIName(variableGroupAPIName);
    }

    static async variable() {
        let variableIds = [347706112581011n];

        console.log("-----Calling createVariables()-----")
        await Variables.createVariables();

        console.log("-----Calling getVariables()-----")
        await Variables.getVariables();

        console.log("-----Calling getVariableById()-----")
        await Variables.getVariableById(347706112581011n);

        console.log("-----Calling getVariableForAPIName()-----")
        await Variables.getVariableForAPIName("Variable551234");

        console.log("-----Calling updateVariableByAPIName()-----")
        await Variables.updateVariableByAPIName("Variable551234");

        console.log("-----Calling updateVariableById()-----")
        await Variables.updateVariableById(3477061125819n);

        console.log("-----Calling updateVariables()-----")
        await Variables.updateVariables();

        console.log("-----Calling deleteVariables()-----")
        await Variables.deleteVariables(variableIds);

        console.log("-----Calling deleteVariable()-----")
        await Variables.deleteVariable(3477061125819n);
    }

    static async wizard() {
        let wizardId = 3477061094979n;

        await Wizard.getWizards();

        await Wizard.getWizardById(wizardId, "347706191055");
    }

    static async fileUpload() {

        try {
            let filePath = "/Users/username/download.png";

            var formDataRequestBody = new FormData();

            let streamWrapper = new StreamWrapper(null, null, filePath);

            formDataRequestBody.append("file", streamWrapper.Stream);

            var apiHeaders = {};

            apiHeaders["Authorization"] = "Zoho-oauthtoken 1.xxxx.xxxx";

            var apiParameters = {};

            var requestDetails = {
                method: "POST",
                headers: apiHeaders,
                searchParams: apiParameters,
                body: formDataRequestBody,
                encoding: "utf8",
                allowGetBody: true,
                throwHttpErrors: false
            };

            let response = await got("https://www.zohoapis.com/crm/v2/Leads/6158445/Attachments", requestDetails);

            console.log(JSON.parse(response.body));
        } catch (error) {
            console.log(error);
        }
    }
}

Test.call();

module.exports = { Test };
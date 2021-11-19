const ZCRMBluePrint = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/blue_print/blue_print").BluePrint;
const ZCRMRecord = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/record/record").Record;
const BluePrintOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/blue_print/blue_print_operations").BluePrintOperations;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/blue_print/response_wrapper").ResponseWrapper;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/blue_print/body_wrapper").BodyWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/blue_print/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/blue_print/success_response").SuccessResponse;
const Transition = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/blue_print/transition").Transition;

class BluePrint {
    /**
     * <h3> Get Blueprint </h3>
     * This method is used to get a single record's Blueprint details with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record to get Blueprint
     */
    static async getBlueprint(moduleAPIName, recordId) {

        //example
        // let moduleAPIName = "module_api_name";
        // let recordId = 2469044n;

        //Get instance of BluePrintOperations Class that takes moduleAPIName and recordId as parameter
        let bluePrintOperations = new BluePrintOperations(recordId, moduleAPIName);

        //Call getBlueprint method
        let response = await bluePrintOperations.getBlueprint();

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {

                //Check if expected ResponseWrapper instance is received.
                if (responseObject instanceof ResponseWrapper) {
                    //Get the obtained BluePrint instance
                    let bluePrint = responseObject.getBlueprint();

                    //Get the ProcessInfo instance of the obtained BluePrint
                    let processInfo = bluePrint.getProcessInfo();

                    //Check if ProcessInfo is not null
                    if (processInfo != null) {
                        //Get the Field ID of the ProcessInfo
                        console.log("ProcessInfo Field-ID: " + processInfo.getFieldId());

                        let escalation = processInfo.getEscalation();

                        if (escalation != null) {
                            console.log("ProcessInfo Escalation Days : " + escalation.getDays());

                            console.log("ProcessInfo Escalation Status : " + escalation.getStatus());
                        }

                        //Get the isContinuous of the ProcessInfo
                        console.log("ProcessInfo isContinuous: " + processInfo.getIsContinuous());

                        //Get the API Name of the ProcessInfo
                        console.log("ProcessInfo API Name: " + processInfo.getAPIName());

                        //Get the Continuous of the ProcessInfo
                        console.log("ProcessInfo Continuous: " + processInfo.getContinuous());

                        //Get the FieldLabel of the ProcessInfo
                        console.log("ProcessInfo FieldLabel: " + processInfo.getFieldLabel());

                        //Get the Name of the ProcessInfo
                        console.log("ProcessInfo Name: " + processInfo.getName());

                        //Get the ColumnName of the ProcessInfo
                        console.log("ProcessInfo ColumnName: " + processInfo.getColumnName());

                        //Get the FieldValue of the ProcessInfo
                        console.log("ProcessInfo FieldValue: " + processInfo.getFieldValue());

                        //Get the ID of the ProcessInfo
                        console.log("ProcessInfo ID: " + processInfo.getId());

                        //Get the FieldName of the ProcessInfo
                        console.log("ProcessInfo FieldName: " + processInfo.getFieldName());
                    }

                    //Get the array of transitions from BluePrint instance
                    let transitions = bluePrint.getTransitions();

                    transitions.forEach(transition => {
                        let nextTransitions = transition.getNextTransitions();

                        nextTransitions.forEach(nextTransition => {
                            //Get the ID of the NextTransition
                            console.log("NextTransition ID: " + nextTransition.getId());

                            //Get the CriteriaMatched of the NextTransition
                            console.log("NextTransition CriteriaMatched: " + nextTransition.getCriteriaMatched());

                            //Get the Name of the NextTransition
                            console.log("NextTransition Name: " + nextTransition.getName());

                            //Get the Type of the NextTransition
                            console.log("NextTransition Type: " + nextTransition.getType());
                        });

                        //Get the parent of the Transition
                        let parentTransition = transition.getParentTransition();
                        if (parentTransition != null) {
                            console.log("Parenttransition ID: " + parentTransition.getId());
                        }

                        let data = transition.getData();

                        if (data != null) {
                            //Get the ID of each record
                            console.log("Record ID: " + data.getId());

                            //Get the createdBy User instance of each record
                            let createdBy = data.getCreatedBy();

                            if (createdBy != null) {
                                //Get the ID of the createdBy User
                                console.log("Record Created By User-ID: " + createdBy.getId());

                                //Get the name of the createdBy User
                                console.log("Record Created By User-Name: " + createdBy.getName());
                            }

                            //Check if the created time is not null
                            if (data.getCreatedTime() != null) {
                                //Get the created time of each record
                                console.log("Record Created Time: " + data.getCreatedTime().toString());
                            }

                            //Check if the modified time is not null
                            if (data.getModifiedTime() != null) {
                                //Get the modified time of each record
                                console.log("Record Modified Time: " + data.getModifiedTime().toString());
                            }

                            //Get the modifiedBy User instance of each record
                            let modifiedBy = data.getModifiedBy();

                            //Check if modifiedByUser is not null
                            if (modifiedBy != null) {
                                //Get the ID of the modifiedBy User
                                console.log("Record Modified By User-ID: " + modifiedBy.getId());

                                //Get the name of the modifiedBy User
                                console.log("Record Modified By user-Name: " + modifiedBy.getName());
                            }

                            //Get all entries from the keyValues map
                            Array.from(data.getKeyValues().keys()).forEach(key => {
                                console.log(key + ": " + data.getKeyValues().get(key));
                            });
                        }

                        //Get the NextFieldValue of the Transition
                        console.log("Transition NextFieldValue: " + transition.getNextFieldValue());

                        //Get the Name of each Transition
                        console.log("Transition Name: " + transition.getName());

                        //Get the CriteriaMatched of the Transition
                        console.log("Transition CriteriaMatched: " + transition.getCriteriaMatched().toString());

                        //Get the ID of the Transition
                        console.log("Transition ID: " + transition.getId());

                        let fields = transition.getFields();

                        console.log("Transition Fields");

                        for (let index = 0; index < fields.length; index++) {
                            const field = fields[index];

                            if (field.getSystemMandatory() != null) {
                                //Get the SystemMandatory of each Field
                                console.log("SystemMandatory: " + field.getSystemMandatory().toString());
                            }

                            //Get the private of each Field
                            console.log("Private" + field.getPrivate());

                            //Get the webhook of each Field
                            console.log("Webhook: " + field.getWebhook());

                            //Get the JsonType of each Field
                            console.log("JsonType: " + field.getJsonType());

                            if (field.getCrypt() != null) {
                                let crypt = field.getCrypt();

                                console.log("Crypt Mode: " + crypt.getMode());

                                console.log("Crypt Column: " + crypt.getColumn());

                                console.log("Crypt Table: " + crypt.getTable());

                                console.log("Crypt Status: " + crypt.getStatus());
                            }

                            //Get the FieldLabel of each Field
                            console.log("FieldLabel: " + field.getFieldLabel());

                            //Get the Tooltip of each Field
                            let toolTip = field.getTooltip();

                            if (toolTip != null) {
                                //Get the Tooltip Name
                                console.log("Tooltip Name: " + toolTip.getName());

                                //Get the Tooltip Value
                                console.log("Tooltip Value: " + toolTip.getValue());
                            }

                            //Get the CreatedSource of each Field
                            console.log("CreatedSource: " + field.getCreatedSource());

                            let layout = field.getLayouts();

                            if (layout != null) {
                                //Get the ID of the Layout
                                console.log("Layout ID: " + layout.getId());

                                //Get the name of the Layout
                                console.log("Layout Name: " + layout.getName());
                            }

                            if (field.getFieldReadOnly() != null) {
                                //Get the FieldReadOnly of each Field
                                console.log("FieldReadOnly: " + field.getFieldReadOnly().toString());
                            }

                            //Get the Content of each Field
                            console.log("Field Content: " + field.getContent());

                            //Get the DisplayLabel of each Field
                            console.log("DisplayLabel: " + field.getDisplayLabel());

                            if (field.getDisplayType() != null) {
                                //Get the DisplayType of each Field
                                console.log("Field DisplayType: " + field.getDisplayType().getValue());
                            }

                            //Get the UiType of each Field
                            console.log("Field UiType: " + field.getUiType());

                            //Get the ValidationRule of each Field
                            console.log("Field ValidationRule: " + field.getValidationRule());

                            if (field.getReadOnly() != null) {
                                //Get the ReadOnly of each Field
                                console.log("ReadOnly: " + field.getReadOnly().toString());
                            }

                            //Get the AssociationDetails of each Field
                            console.log("AssociationDetails: " + field.getAssociationDetails());

                            if (field.getQuickSequenceNumber() != null) {
                                //Get the QuickSequenceNumber of each Field
                                console.log("QuickSequenceNumber: " + field.getQuickSequenceNumber().toString());
                            }

                            //Get the MultiModuleLookup of each Field
                            let multiModuleLookup = field.getMultiModuleLookup();

                            if (multiModuleLookup != null) {
                                let module = multiModuleLookup.getModule();

                                if (module != null) {
                                    //Get the APIName of MultiModuleLookup Module
                                    console.log("Field MultiModuleLookup Module APIName: " + module.getAPIName());

                                    //Get the Id of MultiModuleLookup Module
                                    console.log("Field MultiModuleLookup Module Id: " + module.getId());
                                }

                                //Get the APIName of MultiModuleLookup
                                console.log("Field MultiModuleLookup Name: " + multiModuleLookup.getName());

                                //Get the Id of MultiModuleLookup
                                console.log("Field MultiModuleLookup Id: " + multiModuleLookup.getId());
                            }

                            //Get the Object obtained Currency instance
                            let currency = field.getCurrency();

                            //Check if currency is not null
                            if (currency != null) {
                                //Get the RoundingOption of the Currency
                                console.log("Field Currency RoundingOption: " + currency.getRoundingOption());

                                if (currency.getPrecision() != null) {
                                    //Get the Precision of the Currency
                                    console.log("Field Currency Precision: " + currency.getPrecision());
                                }
                            }

                            //Get the ID of each Field
                            console.log("ID: " + field.getId());

                            if (field.getCustomField() != null) {
                                //Get the CustomField of each Field
                                console.log("CustomField: " + field.getCustomField().toString());
                            }

                            //Get the Object obtained Module instance
                            let lookup = field.getLookup();

                            //Check if lookup is not null
                            if (lookup != null) {
                                //Get the Object obtained Layout instance
                                let layout1 = lookup.getLayout();

                                //Check if layout is not null
                                if (layout1 != null) {
                                    //Get the ID of the Layout
                                    console.log("Field Lookup Layout ID: " + layout1.getId());

                                    //Get the Name of the Layout
                                    console.log("Field Lookup Layout Name: " + layout1.getName());
                                }

                                //Get the DisplayLabel of the Module
                                console.log("Field Lookup DisplayLabel: " + lookup.getDisplayLabel());

                                //Get the APIName of the Module
                                console.log("Field Lookup APIName: " + lookup.getAPIName());

                                //Get the Module of the Module
                                console.log("Field Lookup Module: " + lookup.getModule());

                                if (lookup.getId() != null) {
                                    //Get the ID of the Module
                                    console.log("Field Lookup ID: " + lookup.getId());
                                }
                            }

                            //Get the Filterable of each Field
                            console.log("Field Filterable: " + field.getFilterable());

                            //Check if ConvertMapping is not null
                            if (field.getConvertMapping() != null) {
                                Array.from(field.getConvertMapping().keys()).forEach(key => {
                                    console.log(key + ": " + field.getConvertMapping().get(key));
                                });
                            }

                            if (field.getVisible() != null) {
                                //Get the Visible of each Field
                                console.log("Visible: " + field.getVisible().toString());
                            }

                            let profiles = field.getProfiles();

                            if (profiles != null) {
                                profiles.forEach(profile => {
                                    //Get the PermissionType of each Profile
                                    console.log("Field Profile PermissionType: " + profile.getPermissionType());

                                    //Get the Name of each Profile
                                    console.log("Field Profile Name: " + profile.getName());

                                    //Get the Id of each Profile
                                    console.log("Field Profile Id: " + profile.getId());
                                });
                            }

                            if (field.getLength() != null) {
                                //Get the Length of each Field
                                console.log("Length: " + field.getLength().toString());
                            }

                            //Get the ColumnName of each Field
                            console.log("ColumnName: " + field.getColumnName());

                            //Get the Type of each Field
                            console.log("Type: " + field.getType());

                            let viewType = field.getViewType();

                            if (viewType != null) {
                                //Get the View of the ViewType
                                console.log("Field View: " + viewType.getView());

                                //Get the Edit of the ViewType
                                console.log("Field Edit: " + viewType.getEdit());

                                //Get the Create of the ViewType
                                console.log("Field Create: " + viewType.getCreate());

                                //Get the View of the ViewType
                                console.log("Field QuickCreate: " + viewType.getQuickCreate());
                            }

                            //Get the PickListValuesSortedLexically of each Field
                            console.log("Field PickListValuesSortedLexically: " + field.getPickListValuesSortedLexically());

                            //Get the Sortable of each Field
                            console.log("Sortable: " + field.getSortable());

                            //Get the TransitionSequence of each Field
                            console.log("TransitionSequence: " + field.getTransitionSequence().toString());

                            let external = field.getExternal();

                            if (external != null) {
                                //Get the Show of External
                                console.log("Field External Show: " + external.getShow());

                                //Get the Type of External
                                console.log("Field External Type: " + external.getType());

                                //Get the AllowMultipleConfig of External
                                console.log("Field External AllowMultipleConfig: " + external.getAllowMultipleConfig());
                            }

                            //Get the APIName of each Field
                            console.log("APIName: " + field.getAPIName());

                            //Get the Object obtained Unique instance
                            let unique = field.getUnique();

                            //Check if unique is not null
                            if (unique != null) {
                                //Get the Casesensitive of the Unique
                                console.log("Field Unique Casesensitive : " + unique.getCasesensitive());
                            }

                            if (field.getHistoryTracking() != null) {
                                //Get the HistoryTracking of each Field
                                console.log("Field HistoryTracking: " + field.getHistoryTracking());
                            }

                            //Get the DataType of each Field
                            console.log("DataType: " + field.getDataType());

                            //Get the Object obtained Formula instance
                            let formula = field.getFormula();

                            //Check if formula is not null
                            if (formula != null) {
                                //Get the ReturnType of the Formula
                                console.log("Field Formula ReturnType : " + formula.getReturnType());

                                if (formula.getExpression() != null) {
                                    //Get the Expression of the Formula
                                    console.log("Field Formula Expression : " + formula.getExpression());
                                }
                            }

                            //Get the DecimalPlace of each Field
                            console.log("DecimalPlace: " + field.getDecimalPlace());

                            //Get all entries from the MultiSelectLookup instance
                            let multiSelectLookup = field.getMultiselectlookup();

                            if (multiSelectLookup != null) {
                                //Get the DisplayValue of the MultiSelectLookup
                                console.log("DisplayLabel: " + multiSelectLookup.getDisplayLabel());

                                //Get the LinkingModule of the MultiSelectLookup
                                console.log("LinkingModule: " + multiSelectLookup.getLinkingModule());

                                //Get the LookupApiname of the MultiSelectLookup
                                console.log("LookupApiname: " + multiSelectLookup.getLookupApiname());

                                //Get the APIName of the MultiSelectLookup
                                console.log("APIName: " + multiSelectLookup.getAPIName());

                                //Get the ConnectedlookupApiname of the MultiSelectLookup
                                console.log("ConnectedlookupApiname: " + multiSelectLookup.getConnectedlookupApiname());

                                //Get the ID of the MultiSelectLookup
                                console.log("ID: " + multiSelectLookup.getId());
                            }

                            let pickListValues = field.getPickListValues();

                            if (pickListValues != null) {
                                pickListValues.forEach(pickListValue => {

                                    this.printPickListValue(pickListValue);
                                });
                            }

                            //Get the AutoNumber of each Field
                            let autoNumber = field.getAutoNumber();

                            if (autoNumber != null) {
                                //Get the Prefix of the AutoNumber
                                console.log("Prefix: " + autoNumber.getPrefix());

                                //Get the Suffix of the AutoNumber
                                console.log("Suffix: " + autoNumber.getSuffix());

                                if (autoNumber.getStartNumber() != null) {
                                    //Get the StartNumber of the AutoNumber
                                    console.log("StartNumber: " + autoNumber.getStartNumber().toString());
                                }
                            }

                            //Get the PersonalityName of each Field
                            console.log("PersonalityName: " + field.getPersonalityName());

                            if (field.getMandatory() != null) {
                                //Get the Mandatory of each Field
                                console.log("Mandatory: " + field.getMandatory().toString());
                            }
                        }

                        //Get the CriteriaMessage of each Transition
                        console.log("Transition CriteriaMessage: " + transition.getCriteriaMessage());

                        //Get the PercentPartialSave of each Transition
                        console.log("Transition PercentPartialSave: " + transition.getPercentPartialSave());

                        if (transition.getExecutionTime() != null) {
                            //Get the Execution Time of the Transition
                            console.log("Transition ExecutionTime: " + transition.getExecutionTime().toString());
                        }

                        //Get the type of each Transition
                        console.log("Transition Type: " + transition.getType());
                    });
                }
                //Check if the request returned an exception
                else if (responseObject instanceof APIException) {

                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    let details = responseObject.getDetails();

                    //Get the details map
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }

    static printPickListValue(pickListValue) {
        //Get the DisplayValue of each PickListValues
        console.log("DisplayValue: " + pickListValue.getDisplayValue());

        //Get the SequenceNumber of each PickListValues
        console.log("SequenceNumber: " + pickListValue.getSequenceNumber().toString());

        //Get the ExpectedDataType of each PickListValues
        console.log("ExpectedDataType: " + pickListValue.getExpectedDataType());

        //Get the ActualValue of each PickListValues
        console.log("ActualValue: " + pickListValue.getActualValue());

        //Get the SysRefName of each PickListValues
        console.log("SysRefName: " + pickListValue.getSysRefName());

        //Get the Type of each PickListValues
        console.log("Type: " + pickListValue.getType());

        //Get the Id of each PickListValues
        console.log("Id: " + pickListValue.getId());

        if (pickListValue.getMaps() != null) {
            pickListValue.getMaps().forEach(map => {
                //Get the PickListValue of each Maps
                let pickListValues = map.getPickListValues();

                //Check if formula is not null
                if (pickListValues != null) {
                    pickListValues.forEach(pickListValue1 => {
                        this.printPickListValue(pickListValue1);
                    });
                }
            });
        }
    }

    /**
     * <h3> Update Blueprint </h3>
     * This method is used to update a single record's Blueprint details with ID and print the response.
     * @param {String} moduleAPIName The API Name of the record's module
     * @param {BigInt} recordId The ID of the record to update Blueprint
     * @param {BigInt} transitionId The ID of the Blueprint transition Id
     */
    static async updateBlueprint(moduleAPIName, recordId, transitionId) {
        //example

        // let moduleAPIName = "module_api_name";
        // let recordId = 2469044n;
        // let transitionId = 1172075n;

        //Get instance of BluePrintOperations Class that takes moduleAPIName and recordId as parameter
        let bluePrintOperations = new BluePrintOperations(recordId, moduleAPIName);

        //Get instance of BodyWrapper Class that will contain the request body
        let bodyWrapper = new BodyWrapper();

        //Array to contain BluePrint instances
        let bluePrintArray = [];

        //Get instance of BluePrint Class
        let bluePrint = new ZCRMBluePrint();

        //Set transitionId to the BluePrint instance
        bluePrint.setTransitionId(transitionId);

        //Get instance of Record Class
        let data = new ZCRMRecord();

        let lookup = new Map();

        lookup.set("Phone", "8940372937");

        lookup.set("id", "8940372937");

        // data.addKeyValue("Data_3", lookup);

        data.addKeyValue("Phone", "8940372937");

        data.addKeyValue("Notes", "Updated via blueprint");

        let checkLists = [];

        let checkListItem = new Map();

        checkListItem.set("list 1", true);

        checkLists.push(checkListItem);

        checkListItem = new Map();

        checkListItem.set("list 2", true);

        checkLists.push(checkListItem);

        checkListItem = new Map();

        checkListItem.set("list 3", true);

        checkLists.push(checkListItem);

        data.addKeyValue("CheckLists", checkLists);

        //Set data to the BluePrint instance
        bluePrint.setData(data);

        //Add BluePrint instance to the array
        bluePrintArray.push(bluePrint);

        //Set the array to bluePrint in BodyWrapper instance
        bodyWrapper.setBlueprint(bluePrintArray);

        //Call updateBluePrint method that takes BodyWrapper instance
        let response = await bluePrintOperations.updateBlueprint(bodyWrapper);

        if (response != null) {

            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                if (responseObject instanceof SuccessResponse) {

                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
                else if (responseObject instanceof APIException) {

                    //Get the Status
                    console.log("Status: " + responseObject.getStatus().getValue());

                    //Get the Code
                    console.log("Code: " + responseObject.getCode().getValue());

                    console.log("Details");

                    //Get the details map
                    let details = responseObject.getDetails();

                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }

                    //Get the Message
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }
}

module.exports = { BluePrint }
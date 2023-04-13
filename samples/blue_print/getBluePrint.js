import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetBluePrint{
    static async initialize(){
        let user= new ZOHOCRMSDK.UserSignature('myname@mydomain.com');
        let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token =(new ZOHOCRMSDK.OAuthBuilder())
            .clientId("1000.xxxx")
            .clientSecret("xxxxxx")
            .refreshToken("1000.xxxxx.xxxxx")
            .build();
        (await new ZOHOCRMSDK.InitializeBuilder())
            .user(user)
            .environment(environment)
            .token(token)
            .initialize();
    }
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
        let bluePrintOperations = new ZOHOCRMSDK.BluePrints.BluePrintOperations(recordId, moduleAPIName);
        //Call getBlueprint method
        let response = await bluePrintOperations.getBlueprint();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.BluePrints.ResponseWrapper) {
                    let bluePrint = responseObject.getBlueprint();
                    let processInfo = bluePrint.getProcessInfo();
                    if (processInfo != null) {
                        console.log("ProcessInfo Field-ID: " + processInfo.getFieldId());
                        let escalation = processInfo.getEscalation();
                        if (escalation != null) {
                            console.log("ProcessInfo Escalation Days : " + escalation.getDays());
                            console.log("ProcessInfo Escalation Status : " + escalation.getStatus());
                        }
                        console.log("ProcessInfo isContinuous: " + processInfo.getIsContinuous());
                        console.log("ProcessInfo API Name: " + processInfo.getAPIName());
                        console.log("ProcessInfo Continuous: " + processInfo.getContinuous());
                        console.log("ProcessInfo FieldLabel: " + processInfo.getFieldLabel());
                        console.log("ProcessInfo Name: " + processInfo.getName());
                        console.log("ProcessInfo ColumnName: " + processInfo.getColumnName());
                        console.log("ProcessInfo FieldValue: " + processInfo.getFieldValue());
                        console.log("ProcessInfo ID: " + processInfo.getId());
                        console.log("ProcessInfo FieldName: " + processInfo.getFieldName());
                    }
                    let transitions = bluePrint.getTransitions();
                    transitions.forEach(transition => {
                        let nextTransitions = transition.getNextTransitions();
                        nextTransitions.forEach(nextTransition => {
                            console.log("NextTransition ID: " + nextTransition.getId());
                            console.log("NextTransition CriteriaMatched: " + nextTransition.getCriteriaMatched());
                            console.log("NextTransition Name: " + nextTransition.getName());
                            console.log("NextTransition Type: " + nextTransition.getType());
                        });
                        let parentTransition = transition.getParentTransition();
                        if (parentTransition != null) {
                            console.log("Parenttransition ID: " + parentTransition.getId());
                        }
                        let data = transition.getData();
                        if (data != null) {
                            console.log("Record ID: " + data.getId());
                            let createdBy = data.getCreatedBy();
                            if (createdBy != null) {
                                console.log("Record Created By User-ID: " + createdBy.getId());
                                console.log("Record Created By User-Name: " + createdBy.getName());
                            }
                            if (data.getCreatedTime() != null) {
                                console.log("Record Created Time: " + data.getCreatedTime().toString());
                            }
                            if (data.getModifiedTime() != null) {
                                console.log("Record Modified Time: " + data.getModifiedTime().toString());
                            }
                            let modifiedBy = data.getModifiedBy();
                            if (modifiedBy != null) {
                                console.log("Record Modified By User-ID: " + modifiedBy.getId());
                                console.log("Record Modified By user-Name: " + modifiedBy.getName());
                            }
                            Array.from(data.getKeyValues().keys()).forEach(key => {
                                console.log(key + ": " + data.getKeyValues().get(key));
                            });
                        }
                        console.log("Transition NextFieldValue: " + transition.getNextFieldValue());
                        console.log("Transition Name: " + transition.getName());
                        console.log("Transition CriteriaMatched: " + transition.getCriteriaMatched().toString());
                        console.log("Transition ID: " + transition.getId());
                        let fields = transition.getFields();
                        console.log("Transition Fields");
                        for (let index = 0; index < fields.length; index++) {
                            const field = fields[index];
                            if (field.getSystemMandatory() != null) {
                                console.log("SystemMandatory: " + field.getSystemMandatory().toString());
                            }
                            console.log("Private" + field.getPrivate());
                            console.log("Webhook: " + field.getWebhook());
                            console.log("JsonType: " + field.getJsonType());
                            if (field.getCrypt() != null) {
                                let crypt = field.getCrypt();
                                console.log("Crypt Mode: " + crypt.getMode());
                                console.log("Crypt Column: " + crypt.getColumn());
                                console.log("Crypt Table: " + crypt.getTable());
                                console.log("Crypt Status: " + crypt.getStatus());
                            }
                            console.log("FieldLabel: " + field.getFieldLabel());
                            let toolTip = field.getTooltip();
                            if (toolTip != null) {
                                console.log("Tooltip Name: " + toolTip.getName());
                                console.log("Tooltip Value: " + toolTip.getValue());
                            }
                            console.log("CreatedSource: " + field.getCreatedSource());
                            let layout = field.getLayouts();
                            if (layout != null) {
                                console.log("Layout ID: " + layout.getId());
                                console.log("Layout Name: " + layout.getName());
                            }
                            if (field.getFieldReadOnly() != null) {
                                console.log("FieldReadOnly: " + field.getFieldReadOnly().toString());
                            }
                            console.log("Field Content: " + field.getContent());
                            console.log("DisplayLabel: " + field.getDisplayLabel());
                            if (field.getDisplayType() != null) {
                                console.log("Field DisplayType: " + field.getDisplayType().getValue());
                            }
                            console.log("Field UiType: " + field.getUiType());
                            console.log("Field ValidationRule: " + field.getValidationRule());
                            if (field.getReadOnly() != null) {
                                console.log("ReadOnly: " + field.getReadOnly().toString());
                            }
                            console.log("AssociationDetails: " + field.getAssociationDetails());
                            if (field.getQuickSequenceNumber() != null) {
                                console.log("QuickSequenceNumber: " + field.getQuickSequenceNumber().toString());
                            }
                            let multiModuleLookup = field.getMultiModuleLookup();
                            if (multiModuleLookup != null) {
                                let module = multiModuleLookup.getModule();
                                if (module != null) {
                                    console.log("Field MultiModuleLookup Module APIName: " + module.getAPIName());
                                    console.log("Field MultiModuleLookup Module Id: " + module.getId());
                                }
                                console.log("Field MultiModuleLookup Name: " + multiModuleLookup.getName());
                                console.log("Field MultiModuleLookup Id: " + multiModuleLookup.getId());
                            }
                            let currency = field.getCurrency();
                            if (currency != null) {
                                console.log("Field Currency RoundingOption: " + currency.getRoundingOption());
                                if (currency.getPrecision() != null) {
                                    console.log("Field Currency Precision: " + currency.getPrecision());
                                }
                            }
                            console.log("ID: " + field.getId());
                            if (field.getCustomField() != null) {
                                console.log("CustomField: " + field.getCustomField().toString());
                            }
                            let lookup = field.getLookup();
                            if (lookup != null) {
                                let layout1 = lookup.getLayout();
                                if (layout1 != null) {
                                    console.log("Field Lookup Layout ID: " + layout1.getId());
                                    console.log("Field Lookup Layout Name: " + layout1.getName());
                                }
                                console.log("Field Lookup DisplayLabel: " + lookup.getDisplayLabel());
                                console.log("Field Lookup APIName: " + lookup.getAPIName());
                                console.log("Field Lookup Module: " + lookup.getModule());
                                if (lookup.getId() != null) {
                                    console.log("Field Lookup ID: " + lookup.getId());
                                }
                            }
                            console.log("Field Filterable: " + field.getFilterable());
                            if (field.getConvertMapping() != null) {
                                Array.from(field.getConvertMapping().keys()).forEach(key => {
                                    console.log(key + ": " + field.getConvertMapping().get(key));
                                });
                            }
                            if (field.getVisible() != null) {
                                console.log("Visible: " + field.getVisible().toString());
                            }
                            let profiles = field.getProfiles();
                            if (profiles != null) {
                                profiles.forEach(profile => {
                                    console.log("Field Profile PermissionType: " + profile.getPermissionType());
                                    console.log("Field Profile Name: " + profile.getName());
                                    console.log("Field Profile Id: " + profile.getId());
                                });
                            }
                            if (field.getLength() != null) {
                                console.log("Length: " + field.getLength().toString());
                            }
                            console.log("ColumnName: " + field.getColumnName());
                            console.log("Type: " + field.getType());
                            let viewType = field.getViewType();
                            if (viewType != null) {
                                console.log("Field View: " + viewType.getView());
                                console.log("Field Edit: " + viewType.getEdit());
                                console.log("Field Create: " + viewType.getCreate());
                                console.log("Field QuickCreate: " + viewType.getQuickCreate());
                            }
                            console.log("Field PickListValuesSortedLexically: " + field.getPickListValuesSortedLexically());
                            console.log("Sortable: " + field.getSortable());
                            console.log("TransitionSequence: " + field.getTransitionSequence().toString());
                            let external = field.getExternal();
                            if (external != null) {
                                console.log("Field External Show: " + external.getShow());
                                console.log("Field External Type: " + external.getType());
                                console.log("Field External AllowMultipleConfig: " + external.getAllowMultipleConfig());
                            }
                            console.log("APIName: " + field.getAPIName());
                            let unique = field.getUnique();
                            if (unique != null) {
                                console.log("Field Unique Casesensitive : " + unique.getCasesensitive());
                            }
                            if (field.getHistoryTracking() != null) {
                                console.log("Field HistoryTracking: " + field.getHistoryTracking());
                            }
                            console.log("DataType: " + field.getDataType());
                            let formula = field.getFormula();
                            if (formula != null) {
                                console.log("Field Formula ReturnType : " + formula.getReturnType());
                                if (formula.getExpression() != null) {
                                    console.log("Field Formula Expression : " + formula.getExpression());
                                }
                            }
                            console.log("DecimalPlace: " + field.getDecimalPlace());
                            let multiSelectLookup = field.getMultiselectlookup();
                            if (multiSelectLookup != null) {
                                console.log("DisplayLabel: " + multiSelectLookup.getDisplayLabel());
                                console.log("LinkingModule: " + multiSelectLookup.getLinkingModule());
                                console.log("LookupApiname: " + multiSelectLookup.getLookupApiname());
                                console.log("APIName: " + multiSelectLookup.getAPIName());
                                console.log("ConnectedlookupApiname: " + multiSelectLookup.getConnectedlookupApiname());
                                console.log("ID: " + multiSelectLookup.getId());
                            }
                            let pickListValues = field.getPickListValues();
                            if (pickListValues != null) {
                                pickListValues.forEach(pickListValue => {
                                    this.printPickListValue(pickListValue);
                                });
                            }
                            let autoNumber = field.getAutoNumber();
                            if (autoNumber != null) {
                                console.log("Prefix: " + autoNumber.getPrefix());
                                console.log("Suffix: " + autoNumber.getSuffix());
                                if (autoNumber.getStartNumber() != null) {
                                    console.log("StartNumber: " + autoNumber.getStartNumber().toString());
                                }
                            }
                            console.log("PersonalityName: " + field.getPersonalityName());
                            if (field.getMandatory() != null) {
                                console.log("Mandatory: " + field.getMandatory().toString());
                            }
                        }
                        console.log("Transition CriteriaMessage: " + transition.getCriteriaMessage());
                        console.log("Transition PercentPartialSave: " + transition.getPercentPartialSave());
                        if (transition.getExecutionTime() != null) {
                            console.log("Transition ExecutionTime: " + transition.getExecutionTime().toString());
                        }
                        console.log("Transition Type: " + transition.getType());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.BluePrints.APIException) {
                    console.log("Status: " + responseObject.getStatus().getValue());
                    console.log("Code: " + responseObject.getCode().getValue());
                    console.log("Details");
                    let details = responseObject.getDetails();
                    if (details != null) {
                        Array.from(details.keys()).forEach(key => {
                            console.log(key + ": " + details.get(key));
                        });
                    }
                    console.log("Message: " + responseObject.getMessage().getValue());
                }
            }
        }
    }
    static printPickListValue(pickListValue) {
        console.log("DisplayValue: " + pickListValue.getDisplayValue());
        console.log("SequenceNumber: " + pickListValue.getSequenceNumber().toString());
        console.log("ExpectedDataType: " + pickListValue.getExpectedDataType());
        console.log("ActualValue: " + pickListValue.getActualValue());
        console.log("SysRefName: " + pickListValue.getSysRefName());
        console.log("Type: " + pickListValue.getType());
        console.log("Id: " + pickListValue.getId());
        if (pickListValue.getMaps() != null) {
            pickListValue.getMaps().forEach(map => {
                let pickListValues = map.getPickListValues();
                if (pickListValues != null) {
                    pickListValues.forEach(pickListValue1 => {
                        this.printPickListValue(pickListValue1);
                    });
                }
            });
        }
    }
}
await GetBluePrint.initialize();
let moduleAPIName = "Leads";
let recordId = 440248000000774074n;
await GetBluePrint.getBlueprint(moduleAPIName,recordId);
export {
    GetBluePrint as GetBluePrint
}

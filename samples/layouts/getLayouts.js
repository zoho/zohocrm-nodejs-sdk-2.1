import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetLayouts{
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
    static async getLayouts(moduleAPIName) {
        //example
        //let moduleAPIName = "module_api_name";
        let layoutsOperations = new ZOHOCRMSDK.Layouts.LayoutsOperations(moduleAPIName);
        //Call getLayouts method
        let response = await layoutsOperations.getLayouts();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Layouts.ResponseWrapper) {
                    let layouts = responseObject.getLayouts();
                    for (const layout of layouts) {
                        if (layout.getCreatedTime() != null) {
                            console.log("Layout CreatedTime: " + layout.getCreatedTime().toString());
                        }
                        if (layout.getConvertMapping() != null) {
                            Array.from(layout.getConvertMapping().keys()).forEach(key => {
                                console.log(key + ": " + layout.getConvertMapping().get(key));
                            });
                        }
                        console.log("Layout Visible: " + layout.getVisible().toString());
                        let createdFor = layout.getCreatedFor();
                        if (createdFor != null) {
                            console.log("Layout CreatedFor User-Name: " + createdFor.getName());
                            console.log("Layout CreatedFor User-ID: " + createdFor.getId());
                            console.log("Layout CreatedFor User-Email: " + createdFor.getEmail());
                        }
                        let profiles = layout.getProfiles();
                        if (profiles != null) {
                            profiles.forEach(profile => {
                                console.log("Layout Profile Default: " + profile.getDefault().toString());
                                console.log("Layout Profile Name: " + profile.getName().toString());
                                console.log("Layout Profile ID: " + profile.getId().toString());
                                let defaultView = profile.getDefaultview();
                                if (defaultView != null) {
                                    console.log("Layout Profile DefaultView Name: " + defaultView.getName());
                                    console.log("Layout Profile DefaultView ID: " + defaultView.getId());
                                    console.log("Layout Profile DefaultView Type: " + defaultView.getType());
                                }
                            });
                        }
                        let createdBy = layout.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Layout CreatedBy User-Name: " + createdBy.getName());
                            console.log("Layout CreatedBy User-ID: " + createdBy.getId());
                            console.log("Layout CreatedBy User-Email: " + createdBy.getEmail());
                        }
                        let sections = layout.getSections();
                        if (sections != null) {
                            sections.forEach(section => {
                                console.log("Layout Section DisplayLabel: " + section.getDisplayLabel());
                                console.log("Layout Section SequenceNumber: " + section.getSequenceNumber().toString());
                                console.log("Layout Section Issubformsection: " + section.getIssubformsection().toString());
                                console.log("Layout Section TabTraversal: " + section.getTabTraversal().toString());
                                console.log("Layout Section APIName: " + section.getAPIName());
                                console.log("Layout Section ColumnCount: " + section.getColumnCount().toString());
                                console.log("Layout Section Name: " + section.getName());
                                console.log("Layout Section GeneratedType: " + section.getGeneratedType());
                                console.log("Layout Section Type: " + section.getType());
                                let fields = section.getFields();
                                if (fields != null) {
                                    fields.forEach(async field => {
                                        await this.printField(field);
                                    });
                                }
                                let properties = section.getProperties();
                                if (properties != null) {
                                    console.log("Layout Section Properties ReorderRows: " + properties.getReorderRows().toString());
                                    let tooltip = properties.getTooltip();
                                    if (tooltip != null) {
                                        console.log("Layout Section Properties ToolTip Name: " + tooltip.getName().toString());
                                        console.log("Layout Section Properties ToolTip Value: " + tooltip.getValue().toString());
                                    }
                                    console.log("Layout Section Properties MaximumRows: " + properties.getMaximumRows().toString());
                                }
                            });
                        }
                        console.log("Layout ShowBusinessCard: " + layout.getShowBusinessCard());
                        if (layout.getModifiedTime() != null) {
                            console.log("Layout ModifiedTime: " + layout.getModifiedTime());
                        }
                        console.log("Layout Name: " + layout.getName());
                        let modifiedBy = layout.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Layout ModifiedBy User-Name: " + modifiedBy.getName());
                            console.log("Layout ModifiedBy User-ID: " + modifiedBy.getId());
                            console.log("Layout ModifiedBy User-Email: " + modifiedBy.getEmail());
                        }
                        console.log("Layout ID: " + layout.getId());
                        console.log("Layout Status: " + layout.getStatus());
                        console.log("Layout DisplayType : " + layout.getDisplayType());
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Layouts.APIException) {
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
    static async printField(field) {
        console.log("Field SystemMandatory: " + field.getSystemMandatory().toString());
        console.log("Field Webhook: " + field.getWebhook().toString());
        console.log("Field JsonType: " + field.getJsonType());
        let privateInfo = field.getPrivate();
        if (privateInfo != null) {
            console.log("Private Details\n");
            console.log("Field Private Type: " + privateInfo.getType());
            console.log("Field Private Export: " + privateInfo.getExport());
            console.log("Field Private Restricted: " + privateInfo.getRestricted());
        }
        let crypt = field.getCrypt();
        if (crypt != null) {
            console.log("Crypt Details");
            console.log("Field Crypt Mode: " + crypt.getMode());
            console.log("Field Crypt Column: " + crypt.getColumn());
            console.log("Field Crypt Table: " + crypt.getTable());
            console.log("Field Crypt Status: " + crypt.getStatus().toString());
            let encFldIds = crypt.getEncfldids();
            if (encFldIds != null) {
                console.log("EncFldIds : ");
                encFldIds.forEach(encFldId => {
                    console.log(encFldId);
                });
            }
            console.log("Field Crypt Notify: " + crypt.getNotify());
        }
        console.log("Field FieldLabel: " + field.getFieldLabel());
        let toolTip = field.getTooltip();
        if (toolTip != null) {
            console.log("Field ToolTip Name: " + toolTip.getName());
            console.log("Field ToolTip Value: " + toolTip.getValue());
        }
        console.log("Field CreatedSource: " + field.getCreatedSource());
        console.log("Field FieldReadOnly: " + field.getFieldReadOnly().toString());
        console.log("Field DisplayLabel: " + field.getDisplayLabel());
        console.log("Field ReadOnly: " + field.getReadOnly().toString());
        let associationDetails = field.getAssociationDetails();
        if (associationDetails != null) {
            let lookupField = associationDetails.getLookupField();
            if (lookupField != null) {
                console.log("Field AssociationDetails LookupField ID: " + lookupField.getId());
                console.log("Field AssociationDetails LookupField Name: " + lookupField.getName())
            }
            let relatedField = associationDetails.getRelatedField();
            if (relatedField != null) {
                console.log("Field AssociationDetails RelatedField ID: " + relatedField.getId());
                console.log("Field AssociationDetails RelatedField Name: " + relatedField.getName());
            }
        }
        console.log("Field Filterable: "+ field.getFilterable() );
        if (field.getConvertMapping() != null) {
            console.log("Field ConvertMapping: \n");
            Array.from(field.getConvertMapping().keys()).forEach(key => {
                console.log(key + ": " + field.getConvertMapping().get(key));
            });
        }
        if(field.getHistoryTracking() != null)
        {
            let historytracking = field.getHistoryTracking();
            let module =  historytracking.getModule();
            if (module != null) {
                let moduleLayout = module.getLayout();
                if (moduleLayout != null) {
                    console.log("Module Layout ID" + moduleLayout.getId());
                }
                console.log("Module Layout Module DisplayLabe" + module.getDisplayLabel());
                console.log("Module Layout Module APIName" + module.getAPIName());
                console.log("Module Layout Module ID" + module.getId());
                console.log("Module Layout Module" + module.getModule());
                console.log("Module Layout Module Name" + module.getModuleName());
            }
            let durationConfigured = historytracking.getDurationConfiguredField();
            if(durationConfigured != null) {
                console.log("historytracking duration configured field" + durationConfigured.getId());
            }
        }
        if (field.getBusinesscardSupported() != null) {
            console.log("Field BusinesscardSupported: " + field.getBusinesscardSupported().toString());
        }
        let currency = field.getCurrency();
        if (currency != null) {
            console.log("Field Currency RoundingOption: " + currency.getRoundingOption());
            if (currency.getPrecision() != null) {
                console.log("Field Currency Precision: " + currency.getPrecision().toString());
            }
        }
        if (field.getQuickSequenceNumber() != null) {
            console.log("Field QuickSequenceNumber: " + field.getQuickSequenceNumber().toString());
        }
        console.log("Field ID: " + field.getId().toString());
        if (field.getCustomField() != null) {
            console.log("Field CustomField: " + field.getCustomField().toString());
        }
        let lookup = field.getLookup();
        if (lookup != null) {
            let layout = lookup.getLayout();
            if (layout != null) {
                console.log("Field Lookup Layout ID: " + layout.getId().toString());
                console.log("Field Lookup Layout Name: " + layout.getName());
            }
            console.log("Field Lookup DisplayLabel: " + lookup.getDisplayLabel());
            console.log("Field Lookup APIName: " + lookup.getAPIName());
            console.log("Field Lookup Module: " + lookup.getModule());
            if (lookup.getId() != null) {
                console.log("Field Lookup ID: " + lookup.getId().toString());
            }
            console.log("Field Lookup ModuleName: " + lookup.getModuleName());
        }
        if (field.getVisible() != null) {
            console.log("Field Visible: " + field.getVisible().toString());
        }
        console.log("Field PickListValuesSortedLexically: " + field.getPickListValuesSortedLexically());
        console.log("Field Sortable: " + field.getSortable());
        console.log("Field UIType: " + field.getUiType());
        if (field.getSequenceNumber() != null) {
            console.log("Field PickListValue SequenceNumber: " + field.getSequenceNumber().toString());
        }
        let profiles = field.getProfiles();
        if (profiles != null) {
            profiles.forEach(profile => {
                console.log("Field Profile PermissionType: " + profile.getPermissionType());
                console.log("Field Profile Name: " + profile.getName());
                console.log("Field Profile Id: " + profile.getId());
            });
        }
        if(field.getLength() != null) {
            console.log("Field Length: " + field.getLength().toString());
        }
        let viewType = field.getViewType();
        if (viewType != null) {
            console.log("Field ViewType View: " + viewType.getView().toString());
            console.log("Field ViewType Edit: " + viewType.getEdit().toString());
            console.log("Field ViewType Create: " + viewType.getCreate().toString());
            console.log("Field ViewType QuickCreate: " + viewType.getQuickCreate().toString());
        }
        let subform = field.getSubform();
        if (subform != null) {
            let layout = subform.getLayout();
            if (layout != null) {
                console.log("Field Subform Layout ID: " + layout.getId().toString());
                console.log("Field Subform Layout Name: " + layout.getName());
            }
            console.log("Field Subform DisplayLabel: " + subform.getDisplayLabel());
            console.log("Field Subform APIName: " + subform.getAPIName());
            console.log("Field Subform Module: " + subform.getModule());
            if (subform.getId() != null) {
                console.log("Field Subform ID: " + subform.getId().toString());
            }
        }
        console.log("Field APIName: " + field.getAPIName().toString());
        let unique = field.getUnique();
        if (unique != null) {
            console.log("Field Unique Casesensitive : " + unique.getCasesensitive());
        }
        console.log("Field DataType: " + field.getDataType().toString());
        let formula = field.getFormula();
        if (formula != null) {
            console.log("Field Formula ReturnType : " + formula.getReturnType());
            if (formula.getExpression() != null) {
                console.log("Field Formula Expression : " + formula.getExpression().toString());
            }
        }
        if (field.getDecimalPlace() != null) {
            console.log("Field DecimalPlace: " + field.getDecimalPlace().toString());
        }
        console.log("Field MassUpdate: " + field.getMassUpdate());
        if (field.getBlueprintSupported() != null) {
            console.log("Field BlueprintSupported: " + field.getBlueprintSupported().toString());
        }
        let multiSelectLookup = field.getMultiselectlookup();
        if (multiSelectLookup != null) {
            console.log("Field MultiSelectLookup DisplayLabel: " + multiSelectLookup.getDisplayLabel());
            console.log("Field MultiSelectLookup LinkingModule: " + multiSelectLookup.getLinkingModule());
            console.log("Field MultiSelectLookup LookupApiname: " + multiSelectLookup.getLookupApiname());
            console.log("Field MultiSelectLookup APIName: " + multiSelectLookup.getAPIName());
            console.log("Field MultiSelectLookup ConnectedModule: " + multiSelectLookup.getConnectedModule());
            console.log("Field MultiSelectLookup ConnectedlookupApiname: " + multiSelectLookup.getConnectedlookupApiname());
            console.log("Field MultiSelectLookup ID: " + multiSelectLookup.getId());
        }
        let pickListValues = field.getPickListValues();
        if (pickListValues != null) {
            pickListValues.forEach(async pickListValue => {
                await this.printPickListValue(pickListValue);
            });
        }
        let autoNumber = field.getAutoNumber();
        if (autoNumber != null) {
            console.log("Field AutoNumber Prefix: " + autoNumber.getPrefix());
            console.log("Field AutoNumber Suffix: " + autoNumber.getSuffix());
            if (autoNumber.getStartNumber() != null) {
                console.log("Field AutoNumber StartNumber: " + autoNumber.getStartNumber().toString());
            }
        }
        if(field.getDefaultValue() != null){
            console.log("Field DefaultValue: " + field.getDefaultValue().toString());
        }
        console.log("Field DisplayType: " + field.getDisplayType());
        if(field.getValidationRule() != null) {
            console.log("Field ValidationRule: \n");
            Array.from(field.getValidationRule().keys()).forEach(key => {
                console.log(key + ": " + field.getValidationRule().get(key));
            });
        }
        console.log("Get field type" + field.getType());
        let external = field.getExternal();
        if (external != null) {
            console.log("Field External Show: " + external.getShow());
            console.log("Field External Type: " + external.getType());
            console.log("Field External AllowMultipleConfig: " + external.getAllowMultipleConfig());
        }
        //get multi user lookup for field
        if (field.getMultiuserlookup() != null) {
            let multiuserlookup = field.getMultiuserlookup();
            //get displaylabel of multiuser lookup
            console.log("Field MultiUserLookup DisplayLabel" + multiuserlookup.getDisplayLabel());
            //get linking module of multiuser lookup
            console.log("Field MultiUserLookup LinkingModule" + multiuserlookup.getLinkingModule());
            //get lookup apiname of multiuser lookup
            console.log("Field MultiUserLookup LookupApiname" + multiuserlookup.getLookupApiname());
            //get apiname of multiuser lookup
            console.log("Field MultiUserLookup APIName" + multiuserlookup.getAPIName());
            //get id of multiuser lookup
            console.log("Field MultiUserLookup ID" + multiuserlookup.getId());
            //get connected module of multiuser lookup
            console.log("Field MultiUserLookup ConnectedModule" + multiuserlookup.getConnectedModule());
            //get connected lookup apiname of multiuser lookup
            console.log("Field MultiUserLookup ConnectedlookupApiname" + multiuserlookup.getConnectedlookupApiname());
        }
    }
    static async printPickListValue(pickListValue) {
        console.log("Field PickListValue DisplayValue: " + pickListValue.getDisplayValue());
        if (pickListValue.getSequenceNumber() != null) {
            console.log("Field PickListValue SequenceNumber: " + pickListValue.getSequenceNumber().toString());
        }
        console.log("Field PickListValue ExpectedDataType: " + pickListValue.getExpectedDataType());
        if (pickListValue.getMaps() != null) {
            pickListValue.getMaps().forEach(map => {
                console.log("Field PickListValue Maps APIName: " + map.getAPIName());
                let pickListValues = map.getPickListValues();
                if (pickListValues != null) {
                    pickListValues.forEach(async pickListValue1 => {
                        await this.printPickListValue(pickListValue1);
                    });
                }
            });
        }
        console.log("Field PickListValue ActualValue: " + pickListValue.getActualValue());
        console.log("Field PickListValue SysRefName: " + pickListValue.getSysRefName());
        console.log("Field PickListValue Type: " + pickListValue.getType());
        console.log("Field PickListValue Id: " + pickListValue.getId());
    }
}
await GetLayouts.initialize();
let moduleAPIName = "leads";
await GetLayouts.getLayouts(moduleAPIName);
export {
    GetLayouts as Getlayouts
}

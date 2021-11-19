const WizardsOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/wizards/wizards_operations").WizardsOperations;
const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;
const GetWizardbyIDParam = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/wizards/wizards_operations").GetWizardbyIDParam;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/wizards/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/wizards/api_exception").APIException;

class Wizard {

    static async getWizards() {
        //Get instance of WizardsOperations Class
        let wizardsOperations = new WizardsOperations();

        //Call getWizards method
        let response = await wizardsOperations.getWizards();

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof ResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the list of obtained Wizard instances
                let wizards = responseWrapper.getWizards();

                wizards.forEach(wizard => {
                    //Get the CreatedTime of each Wizard
                    console.log("Wizard CreatedTime: " + wizard.getCreatedTime());

                    //Get the PermissionType of each Wizard
                    console.log("Wizard ModifiedTime: " + wizard.getModifiedTime());

                    //Get the manager User instance of each Wizard
                    let module = wizard.getModule();

                    //Check if manager is not null
                    if (module != null) {
                        //Get the Name of the Manager
                        console.log("Wizard Module APIName: " + module.getAPIName());

                        //Get the ID of the Manager
                        console.log("Wizard Module Id: " + module.getId());
                    }

                    //Get the Name of each Wizard
                    console.log("Wizard Name: " + wizard.getName());

                    //Get the modifiedBy User instance of each Wizard
                    let modifiedBy = wizard.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the Name of the modifiedBy User
                        console.log("Wizard Modified By User-Name: " + modifiedBy.getName());

                        //Get the ID of the modifiedBy User
                        console.log("Wizard Modified By User-ID: " + modifiedBy.getId());
                    }

                    //Get the array of Profile instance each Wizard
                    let profiles = wizard.getProfiles();

                    //Check if profiles is not null
                    if (profiles != null) {
                        profiles.forEach(profile => {
                            //Get the Name of each Profile
                            console.log("Wizard Profile Name: " + profile.getName());

                            //Get the ID of each Profile
                            console.log("Wizard Profile ID: " + profile.getId());
                        });
                    }

                    //Get the Active of each Wizard
                    console.log("Wizard Active: " + wizard.getActive());

                    //Get the array of Container instance each Wizard
                    let containers = wizard.getContainers();

                    //Check if containers is not null
                    if (containers != null) {
                        containers.forEach(container => {
                            //Get the array of Layout instance each Wizard
                            let layout = container.getLayout();

                            //Check if layout is not null
                            if (layout != null) {
                                //Get the Name of Layout
                                console.log("Wizard Container Layout Name: " + layout.getName());

                                //Get the ID of Layout
                                console.log("Wizard Container Layout ID: " + layout.getId());
                            }

                            //Get the ID of each Container
                            console.log("Wizard Container ID: " + container.getId());
                        });
                    }

                    //Get the ID of each Wizard
                    console.log("Wizard ID: " + wizard.getId());

                    //Get the createdBy User instance of each Wizard
                    let createdBy = wizard.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the Name of the createdBy Wizard
                        console.log("Wizard Created By User-Name: " + createdBy.getName());

                        //Get the ID of the createdBy Wizard
                        console.log("Wizard Created By User-ID: " + createdBy.getId());
                    }
                });
            }
            //Check if the request returned an exception
            else if (responseHandler instanceof APIException) {
                //Get the received APIException instance
                let exception = responseHandler;

                //Get the Status
                console.log("Status: ".exception.getStatus().getValue());

                //Get the Code
                console.log("Code: ".exception.getCode().getValue());

                console.log("Details: ");

                //Get the details map
                let details = exception.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: ".exception.getMessage().getValue());
            }
        }
    }

    static async getWizardById(wizardId, layoutId) {
        //Get instance of WizardsOperations Class
        let wizardsOperations = new WizardsOperations();

        let paramInstance = new ParameterMap();

        await paramInstance.add(GetWizardbyIDParam.LAYOUT_ID, layoutId);

        //Call getWizardById method that takes wizardId as parameter
        let response = await wizardsOperations.getWizardById(wizardId, paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");

                return;
            }

            //Get object from response
            let responseHandler = response.getObject();

            if (responseHandler instanceof ResponseWrapper) {
                //Get the received ResponseWrapper instance
                let responseWrapper = responseHandler;

                //Get the list of obtained Wizard instances
                let wizards = responseWrapper.getWizards();

                wizards.forEach(wizard => {
                    //Get the CreatedTime of each Wizard
                    console.log("Wizard CreatedTime: " + wizard.getCreatedTime());

                    //Get the PermissionType of each Wizard
                    console.log("Wizard ModifiedTime: " + wizard.getModifiedTime());

                    //Get the manager User instance of each Wizard
                    let module = wizard.getModule();

                    //Check if manager is not null
                    if (module != null) {
                        //Get the Name of the Manager
                        console.log("Wizard Module APIName: " + module.getAPIName());

                        //Get the ID of the Manager
                        console.log("Wizard Module Id: " + module.getId());
                    }

                    //Get the Name of each Wizard
                    console.log("Wizard Name: " + wizard.getName());

                    //Get the modifiedBy User instance of each Wizard
                    let modifiedBy = wizard.getModifiedBy();

                    //Check if modifiedBy is not null
                    if (modifiedBy != null) {
                        //Get the Name of the modifiedBy User
                        console.log("Wizard Modified By User-Name: " + modifiedBy.getName());

                        //Get the ID of the modifiedBy User
                        console.log("Wizard Modified By User-ID: " + modifiedBy.getId());
                    }

                    //Get the array of Profile instance each Wizard
                    let profiles = wizard.getProfiles();

                    //Check if profiles is not null
                    if (profiles != null) {
                        profiles.forEach(profile => {
                            //Get the Name of each Profile
                            console.log("Wizard Profile Name: " + profile.getName());

                            //Get the ID of each Profile
                            console.log("Wizard Profile ID: " + profile.getId());
                        });
                    }

                    //Get the Active of each Wizard
                    console.log("Wizard Active: " + wizard.getActive());

                    //Get the array of Container instance each Wizard
                    let containers = wizard.getContainers();

                    //Check if containers is not null
                    if (containers != null) {
                        containers.forEach(container => {
                            //Get the array of Layout instance each Wizard
                            let layout = container.getLayout();

                            //Check if layout is not null
                            if (layout != null) {
                                //Get the Name of Layout
                                console.log("Wizard Container Layout Name: " + layout.getName());

                                //Get the ID of Layout
                                console.log("Wizard Container Layout ID: " + layout.getId());
                            }

                            let chartData = container.getChartData();

                            if (chartData != null) {
                                let nodes = chartData.getNodes();

                                if (nodes != null) {
                                    nodes.forEach(async node => {
                                        console.log("Wizard Container ChartData Node PosY: " + node.getPosY());

                                        console.log("Wizard Container ChartData Node PosX: " + node.getPosX());

                                        console.log("Wizard Container ChartData Node StartNode: " + node.getStartNode());

                                        let screen = await node.getScreen();

                                        if (screen != null) {
                                            console.log("Wizard Container ChartData Node Screen DisplayLabel: " + screen.getDisplayLabel());

                                            console.log("Wizard Container ChartData Node Screen ID: " + screen.getId());
                                        }
                                    });
                                }

                                let connections = chartData.getConnections();

                                if (connections != null) {
                                    connections.forEach(async connection => {
                                        let sourceButton = connection.getSourceButton();

                                        if (sourceButton != null) {
                                            await this.printButton(sourceButton);
                                        }

                                        let targetScreen = connection.getTargetScreen();

                                        if (targetScreen != null) {
                                            await this.printScreen(targetScreen);
                                        }
                                    });
                                }

                                console.log("Wizard Container ChartData CanvasWidth: " + chartData.getCanvasWidth());

                                console.log("Wizard Container ChartData CanvasHeight: " + chartData.getCanvasHeight());
                            }

                            let screens = container.getScreens();

                            if (screens != null) {
                                screens.forEach(async screen => {
                                    await this.printScreen(screen);
                                });
                            }

                            //Get the ID of each Container
                            console.log("Wizard Container ID: " + container.getId());
                        });
                    }

                    //Get the ID of each Wizard
                    console.log("Wizard ID: " + wizard.getId());

                    //Get the createdBy User instance of each Wizard
                    let createdBy = wizard.getCreatedBy();

                    //Check if createdBy is not null
                    if (createdBy != null) {
                        //Get the Name of the createdBy Wizard
                        console.log("Wizard Created By User-Name: " + createdBy.getName());

                        //Get the ID of the createdBy Wizard
                        console.log("Wizard Created By User-ID: " + createdBy.getId());
                    }
                });
            }
            //Check if the request returned an exception
            else if (responseHandler instanceof APIException) {
                //Get the Status
                console.log("Status: " + responseHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + responseHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = responseHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + responseHandler.getMessage().getValue());
            }
        }
    }

    static async printScreen(screen) {
        console.log("Screen Id: " + screen.getId());

        console.log("Screen DisplayLabel: " + screen.getDisplayLabel());

        let segments = screen.getSegments();

        if (segments != null) {
            segments.forEach(async segment => {
                await this.printSegment(segment);
            });
        }
    }

    static async printSegment(segment) {
        console.log("Segment Id: " + segment.getId());

        console.log("Segment SequenceNumber: " + segment.getSequenceNumber());

        console.log("Segment DisplayLabel: " + segment.getDisplayLabel());

        console.log("Segment Type: " + segment.getType());

        console.log("Segment ColumnCount: " + segment.getColumnCount());

        let fields = segment.getFields();

        if (fields != null) {
            fields.forEach(field => {
                console.log("Segment Field SequenceNumber: " + field.getSequenceNumber());

                console.log("Segment Field APIName: " + field.getAPIName());

                console.log("Segment Field Id: " + field.getId());
            });
        }

        let buttons = segment.getButtons();

        if (buttons != null) {
            buttons.forEach(async button => {
                if (button != null) {
                    await this.printButton(button);
                }
            });
        }
    }

    static async printButton(button) {
        console.log("Button Id: " + button.getId());

        console.log("Button SequenceNumber: " + button.getSequenceNumber());

        console.log("Button DisplayLabel: " + button.getDisplayLabel());

        let criteria = button.getCriteria();

        //Check if criteria is not null
        if (criteria != null) {
            await printCriteria(criteria);
        }

        let targetScreen = button.getTargetScreen();

        if (targetScreen != null) {
            console.log("Button TargetScreen DisplayLabel: " + targetScreen.getDisplayLabel());

            console.log("Button TargetScreen Id: " + targetScreen.getId());
        }

        console.log("Button Type: " + button.getType());

        console.log("Button Color: " + button.getColor());

        console.log("Button Shape: " + button.getShape());

        console.log("Button BackgroundColor: " + button.getBackgroundColor());

        console.log("Button Visibility: " + button.getVisibility());

        let transition = button.getTransition();

        if (transition != null) {
            console.log("Button Transition Name: " + transition.getName());

            console.log("Button Transition Id: " + transition.getId());
        }
    }

    static async printCriteria(criteria) {
        if (criteria.getComparator() != null) {
            //Get the Comparator of the Criteria
            console.log("Criteria Comparator: " + criteria.getComparator().getValue());
        }

        //Get the Field of the Criteria
        let field = criteria.getField();

        if (field != null) {
            console.log("Criteria Field: " + field.getAPIName());

            console.log("Criteria Field: " + field.getId());
        }

        //Get the Value of the Criteria
        console.log("Criteria Value: " + criteria.getValue());

        // Get the List of Criteria instance of each Criteria
        let criteriaGroup = criteria.getGroup();

        if (criteriaGroup != null) {
            criteriaGroup.forEach(async criteria1 => {
                this.printCriteria(criteria1);
            });
        }

        if (criteria.getGroupOperator() != null) {
            //Get the Group Operator of the Criteria
            console.log("Criteria Group Operator: " + criteria.getGroupOperator().getValue());
        }
    }
}

module.exports = { Wizard }
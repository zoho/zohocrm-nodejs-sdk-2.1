const PipelineOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/pipeline_operations").PipelineOperations;
const TransferAndDeleteWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/transfer_and_delete_wrapper").TransferAndDeleteWrapper;
const PickListValue = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/pick_list_value").PickListValue;
const Stage = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/stage").Stage;
const TransferPipeLine = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/transfer_pipe_line").TransferPipeLine;
const PipeLineClass = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/pipeline").Pipeline;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/body_wrapper").BodyWrapper;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/api_exception").APIException;
const TransferActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/transfer_action_wrapper").TransferActionWrapper;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/action_wrapper").ActionWrapper;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/pipeline/success_response").SuccessResponse;

class PipeLine {
    /**
     * <h3> to Transfer And Delete</h3>
     * This method is used to Transfer And Delete
     * @param {BigInt} layoutId The id of the Layout
     */
    static async transferAndDelete(layoutId) {
        //Get instance of PipelineOperations Class
        let pipelineOperations = new PipelineOperations(layoutId);

        let transferAndDeleteWrapper = new TransferAndDeleteWrapper();

        let transferPipeLine = new TransferPipeLine();

        let pipeline = new PipeLineClass();

        pipeline.setFrom(36523973712004n);

        pipeline.setTo(36523973712004n);

        transferPipeLine.setPipeline(pipeline);

        let stage = new Stage();

        stage.setFrom(36523976817n);

        stage.setTo(36523976819n);

        transferPipeLine.setStages([stage]);

        transferAndDeleteWrapper.setTransferPipeline([transferPipeLine]);

        //Call transferAndDelete method
        let response = await pipelineOperations.transferAndDelete(transferAndDeleteWrapper);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            //Get object from response
            let actionHandler = response.getObject();

            if (actionHandler instanceof TransferActionWrapper) {
                //Get the received ActionWrapper instance
                let actionWrapper = actionHandler;

                //Get the list of obtained action responses
                let actionResponses = actionWrapper.getTransferPipeline();

                actionResponses.forEach(actionResponse => {
                    //Check if the request is successful
                    if (actionResponse instanceof SuccessResponse) {
                        //Get the Status
                        console.log("Status: " + actionResponse.getStatus().getValue());

                        //Get the Code
                        console.log("Code: " + actionResponse.getCode().getValue());

                        console.log("Details");

                        //Get the details map
                        let details = actionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        //Get the Message
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                    //Check if the request returned an exception
                    else if (actionResponse instanceof APIException) {
                        //Get the Status
                        console.log("Status: " + actionResponse.getStatus().getValue());

                        //Get the Code
                        console.log("Code: " + actionResponse.getCode().getValue());

                        console.log("Details");

                        //Get the details map
                        let details = actionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        //Get the Message
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                });
            }
            //Check if the request returned an exception
            else if (actionHandler instanceof APIException) {
                //Get the Status
                console.log("Status: " + actionHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + actionHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = actionHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + actionHandler.getMessage().getValue());
            }
        }
    }

    /**
     * <h3> Get Pipelines</h3>
     * This method is used to get Pipelines
     * @param {BigInt} layoutId The id of the Layout
     * @returns 
     */
    static async getPipelines(layoutId) {
        //Get instance of PipelineOperations Class
        let pipelineOperations = new PipelineOperations(layoutId);

        //Call getPipelines method
        let response = await pipelineOperations.getPipelines();

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

                //Get the list of obtained Pipeline instances
                let pipelines = responseWrapper.getPipeline();

                pipelines.forEach(pipeline => {
                    //Get the Id of each Pipeline
                    console.log("Pipeline ID: " + pipeline.getId());

                    //Get the Default of each Pipeline
                    console.log("Pipeline Default: " + pipeline.getDefault());

                    //Get the DisplayValue of each Pipeline
                    console.log("Pipeline DisplayValue: " + pipeline.getDisplayValue());

                    //Get the ActualValue of each Pipeline
                    console.log("Pipeline ActualValue: " + pipeline.getActualValue());

                    //Get the child available of each Pipeline
                    console.log("Pipeline ChildAvailable  : " + pipeline.getChildAvailable());

                    let parent = pipeline.getParent();

                    if (parent != null) {
                        //Get the ID of  parent
                        console.log("Pipeline parent ID: " + parent.getId());
                    }

                    let maps = pipeline.getMaps();

                    if (maps != null) {
                        maps.forEach(map => {
                            //Get the Maps DisplayValue of each Pipeline
                            console.log("Pipeline Maps DisplayValue: " + map.getDisplayValue());

                            //Get the Maps SequenceNumber of each Pipeline
                            console.log("Pipeline Maps SequenceNumber: " + map.getSequenceNumber());

                            let forecastCategory = map.getForecastCategory();

                            if (forecastCategory != null) {
                                //Get the Maps ForecastCategory Name of each Pipeline
                                console.log("Pipeline Maps ForecastCategory Name: " + forecastCategory.getName());

                                //Get the Maps ForecastCategory Id of each Pipeline
                                console.log("Pipeline Maps ForecastCategory Id: " + forecastCategory.getId());
                            }

                            //Get the Maps ActualValue of each Pipeline
                            console.log("Pipeline Maps ActualValue: " + map.getActualValue());

                            //Get the Maps Id of each Pipeline
                            console.log("Pipeline Maps Id: " + map.getId());

                            //Get the Maps ForecastType of each Pipeline
                            console.log("Pipeline Maps ForecastType: " + map.getForecastType());

                            //Get PickListValue delete
                            console.log("PickListValue Delete" + map.getDelete());
                        });
                    }
                });
            }
            //Check if the request returned an exception
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

    /**
     * <h3> create Pipelines</h3>
     * This method is used to create Pipelines
     * @param {BigInt} layoutId The id of the Layout
     */
    static async createPipelines(layoutId) {
        //Get instance of PipelineOperations Class
        let pipelineOperations = new PipelineOperations(layoutId);

        let pipeline = new PipeLineClass();

        pipeline.setDisplayValue("Adfasfs23d3ew122");

        let pickList = new PickListValue();

        pickList.setSequenceNumber(1);

        pickList.setId(34770616805n);

        pickList.setDisplayValue("Closed Won");

        pipeline.setMaps([pickList]);

        let body = new BodyWrapper();

        body.setPipeline([pipeline]);

        //Call createPipelines method that takes BodyWrapper instance as parameter
        let response = await pipelineOperations.createPipelines(body);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            //Get object from response
            let actionHandler = response.getObject();

            if (actionHandler instanceof ActionWrapper) {
                //Get the received ActionWrapper instance
                let actionWrapper = actionHandler;

                //Get the list of obtained action responses
                let actionResponses = actionWrapper.getPipeline();

                actionResponses.forEach(actionResponse => {
                    //Check if the request is successful
                    if (actionResponse instanceof SuccessResponse) {
                        //Get the Status
                        console.log("Status: " + actionResponse.getStatus().getValue());

                        //Get the Code
                        console.log("Code: " + actionResponse.getCode().getValue());

                        console.log("Details: ");

                        //Get the details map
                        let details = actionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        //Get the Message
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                    //Check if the request returned an exception
                    else if (actionResponse instanceof APIException) {
                        //Get the Status
                        console.log("Status: " + actionResponse.getStatus().getValue());

                        //Get the Code
                        console.log("Code: " + actionResponse.getCode().getValue());

                        console.log("Details");

                        //Get the details map
                        let details = actionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        //Get the Message
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                });
            }
            //Check if the request returned an exception
            else if (actionHandler instanceof APIException) {
                //Get the Status
                console.log("Status: " + actionHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + actionHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = actionHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + actionHandler.getMessage().getValue());
            }
        }
    }

    /**
     * <h3> Update Pipelines</h3>
     * This method is used to update Pipelines
     * @param {BigInt} layoutId The id of the Layout
     */
    static async updatePipelines(layoutId) {
        //Get instance of PipelineOperations Class
        let pipelineOperations = new PipelineOperations(layoutId);

        let pipeline = new PipeLineClass();

        pipeline.setId(347706112543n);

        let pickList = new PickListValue();

        pickList.setId(34770616801n);

        pickList.setSequenceNumber(1);

        pipeline.setMaps([pickList]);

        let body = new BodyWrapper();

        body.setPipeline([pipeline]);

        //Call createPipelines method that takes BodyWrapper instance as parameter
        let response = await pipelineOperations.updatePipelines(body);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            //Get object from response
            let actionHandler = response.getObject();

            if (actionHandler instanceof ActionWrapper) {
                //Get the received ActionWrapper instance
                let actionWrapper = actionHandler;

                //Get the list of obtained action responses
                let actionResponses = actionWrapper.getPipeline();

                actionResponses.forEach(actionResponse => {
                    //Check if the request is successful
                    if (actionResponse instanceof SuccessResponse) {
                        //Get the Status
                        console.log("Status: " + actionResponse.getStatus().getValue());

                        //Get the Code
                        console.log("Code: " + actionResponse.getCode().getValue());

                        console.log("Details: ");

                        //Get the details map
                        let details = actionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        //Get the Message
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                    //Check if the request returned an exception
                    else if (actionResponse instanceof APIException) {
                        //Get the Status
                        console.log("Status: " + actionResponse.getStatus().getValue());

                        //Get the Code
                        console.log("Code: " + actionResponse.getCode().getValue());

                        console.log("Details");

                        //Get the details map
                        let details = actionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        //Get the Message
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                });
            }
            //Check if the request returned an exception
            else if (actionHandler instanceof APIException) {
                //Get the Status
                console.log("Status: " + actionHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + actionHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = actionHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + actionHandler.getMessage().getValue());
            }
        }
    }

    /**
     * <h3> Get Pipeline</h3>
     * This method is used to get single Pipeline
     * @param {BigInt} layoutId The id of the Layout
     * @param {BigInt} pipelineId The id of the pipeline
     * @returns 
     */
    static async getPipeline(layoutId, pipelineId) {
        //Get instance of PipelineOperations Class
        let pipelineOperations = new PipelineOperations(layoutId);

        //Call getPipeline method
        let response = await pipelineOperations.getPipeline(pipelineId);

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

                //Get the list of obtained Pipeline instances
                let pipelines = responseWrapper.getPipeline();

                pipelines.forEach(pipeline => {
                    //Get the Id of each Pipeline
                    console.log("Pipeline Id: " + pipeline.getId());

                    //Get the DisplayValue of each Pipeline
                    console.log("Pipeline DisplayValue: " + pipeline.getDisplayValue());

                    //Get the ActualValue of each Pipeline
                    console.log("Pipeline Maps ActualValue: " + pipeline.getActualValue());

                    //Get the Default of each Pipeline
                    console.log("Pipeline Default: " + pipeline.getDefault());

                    //Get the child available of each Pipeline
                    console.log("Pipeline ChildAvailable  : " + pipeline.getChildAvailable());

                    let parent = pipeline.getParent();

                    if (parent != null) {
                        //Get the ID of  parent
                        console.log("Pipeline parent ID: " + parent.getId());
                    }

                    let maps = pipeline.getMaps();

                    if (maps != null) {
                        maps.forEach(map => {
                            //Get the Maps ActualValue of each Pipeline
                            console.log("Pipeline Maps ActualValue: " + map.getActualValue());

                            //Get PickListValue delete
                            console.log("PickListValue Delete" + map.getDelete());

                            //Get the Maps DisplayValue of each Pipeline
                            console.log("Pipeline Maps DisplayValue: " + map.getDisplayValue());

                            let forecastCategory = map.getForecastCategory();

                            if (forecastCategory != null) {
                                //Get the Maps ForecastCategory Name of each Pipeline
                                console.log("Pipeline Maps ForecastCategory Name: " + forecastCategory.getName());

                                //Get the Maps ForecastCategory Id of each Pipeline
                                console.log("Pipeline Maps ForecastCategory Id: " + forecastCategory.getId());
                            }

                            //Get the Maps ForecastType of each Pipeline
                            console.log("Pipeline Maps ForecastType: " + map.getForecastType());

                            //Get the Maps Id of each Pipeline
                            console.log("Pipeline Maps Id: " + map.getId());

                            //Get the Maps SequenceNumber of each Pipeline
                            console.log("Pipeline Maps SequenceNumber: " + map.getSequenceNumber());
                        });
                    }
                });
            }
            //Check if the request returned an exception
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

    /**
     * <h3> Update Pipeline</h3>
     * This method is used to update Pipeline
     * @param {BigInt} layoutId The id of the Layout
     * @param {BigInt} pipelineId The id of the pipeline
     */
    static async updatePipeline(layoutId, pipelineId) {
        //Get instance of PipelineOperations Class
        let pipelineOperations = new PipelineOperations(layoutId);

        let pipeline = new PipeLineClass();

        pipeline.setDisplayValue("Qualification");

        let pickList = new PickListValue();

        pickList.setId(34770616801n);

        pickList.setSequenceNumber(1);

        pipeline.setMaps([pickList]);

        let body = new BodyWrapper();

        body.setPipeline([pipeline]);

        //Call updatePipeline method that takes BodyWrapper instance as parameter
        let response = await pipelineOperations.updatePipeline(pipelineId, body);

        if (response != null) {
            //Get the status code from response
            console.log("Status code " + response.getStatusCode());

            //Get object from response
            let actionHandler = response.getObject();

            if (actionHandler instanceof ActionWrapper) {
                //Get the received ActionWrapper instance
                let actionWrapper = actionHandler;

                //Get the list of obtained action responses
                let actionResponses = actionWrapper.getPipeline();

                actionResponses.forEach(actionResponse => {
                    //Check if the request is successful
                    if (actionResponse instanceof SuccessResponse) {
                        //Get the Status
                        console.log("Status: " + actionResponse.getStatus().getValue());

                        //Get the Code
                        console.log("Code: " + actionResponse.getCode().getValue());

                        console.log("Details: ");

                        //Get the details map
                        let details = actionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        //Get the Message
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                    //Check if the request returned an exception
                    else if (actionResponse instanceof APIException) {
                        //Get the Status
                        console.log("Status: " + actionResponse.getStatus().getValue());

                        //Get the Code
                        console.log("Code: " + actionResponse.getCode().getValue());

                        console.log("Details");

                        //Get the details map
                        let details = actionResponse.getDetails();

                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }

                        //Get the Message
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                });
            }
            //Check if the request returned an exception
            else if (actionHandler instanceof APIException) {
                //Get the Status
                console.log("Status: " + actionHandler.getStatus().getValue());

                //Get the Code
                console.log("Code: " + actionHandler.getCode().getValue());

                console.log("Details");

                //Get the details map
                let details = actionHandler.getDetails();

                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }

                //Get the Message
                console.log("Message: " + actionHandler.getMessage().getValue());
            }
        }
    }
}

module.exports = { PipeLine }
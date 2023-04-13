import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class UpdatePipelines{
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
     * <h3> Update Pipelines</h3>
     * This method is used to update Pipelines
     * @param {BigInt} layoutId The id of the Layout
     */
    static async updatePipelines(layoutId) {
        let pipelineOperations = new ZOHOCRMSDK.Pipelines.PipelineOperations(layoutId);
        let pipeline = new ZOHOCRMSDK.Pipelines.Pipeline();
        pipeline.setId(347706112543n);
        let pickList = new ZOHOCRMSDK.Pipelines.PickListValue();
        pickList.setId(34770616801n);
        pickList.setSequenceNumber(1);
        pipeline.setMaps([pickList]);
        let body = new BodyWrapper();
        body.setPipeline([pipeline]);
        //Call createPipelines method that takes BodyWrapper instance as parameter
        let response = await pipelineOperations.updatePipelines(body);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            let actionHandler = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Pipelines.ActionWrapper) {
                let actionWrapper = actionHandler;
                let actionResponses = actionWrapper.getPipeline();
                actionResponses.forEach(actionResponse => {
                    if (actionResponse instanceof ZOHOCRMSDK.Pipelines.SuccessResponse) {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details: ");
                        let details = actionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                    else if (actionResponse instanceof ZOHOCRMSDK.Pipelines.APIException) {
                        console.log("Status: " + actionResponse.getStatus().getValue());
                        console.log("Code: " + actionResponse.getCode().getValue());
                        console.log("Details");
                        let details = actionResponse.getDetails();
                        if (details != null) {
                            Array.from(details.keys()).forEach(key => {
                                console.log(key + ": " + details.get(key));
                            });
                        }
                        console.log("Message: " + actionResponse.getMessage().getValue());
                    }
                });
            }
            else if (actionHandler instanceof ZOHOCRMSDK.Pipelines.APIException) {
                console.log("Status: " + actionHandler.getStatus().getValue());
                console.log("Code: " + actionHandler.getCode().getValue());
                console.log("Details");
                let details = actionHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + actionHandler.getMessage().getValue());
            }
        }
    }
}
await UpdatePipelines.initialize();
let layoutId = 320012n;
await UpdatePipelines.updatePipelines(layoutId);
export {
    UpdatePipelines as UpdatePipelines
}

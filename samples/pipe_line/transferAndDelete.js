import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class TransferAndDelete{
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
     * <h3> to Transfer And Delete</h3>
     * This method is used to Transfer And Delete
     * @param {BigInt} layoutId The id of the Layout
     */
    static async transferAndDelete(layoutId) {
        let pipelineOperations = new ZOHOCRMSDK.Pipelines.PipelineOperations(layoutId);
        let transferAndDeleteWrapper = new ZOHOCRMSDK.Pipelines.TransferAndDeleteWrapper();
        let transferPipeLine = new ZOHOCRMSDK.Pipelines.TransferPipeLine();
        let pipeline = new ZOHOCRMSDK.Pipelines.Pipeline();
        pipeline.setFrom(36523973712004n);
        pipeline.setTo(36523973712004n);
        transferPipeLine.setPipeline(pipeline);
        let stage = new ZOHOCRMSDK.Pipelines.Stage();
        stage.setFrom(36523976817n);
        stage.setTo(36523976819n);
        transferPipeLine.setStages([stage]);
        transferAndDeleteWrapper.setTransferPipeline([transferPipeLine]);
        //Call transferAndDelete method
        let response = await pipelineOperations.transferAndDelete(transferAndDeleteWrapper);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            let actionHandler = response.getObject();
            if (actionHandler instanceof ZOHOCRMSDK.Pipelines.TransferActionWrapper) {
                let actionWrapper = actionHandler;
                let actionResponses = actionWrapper.getTransferPipeline();
                actionResponses.forEach(actionResponse => {
                    if (actionResponse instanceof ZOHOCRMSDK.Pipelines.SuccessResponse) {
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
await TransferAndDelete.initialize();
let layoutId = 300012n;
await TransferAndDelete.transferAndDelete(layoutId);
export {
    TransferAndDelete as TransferAndDelete
}

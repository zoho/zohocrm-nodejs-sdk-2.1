import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetPipeline{
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
     * <h3> Get Pipeline</h3>
     * This method is used to get single Pipeline
     * @param {BigInt} layoutId The id of the Layout
     * @param {BigInt} pipelineId The id of the pipeline
     * @returns
     */
    static async getPipeline(layoutId, pipelineId) {
        let pipelineOperations = new ZOHOCRMSDK.Pipelines.PipelineOperations(layoutId);
        //Call getPipeline method
        let response = await pipelineOperations.getPipeline(pipelineId);
        if (response != null) {
            console.log("Status code " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseHandler = response.getObject();
            if (responseHandler instanceof ZOHOCRMSDK.Pipelines.ResponseWrapper) {
                let responseWrapper = responseHandler;
                let pipelines = responseWrapper.getPipeline();
                pipelines.forEach(pipeline => {
                    console.log("Pipeline Id: " + pipeline.getId());
                    console.log("Pipeline DisplayValue: " + pipeline.getDisplayValue());
                    console.log("Pipeline Maps ActualValue: " + pipeline.getActualValue());
                    console.log("Pipeline Default: " + pipeline.getDefault());
                    console.log("Pipeline ChildAvailable  : " + pipeline.getChildAvailable());
                    let parent = pipeline.getParent();
                    if (parent != null) {
                        console.log("Pipeline parent ID: " + parent.getId());
                    }
                    let maps = pipeline.getMaps();
                    if (maps != null) {
                        maps.forEach(map => {
                            console.log("Pipeline Maps ActualValue: " + map.getActualValue());
                            console.log("PickListValue Delete" + map.getDelete());
                            console.log("Pipeline Maps DisplayValue: " + map.getDisplayValue());
                            let forecastCategory = map.getForecastCategory();
                            if (forecastCategory != null) {
                                console.log("Pipeline Maps ForecastCategory Name: " + forecastCategory.getName());
                                console.log("Pipeline Maps ForecastCategory Id: " + forecastCategory.getId());
                            }
                            console.log("Pipeline Maps ForecastType: " + map.getForecastType());
                            console.log("Pipeline Maps Id: " + map.getId());
                            console.log("Pipeline Maps SequenceNumber: " + map.getSequenceNumber());
                        });
                    }
                });
            }
            else if (responseHandler instanceof ZOHOCRMSDK.Pipelines.APIException) {
                console.log("Status: " + responseHandler.getStatus().getValue());
                console.log("Code: " + responseHandler.getCode().getValue());
                console.log("Details");
                let details = responseHandler.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseHandler.getMessage().getValue());
            }
        }
    }
}
await GetPipeline.initialize();
let pipelineId = 123456789n;
let layoutId = 440248000000000167n
await GetPipeline.getPipeline(layoutId,pipelineId);
export {
    GetPipeline as GetPipeline
}

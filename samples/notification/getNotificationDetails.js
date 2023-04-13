import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetNotificationDetails{
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
     * <h3> Get Notification Details </h3>
     * This method is used to get all the Notification and print the response.
     */
    static async getNotificationDetails() {
        let notificationOperations = new ZOHOCRMSDK.Notifications.NotificationOperations();
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        await paramInstance.add(ZOHOCRMSDK.Notifications.GetNotificationDetailsParam.CHANNEL_ID, 1006800211n);
        await paramInstance.add(ZOHOCRMSDK.Notifications.GetNotificationDetailsParam.MODULE, "Accounts");
        await paramInstance.add(ZOHOCRMSDK.Notifications.GetNotificationDetailsParam.PAGE, 1);
        await paramInstance.add(ZOHOCRMSDK.Notifications.GetNotificationDetailsParam.PER_PAGE, 200);
        //Call getNotificationDetails method
        let response = await notificationOperations.getNotificationDetails(paramInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Notifications.ResponseWrapper) {
                    let notificationsArray = responseObject.getWatch();
                    notificationsArray.forEach(notification => {
                        console.log("Notification NotifyOnRelatedAction: " + notification.getNotifyOnRelatedAction());
                        console.log("Notification ChannelExpiry: " + notification.getChannelExpiry());
                        console.log("Notification ResourceUri: " + notification.getResourceUri());
                        console.log("Notification ResourceId: " + notification.getResourceId());
                        console.log("Notification NotifyUrl: " + notification.getNotifyUrl());
                        console.log("Notification ResourceName: " + notification.getResourceName());
                        console.log("Notification ChannelId: " + notification.getChannelId());
                        let fields = notification.getEvents();
                        if (fields != null) {
                            for (let field of fields) {
                                console.log("Notification Events: " + field);
                            }
                        }
                        console.log("Notification Token: " + notification.getToken());
                    });
                    let info = responseObject.getInfo();
                    if (info != null) {
                        if (info.getPerPage() != null) {
                            console.log("Notification Info PerPage: " + info.getPerPage().toString());
                        }
                        if (info.getCount() != null) {
                            console.log("Notification Info Count: " + info.getCount().toString());
                        }
                        if (info.getPage() != null) {
                            console.log("Notification Info Page: " + info.getPage().toString());
                        }
                        if (info.getMoreRecords() != null) {
                            console.log("Notification Info MoreRecords: " + info.getMoreRecords().toString());
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Notifications.APIException) {
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
}
await GetNotificationDetails.initialize();
await GetNotificationDetails.getNotificationDetails();
export {
    GetNotificationDetails as GetNotificationDetails
}

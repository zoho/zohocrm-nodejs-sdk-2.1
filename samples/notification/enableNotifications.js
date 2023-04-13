import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class EnableNotifications{
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
     * <h3> Enable Notifications </h3>
     * This method is used to Enable Notifications and print the response.
     */
    static async enableNotifications() {
        let notificationOperations = new ZOHOCRMSDK.Notifications.NotificationOperations();
        let bodyWrapper = new ZOHOCRMSDK.Notifications.BodyWrapper();
        //Array of Notification instances
        let notificationsArray = [];
        let notification1 = new ZOHOCRMSDK.Notifications.Notification();
        notification1.setChannelId(1006800211n);
        let events = ["Deals.all"];
        //To subscribe based on particular operations on given modules.
        notification1.setEvents(events);
        notification1.setChannelExpiry(new Date(2020, 10, 10, 10, 20, 0));
        //To ensure that the notification is sent from Zoho CRM, by sending back the given value in notification URL body.
        //By using this value, user can validate the notifications.
        notification1.setToken("TOKEN_FOR_VERIFICATION_OF_10068002");
        //URL to be notified (POST request)
        notification1.setNotifyUrl("https://www.zohoapis.com");
        //Add Notification instance to the array
        notificationsArray.push(notification1);
        let notification2 = new ZOHOCRMSDK.Notifications.Notification();
        notification2.setChannelId(1006800232n);
        let events2 = ["Accounts.all"];
        //To subscribe based on particular operations on given modules.
        notification2.setEvents(events2);
        notification2.setChannelExpiry(new Date(2020, 11, 10, 10, 0, 0));
        //To ensure that the notification is sent from Zoho CRM, by sending back the given value in notification URL body.
        //By using this value, user can validate the notifications.
        notification2.setToken("TOKEN_FOR_VERIFICATION_OF_1006800211");
        //URL to be notified (POST request)
        notification2.setNotifyUrl("https://www.zohoapis.com");
        //Add Notification instance to the array
        notificationsArray.push(notification2);
        bodyWrapper.setWatch(notificationsArray);
        //Call enableNotifications method that takes BodyWrapper instance as parameter
        let response = await notificationOperations.enableNotifications(bodyWrapper);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Notifications.ActionWrapper) {
                    let actionResponses = responseObject.getWatch();
                    for (let actionResponse of actionResponses) {
                        if (actionResponse instanceof ZOHOCRMSDK.Notifications.SuccessResponse) {
                            console.log("Status: " + actionResponse.getStatus().getValue());
                            console.log("Code: " + actionResponse.getCode().getValue());
                            console.log("Details");
                            let details = actionResponse.getDetails();
                            if(details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    if (Array.isArray(details.get(key))) {
                                        let dataList = details.get(key);
                                        if (dataList.length > 0 && dataList[0] instanceof ZOHOCRMSDK.Notifications.Notification) {
                                            for (let event of dataList) {
                                                console.log("Notification ChannelExpiry: " + event.getChannelExpiry());
                                                console.log("Notification ResourceUri: " + event.getResourceUri());
                                                console.log("Notification ResourceId: " + event.getResourceId());
                                                console.log("Notification ResourceName: " + event.getResourceName());
                                                console.log("Notification ChannelId: " + event.getChannelId());
                                            }
                                        }
                                    }
                                    else {
                                        console.log(key + " : " + details.get(key));
                                    }
                                });
                            }
                            console.log("Message: " + actionResponse.getMessage().getValue());
                        }
                        else if (actionResponse instanceof ZOHOCRMSDK.Notifications.APIException) {
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
await EnableNotifications.initialize();
await EnableNotifications.enableNotifications();
export {
    EnableNotifications as EnableNotifications
}

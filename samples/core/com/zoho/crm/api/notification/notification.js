const { NotificationOperations, DisableNotificationsParam, GetNotificationDetailsParam } = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/notification/notification_operations");
const ParameterMap = require("@zohocrm/nodejs-sdk-2.1/routes/parameter_map").ParameterMap;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/notification/api_exception").APIException;
const SuccessResponse = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/notification/success_response").SuccessResponse;
const BodyWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/notification/body_wrapper").BodyWrapper;
const ActionWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/notification/action_wrapper").ActionWrapper;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/notification/response_wrapper").ResponseWrapper;
const ZCRMNotification = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/notification/notification").Notification;

class Notification {

    /**
     * <h3> Enable Notifications </h3>
     * This method is used to Enable Notifications and print the response.
     */
    static async enableNotifications() {
        //Get instance of NotificationOperations Class
        let notificationOperations = new NotificationOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let bodyWrapper = new BodyWrapper();

        //Array of Notification instances
        let notificationsArray = [];

        //Get instance of Notification Class
        let notification1 = new ZCRMNotification();

        //Set channel Id of the Notification
        notification1.setChannelId(1006800211n);

        let events = ["Deals.all"];

        //To subscribe based on particular operations on given modules.
        notification1.setEvents(events);

        //To set the expiry time for instant notifications.
        notification1.setChannelExpiry(new Date(2020, 10, 10, 10, 20, 0));

        //To ensure that the notification is sent from Zoho CRM, by sending back the given value in notification URL body.
        //By using this value, user can validate the notifications.
        notification1.setToken("TOKEN_FOR_VERIFICATION_OF_10068002");

        //URL to be notified (POST request)
        notification1.setNotifyUrl("https://www.zohoapis.com");

        //Add Notification instance to the array
        notificationsArray.push(notification1);

        //Get instance of Notification Class
        let notification2 = new ZCRMNotification();

        //Set channel Id of the Notification
        notification2.setChannelId(1006800232n);

        let events2 = ["Accounts.all"];

        //To subscribe based on particular operations on given modules.
        notification2.setEvents(events2);

        //To set the expiry time for instant notifications.
        notification2.setChannelExpiry(new Date(2020, 11, 10, 10, 0, 0));

        //To ensure that the notification is sent from Zoho CRM, by sending back the given value in notification URL body.
        //By using this value, user can validate the notifications.
        notification2.setToken("TOKEN_FOR_VERIFICATION_OF_1006800211");

        //URL to be notified (POST request)
        notification2.setNotifyUrl("https://www.zohoapis.com");

        //Add Notification instance to the array
        notificationsArray.push(notification2);

        //Set the array to notifications in BodyWrapper instance
        bodyWrapper.setWatch(notificationsArray);

        //Call enableNotifications method that takes BodyWrapper instance as parameter
        let response = await notificationOperations.enableNotifications(bodyWrapper);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getWatch();

                    for (let actionResponse of actionResponses) {
                        //Check if the request is successful
                        if (actionResponse instanceof SuccessResponse) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if(details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    if (Array.isArray(details.get(key))) {
                                        let dataList = details.get(key);

                                    if (dataList.length > 0 && dataList[0] instanceof ZCRMNotification) {
                                        for (let event of dataList) {
                                            //Get the ChannelExpiry of each Notification
                                            console.log("Notification ChannelExpiry: " + event.getChannelExpiry());

                                            //Get the ResourceUri each Notification
                                            console.log("Notification ResourceUri: " + event.getResourceUri());

                                            //Get the ResourceId each Notification
                                            console.log("Notification ResourceId: " + event.getResourceId());

                                            //Get the ResourceName each Notification
                                            console.log("Notification ResourceName: " + event.getResourceName());

                                            //Get the ChannelId each Notification
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
                    }
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
    }

    /**
     * <h3> Get Notification Details </h3>
     * This method is used to get all the Notification and print the response.
     */
    static async getNotificationDetails() {
        //Get instance of NotificationOperations Class
        let notificationOperations = new NotificationOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        await paramInstance.add(GetNotificationDetailsParam.CHANNEL_ID, 1006800211n);

        await paramInstance.add(GetNotificationDetailsParam.MODULE, "Accounts");

        await paramInstance.add(GetNotificationDetailsParam.PAGE, 1);

        await paramInstance.add(GetNotificationDetailsParam.PER_PAGE, 200);

        //Call getNotificationDetails method
        let response = await notificationOperations.getNotificationDetails(paramInstance);

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
                //Check if expected ResponseWrapper instance is received
                if (responseObject instanceof ResponseWrapper) {
                    //Get the array of obtained Notification instances
                    let notificationsArray = responseObject.getWatch();

                    notificationsArray.forEach(notification => {
                        //Get the NotifyOnRelatedAction of each Notification
                        console.log("Notification NotifyOnRelatedAction: " + notification.getNotifyOnRelatedAction());

                        //Get the ChannelExpiry of each Notification
                        console.log("Notification ChannelExpiry: " + notification.getChannelExpiry());

                        //Get the ResourceUri each Notification
                        console.log("Notification ResourceUri: " + notification.getResourceUri());

                        //Get the ResourceId each Notification
                        console.log("Notification ResourceId: " + notification.getResourceId());

                        //Get the NotifyUrl each Notification
                        console.log("Notification NotifyUrl: " + notification.getNotifyUrl());

                        //Get the ResourceName each Notification
                        console.log("Notification ResourceName: " + notification.getResourceName());

                        //Get the ChannelId each Notification
                        console.log("Notification ChannelId: " + notification.getChannelId());

                        //Get the events List of each Notification
                        let fields = notification.getEvents();

                        if (fields != null) {
                            for (let field of fields) {
                                //Get the Events
                                console.log("Notification Events: " + field);
                            }
                        }

                        //Get the Token each Notification
                        console.log("Notification Token: " + notification.getToken());
                    });

                    //Get the Object obtained Info instance
                    let info = responseObject.getInfo();

                    //Check if info is not null
                    if (info != null) {
                        if (info.getPerPage() != null) {
                            //Get the PerPage of the Info
                            console.log("Notification Info PerPage: " + info.getPerPage().toString());
                        }

                        if (info.getCount() != null) {
                            //Get the Count of the Info
                            console.log("Notification Info Count: " + info.getCount().toString());
                        }

                        if (info.getPage() != null) {
                            //Get the Page of the Info
                            console.log("Notification Info Page: " + info.getPage().toString());
                        }

                        if (info.getMoreRecords() != null) {
                            //Get the MoreRecords of the Info
                            console.log("Notification Info MoreRecords: " + info.getMoreRecords().toString());
                        }
                    }
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
    }

    /**
     * <h3> Update Notifications </h3>
     * This method is used to update Notifications and print the response.
     */
    static async updateNotifications() {
        //Get instance of NotificationOperations Class
        let notificationOperations = new NotificationOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let bodyWrapper = new BodyWrapper();

        //Array of Notification instances
        let notificationsArray = [];

        //Get instance of Notification Class
        let notification1 = new ZCRMNotification();

        //Set channel Id of the Notification
        notification1.setChannelId(1006800211n);

        let events = ["Accounts.all"];

        //To subscribe based on particular operations on given modules.
        notification1.setEvents(events);

        //To set the expiry time for instant notifications.
        notification1.setChannelExpiry(new Date());

        //To ensure that the notification is sent from Zoho CRM, by sending back the given value in notification URL body.
        //By using this value, user can validate the notifications.
        notification1.setToken("TOKEN_FOR_VERIFICATION_OF_10068002");

        //URL to be notified (POST request)
        notification1.setNotifyUrl("https://www.zohoapis.com");

        //Add Notification instance to the array
        notificationsArray.push(notification1);

        //Set the array to notifications in BodyWrapper instance
        bodyWrapper.setWatch(notificationsArray);

        //Call updateNotifications method that takes BodyWrapper instance as parameter
        let response = await notificationOperations.updateNotifications(bodyWrapper);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getWatch();

                    for (let actionResponse of actionResponses) {
                        //Check if the request is successful
                        if (actionResponse instanceof SuccessResponse) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if(details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    if (Array.isArray(details.get(key))) {
                                        let dataList = details.get(key);

                                    if (dataList.length > 0 && dataList[0] instanceof ZCRMNotification) {
                                        for (let event of dataList) {
                                            //Get the ChannelExpiry of each Notification
                                            console.log("Notification ChannelExpiry: " + event.getChannelExpiry());

                                            //Get the ResourceUri each Notification
                                            console.log("Notification ResourceUri: " + event.getResourceUri());

                                            //Get the ResourceId each Notification
                                            console.log("Notification ResourceId: " + event.getResourceId());

                                            //Get the ResourceName each Notification
                                            console.log("Notification ResourceName: " + event.getResourceName());

                                            //Get the ChannelId each Notification
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
                    }
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
    }

    /**
     * <h3> Update Specific Information of a Notification </h3>
     * This method is used to update single Notification and print the response.
     */
    static async updateNotification() {
        //Get instance of NotificationOperations Class
        let notificationOperations = new NotificationOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let bodyWrapper = new BodyWrapper();

        //Array of Notification instances
        let notificationsArray = [];

        //Get instance of Notification Class
        let notification1 = new ZCRMNotification();

        //Set channel Id of the Notification
        notification1.setChannelId(1006800211n);

        let events = ["Accounts.all"];

        //To subscribe based on particular operations on given modules.
        notification1.setEvents(events);

        //To set the expiry time for instant notifications.
        notification1.setChannelExpiry(new Date());

        //To ensure that the notification is sent from Zoho CRM, by sending back the given value in notification URL body.
        //By using this value, user can validate the notifications.
        notification1.setToken("TOKEN_FOR_VERIFICATION_OF_10068002");

        //URL to be notified (POST request)
        notification1.setNotifyUrl("https://www.zohoapis.com");

        //Add Notification instance to the array
        notificationsArray.push(notification1);

        //Set the array to notifications in BodyWrapper instance
        bodyWrapper.setWatch(notificationsArray);

        //Call updateNotification method that takes BodyWrapper instance as parameters
        let response = await notificationOperations.updateNotification(bodyWrapper);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getWatch();

                    for (let actionResponse of actionResponses) {
                        //Check if the request is successful
                        if (actionResponse instanceof SuccessResponse) {
                            //Get the Status
                            console.log("Status: " + actionResponse.getStatus().getValue());

                            //Get the Code
                            console.log("Code: " + actionResponse.getCode().getValue());

                            console.log("Details");

                            //Get the details map
                            let details = actionResponse.getDetails();

                            if(details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    if (Array.isArray(details.get(key))) {
                                        let dataList = details.get(key);

                                    if (dataList.length > 0 && dataList[0] instanceof ZCRMNotification) {
                                        for (let event of dataList) {
                                            //Get the ChannelExpiry of each Notification
                                            console.log("Notification ChannelExpiry: " + event.getChannelExpiry());

                                            //Get the ResourceUri each Notification
                                            console.log("Notification ResourceUri: " + event.getResourceUri());

                                            //Get the ResourceId each Notification
                                            console.log("Notification ResourceId: " + event.getResourceId());

                                            //Get the ResourceName each Notification
                                            console.log("Notification ResourceName: " + event.getResourceName());

                                            //Get the ChannelId each Notification
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
                    }
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
    }

    /**
     * <h3> Disable Notifications </h3>
     * To stop all the instant notifications enabled by the user for a channel.
     * @param {Array} channelIds Specify the unique IDs of the notification channels to be disabled.
     */
    static async disableNotifications(channelIds) {
        //example
        //channelIds = [10068002n, 10068020n, 10068101n]

        //Get instance of NotificationOperations Class
        let notificationOperations = new NotificationOperations();

        //Get instance of ParameterMap Class
        let paramInstance = new ParameterMap();

        //Possible parameters for disable Notifications operation
        for (let channelId of channelIds) {
            await paramInstance.add(DisableNotificationsParam.CHANNEL_IDS, channelId);
        }

        //Call disableNotifications method that takes paramInstance as parameter
        let response = await notificationOperations.disableNotifications(paramInstance);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getWatch();

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

                            if(details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    if (Array.isArray(details.get(key))) {
                                        let dataList = details.get(key);

                                    if (dataList.length > 0 && dataList[0] instanceof ZCRMNotification) {
                                        for (let event of dataList) {
                                            //Get the ChannelExpiry of each Notification
                                            console.log("Notification ChannelExpiry: " + event.getChannelExpiry());

                                            //Get the ResourceUri each Notification
                                            console.log("Notification ResourceUri: " + event.getResourceUri());

                                            //Get the ResourceId each Notification
                                            console.log("Notification ResourceId: " + event.getResourceId());

                                            //Get the ResourceName each Notification
                                            console.log("Notification ResourceName: " + event.getResourceName());

                                            //Get the ChannelId each Notification
                                            console.log("Notification ChannelId: " + event.getChannelId());
                                        }
                                    }
                                    }
                                    else {
                                        console.log(key + " : " + details.get(key));
                                    }
                                });
                            }

                            //Get the Message
                            console.log("Message: " + actionResponse.getMessage().getValue());
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
    }

    /**
     * <h3> Disable Specific Notifications </h3>
     * This method is used to disable notifications for the specified events in a channel.
     */
    static async disableNotification() {
        //Get instance of NotificationOperations Class
        let notificationOperations = new NotificationOperations();

        //Get instance of BodyWrapper Class that will contain the request body
        let bodyWrapper = new BodyWrapper();

        //Array of Notification instances
        let notificationsArray = [];

        //Get instance of Notification Class
        let notification = new ZCRMNotification();

        //Set channel Id of the Notification
        notification.setChannelId(1006800211n);

        let events = ["Deals.edit"];

        //To subscribe based on particular operations on given modules.
        notification.setEvents(events);

        notification.setDeleteevents(true);

        //Add Notification instance to the array
        notificationsArray.push(notification);

        //Set the array to notifications in BodyWrapper instance
        bodyWrapper.setWatch(notificationsArray);

        //Call disableNotification which takes BodyWrapper instance as parameter
        let response = await notificationOperations.disableNotification(bodyWrapper);

        if (response != null) {
            //Get the status code from response
            console.log("Status Code: " + response.getStatusCode());

            //Get object from response
            let responseObject = response.getObject();

            if (responseObject != null) {
                //Check if expected ActionWrapper instance is received
                if (responseObject instanceof ActionWrapper) {
                    //Get the array of obtained ActionResponse instances
                    let actionResponses = responseObject.getWatch();

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

                            if(details != null) {
                                Array.from(details.keys()).forEach(key => {
                                    if (Array.isArray(details.get(key))) {
                                        let dataList = details.get(key);

                                        if (dataList.length > 0 && dataList[0] instanceof ZCRMNotification) {
                                            for (let event of dataList) {
                                                //Get the ChannelExpiry of each Notification
                                                console.log("Notification ChannelExpiry: " + event.getChannelExpiry());

                                                //Get the ResourceUri each Notification
                                                console.log("Notification ResourceUri: " + event.getResourceUri());

                                                //Get the ResourceId each Notification
                                                console.log("Notification ResourceId: " + event.getResourceId());

                                                //Get the ResourceName each Notification
                                                console.log("Notification ResourceName: " + notification.getResourceName());

                                                //Get the ChannelId each Notification
                                                console.log("Notification ChannelId: " + notification.getChannelId());
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

module.exports = { Notification }
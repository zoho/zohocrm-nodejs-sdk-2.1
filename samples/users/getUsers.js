import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetUsers{
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
     * <h3> Get Users </h3>
     * This method is used to retrieve the users data specified in the API request.
     */
    static async getUsers() {
        let usersOperations = new ZOHOCRMSDK.Users.UsersOperations();
        //Get instance of ParameterMap Class
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Get Users operation */
        await paramInstance.add(ZOHOCRMSDK.Users.GetUsersParam.TYPE, "ActiveUsers");
        await paramInstance.add(ZOHOCRMSDK.Users.GetUsersParam.PAGE, 1);
        await paramInstance.add(ZOHOCRMSDK.Users.GetUsersParam.PER_PAGE, 200);
        //Get instance of HeaderMap Class
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        /* Possible headers for Get Users operation */
        await headerInstance.add(ZOHOCRMSDK.Users.GetUsersHeader.IF_MODIFIED_SINCE, new Date("2019-07-07T10:00:00+05:30"));
        //Call getUsers method that takes ParameterMap instance and HeaderMap instance as parameters
        let response = await usersOperations.getUsers(paramInstance, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            //Get object from response
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Users.ResponseWrapper) {
                    let users = responseObject.getUsers();
                    users.forEach(user => {
                        console.log("User Country: " + user.getCountry());
                        // Get the Role instance of each User
                        let role = user.getRole();
                        //Check if role is not null
                        if (role != null) {
                            console.log("User Role Name: " + role.getName());
                            //Get the ID of each Role
                            console.log("User Role ID: " + role.getId());
                        }
                        // Get the CustomizeInfo instance of each User
                        let customizeInfo = user.getCustomizeInfo();
                        //Check if customizeInfo is not null
                        if (customizeInfo != null) {
                            if (customizeInfo.getNotesDesc() != null) {
                                console.log("User CustomizeInfo NotesDesc: " + customizeInfo.getNotesDesc().toString());
                            }
                            if (customizeInfo.getShowRightPanel() != null) {
                                console.log("User CustomizeInfo ShowRightPanel: " + customizeInfo.getShowRightPanel().toString());
                            }
                            if (customizeInfo.getBcView() != null) {
                                console.log("User CustomizeInfo BcView: " + customizeInfo.getBcView().toString());
                            }
                            if (customizeInfo.getShowHome() != null) {
                                console.log("User CustomizeInfo ShowHome: " + customizeInfo.getShowHome().toString());
                            }
                            if (customizeInfo.getShowDetailView() != null) {
                                console.log("User CustomizeInfo ShowDetailView: " + customizeInfo.getShowDetailView().toString());
                            }
                            if (customizeInfo.getUnpinRecentItem() != null) {
                                console.log("User CustomizeInfo UnpinRecentItem: " + customizeInfo.getUnpinRecentItem().toString());
                            }
                        }
                        //Get the Signature of each User
                        console.log("User Signature: " + user.getSignature());
                        //Get the City of each User
                        console.log("User City: " + user.getCity());
                        //Get the SortOrderPreference of each User
                        console.log("User SortOrderPreference: " + user.getSortOrderPreference());
                        //Get the NameFormat of each User
                        console.log("User NameFormat: " + user.getNameFormat());
                        //Get the Language of each User
                        console.log("User Language: " + user.getLanguage());
                        //Get the Locale of each User
                        console.log("User Locale: " + user.getLocale());
                        //Get the Microsoft of each User
                        console.log("User Microsoft: " + user.getMicrosoft().toString());
                        if (user.getPersonalAccount() != null) {
                            console.log("User PersonalAccount: " + user.getPersonalAccount().toString());
                        }
                        //Get the DefaultTabGroup of each User
                        console.log("User DefaultTabGroup: " + user.getDefaultTabGroup());
                        //Get the Isonline of each User
                        console.log("User Isonline: " + user.getIsonline().toString());
                        //Get the modifiedBy User instance of each User
                        let modifiedBy = user.getModifiedBy();
                        //Check if modifiedBy is not null
                        if (modifiedBy != null) {
                            console.log("User Modified By User-Name: " + modifiedBy.getName());
                            //Get the ID of the modifiedBy User
                            console.log("User Modified By User-ID: " + modifiedBy.getId());
                        }
                        //Get the Street of each User
                        console.log("User Street: " + user.getStreet());
                        //Get the Currency of each User
                        console.log("User Currency: " + user.getCurrency());
                        //Get the Alias of each User
                        console.log("User Alias: " + user.getAlias());
                        // Get the Theme instance of each User
                        let theme = user.getTheme();
                        //Check if theme is not null
                        if (theme != null) {
                            let normalTab = theme.getNormalTab();
                            //Check if normalTab is not null
                            if (normalTab != null) {
                                console.log("User Theme NormalTab FontColor: " + normalTab.getFontColor());
                                //Get the Background of NormalTab
                                console.log("User Theme NormalTab Name: " + normalTab.getBackground());
                            }
                            // Get the TabTheme instance of Theme
                            let selectedTab = theme.getSelectedTab();
                            //Check if selectedTab is not null
                            if (selectedTab != null) {
                                console.log("User Theme SelectedTab FontColor: " + selectedTab.getFontColor());
                                //Get the Name of SelectedTab
                                console.log("User Theme SelectedTab Name: " + selectedTab.getBackground());
                            }
                            //Get the NewBackground of each Theme
                            console.log("User Theme NewBackground: " + theme.getNewBackground());
                            //Get the Background of each Theme
                            console.log("User Theme Background: " + theme.getBackground());
                            //Get the Screen of each Theme
                            console.log("User Theme Screen: " + theme.getScreen());
                            //Get the Type of each Theme
                            console.log("User Theme Type: " + theme.getType());
                        }
                        //Get the ID of each User
                        console.log("User ID: " + user.getId());
                        //Get the State of each User
                        console.log("User State: " + user.getState());
                        //Get the Fax of each User
                        console.log("User Fax: " + user.getFax());
                        //Get the CountryLocale of each User
                        console.log("User CountryLocale: " + user.getCountryLocale());
                        //Get the SandboxDeveloper of each User
                        console.log("User SandboxDeveloper: " + user.getSandboxdeveloper());
                        //Get the FirstName of each User
                        console.log("User FirstName: " + user.getFirstName());
                        //Get the Email of each User
                        console.log("User Email: " + user.getEmail());
                        //Get the reportingTo User instance of each User
                        let reportingTo = user.getReportingTo();
                        //Check if reportingTo is not null
                        if (reportingTo != null) {
                            console.log("User ReportingTo Name: " + reportingTo.getName());
                            //Get the ID of the reportingTo User
                            console.log("User ReportingTo ID: " + reportingTo.getId());
                        }
                        //Get the DecimalSeparator of each User
                        console.log("User DecimalSeparator: " + user.getDecimalSeparator());
                        //Get the Zip of each User
                        console.log("User Zip: " + user.getZip());
                        //Get the CreatedTime of each User
                        console.log("User CreatedTime: " + user.getCreatedTime());
                        //Get the Website of each User
                        console.log("User Website: " + user.getWebsite());
                        //Get the ModifiedTime of each User
                        console.log("User ModifiedTime: " + user.getModifiedTime());
                        //Get the TimeFormat of each User
                        console.log("User TimeFormat: " + user.getTimeFormat());
                        //Get the Offset of each User
                        console.log("User Offset: " + user.getOffset().toString());
                        //Get the Profile instance of each User
                        let profile = user.getProfile();
                        //Check if profile is not null
                        if (profile != null) {
                            console.log("User Profile Name: " + profile.getName());
                            //Get the ID of each Profile
                            console.log("User Profile ID: " + profile.getId());
                        }
                        //Get the Mobile of each User
                        console.log("User Mobile: " + user.getMobile());
                        //Get the LastName of each User
                        console.log("User LastName: " + user.getLastName());
                        //Get the TimeZone of each User
                        console.log("User TimeZone: " + user.getTimeZone());
                        //Get the createdBy User instance of each User
                        let createdBy = user.getCreatedBy();
                        //Check if createdBy is not null
                        if (createdBy != null) {
                            console.log("User Created By User-Name: " + createdBy.getName());
                            //Get the ID of the createdBy User
                            console.log("User Created By User-ID: " + createdBy.getId());
                        }
                        //Get the Zuid of each User
                        console.log("User Zuid: " + user.getZuid());
                        //Get the Confirm of each User
                        console.log("User Confirm: " + user.getConfirm().toString());
                        //Get the FullName of each User
                        console.log("User FullName: " + user.getFullName());
                        //Get the list of obtained Territory instances
                        let territories = user.getTerritories();
                        //Check if territories is not null
                        if (territories != null) {
                            territories.forEach(territory => {
                                console.log("User Territory Manager: " + territory.getManager().toString());
                                //Get the Name of the Territory
                                console.log("User Territory Name: " + territory.getName());
                                //Get the ID of the Territory
                                console.log("User Territory ID: " + territory.getId());
                            });
                        }
                        //Get the Phone of each User
                        console.log("User Phone: " + user.getPhone());
                        //Get the DOB of each User
                        console.log("User DOB: " + user.getDob());
                        //Get the DateFormat of each User
                        console.log("User DateFormat: " + user.getDateFormat());
                        //Get the Status of each User
                        console.log("User Status: " + user.getStatus());
                    });
                    //Get the obtained Info object
                    let info = responseObject.getInfo();
                    if (info != null) {
                        if (info.getPerPage() != null) {
                            console.log("User Info PerPage: " + info.getPerPage().toString());
                        }
                        if (info.getCount() != null) {
                            console.log("User Info Count: " + info.getCount().toString());
                        }
                        if (info.getPage() != null) {
                            console.log("User Info Page: " + info.getPage().toString());
                        }
                        if (info.getMoreRecords() != null) {
                            console.log("User Info MoreRecords: " + info.getMoreRecords().toString());
                        }
                    }
                }
                else if (responseObject instanceof ZOHOCRMSDK.Users.APIException) {
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
await GetUsers.initialize();
await GetUsers.getUsers();
export {
    GetUsers as GetUsers
}

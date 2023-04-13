import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetOrganization{
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
     * <h3> Get Organization </h3>
     * This method is used to get the organization data and print the response.
     */
    static async getOrganization() {
        let orgOperations = new ZOHOCRMSDK.Orgs.OrgOperations();
        //Call getOrganization method
        let response = await orgOperations.getOrganization();
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Orgs.ResponseWrapper) {
                    let orgs = responseObject.getOrg();
                    orgs.forEach(org => {
                        console.log("Organization Country: " + org.getCountry());
                        let hierarchyPreferences = org.getHierarchyPreferences();
                        if(hierarchyPreferences != null) {
                            console.log("Organization HierarchyPreferences Type: "  + hierarchyPreferences.getType());
                        }
                        console.log("Organization PhotoId: " + org.getPhotoId());
                        console.log("Organization City: " + org.getCity());
                        console.log("Organization Description: " + org.getDescription());
                        console.log("Organization McStatus: " + org.getMcStatus().toString());
                        console.log("Organization GappsEnabled: " + org.getGappsEnabled().toString());
                        console.log("Organization DomainName: " + org.getDomainName());
                        console.log("Organization TranslationEnabled: " + org.getTranslationEnabled().toString());
                        console.log("Organization Street: " + org.getStreet());
                        console.log("Organization Alias: " + org.getAlias());
                        console.log("Organization Currency: " + org.getCurrency());
                        console.log("Organization Id: " + org.getId());
                        console.log("Organization State: " + org.getState());
                        console.log("Organization Fax: " + org.getFax());
                        console.log("Organization EmployeeCount: " + org.getEmployeeCount());
                        console.log("Organization Zip: " + org.getZip());
                        console.log("Organization Website: " + org.getWebsite());
                        console.log("Organization CurrencySymbol: " + org.getCurrencySymbol());
                        console.log("Organization Mobile: " + org.getMobile());
                        console.log("Organization CurrencyLocale: " + org.getCurrencyLocale());
                        console.log("Organization PrimaryZuid: " + org.getPrimaryZuid());
                        console.log("Organization ZiaPortalId: " + org.getZiaPortalId());
                        console.log("Organization TimeZone: " + org.getTimeZone());
                        console.log("Organization Zgid: " + org.getZgid());
                        console.log("Organization CountryCode: " + org.getCountryCode());
                        let licenseDetails = org.getLicenseDetails();
                        if (licenseDetails != null) {
                            console.log("Organization LicenseDetails PaidExpiry: " + licenseDetails.getPaidExpiry());
                            console.log("Organization LicenseDetails UsersLicensePurchased: " + licenseDetails.getUsersLicensePurchased().toString());
                            console.log("Organization LicenseDetails TrialType: " + licenseDetails.getTrialType());
                            console.log("Organization LicenseDetails TrialExpiry: " + licenseDetails.getTrialExpiry());
                            console.log("Organization LicenseDetails Paid: " + licenseDetails.getPaid().toString());
                            console.log("Organization LicenseDetails PaidType: " + licenseDetails.getPaidType());
                        }
                        console.log("Organization Phone: " + org.getPhone());
                        console.log("Organization CompanyName: " + org.getCompanyName());
                        console.log("Organization PrivacySettings: " + org.getPrivacySettings().toString());
                        console.log("Organization PrimaryEmail: " + org.getPrimaryEmail());
                        console.log("Organization HipaaComplianceEnabled: " + org.getHipaaComplianceEnabled());
                        console.log("Organization IsoCode: " + org.getIsoCode());
                    });
                }
                else if (responseObject instanceof ZOHOCRMSDK.Orgs.APIException) {
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
await GetOrganization.initialize();
await GetOrganization.getOrganization();
export {
    GetOrganization as GetOrganization
}

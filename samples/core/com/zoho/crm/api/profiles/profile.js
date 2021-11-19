const ProfilesOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/profiles/profiles_operations").ProfilesOperations;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/profiles/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/profiles/api_exception").APIException;

class Profile {
	/**
	 * <h3> Get Profiles </h3>
	 * This method is used to retrieve the profiles data through an API request and print the response.
	 */
	static async getProfiles() {
		//Get instance of ProfilesOperations Class that takes If-Modified-Since header as parameter.
		//To include If-Modified-Since header in the request, get the instance as follows
		let profilesOperations = new ProfilesOperations();

		//To not include If-Modified-Since header to the request, get the instance as follows
		// profilesOperations = new ProfilesOperations(null);

		//Call getProfiles method
		let response = await profilesOperations.getProfiles();

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
				if (responseObject instanceof ResponseWrapper) {
					let profiles = responseObject.getProfiles();

					profiles.forEach(profile => {
						//Get the DisplayLabel of the each Profile
						console.log("Profile DisplayLabel: " + profile.getDisplayLabel());

						if (profile.getCreatedTime() != null) {
							//Get the CreatedTime of each Profile
							console.log("Profile CreatedTime: " + profile.getCreatedTime());
						}

						if (profile.getModifiedTime() != null) {
							//Get the ModifiedTime of each Profile
							console.log("Profile ModifiedTime: " + profile.getModifiedTime());
						}

						//Get the Custom of each Profile
						console.log("Profile Custom: " + profile.getCustom());

						//Get the Name of the each Profile
						console.log("Profile Name: " + profile.getName());

						//Get the modifiedBy User instance of each Profile
						let modifiedBy = profile.getModifiedBy();

						//Check if modifiedBy is not null
						if (modifiedBy != null) {
							//Get the ID of the modifiedBy User
							console.log("Profile Modified By User-ID: " + modifiedBy.getId());

							//Get the name of the modifiedBy User
							console.log("Profile Modified By User-Name: " + modifiedBy.getName());

							//Get the Email of the modifiedBy User
							console.log("Profile Modified By User-Email: " + modifiedBy.getEmail());
						}

						//Get the Description of the each Profile
						console.log("Profile Description: " + profile.getDescription());

						//Get the ID of the each Profile
						console.log("Profile ID: " + profile.getId());

						//Get the createdBy User instance of each Profile
						let createdBy = profile.getCreatedBy();

						//Check if createdBy is not null
						if (createdBy != null) {
							//Get the ID of the createdBy User
							console.log("Profile Created By User-ID: " + createdBy.getId());

							//Get the name of the createdBy User
							console.log("Profile Created By User-Name: " + createdBy.getName());

							//Get the Email of the createdBy User
							console.log("Profile Created By User-Email: " + createdBy.getEmail());
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
	 * <h3> Get Profile </h3>
	 * This method is used to get the details of any specific profile with ID.
	 * @param {BigInt} profileId The ID of the Profile to be obtained
	 */
	static async getProfile(profileId) {
		//example
		// let profileId = 26014n;

		//Get instance of ProfilesOperations Class
		let profilesOperations = new ProfilesOperations(null);

		//Call getProfile method that takes profileId as parameter
		let response = await profilesOperations.getProfile(profileId);

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
					//Get the array of obtained Profile instances
					let profiles = responseObject.getProfiles();

					profiles.forEach(profile => {
						//Get the DisplayLabel of the each Profile
						console.log("Profile DisplayLabel: " + profile.getDisplayLabel());

						if (profile.getCreatedTime() != null) {
							//Get the CreatedTime of each Profile
							console.log("Profile CreatedTime: " + profile.getCreatedTime());
						}

						if (profile.getModifiedTime() != null) {
							//Get the ModifiedTime of each Profile
							console.log("Profile ModifiedTime: " + profile.getModifiedTime());
						}

						//Get the Custom of each Profile
						console.log("Profile Custom: " + profile.getCustom());

						//Get the permissionsDetails of each Profile
						let permissionsDetails = profile.getPermissionsDetails();

						//Check if permissionsDetails is not null
						if (permissionsDetails != null) {

							permissionsDetails.forEach(permissionsDetail => {
								//Get the DisplayLabel of the each PermissionDetail
								console.log("Profile PermissionDetail DisplayLabel: " + permissionsDetail.getDisplayLabel());

								//Get the Module of the each PermissionDetail
								console.log("Profile PermissionDetail Module: " + permissionsDetail.getModule());

								//Get the Name of the each PermissionDetail
								console.log("Profile PermissionDetail Name: " + permissionsDetail.getName());

								//Get the ID of the each PermissionDetail
								console.log("Profile PermissionDetail ID: " + permissionsDetail.getId());

								//Get the Enabled of the each PermissionDetail
								console.log("Profile PermissionDetail Enabled: " + permissionsDetail.getEnabled());

							});
						}

						//Get the Name of the each Profile
						console.log("Profile Name: " + profile.getName());

						//Get the modifiedBy User instance of each Profile
						let modifiedBy = profile.getModifiedBy();

						//Check if modifiedBy is not null
						if (modifiedBy != null) {
							//Get the ID of the modifiedBy User
							console.log("Profile Modified By User-ID: " + modifiedBy.getId());

							//Get the name of the modifiedBy User
							console.log("Profile Modified By User-Name: " + modifiedBy.getName());

							//Get the Email of the modifiedBy User
							console.log("Profile Modified By User-Email: " + modifiedBy.getEmail());
						}

						//Get the Description of the each Profile
						console.log("Profile Description: " + profile.getDescription());

						//Get the ID of the each Profile
						console.log("Profile ID: " + profile.getId());

						//Get the createdBy User instance of each Profile
						let createdBy = profile.getCreatedBy();

						//Check if createdBy is not null
						if (createdBy != null) {
							//Get the ID of the createdBy User
							console.log("Profile Created By User-ID: " + createdBy.getId());

							//Get the name of the createdBy User
							console.log("Profile Created By User-Name: " + createdBy.getName());

							//Get the Email of the createdBy User
							console.log("Profile Created By User-Email: " + createdBy.getEmail());
						}

						//Get the sections of each Profile
						let sections = profile.getSections();

						//Check if sections is not null
						if (sections != null) {
							for (let index = 0; index < sections.length; index++) {
								let section = sections[index];

								//Get the Name of the each Section
								console.log("Profile Section Name: " + section.getName());

								//Get the categories of each Section
								let categories = section.getCategories();

								categories.forEach(category => {

									//Get the DisplayLabel of the each Category
									console.log("Profile Section Category DisplayLabel: " + category.getDisplayLabel());

									//Get the permissionsDetails List of each Category
									let categoryPermissionsDetails = category.getPermissionsDetails();

									//Check if categoryPermissionsDetails is not null
									if (categoryPermissionsDetails != null) {
										categoryPermissionsDetails.forEach(permissionsDetailID => {
											//Get the permissionsDetailID of the Category
											console.log("Profile Section Category permissionsDetailID: " + permissionsDetailID);
										});
									}

									//Get the Module of the each Category
									console.log("Profile Section Category Module: " + category.getModule());

									//Get the Name of the each Category
									console.log("Profile Section Category Name: " + category.getName());
								});
							}
						}

						if (profile.getDelete() != null) {
							//Get the Delete of the each Profile
							console.log("Profile Delete: " + profile.getDelete().toString());
						}

						if (profile.getDefault() != null) {
							//Get the Default of the each Profile
							console.log("Profile Default: " + profile.getDefault().toString());
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

module.exports = { Profile }
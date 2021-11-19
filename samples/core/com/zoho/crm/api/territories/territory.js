const TerritoriesOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/territories/territories_operations").TerritoriesOperations;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/territories/response_wrapper").ResponseWrapper;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/territories/api_exception").APIException;

class Territory {

	/**
	 * <h3> Get Territories </h3>
	 * This method is used to get the list of territories enabled for your organization and print the response.
	 */
	static async getTerritories() {
		//Get instance of TerritoriesOperations Class
		let territoriesOperations = new TerritoriesOperations();

		//Call getTerritories method
		let response = await territoriesOperations.getTerritories();

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
					//Get the array of obtained Territory instances
					let territories = responseObject.getTerritories();

					territories.forEach(territory => {
						//Get the CreatedTime of each Territory
						console.log("Territory CreatedTime: " + territory.getCreatedTime());

						//Get the PermissionType of each Territory
						console.log("Territory PermissionType: " + territory.getPermissionType());

						//Get the ModifiedTime of each Territory
						console.log("Territory ModifiedTime: " + territory.getModifiedTime());

						//Get the manager User instance of each Territory
						let manager = territory.getManager();

						//Check if manager is not null
						if (manager != null) {
							//Get the Name of the Manager
							console.log("Territory Manager User-Name: " + manager.getName());

							//Get the ID of the Manager
							console.log("Territory Manager User-ID: " + manager.getId());
						}

						// Get the Criteria instance of each Territory
						let criteria = territory.getAccountRuleCriteria();

						//Check if criteria is not null
						if (criteria != null) {
							this.printCriteria(criteria);
						}

						//Get the Name of each Territory
						console.log("Territory Name: " + territory.getName());

						//Get the modifiedBy User instance of each Territory
						let modifiedBy = territory.getModifiedBy();

						//Check if modifiedBy is not null
						if (modifiedBy != null) {
							//Get the Name of the modifiedBy User
							console.log("Territory Modified By User-Name: " + modifiedBy.getName());

							//Get the ID of the modifiedBy User
							console.log("Territory Modified By User-ID: " + modifiedBy.getId());
						}

						//Get the Description of each Territory
						console.log("Territory Description: " + territory.getDescription());

						//Get the ID of each Territory
						console.log("Territory ID: " + territory.getId());

						//Get the reportingTo User instance of each Territory
						let reportingTo = territory.getReportingTo();

						//Check if reportingTo is not null
						if (reportingTo != null) {
							//Get the Name of the reportingTo User
							console.log("Territory ReportingTo User-Name: " + reportingTo.getName());

							//Get the ID of the reportingTo User
							console.log("Territory ReportingTo User-ID: " + reportingTo.getId());
						}

						// Get the Criteria instance of each Territory
						let dealcriteria = territory.getDealRuleCriteria();

						//Check if criteria is not null
						if (dealcriteria != null) {
							this.printCriteria(dealcriteria);
						}

						//Get the createdBy User instance of each Territory
						let createdBy = territory.getCreatedBy();

						//Check if createdBy is not null
						if (createdBy != null) {
							//Get the Name of the createdBy User
							console.log("Territory Created By User-Name: " + createdBy.getName());

							//Get the ID of the createdBy User
							console.log("Territory Created By User-ID: " + createdBy.getId());
						}
					});

					let info = responseObject.getInfo();

					console.log("Territory Info PerPage : " + info.getPerPage());

					console.log("Territory Info Count : " + info.getCount());

					console.log("Territory Info Page : " + info.getPage());

					console.log("Territory Info MoreRecords : " + info.getMoreRecords());
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
	 * <h3> Get Territory </h3>
	 * This method is used to get the single territory and print the response.
	 * @param {BigInt} territoryId The ID of the Territory to be obtainted
	 */
	static async getTerritory(territoryId) {
		//example
		//let territoryId = 505351n;

		//Get instance of TerritoriesOperations Class
		let territoriesOperations = new TerritoriesOperations();

		//Call getTerritory method that takes territoryId as parameter
		let response = await territoriesOperations.getTerritory(territoryId);

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
					//Get the array of obtained Territory instances
					let territories = responseObject.getTerritories();

					territories.forEach(territory => {
						//Get the CreatedTime of each Territory
						console.log("Territory CreatedTime: " + territory.getCreatedTime());

						//Get the PermissionType of each Territory
						console.log("Territory PermissionType: " + territory.getPermissionType());

						//Get the ModifiedTime of each Territory
						console.log("Territory ModifiedTime: " + territory.getModifiedTime());

						//Get the manager User instance of each Territory
						let manager = territory.getManager();

						//Check if manager is not null
						if (manager != null) {
							//Get the Name of the Manager
							console.log("Territory Manager User-Name: " + manager.getName());

							//Get the ID of the Manager
							console.log("Territory Manager User-ID: " + manager.getId());
						}

						// Get the Criteria instance of each Territory
						let criteria = territory.getAccountRuleCriteria();

						//Check if criteria is not null
						if (criteria != null) {
							this.printCriteria(criteria);
						}

						//Get the Name of each Territory
						console.log("Territory Name: " + territory.getName());

						//Get the modifiedBy User instance of each Territory
						let modifiedBy = territory.getModifiedBy();

						//Check if modifiedBy is not null
						if (modifiedBy != null) {
							//Get the Name of the modifiedBy User
							console.log("Territory Modified By User-Name: " + modifiedBy.getName());

							//Get the ID of the modifiedBy User
							console.log("Territory Modified By User-ID: " + modifiedBy.getId());
						}

						//Get the Description of each Territory
						console.log("Territory Description: " + territory.getDescription());

						//Get the ID of each Territory
						console.log("Territory ID: " + territory.getId());

						//Get the reportingTo User instance of each Territory
						let reportingTo = territory.getReportingTo();

						//Check if reportingTo is not null
						if (reportingTo != null) {
							//Get the Name of the reportingTo User
							console.log("Territory ReportingTo User-Name: " + reportingTo.getName());

							//Get the ID of the reportingTo User
							console.log("Territory ReportingTo User-ID: " + reportingTo.getId());
						}

						// Get the Criteria instance of each Territory
						let dealcriteria = territory.getDealRuleCriteria();

						//Check if criteria is not null
						if (dealcriteria != null) {
							this.printCriteria(dealcriteria);
						}

						//Get the createdBy User instance of each Territory
						let createdBy = territory.getCreatedBy();

						//Check if createdBy is not null
						if (createdBy != null) {
							//Get the Name of the createdBy User
							console.log("Territory Created By User-Name: " + createdBy.getName());

							//Get the ID of the createdBy User
							console.log("Territory Created By User-ID: " + createdBy.getId());
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

	static async printCriteria(criteria) {
		let field = criteria.getField();

		if (field != null) {
			//Get the Field Id of the Criteria
			console.log("Territory Query Criteria Field Id: " + field.getId());

			//Get the Field APIName of the Criteria
			console.log("Territory Query Criteria Field APIName: " + field.getAPIName());
		}

		if (criteria.getComparator() != null) {
			console.log("Territory Criteria Comparator: " + criteria.getComparator().getValue());
		}

		if (criteria.getValue() != null) {
			console.log("Territory Criteria Value: " + criteria.getValue().toString());
		}

		let criteriaGroup = criteria.getGroup();

		if (criteriaGroup != null) {
			criteriaGroup.forEach(eachCriteria => {
				this.printCriteria(eachCriteria);
			});
		}

		if (criteria.getGroupOperator() != null) {
			console.log("Territory Criteria Group Operator: " + criteria.getGroupOperator().getValue());
		}
	}

}

module.exports = { Territory }
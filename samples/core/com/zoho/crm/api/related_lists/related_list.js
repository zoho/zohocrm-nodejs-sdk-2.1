const RelatedListsOperations = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_lists/related_lists_operations").RelatedListsOperations;
const APIException = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_lists/api_exception").APIException;
const ResponseWrapper = require("@zohocrm/nodejs-sdk-2.1/core/com/zoho/crm/api/related_lists/response_wrapper").ResponseWrapper;

class RelatedList {

	/**
	 * <h3> Get RelatedLists </h3>
	 * This method is used to get the related list data of a particular module and print the response.
	 * @param {String} moduleAPIName The API Name of the module to get related lists
	 */
	static async getRelatedLists(moduleAPIName) {
		//example
		//let moduleAPIName = "module_api_name";

		//Get instance of RelatedListsOperations Class that takes moduleAPIName as parameter
		let relatedListsOperations = new RelatedListsOperations(moduleAPIName);

		//Call getRelatedLists method
		let response = await relatedListsOperations.getRelatedLists();

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
					//Get the array of obtained RelatedList instances
					let relatedLists = responseObject.getRelatedLists();

					relatedLists.forEach(relatedList => {
						//Get the SequenceNumber of each RelatedList
						console.log("RelatedList SequenceNumber: " + relatedList.getSequenceNumber());

						//Get the DisplayLabel of each RelatedList
						console.log("RelatedList DisplayLabel: " + relatedList.getDisplayLabel());

						//Get the APIName of each RelatedList
						console.log("RelatedList APIName: " + relatedList.getAPIName());

						//Get the Module of each RelatedList
						console.log("RelatedList Module: " + relatedList.getModule());

						//Get the Name of each RelatedList
						console.log("RelatedList Name: " + relatedList.getName());

						//Get the Action of each RelatedList
						console.log("RelatedList Action: " + relatedList.getAction());

						//Get the ID of each RelatedList
						console.log("RelatedList ID: " + relatedList.getId());

						//Get the Href of each RelatedList
						console.log("RelatedList Href: " + relatedList.getHref());

						//Get the Type of each RelatedList
						console.log("RelatedList Type: " + relatedList.getType());

						//Get the Connected Module of each RelatedList
						console.log("RelatedList Connectedmodule: " + relatedList.getConnectedmodule());

						//Get the Linking Module of each RelatedList
						console.log("RelatedList Linkingmodule: " + relatedList.getLinkingmodule());
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
	 * <h3> Get RelatedList </h3>
	 * This method is used to get the single related list data of a particular module with relatedListId and print the response.
	 * @param {String} moduleAPIName The API Name of the module to get related list
	 * @param {BigInt} relatedListId The ID of the relatedList to be obtained
	 */
	static async getRelatedList(moduleAPIName, relatedListId) {
		//example
		//let moduleAPIName = "module_api_name";
		// let relatedListId = 62003n;

		//Get instance of RelatedListsOperations Class that takes moduleAPIName as parameter
		let relatedListsOperations = new RelatedListsOperations(moduleAPIName);

		//Call getRelatedList method which takes relatedListId as parameter
		let response = await relatedListsOperations.getRelatedList(relatedListId);

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
					let relatedLists = responseObject.getRelatedLists();

					relatedLists.forEach(relatedList => {
						//Get the SequenceNumber of each RelatedList
						console.log("RelatedList SequenceNumber: " + relatedList.getSequenceNumber());

						//Get the DisplayLabel of each RelatedList
						console.log("RelatedList DisplayLabel: " + relatedList.getDisplayLabel());

						//Get the APIName of each RelatedList
						console.log("RelatedList APIName: " + relatedList.getAPIName());

						//Get the Module of each RelatedList
						console.log("RelatedList Module: " + relatedList.getModule());

						//Get the Name of each RelatedList
						console.log("RelatedList Name: " + relatedList.getName());

						//Get the Action of each RelatedList
						console.log("RelatedList Action: " + relatedList.getAction());

						//Get the ID of each RelatedList
						console.log("RelatedList ID: " + relatedList.getId());

						//Get the Href of each RelatedList
						console.log("RelatedList Href: " + relatedList.getHref());

						//Get the Type of each RelatedList
						console.log("RelatedList Type: " + relatedList.getType());

						//Get the Connected Module of each RelatedList
						console.log("RelatedList Connectedmodule: " + relatedList.getConnectedmodule());

						//Get the Linking Module of each RelatedList
						console.log("RelatedList Linkingmodule: " + relatedList.getLinkingmodule());
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

module.exports = { RelatedList }
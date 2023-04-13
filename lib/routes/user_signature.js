
/**
 * This class represents the Zoho CRM User.
 */
class UserSignature {

	name

	constructor(name){
		this.name = name;
	}

	/**
	 * This is a getter method to get user email.
	 * @returns {string} A String representing the CRM user email.
	 */
	getName(){
		return this.name;
	}
}

export {
	UserSignature as UserSignature,
	UserSignature as MasterModel
}
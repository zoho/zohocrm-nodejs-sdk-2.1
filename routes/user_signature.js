const Constants = require('../utils/util/constants').Constants;

const SDKException = require("../core/com/zoho/crm/api/exception/sdk_exception").SDKException;

/**
 * This class represents the Zoho CRM User.
 */
class UserSignature {

	_email;

	/**
	 * Creates an UserSignature class instance with the specified user email.
	 * @param {string} email - A String containing the CRM user email.
	 */
	constructor(email) {

		if (!Constants.REGULAR_EXPRESSION.test(email)) {
			let error = {};

			error[Constants.ERROR_HASH_FIELD] = Constants.EMAIL;

			error[Constants.ERROR_HASH_EXPECTED_TYPE] = Constants.EMAIL;

			let ex = new SDKException(Constants.USER_SIGNATURE_ERROR, null, error);

			throw ex;
		}

		this._email = email;
	}

	/**
	 * This is a getter method to get user email.
	 * @returns {string} A String representing the CRM user email.
	 */
	getEmail() {
		return this._email;
	}
}

module.exports = {
	MasterModel: UserSignature,
	UserSignature: UserSignature
};
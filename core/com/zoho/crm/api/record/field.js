
class Field{

	apiName;
	/**
	 * Creates an instance of Field with the given parameters
	 * @param {String} apiName A String representing the apiName
	 */
	constructor(apiName){
		if((apiName != null) && (!(Object.prototype.toString.call(apiName) == "[object String]")))	{
			throw new SDKException(Constants.DATA_TYPE_ERROR, "KEY: apiName EXPECTED TYPE: String", null, null);
		}
		this.apiName = apiName;

	}

	/**
	 * The method to get the apiName
	 * @returns {String} A String representing the apiName
	 */
	getAPIName()	{
		return this.apiName;

	}

	static Products = class {
		static PRODUCT_CATEGORY = new Field("Product_Category");
		static QTY_IN_DEMAND = new Field("Qty_in_Demand");
		static OWNER = new Field("Owner");
		static DESCRIPTION = new Field("Description");
		static VENDOR_NAME = new Field("Vendor_Name");
		static TAX = new Field("Tax");
		static SALES_START_DATE = new Field("Sales_Start_Date");
		static PRODUCT_ACTIVE = new Field("Product_Active");
		static RECORD_IMAGE = new Field("Record_Image");
		static MODIFIED_BY = new Field("Modified_By");
		static PRODUCT_CODE = new Field("Product_Code");
		static MANUFACTURER = new Field("Manufacturer");
		static ID = new Field("id");
		static SUPPORT_EXPIRY_DATE = new Field("Support_Expiry_Date");
		static MODIFIED_TIME = new Field("Modified_Time");
		static CREATED_TIME = new Field("Created_Time");
		static COMMISSION_RATE = new Field("Commission_Rate");
		static PRODUCT_NAME = new Field("Product_Name");
		static HANDLER = new Field("Handler");
		static SUPPORT_START_DATE = new Field("Support_Start_Date");
		static USAGE_UNIT = new Field("Usage_Unit");
		static QTY_ORDERED = new Field("Qty_Ordered");
		static QTY_IN_STOCK = new Field("Qty_in_Stock");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
		static SALES_END_DATE = new Field("Sales_End_Date");
		static UNIT_PRICE = new Field("Unit_Price");
		static TAXABLE = new Field("Taxable");
		static REORDER_LEVEL = new Field("Reorder_Level");
	}

	static Tasks = class {
		static STATUS = new Field("Status");
		static OWNER = new Field("Owner");
		static MODIFIED_TIME = new Field("Modified_Time");
		static DESCRIPTION = new Field("Description");
		static DUE_DATE = new Field("Due_Date");
		static PRIORITY = new Field("Priority");
		static CREATED_TIME = new Field("Created_Time");
		static CLOSED_TIME = new Field("Closed_Time");
		static SUBJECT = new Field("Subject");
		static SEND_NOTIFICATION_EMAIL = new Field("Send_Notification_Email");
		static MODIFIED_BY = new Field("Modified_By");
		static RECURRING_ACTIVITY = new Field("Recurring_Activity");
		static WHAT_ID = new Field("What_Id");
		static ID = new Field("id");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
		static REMIND_AT = new Field("Remind_At");
		static WHO_ID = new Field("Who_Id");
	}

	static Vendors = class {
		static OWNER = new Field("Owner");
		static MODIFIED_TIME = new Field("Modified_Time");
		static EMAIL = new Field("Email");
		static CATEGORY = new Field("Category");
		static DESCRIPTION = new Field("Description");
		static VENDOR_NAME = new Field("Vendor_Name");
		static CREATED_TIME = new Field("Created_Time");
		static WEBSITE = new Field("Website");
		static CITY = new Field("City");
		static RECORD_IMAGE = new Field("Record_Image");
		static MODIFIED_BY = new Field("Modified_By");
		static PHONE = new Field("Phone");
		static STATE = new Field("State");
		static GL_ACCOUNT = new Field("GL_Account");
		static STREET = new Field("Street");
		static COUNTRY = new Field("Country");
		static ZIP_CODE = new Field("Zip_Code");
		static ID = new Field("id");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
	}

	static Calls = class {
		static CALL_DURATION = new Field("Call_Duration");
		static OWNER = new Field("Owner");
		static MODIFIED_TIME = new Field("Modified_Time");
		static DESCRIPTION = new Field("Description");
		static REMINDER = new Field("Reminder");
		static CALLER_ID = new Field("Caller_ID");
		static CTI_ENTRY = new Field("CTI_Entry");
		static CREATED_TIME = new Field("Created_Time");
		static CALL_START_TIME = new Field("Call_Start_Time");
		static SUBJECT = new Field("Subject");
		static CALL_AGENDA = new Field("Call_Agenda");
		static CALL_RESULT = new Field("Call_Result");
		static CALL_TYPE = new Field("Call_Type");
		static MODIFIED_BY = new Field("Modified_By");
		static WHAT_ID = new Field("What_Id");
		static CALL_DURATION_IN_SECONDS = new Field("Call_Duration_in_seconds");
		static CALL_PURPOSE = new Field("Call_Purpose");
		static ID = new Field("id");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
		static DIALLED_NUMBER = new Field("Dialled_Number");
		static CALL_STATUS = new Field("Call_Status");
		static WHO_ID = new Field("Who_Id");
	}

	static Leads = class {
		static OWNER = new Field("Owner");
		static COMPANY = new Field("Company");
		static EMAIL = new Field("Email");
		static DESCRIPTION = new Field("Description");
		static RATING = new Field("Rating");
		static WEBSITE = new Field("Website");
		static TWITTER = new Field("Twitter");
		static SALUTATION = new Field("Salutation");
		static LAST_ACTIVITY_TIME = new Field("Last_Activity_Time");
		static FIRST_NAME = new Field("First_Name");
		static FULL_NAME = new Field("Full_Name");
		static LEAD_STATUS = new Field("Lead_Status");
		static INDUSTRY = new Field("Industry");
		static RECORD_IMAGE = new Field("Record_Image");
		static MODIFIED_BY = new Field("Modified_By");
		static SKYPE_ID = new Field("Skype_ID");
		static PHONE = new Field("Phone");
		static STREET = new Field("Street");
		static ZIP_CODE = new Field("Zip_Code");
		static ID = new Field("id");
		static EMAIL_OPT_OUT = new Field("Email_Opt_Out");
		static DESIGNATION = new Field("Designation");
		static MODIFIED_TIME = new Field("Modified_Time");
		static CREATED_TIME = new Field("Created_Time");
		static CITY = new Field("City");
		static NO_OF_EMPLOYEES = new Field("No_of_Employees");
		static MOBILE = new Field("Mobile");
		static CONVERTED_DATE_TIME = new Field("Converted_Date_Time");
		static LAST_NAME = new Field("Last_Name");
		static LAYOUT = new Field("Layout");
		static STATE = new Field("State");
		static LEAD_SOURCE = new Field("Lead_Source");
		static IS_RECORD_DUPLICATE = new Field("Is_Record_Duplicate");
		static TAG = new Field("Tag");
		static CREATED_BY = new Field("Created_By");
		static FAX = new Field("Fax");
		static ANNUAL_REVENUE = new Field("Annual_Revenue");
		static SECONDARY_EMAIL = new Field("Secondary_Email");
	}

	static Deals = class {
		static OWNER = new Field("Owner");
		static DESCRIPTION = new Field("Description");
		static CAMPAIGN_SOURCE = new Field("Campaign_Source");
		static CLOSING_DATE = new Field("Closing_Date");
		static LAST_ACTIVITY_TIME = new Field("Last_Activity_Time");
		static MODIFIED_BY = new Field("Modified_By");
		static LEAD_CONVERSION_TIME = new Field("Lead_Conversion_Time");
		static DEAL_NAME = new Field("Deal_Name");
		static EXPECTED_REVENUE = new Field("Expected_Revenue");
		static OVERALL_SALES_DURATION = new Field("Overall_Sales_Duration");
		static STAGE = new Field("Stage");
		static ID = new Field("id");
		static MODIFIED_TIME = new Field("Modified_Time");
		static TERRITORY = new Field("Territory");
		static CREATED_TIME = new Field("Created_Time");
		static AMOUNT = new Field("Amount");
		static PROBABILITY = new Field("Probability");
		static NEXT_STEP = new Field("Next_Step");
		static CONTACT_NAME = new Field("Contact_Name");
		static SALES_CYCLE_DURATION = new Field("Sales_Cycle_Duration");
		static TYPE = new Field("Type");
		static DEAL_CATEGORY_STATUS = new Field("Deal_Category_Status");
		static LEAD_SOURCE = new Field("Lead_Source");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
	}

	static Campaigns = class {
		static STATUS = new Field("Status");
		static OWNER = new Field("Owner");
		static MODIFIED_TIME = new Field("Modified_Time");
		static DESCRIPTION = new Field("Description");
		static CAMPAIGN_NAME = new Field("Campaign_Name");
		static CREATED_TIME = new Field("Created_Time");
		static END_DATE = new Field("End_Date");
		static TYPE = new Field("Type");
		static MODIFIED_BY = new Field("Modified_By");
		static NUM_SENT = new Field("Num_sent");
		static EXPECTED_REVENUE = new Field("Expected_Revenue");
		static ACTUAL_COST = new Field("Actual_Cost");
		static ID = new Field("id");
		static EXPECTED_RESPONSE = new Field("Expected_Response");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
		static PARENT_CAMPAIGN = new Field("Parent_Campaign");
		static START_DATE = new Field("Start_Date");
		static BUDGETED_COST = new Field("Budgeted_Cost");
	}

	static Quotes = class {
		static OWNER = new Field("Owner");
		static DISCOUNT = new Field("Discount");
		static DESCRIPTION = new Field("Description");
		static SHIPPING_STATE = new Field("Shipping_State");
		static TAX = new Field("Tax");
		static MODIFIED_BY = new Field("Modified_By");
		static DEAL_NAME = new Field("Deal_Name");
		static VALID_TILL = new Field("Valid_Till");
		static BILLING_COUNTRY = new Field("Billing_Country");
		static ACCOUNT_NAME = new Field("Account_Name");
		static TEAM = new Field("Team");
		static ID = new Field("id");
		static CARRIER = new Field("Carrier");
		static QUOTE_STAGE = new Field("Quote_Stage");
		static GRAND_TOTAL = new Field("Grand_Total");
		static MODIFIED_TIME = new Field("Modified_Time");
		static BILLING_STREET = new Field("Billing_Street");
		static ADJUSTMENT = new Field("Adjustment");
		static CREATED_TIME = new Field("Created_Time");
		static TERMS_AND_CONDITIONS = new Field("Terms_and_Conditions");
		static SUB_TOTAL = new Field("Sub_Total");
		static BILLING_CODE = new Field("Billing_Code");
		static PRODUCT_DETAILS = new Field("Product_Details");
		static SUBJECT = new Field("Subject");
		static CONTACT_NAME = new Field("Contact_Name");
		static SHIPPING_CITY = new Field("Shipping_City");
		static SHIPPING_COUNTRY = new Field("Shipping_Country");
		static SHIPPING_CODE = new Field("Shipping_Code");
		static BILLING_CITY = new Field("Billing_City");
		static QUOTE_NUMBER = new Field("Quote_Number");
		static BILLING_STATE = new Field("Billing_State");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
		static SHIPPING_STREET = new Field("Shipping_Street");
	}

	static Invoices = class {
		static OWNER = new Field("Owner");
		static DISCOUNT = new Field("Discount");
		static DESCRIPTION = new Field("Description");
		static SHIPPING_STATE = new Field("Shipping_State");
		static TAX = new Field("Tax");
		static INVOICE_DATE = new Field("Invoice_Date");
		static MODIFIED_BY = new Field("Modified_By");
		static BILLING_COUNTRY = new Field("Billing_Country");
		static ACCOUNT_NAME = new Field("Account_Name");
		static ID = new Field("id");
		static SALES_ORDER = new Field("Sales_Order");
		static STATUS = new Field("Status");
		static GRAND_TOTAL = new Field("Grand_Total");
		static SALES_COMMISSION = new Field("Sales_Commission");
		static MODIFIED_TIME = new Field("Modified_Time");
		static DUE_DATE = new Field("Due_Date");
		static BILLING_STREET = new Field("Billing_Street");
		static ADJUSTMENT = new Field("Adjustment");
		static CREATED_TIME = new Field("Created_Time");
		static TERMS_AND_CONDITIONS = new Field("Terms_and_Conditions");
		static SUB_TOTAL = new Field("Sub_Total");
		static INVOICE_NUMBER = new Field("Invoice_Number");
		static BILLING_CODE = new Field("Billing_Code");
		static PRODUCT_DETAILS = new Field("Product_Details");
		static SUBJECT = new Field("Subject");
		static CONTACT_NAME = new Field("Contact_Name");
		static EXCISE_DUTY = new Field("Excise_Duty");
		static SHIPPING_CITY = new Field("Shipping_City");
		static SHIPPING_COUNTRY = new Field("Shipping_Country");
		static SHIPPING_CODE = new Field("Shipping_Code");
		static BILLING_CITY = new Field("Billing_City");
		static PURCHASE_ORDER = new Field("Purchase_Order");
		static BILLING_STATE = new Field("Billing_State");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
		static SHIPPING_STREET = new Field("Shipping_Street");
	}

	static Attachments = class {
		static OWNER = new Field("Owner");
		static MODIFIED_BY = new Field("Modified_By");
		static MODIFIED_TIME = new Field("Modified_Time");
		static FILE_NAME = new Field("File_Name");
		static CREATED_TIME = new Field("Created_Time");
		static SIZE = new Field("Size");
		static PARENT_ID = new Field("Parent_Id");
		static ID = new Field("id");
		static CREATED_BY = new Field("Created_By");
	}

	static Price_Books = class {
		static OWNER = new Field("Owner");
		static ACTIVE = new Field("Active");
		static MODIFIED_BY = new Field("Modified_By");
		static MODIFIED_TIME = new Field("Modified_Time");
		static PRICING_DETAILS = new Field("Pricing_Details");
		static PRICING_MODEL = new Field("Pricing_Model");
		static DESCRIPTION = new Field("Description");
		static CREATED_TIME = new Field("Created_Time");
		static PRICE_BOOK_NAME = new Field("Price_Book_Name");
		static ID = new Field("id");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
	}

	static Sales_Orders = class {
		static OWNER = new Field("Owner");
		static DISCOUNT = new Field("Discount");
		static DESCRIPTION = new Field("Description");
		static CUSTOMER_NO = new Field("Customer_No");
		static SHIPPING_STATE = new Field("Shipping_State");
		static TAX = new Field("Tax");
		static MODIFIED_BY = new Field("Modified_By");
		static DEAL_NAME = new Field("Deal_Name");
		static BILLING_COUNTRY = new Field("Billing_Country");
		static ACCOUNT_NAME = new Field("Account_Name");
		static ID = new Field("id");
		static CARRIER = new Field("Carrier");
		static QUOTE_NAME = new Field("Quote_Name");
		static STATUS = new Field("Status");
		static SALES_COMMISSION = new Field("Sales_Commission");
		static GRAND_TOTAL = new Field("Grand_Total");
		static MODIFIED_TIME = new Field("Modified_Time");
		static DUE_DATE = new Field("Due_Date");
		static BILLING_STREET = new Field("Billing_Street");
		static ADJUSTMENT = new Field("Adjustment");
		static CREATED_TIME = new Field("Created_Time");
		static TERMS_AND_CONDITIONS = new Field("Terms_and_Conditions");
		static SUB_TOTAL = new Field("Sub_Total");
		static BILLING_CODE = new Field("Billing_Code");
		static PRODUCT_DETAILS = new Field("Product_Details");
		static SUBJECT = new Field("Subject");
		static CONTACT_NAME = new Field("Contact_Name");
		static EXCISE_DUTY = new Field("Excise_Duty");
		static SHIPPING_CITY = new Field("Shipping_City");
		static SHIPPING_COUNTRY = new Field("Shipping_Country");
		static SHIPPING_CODE = new Field("Shipping_Code");
		static BILLING_CITY = new Field("Billing_City");
		static SO_NUMBER = new Field("SO_Number");
		static PURCHASE_ORDER = new Field("Purchase_Order");
		static BILLING_STATE = new Field("Billing_State");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
		static PENDING = new Field("Pending");
		static SHIPPING_STREET = new Field("Shipping_Street");
	}

	static Contacts = class {
		static OWNER = new Field("Owner");
		static EMAIL = new Field("Email");
		static DESCRIPTION = new Field("Description");
		static VENDOR_NAME = new Field("Vendor_Name");
		static MAILING_ZIP = new Field("Mailing_Zip");
		static REPORTS_TO = new Field("Reports_To");
		static OTHER_PHONE = new Field("Other_Phone");
		static MAILING_STATE = new Field("Mailing_State");
		static TWITTER = new Field("Twitter");
		static OTHER_ZIP = new Field("Other_Zip");
		static MAILING_STREET = new Field("Mailing_Street");
		static OTHER_STATE = new Field("Other_State");
		static SALUTATION = new Field("Salutation");
		static OTHER_COUNTRY = new Field("Other_Country");
		static LAST_ACTIVITY_TIME = new Field("Last_Activity_Time");
		static FIRST_NAME = new Field("First_Name");
		static FULL_NAME = new Field("Full_Name");
		static ASST_PHONE = new Field("Asst_Phone");
		static RECORD_IMAGE = new Field("Record_Image");
		static DEPARTMENT = new Field("Department");
		static MODIFIED_BY = new Field("Modified_By");
		static SKYPE_ID = new Field("Skype_ID");
		static ASSISTANT = new Field("Assistant");
		static PHONE = new Field("Phone");
		static MAILING_COUNTRY = new Field("Mailing_Country");
		static ACCOUNT_NAME = new Field("Account_Name");
		static ID = new Field("id");
		static EMAIL_OPT_OUT = new Field("Email_Opt_Out");
		static REPORTING_TO = new Field("Reporting_To");
		static MODIFIED_TIME = new Field("Modified_Time");
		static DATE_OF_BIRTH = new Field("Date_of_Birth");
		static MAILING_CITY = new Field("Mailing_City");
		static OTHER_CITY = new Field("Other_City");
		static CREATED_TIME = new Field("Created_Time");
		static TITLE = new Field("Title");
		static OTHER_STREET = new Field("Other_Street");
		static MOBILE = new Field("Mobile");
		static TERRITORIES = new Field("Territories");
		static HOME_PHONE = new Field("Home_Phone");
		static LAST_NAME = new Field("Last_Name");
		static LEAD_SOURCE = new Field("Lead_Source");
		static IS_RECORD_DUPLICATE = new Field("Is_Record_Duplicate");
		static TAG = new Field("Tag");
		static CREATED_BY = new Field("Created_By");
		static FAX = new Field("Fax");
		static SECONDARY_EMAIL = new Field("Secondary_Email");
	}

	static Solutions = class {
		static STATUS = new Field("Status");
		static OWNER = new Field("Owner");
		static MODIFIED_TIME = new Field("Modified_Time");
		static CREATED_TIME = new Field("Created_Time");
		static COMMENTS = new Field("Comments");
		static NO_OF_COMMENTS = new Field("No_of_comments");
		static PRODUCT_NAME = new Field("Product_Name");
		static ADD_COMMENT = new Field("Add_Comment");
		static SOLUTION_NUMBER = new Field("Solution_Number");
		static ANSWER = new Field("Answer");
		static MODIFIED_BY = new Field("Modified_By");
		static SOLUTION_TITLE = new Field("Solution_Title");
		static PUBLISHED = new Field("Published");
		static QUESTION = new Field("Question");
		static ID = new Field("id");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
	}

	static Events = class {
		static ALL_DAY = new Field("All_day");
		static OWNER = new Field("Owner");
		static CHECK_IN_STATE = new Field("Check_In_State");
		static CHECK_IN_ADDRESS = new Field("Check_In_Address");
		static DESCRIPTION = new Field("Description");
		static START_DATETIME = new Field("Start_DateTime");
		static LATITUDE = new Field("Latitude");
		static PARTICIPANTS = new Field("Participants");
		static EVENT_TITLE = new Field("Event_Title");
		static END_DATETIME = new Field("End_DateTime");
		static CHECK_IN_BY = new Field("Check_In_By");
		static MODIFIED_BY = new Field("Modified_By");
		static CHECK_IN_CITY = new Field("Check_In_City");
		static ID = new Field("id");
		static CHECK_IN_COMMENT = new Field("Check_In_Comment");
		static REMIND_AT = new Field("Remind_At");
		static WHO_ID = new Field("Who_Id");
		static CHECK_IN_STATUS = new Field("Check_In_Status");
		static CHECK_IN_COUNTRY = new Field("Check_In_Country");
		static MODIFIED_TIME = new Field("Modified_Time");
		static VENUE = new Field("Venue");
		static ZIP_CODE = new Field("ZIP_Code");
		static CREATED_TIME = new Field("Created_Time");
		static LONGITUDE = new Field("Longitude");
		static CHECK_IN_TIME = new Field("Check_In_Time");
		static RECURRING_ACTIVITY = new Field("Recurring_Activity");
		static WHAT_ID = new Field("What_Id");
		static CHECK_IN_SUB_LOCALITY = new Field("Check_In_Sub_Locality");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
	}

	static Purchase_Orders = class {
		static OWNER = new Field("Owner");
		static DISCOUNT = new Field("Discount");
		static DESCRIPTION = new Field("Description");
		static VENDOR_NAME = new Field("Vendor_Name");
		static SHIPPING_STATE = new Field("Shipping_State");
		static TAX = new Field("Tax");
		static PO_DATE = new Field("PO_Date");
		static MODIFIED_BY = new Field("Modified_By");
		static BILLING_COUNTRY = new Field("Billing_Country");
		static ID = new Field("id");
		static CARRIER = new Field("Carrier");
		static STATUS = new Field("Status");
		static GRAND_TOTAL = new Field("Grand_Total");
		static SALES_COMMISSION = new Field("Sales_Commission");
		static MODIFIED_TIME = new Field("Modified_Time");
		static PO_NUMBER = new Field("PO_Number");
		static DUE_DATE = new Field("Due_Date");
		static BILLING_STREET = new Field("Billing_Street");
		static ADJUSTMENT = new Field("Adjustment");
		static CREATED_TIME = new Field("Created_Time");
		static TERMS_AND_CONDITIONS = new Field("Terms_and_Conditions");
		static SUB_TOTAL = new Field("Sub_Total");
		static BILLING_CODE = new Field("Billing_Code");
		static PRODUCT_DETAILS = new Field("Product_Details");
		static SUBJECT = new Field("Subject");
		static TRACKING_NUMBER = new Field("Tracking_Number");
		static CONTACT_NAME = new Field("Contact_Name");
		static EXCISE_DUTY = new Field("Excise_Duty");
		static SHIPPING_CITY = new Field("Shipping_City");
		static SHIPPING_COUNTRY = new Field("Shipping_Country");
		static SHIPPING_CODE = new Field("Shipping_Code");
		static BILLING_CITY = new Field("Billing_City");
		static REQUISITION_NO = new Field("Requisition_No");
		static BILLING_STATE = new Field("Billing_State");
		static CREATED_BY = new Field("Created_By");
		static TAG = new Field("Tag");
		static SHIPPING_STREET = new Field("Shipping_Street");
	}

	static Accounts = class {
		static OWNER = new Field("Owner");
		static OWNERSHIP = new Field("Ownership");
		static DESCRIPTION = new Field("Description");
		static ACCOUNT_TYPE = new Field("Account_Type");
		static RATING = new Field("Rating");
		static SIC_CODE = new Field("SIC_Code");
		static SHIPPING_STATE = new Field("Shipping_State");
		static WEBSITE = new Field("Website");
		static EMPLOYEES = new Field("Employees");
		static LAST_ACTIVITY_TIME = new Field("Last_Activity_Time");
		static INDUSTRY = new Field("Industry");
		static RECORD_IMAGE = new Field("Record_Image");
		static MODIFIED_BY = new Field("Modified_By");
		static ACCOUNT_SITE = new Field("Account_Site");
		static PHONE = new Field("Phone");
		static BILLING_COUNTRY = new Field("Billing_Country");
		static ACCOUNT_NAME = new Field("Account_Name");
		static ID = new Field("id");
		static ACCOUNT_NUMBER = new Field("Account_Number");
		static TICKER_SYMBOL = new Field("Ticker_Symbol");
		static MODIFIED_TIME = new Field("Modified_Time");
		static BILLING_STREET = new Field("Billing_Street");
		static CREATED_TIME = new Field("Created_Time");
		static BILLING_CODE = new Field("Billing_Code");
		static TERRITORIES = new Field("Territories");
		static PARENT_ACCOUNT = new Field("Parent_Account");
		static SHIPPING_CITY = new Field("Shipping_City");
		static SHIPPING_COUNTRY = new Field("Shipping_Country");
		static SHIPPING_CODE = new Field("Shipping_Code");
		static BILLING_CITY = new Field("Billing_City");
		static BILLING_STATE = new Field("Billing_State");
		static TAG = new Field("Tag");
		static CREATED_BY = new Field("Created_By");
		static FAX = new Field("Fax");
		static ANNUAL_REVENUE = new Field("Annual_Revenue");
		static SHIPPING_STREET = new Field("Shipping_Street");
	}

	static Cases = class {
		static OWNER = new Field("Owner");
		static EMAIL = new Field("Email");
		static DESCRIPTION = new Field("Description");
		static INTERNAL_COMMENTS = new Field("Internal_Comments");
		static NO_OF_COMMENTS = new Field("No_of_comments");
		static REPORTED_BY = new Field("Reported_By");
		static CASE_NUMBER = new Field("Case_Number");
		static MODIFIED_BY = new Field("Modified_By");
		static DEAL_NAME = new Field("Deal_Name");
		static PHONE = new Field("Phone");
		static ACCOUNT_NAME = new Field("Account_Name");
		static ID = new Field("id");
		static SOLUTION = new Field("Solution");
		static STATUS = new Field("Status");
		static MODIFIED_TIME = new Field("Modified_Time");
		static PRIORITY = new Field("Priority");
		static CREATED_TIME = new Field("Created_Time");
		static COMMENTS = new Field("Comments");
		static PRODUCT_NAME = new Field("Product_Name");
		static ADD_COMMENT = new Field("Add_Comment");
		static CASE_ORIGIN = new Field("Case_Origin");
		static SUBJECT = new Field("Subject");
		static CASE_REASON = new Field("Case_Reason");
		static TYPE = new Field("Type");
		static IS_RECORD_DUPLICATE = new Field("Is_Record_Duplicate");
		static TAG = new Field("Tag");
		static CREATED_BY = new Field("Created_By");
		static RELATED_TO = new Field("Related_To");
	}

	static Notes = class {
		static OWNER = new Field("Owner");
		static MODIFIED_BY = new Field("Modified_By");
		static MODIFIED_TIME = new Field("Modified_Time");
		static CREATED_TIME = new Field("Created_Time");
		static PARENT_ID = new Field("Parent_Id");
		static ID = new Field("id");
		static CREATED_BY = new Field("Created_By");
		static NOTE_TITLE = new Field("Note_Title");
		static NOTE_CONTENT = new Field("Note_Content");
	}	}
module.exports = {
	MasterModel : Field,
	Field : Field
}

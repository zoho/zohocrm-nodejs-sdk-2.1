# License

    Copyright (c) 2021, ZOHO CORPORATION PRIVATE LIMITED
    All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

# ZOHO CRM NODEJS SDK 2.1 for API version 2.1

## Table Of Contents

- [Overview](#overview)
- [Registering a Zoho Client](#registering-a-zoho-client)
- [Environmental Setup](#environmental-setup)
- [Including the SDK in your project](#including-the-sdk-in-your-project)
- [Persistence](#token-persistence)
  - [DataBase Persistence](#database-persistence)
  - [File Persistence](#file-persistence)
  - [Custom Persistence](#custom-persistence)
- [Configuration](#configuration)
- [Initialization](#initializing-the-application)
- [Class Hierarchy](#class-hierarchy)
- [Responses And Exceptions](#responses-and-exceptions)
- [Multi User Support](#multi-user-support-in-the-nodejs-sdk)
- [Sample Code](#sdk-sample-code)

## Overview

Zoho CRM NodeJS SDK offers a way to create client NodeJS applications that can be integrated with Zoho CRM.

## Registering a Zoho Client

Since Zoho CRM APIs are authenticated with OAuth2 standards, you should register your client app with Zoho. To register your app:

- Visit this page [https://api-console.zoho.com/](https://api-console.zoho.com)

- Click `ADD CLIENT`.

- Choose the `Client Type`.

- Enter **Client Name**, **Client Domain** or **Homepage URL** and **Authorized Redirect URIs** then click `CREATE`.

- Your Client app will be created.

- Select the created OAuth client.

- Generate grant token by providing the necessary scopes, time duration (the duration for which the generated token is valid) and Scope Description.

## Environmental Setup

NodeJS SDK is installable through **npm**. **npm** is a tool for dependency management in NodeJS. SDK expects the following from the client app.

- Client app must have Node(version 14.21.3 and above)

- NodeJS SDK must be installed into client app through **npm**.

## Including the SDK in your project

You can include the SDK to your project using:

- Install **Node** from [nodejs.org](https://nodejs.org/en/download/) (if not installed).

- Install **NodeJS SDK**

  - Navigate to the workspace of your client app.
  - Run the command below:

  ```sh
  npm install @zohocrm/nodejs-sdk-2.1
  ```

- The NodeJS SDK will be installed and a package named **@zohocrm/nodejs-sdk-2.1** will be created in the local machine.

- include the field - "type" = "module"; in your package.json file to make use of ES modules.

- Another method to install the SDK
  - Add dependencies to the package.json of the node server with the latest version (recommended)
  - Run **npm install** in the directory which installs all the dependencies mentioned in package.json.

## Token Persistence

Token persistence refers to storing and utilizing the authentication tokens that are provided by Zoho. Token persistence enables the SDK to automatically refresh the access token after initialization using the refresh token without the need for user intervention. There are three ways provided by the SDK in which persistence can be utilized. They are File Persistence, DataBase Persistence, and Custom Persistence.Please note that the default method of token persistence provided by the Zoho CRM SDK is File persistence

### Table of Contents

- [DataBase Persistence](#database-persistence)

- [File Persistence](#file-persistence)

- [Custom Persistence](#custom-persistence)

### Implementing OAuth Persistence

Once the application is authorized, OAuth access and refresh tokens can be used for subsequent user data requests to Zoho CRM. Hence, they need to be persisted by the client app.

The persistence is achieved by writing an implementation of the inbuilt **TokenStore interface**, which has the following callback methods.

- **getToken(user, token)** - invoked before firing a request to fetch the saved tokens. This method should return implementation **Token Class** object for the library to process it.

- **saveToken(user, token)** - invoked after fetching access and refresh tokens from Zoho.

- **deleteToken(token)** - invoked before saving the latest tokens.

- **getTokens()** - The method to retrieve all the stored tokens.

- **deleteTokens()** - The method to delete all the stored tokens.

- **getTokenById(id, token)** - This method is used to retrieve the user token details based on unique ID.

Note:

- id is a string.

- user is an instance of **UserSignature**.

- token is an instance of **Token** interface.

### DataBase Persistence

Database persistence is a technique that involves storing and retrieving data from a database. In case the user prefers to use default DataBase persistence, **MySQL** can be used.

- The database name should be **zohooauth**.

- There must be a table named **oauthtoken** with the following columns.

  - id varchar(255)

  - user_mail varchar(255)

  - client_id varchar(255)

  - client_secret varchar(255)

  - refresh_token varchar(255)

  - access_token varchar(255)

  - grant_token varchar(255)

  - expiry_time varchar(20)

  - redirect_url varchar(255)

Note:

- Custom database name and table name can be set in DBStore instance

#### MySQL Query

```sql
CREATE TABLE oauthtoken (
  id varchar(255) NOT NULL,
  user_mail varchar(255) NOT NULL,
  client_id varchar(255),
  client_secret varchar(255),
  refresh_token varchar(255),
  access_token varchar(255),
  grant_token varchar(255),
  expiry_time varchar(20),
  redirect_url varchar(255),
  primary key (id)
);
```

#### Create DBStore object

```js
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1"
/*
 * DBStore takes the following parameters
 * host -> DataBase host name. Default value "localhost"
 * databaseName -> DataBase name. Default  value "zohooauth"
 * userName -> DataBase user name. Default value "root"
 * password -> DataBase password. Default value ""
 * portNumber -> DataBase port number. Default value "3306"
 * tableName -> Table Name. Default value "oauthtoken"
 */

let tokenstore = new ZOHOCRMSDK.DBBuilder()
  .host("hostName")
  .databaseName("databaseName")
  .userName("userName")
  .portNumber("portNumber")
  .tableName("tableName")
  .password("password")
  .build();
```

### File Persistence

In case of default File Persistence, the user can persist tokens in the local drive, by providing the the absolute file path to the FileStore object.

- The File contains

  - id

  - user_mail

  - client_id

  - client_secret

  - refresh_token

  - access_token

  - grant_token

  - expiry_time

  - redirect_url

#### Create FileStore object

```js
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
/*
 * FileStore takes the following parameter
 * 1 -> Absolute file path of the file to persist tokens
 */
let tokenstore = new ZOHOCRMSDK.FileStore(
  "/Users/username/Documents/nodejs_sdk_tokens.txt"
);
```

### Custom Persistence

Users can create their own logic for storing and retrieving authentication tokens using the custom persistence technique.To use Custom Persistence, the user must extend **[TokenStore Class](models/authenticator/store/token_store.js)** and override the methods.

```js
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";

class CustomStore extends ZOHOCRMSDK.TokenStore {
  constructor() {
    super();
  }

  /**
   *
   * @param {UserSignature} user A UserSignature class instance.
   * @param {Token} token A Token (@zohocrm/nodejs-sdk-2.1/models/authenticator/oauth_token) class instance.
   * @returns A Token class instance representing the user token details.
   * @throws {SDKException} if any error occurs.
   */
  getToken(user, token) {
    // Add code to get the token
    return null;
  }

  /**
   *
   * @param {UserSignature} user A UserSignature class instance.
   * @param {Token} token A Token (@zohocrm/nodejs-sdk-2.1/models/authenticator/oauth_token) class instance.
   * @throws {SDKException} if any error occurs.
   */
  saveToken(user, token) {
    // Add code to save the token
  }

  /**
   *
   * @param {Token} token A Token (@zohocrm/nodejs-sdk-2.1/models/authenticator/oauth_token) class instance.
   * @throws {SDKException} if any error occurs.
   */
  deleteToken(token) {
    // Add code to delete the token
  }

  /**
   * @returns {Array} - An array of Token class instances
   * @throws {SDKException}
   */
  getTokens() {
    //Add code to retrieve all the stored tokens.
  }

  /**
   * @throws {SDKException}
   */
  deleteTokens() {
    //Add code to delete all the stored tokens.
  }

  /**
   * @param {String} id A string.
   * @param {Token} token A Token (com\zoho\api\authenticator\OAuthToken) class instance.
   * @return {Token} A Token class instance representing the user token details.
   * @throws {SDKException} if any problem occurs.
   */
  getTokenById(id, token) {
    // Add code to get the token using unique id
    return null;
  }
}

export { CustomStore as CustomStore };
```

## Configuration

Before you get started with creating your NodeJS application, you need to register your client and authenticate the app with Zoho.

| Mandatory Keys | Optional Keys |
| :------------- | :------------ |
| user           | logger        |
| environment    | store         |
| token          | SDKConfig     |
|                | requestProxy  |
|                | resourcePath  |

---
The **user** key will be used to store and identify the **tokenstore** details in the DB or File Storage for token persistence. The **environment** key contains the domain information to make API calls. The **token** key represents the OAuth info, including the clientID, clientSecret, grantToken, redirectURL, refreshToken or accessToken depending on the flow that you use. Refer to ##create an instance of OAuthToken## for more details.
- Create an instance of **UserSignature** Class that identifies the current user.

  ```js
  import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
  //Create an UserSignature instance that takes user Email as parameter
  let user = new ZOHOCRMSDK.UserSignature("abc@zoho.com");
  ```

- Configure API environment which decides the domain and the URL to make API calls.

  ```js
  import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
  /*
   * Configure the environment
   * which is of the pattern Domain.Environment
   * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
   * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
   */
  let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
  ```

- Create an instance of **[OAuthToken](models/authenticator/oauth_token.js)** with the information that you get after registering your Zoho client.In the context of token persistence, the grant token flow and refresh token flow involve storing and persisting the token. However, the access token flow does not involve token persistence and the access token is directly utilized for API calls. Depending on the tokens available with you, choose grantToken flow, refreshToken flow or accessToken flow.

  - Use the following method for **grantToken flow:**
  ```js
   let token = (new ZOHOCRMSDK.OAuthBuilder())
    .clientId("clientId")
    .clientSecret("clientSecret")
    .grantToken("grantToken")
    .redirectURL("redirectURL")
    .build();
  ```
  - Use the following method for **refreshToken flow:**
  ```js
  let token = (new ZOHOCRMSDK.OAuthBuilder())
    .clientId("clientId")
    .clientSecret("clientSecret")
    .refreshToken("refreshToken")
    .redirectURL("redirectURL")
    .build();
  ```
  - Use the following method for **accessToken flow:**
  ```js
  let token = (new ZOHOCRMSDK.OAuthBuilder())
  .accessToken("accessToken")
  .build();
  ```

- Create an instance of **Logger** Class to log exception and API information. By default, the SDK constructs a Logger instance with level - INFO and file_path - (sdk_logs.log parallel to node_modules)

  ```js
  import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
  /*
   * Create an instance of Logger Class that requires the following
   * level -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
   * filePath -> Absolute file path, where messages need to be logged.
   */
  let logger = new ZOHOCRMSDK.LogBuilder()
    .level(ZOHOCRMSDK.Levels.INFO)
    .filePath("/Users/Documents/final-logs.txt")
    .build();
  ```

- Create an instance of **TokenStore** to persist tokens, used for authenticating all the requests. By default, the SDK creates the sdk_tokens.txt file (parallel to node_modules folder) to persist the tokens.

  - Use the following method for DBStore
  ```js
  /*
   * Create an instance of DBStore that requires the following
   * host -> DataBase host name. Default value "localhost"
   * databaseName -> DataBase name. Default  value "zohooauth"
   * userName -> DataBase user name. Default value "root"
   * password -> DataBase password. Default value ""
   * portNumber -> DataBase port number. Default value "3306"
   * tabletName -> DataBase table name. Default value "oauthtoken"
   */

  let tokenstore = new ZOHOCRMSDK.DBBuilder()
    .host("hostName")
    .databaseName("databaseName")
    .userName("userName")
    .portNumber("portNumber")
    .tableName("tableName")
    .password("password")
    .build();
  ```
  - Use the following method for FileStore
  ```js
  let tokenstore = new ZOHOCRMSDK.FileStore("absolute_file_path");
  ```
  - Use the following method for Custom Store
  ```js
  let tokenstore = new CustomStore();
  ```

- Create an instance of **SDKConfig** containing the SDK configuration.

  ```js
  import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";

  /*
   * By default, the SDK creates the SDKConfig instance
   * autoRefreshFields (default value is false)
   * if true - all the modules' fields will be auto-refreshed in the background, every hour.
   * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(utils/util/module_fields_handler.js)
   *
   * pickListValidation
   * A boolean field that validates user input for a pick list field and allows or disallows the addition of a new value to the list.
   * if true - the SDK validates the input. If the value does not exist in the pick list, the SDK throws an error.
   * if false - the SDK does not validate the input and makes the API request with the user’s input to the pick list
   */
  let sdkConfig = new ZOHOCRMSDK.SDKConfigBuilder()
    .pickListValidation(false)
    .autoRefreshFields(true)
    .build();
  ```

- Create an instance of **[RequestProxy](routes/request_proxy.js)** containing the proxy properties of the user.

  ```js
  import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";

  /*
   * RequestProxy class takes the following parameters
   * host -> Host
   * port -> Port Number
   * user -> User Name. Default null.
   * password -> Password. Default null
   */
  let requestProxy = new ZOHOCRMSDK.ProxyBuilder()
    .host("proxyHost")
    .port("proxyPort")
    .user("proxyUser")
    .password("password")
    .build();
  ```

- The path containing the absolute directory path to store user specific files containing module fields information. By default, the SDK stores the user-specific files in a folder parallel to node_modules

  ```js
  let resourcePath = "/Users/user_name/Documents/nodejs-app";
  ```

## Initializing the Application

Initialize the SDK using the following code.

```js
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";

class Initializer {
  static async initialize() {
    /*
     * Create an instance of Logger Class that requires the following
     * level -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
     * filePath -> Absolute file path, where messages need to be logged.
     */
    let logger = new ZOHOCRMSDK.LogBuilder()
      .level(ZOHOCRMSDK.Levels.INFO)
      .filePath("/Users/user_name/Documents/nodejs_sdk_log.log")
      .build();
    /*
     * Create an UserSignature instance that takes user Email as parameter
     */
    let user = new ZOHOCRMSDK.UserSignature("abc@zoho.com");

    /*
     * Configure the environment
     * which is of the pattern Domain.Environment
     * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
     * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
     */
    let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();

    /*
     * Create a Token instance
     * clientId -> OAuth client id.
     * clientSecret -> OAuth client secret.
     * grantToken -> GRANT token.
     * redirectURL -> OAuth redirect URL. Default value is null
     */
    let token = new ZOHOCRMSDK.OAuthBuilder()
      .clientId("clientId")
      .clientSecret("clientSecret")
      .grantToken("GRANT Token")
      .redirectURL("redirectURL")
      .build();

    /*
     * TokenStore can be any of the following
     * DB Persistence - Create an instance of DBStore
     * File Persistence - Create an instance of FileStore
     * Custom Persistence - Create an instance of CustomStore
     */

    /*
     * Create an instance of DBStore.
     * host -> DataBase host name. Default "localhost"
     * databaseName -> DataBase name. Default "zohooauth"
     * userName -> DataBase user name. Default "root"
     * password -> DataBase password. Default ""
     * portNumber -> DataBase port number. Default "3306"
     * tableName -> DataBase table name. Default value "oauthtoken"
     */

    // let tokenstore = new DBBuilder().build();

    let tokenstore = new ZOHOCRMSDK.DBBuilder()
      .host("hostName")
      .databaseName("databaseName")
      .userName("userName")
      .portNumber("portNumber")
      .tableName("tableName")
      .password("password")
      .build();
    /*
     * Create an instance of FileStore that takes absolute file path as parameter
     */
    // let tokenstore = new FileStore("/Users/username/Documents/nodejs_sdk_tokens.txt");

    // let tokenstore = new CustomStore();

    /*
     * autoRefreshFields
     * if true - all the modules' fields will be auto-refreshed in the background, every hour.
     * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(utils/util/module_fields_handler.js)
     *
     * pickListValidation
     * A boolean field that validates user input for a pick list field and allows or disallows the addition of a new value to the list.
     * if true - the SDK validates the input. If the value does not exist in the pick list, the SDK throws an error.
     * if false - the SDK does not validate the input and makes the API request with the user’s input to the pick list
     */
    let sdkConfig = new ZOHOCRMSDK.SDKConfigBuilder()
      .pickListValidation(false)
      .autoRefreshFields(true)
      .build();

    /*
     * The path containing the absolute directory path to store user specific JSON files containing module fields information.
     */
    let resourcePath = "/Users/user_name/Documents/nodejssdk-application";

    /*
     * Create an instance of RequestProxy class that takes the following parameters
     * host -> Host
     * port -> Port Number
     * user -> User Name
     * password -> Password
     */
    let requestProxy = new ZOHOCRMSDK.ProxyBuilder()
      .host("proxyHost")
      .port("proxyPort")
      .user("proxyUser")
      .password("password")
      .build();

    /*
     * Set the following in InitializeBuilder
     * user -> UserSignature instance
     * environment -> Environment instance
     * token -> Token instance
     * store -> TokenStore instance
     * SDKConfig -> SDKConfig instance
     * resourcePath -> resourcePath
     * logger -> Logger instance. Default value is null
     * requestProxy -> RequestProxy instance. Default value is null
     */
    // The SDK can be initialized by any of the following methods
    (await new ZOHOCRMSDK.InitializeBuilder())
      .user(user)
      .environment(environment)
      .token(token)
      .store(tokenstore)
      .SDKConfig(sdkConfig)
      .resourcePath(resourcePath)
      .logger(logger)
      .requestProxy(requestProxy)
      .initialize()
      .catch((err) => {
        console.log(err);
      });
  }
}

Initializer.initialize();
```

- You can now access the functionalities of the SDK. Refer to the sample codes to make various API calls through the SDK.

## Class Hierarchy

![classdiagram](class_hierarchy.png)

## Responses and Exceptions

All SDK method calls return an instance of **[APIResponse](routes/controllers/api_response.js)**.

After a successful API request, the **getObject()** method returns an instance of the ResponseWrapper (for **GET**) or the ActionWrapper (for **POST, PUT, DELETE**).

Whenever the API returns an error response, the **getObject()** returns an instance of **APIException** class.

**ResponseWrapper** (for **GET** requests) and ActionWrapper (for **POST, PUT, DELETE** requests) are the expected objects for Zoho CRM APIs’ responses

However, some specific operations have different expected objects, such as the following

- Operations involving records in Tags

  - **RecordActionWrapper**

- Getting Record Count for a specific Tag operation

  - **CountWrapper**

- Operations involving BaseCurrency

  - **BaseCurrencyActionWrapper**

- Lead convert operation

  - **ConvertActionWrapper**

- Retrieving Deleted records operation

  - **DeletedRecordsWrapper**

- Record image download operation

  - **FileBodyWrapper**

- MassUpdate record operations

  - **MassUpdateActionWrapper**
  - **MassUpdateResponseWrapper**

- For Transfer Pipeline operation
  - **APIResponse&lt;TransferActionHandler&gt;**

### GET Requests

- The **getObject()** returns instance of one of the following classes, based on the return type.

  - For **application/json** responses

    - **ResponseWrapper**
    - **CountWrapper**
    - **DeletedRecordsWrapper**
    - **MassUpdateResponseWrapper**
    - **APIException**

  - For **file download** responses
    - **FileBodyWrapper**
    - **APIException**

### POST, PUT, DELETE Requests

- The **getObject()** returns instance of one of the following classes

  - **ActionWrapper**
  - **RecordActionWrapper**
  - **BaseCurrencyActionWrapper**
  - **MassUpdateActionWrapper**
  - **ConvertActionWrapper**
  - **APIException**
  - **TransferActionWrapper**

- These wrapper classes may contain one or an array of instances of the following classes, depending on the response
  - **SuccessResponse Class**, if the request was successful.
  - **APIException Class**, if the request was erroneous.

For example, when you insert two records, and one of them was inserted successfully while the other one failed, the ActionWrapper will contain one instance each of the SuccessResponse and APIException classes.

All other exceptions such as SDK anomalies and other unexpected behaviours are thrown under the **[SDKException](core/com/zoho/crm/api/exception/sdk_exception.js)** class.

## Multi-User support in the NodeJS SDK

The **NodeJS SDK** (version 2.x.x) supports both single-user and multi-user app.

### Multi-user App

In the NodeJS SDK, multi-user functionality is achieved using the **switchUser()**method. To use this method, you need to provide the user, environment, token, and SDK configuration details.

Please note that only one user can send requests at a time. If another user need to send requests, the **switchUser()** method must be used prior to sending the requests.
```js
//If proxy needs to be configured for the User
(await new ZOHOCRMSDK.InitializeBuilder())
  .user(user)
  .environment(environment)
  .token(token)
  .SDKConfig(sdkConfig)
  .switchUser()
  .catch((err) => {
    console.log(err);
  });
```

To Remove a user's configuration in SDK. Use the below code

```js
await ZOHOCRMSDK.Initializer.removeUserConfiguration(user, environment).catch((err) => {
  console.log(err);
});
```

### Sample Multi-user code

```js
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";

class Record {
  static async call() {

    let user1 = new ZOHOCRMSDK.UserSignature("abc@zoho.com");

    let environment1 = ZOHOCRMSDK.USDataCenter.PRODUCTION();

    let token1 = new ZOHOCRMSDK.OAuthBuilder()
      .clientId("clientId")
      .clientSecret("clientSecret")
      // .grantToken("grantToken")
      .refreshToken("refreshToken")
      .redirectURL("redirectURL")
      .build();
    (await new ZOHOCRMSDK.InitializeBuilder())
      .user(user1)
      .environment(environment1)
      .token(token1)
      .store(tokenstore)
      .initialize()
      .catch((err) => {
        console.log(err);
      });

    await Record.getRecords("Leads").catch((err) => {
      console.log(err);
    });

    await ZOHOCRMSDK.Initializer.removeUserConfiguration(user1, environment1).catch(
      (err) => {
        console.log(err);
      }
    );
    let user2 = new ZOHOCRMSDK.UserSignature("abc2@zoho.eu");

    let environment2 = ZOHOCRMSDK.EUDataCenter.SANDBOX();

    let token2 = new ZOHOCRMSDK.OAuthBuilder()
      .clientId("clientId")
      .clientSecret("clientSecret")
      .grantToken("GRANT Token")
      .refreshToken("REFRESH Token")
      .redirectURL("redirectURL")
      .build();
    (await new ZOHOCRMSDK.InitializeBuilder())
      .user(user2)
      .environment(environment2)
      .token(token2)
      .switchUser()
      .catch((err) => {
        console.log(err);
      });

    await Record.getRecords("Leads").catch((err) => {
      console.log(err);
    });
  }

  static async getRecords(moduleAPIName) {
    try {
      let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
      let paramInstance = new ZOHOCRMSDK.ParameterMap();
      await paramInstance.add(ZOHOCRMSDK.Records.GetRecordsParam.APPROVED, "both");
      let headerInstance = new ZOHOCRMSDK.HeaderMap();
      await headerInstance.add(
        ZOHOCRMSDK.Records.GetRecordsHeader.IF_MODIFIED_SINCE,
        new Date("2020-01-01T00:00:00+05:30")
      );
      let response = await recordOperations.getRecords(
        moduleAPIName,
        paramInstance,
        headerInstance
      );
      if (response != null) {
        console.log("Status Code: " + response.getStatusCode());
        if ([204, 304].includes(response.getStatusCode())) {
          console.log(
            response.getStatusCode() == 204 ? "No Content" : "Not Modified"
          );
          return;
        }
        let responseObject = response.getObject();

        if (responseObject != null) {
          if (responseObject instanceof ZOHOCRMSDK.Records.ResponseWrapper) {
            let records = responseObject.getData();

            for (let index = 0; index < records.length; index++) {
              let record = records[index];
              console.log("Record ID: " + record.getId());
              let createdBy = record.getCreatedBy();
              if (createdBy != null) {
                console.log("Record Created By User-ID: " + createdBy.getId());
                console.log(
                  "Record Created By User-Name: " + createdBy.getName()
                );
                console.log(
                  "Record Created By User-Email: " + createdBy.getEmail()
                );
              }
              console.log("Record CreatedTime: " + record.getCreatedTime());
              let modifiedBy = record.getModifiedBy();
              if (modifiedBy != null) {
                console.log(
                  "Record Modified By User-ID: " + modifiedBy.getId()
                );
                console.log(
                  "Record Modified By User-Name: " + modifiedBy.getName()
                );
                console.log(
                  "Record Modified By User-Email: " + modifiedBy.getEmail()
                );
              }
              console.log("Record ModifiedTime: " + record.getModifiedTime());
              let tags = record.getTag();
              if (tags != null) {
                tags.forEach((tag) => {
                  console.log("Record Tag Name: " + tag.getName());
                  console.log("Record Tag ID: " + tag.getId());
                });
              }
              let keyValues = record.getKeyValues();

              let keyArray = Array.from(keyValues.keys());

              for (let keyIndex = 0; keyIndex < keyArray.length; keyIndex++) {
                const keyName = keyArray[keyIndex];

                let value = keyValues.get(keyName);

                console.log(keyName + " : " + value);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

Record.call();
```

- The program execution starts from call().

- The details of **"user1"** are is given in the variables user1, token1, environment1.

- Similarly, the details of another user **"user2"** is given in the variables user2, token2, environment2.

- The **switchUser()** function is used to switch between the **"user1"** and **"user2"** as required.

- Based on the latest switched user, the **Record.getRecords(moduleAPIName)** will fetch records.

## SDK Sample code

```js
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";

class CreateRecords {

  static async initialize() {

    let user = new ZOHOCRMSDK.UserSignature('myname@mydomain.com');
    let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
    let token = (new ZOHOCRMSDK.OAuthBuilder())
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
  static async createRecords(moduleAPIName) {
    //example
    //let moduleAPIName = "module_api_name";
    let recordOperations = new ZOHOCRMSDK.Records.RecordOperations();
    let request = new ZOHOCRMSDK.Records.BodyWrapper();
    let recordsArray = [];
    let record = new ZOHOCRMSDK.Records.Record();
    let applyFeatureExecution = new ZOHOCRMSDK.Records.ApplyFeatureExecution();
    let apply_feature_list = [];
    applyFeatureExecution.setName("layout_rules");
    apply_feature_list.push(applyFeatureExecution);
    request.setApplyFeatureExecution(apply_feature_list);

    record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.LAST_NAME, "Node JS SDK");
    record.addFieldValue(ZOHOCRMSDK.Records.Field.Leads.FIRST_NAME, "Node");
    recordsArray.push(record);
    request.setData(recordsArray);
    let headerInstance = new ZOHOCRMSDK.HeaderMap();
    let response = await recordOperations.createRecords(moduleAPIName, request, headerInstance);
    if (response != null) {
      console.log("Status Code: " + response.getStatusCode());
      let responseObject = response.getObject();
      if (responseObject != null) {
        if (responseObject instanceof ZOHOCRMSDK.Records.ActionWrapper) {
          let actionResponses = responseObject.getData();
          actionResponses.forEach(actionResponse => {
            if (actionResponse instanceof ZOHOCRMSDK.Records.SuccessResponse) {
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
            } else if (actionResponse instanceof ZOHOCRMSDK.Records.APIException) {
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
          });
        }
      }
    }
  }
  }
await CreateRecords.initialize();
let moduleAPIName = "leads";
await CreateRecords.createRecords(moduleAPIName);
```

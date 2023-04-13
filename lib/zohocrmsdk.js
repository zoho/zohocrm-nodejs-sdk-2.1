// core file
import * as AssignmentRules from "./core/com/zoho/crm/api/assignment_rules/assignment_rules.js";
import * as Attachments from "./core/com/zoho/crm/api/attachments/attachments.js";
import * as BluePrints from "./core/com/zoho/crm/api/blue_print/blue_prints.js";
import * as BulkRead from "./core/com/zoho/crm/api/bulk_read/bulk_reads.js";
import * as BulkWrite from "./core/com/zoho/crm/api/bulk_write/bulk_writes.js";
import * as CancelMeeting from "./core/com/zoho/crm/api/cancel_meetings/cancel_meetings.js";
import * as ContactRoles from "./core/com/zoho/crm/api/contact_roles/contact_roles.js";
import * as Currencies from "./core/com/zoho/crm/api/currencies/currencies.js";
import * as CustomViews from "./core/com/zoho/crm/api/custom_views/custom_views.js";
import * as EmailTemplates from "./core/com/zoho/crm/api/email_templates/email_templates.js";
import * as FieldAttachments from "./core/com/zoho/crm/api/field_attachments/field_attachments.js";
import * as Fields from "./core/com/zoho/crm/api/fields/fields.js";
import * as File from "./core/com/zoho/crm/api/file/files.js";
import * as InventoryTemplates from "./core/com/zoho/crm/api/inventory_templates/inventory_templates.js";
import * as Layouts from "./core/com/zoho/crm/api/layouts/layouts.js";
import * as Modules from "./core/com/zoho/crm/api/modules/modules.js";
import * as Notes from "./core/com/zoho/crm/api/notes/notes.js";
import * as Notifications from "./core/com/zoho/crm/api/notification/notifications.js";
import * as Orgs from "./core/com/zoho/crm/api/org/orgs.js";
import * as Pipelines from "./core/com/zoho/crm/api/pipeline/pipelines.js";
import * as Profiles from "./core/com/zoho/crm/api/profiles/profiles.js";
import * as Query from "./core/com/zoho/crm/api/query/querys.js";
import * as Records from "./core/com/zoho/crm/api/record/records.js";
import * as RelatedLists from "./core/com/zoho/crm/api/related_lists/related_lists.js";
import * as RelatedRecords from "./core/com/zoho/crm/api/related_records/related_records.js";
import * as Roles from "./core/com/zoho/crm/api/roles/roles.js";
import * as SendMail from "./core/com/zoho/crm/api/send_mail/send_mails.js";
import * as ShareRecords from "./core/com/zoho/crm/api/share_records/share_records.js";
import * as Tags from "./core/com/zoho/crm/api/tags/tags.js";
import * as Taxes from "./core/com/zoho/crm/api/taxes/taxes.js";
import * as Territories from "./core/com/zoho/crm/api/territories/territories.js";
import * as Users from "./core/com/zoho/crm/api/users/users.js";
import * as VariableGroups from "./core/com/zoho/crm/api/variable_groups/variable_groups.js";
import * as Variables from "./core/com/zoho/crm/api/variables/variables.js";
import * as Wizards from "./core/com/zoho/crm/api/wizards/wizards.js";

// exception
import { SDKException } from "./core/com/zoho/crm/api/exception/sdk_exception.js";

// token store
import { DBBuilder } from "./models/authenticator/store/db_builder.js";
import { DBStore } from "./models/authenticator/store/db_store.js";
import { FileStore } from "./models/authenticator/store/file_store.js";
import * as TokenStore from "./models/authenticator/store/token_store.js";

// authenticator
import { OAuthBuilder } from "./models/authenticator/oauth_builder.js";
import { OAuthToken } from "./models/authenticator/oauth_token.js";
import * as Token from "./models/authenticator/token.js";

// controllers
import { APIHTTPConnector } from "./routes/controllers/api_http_connector.js";
import { APIResponse } from "./routes/controllers/api_response.js";

//dc
import { AUDataCenter } from "./routes/dc/au_data_center.js";
import { CNDataCenter } from "./routes/dc/cn_data_center.js";
import { DataCenter } from "./routes/dc/data_center.js";
import { Environment } from "./routes/dc/environment.js";
import { EUDataCenter } from "./routes/dc/eu_data_center.js";
import { INDataCenter } from "./routes/dc/in_data_center.js";
import { USDataCenter } from "./routes/dc/us_data_center.js";
import { JPDataCenter } from "./routes/dc/jp_data_center.js";

// logger
import { LogBuilder } from "./routes/logger/log_builder.js";
import { Logger } from "./routes/logger/logger.js";
import { Levels } from "./routes/logger/logger.js";
import { SDKLogger } from "./routes/logger/sdk_logger.js";

// middlewares
import { CommonAPIHandler } from "./routes/middlewares/common_api_handler.js";

// root files
import { HeaderMap } from "./routes/header_map.js";
import { Header } from "./routes/header.js";
import { InitializeBuilder } from "./routes/initialize_builder.js";
import { Initializer } from "./routes/initializer.js";
import { Param } from "./routes/param.js";
import { ParameterMap } from "./routes/parameter_map.js";
import { ProxyBuilder } from "./routes/proxy_builder.js";
import { RequestProxy } from "./routes/request_proxy.js";
import { SDKConfigBuilder } from "./routes/sdk_config_builder.js";
import { SDKConfig } from "./routes/sdk_config.js";
import { UserSignature } from "./routes/user_signature.js";

//util files
import { Choice } from "./utils/util/choice.js";
import { Constants } from "./utils/util/constants.js";
import { Converter } from "./utils/util/converter.js";
import { DatatypeConverter } from "./utils/util/datatype_converter.js";
import { Downloader } from "./utils/util/downloader.js";
import { FormDataConverter } from "./utils/util/form_data_converter.js";
import { HeaderParamValidator } from "./utils/util/header_param_validator.js";
import { JSONConverter } from "./utils/util/json_converter.js";
import { ModuleFieldsHandler } from "./utils/util/module_fields_handler.js";
import { StreamWrapper } from "./utils/util/stream_wrapper.js";
import { Utility } from "./utils/util/utility.js";
import { XMLConverter } from "./utils/util/xml_converter.js";
class zohocrmsdk {
  AssignmentRules;
  Attachments;
  BluePrints;
  BulkRead;
  BulkWrite;
  CancelMeeting;
  Currencies;
  CustomViews;
  EmailTemplates;
  FieldAttachments;
  Fields;
  File;
  InventoryTemplates;
  Layouts;
  Modules;
  Notes;
  Notifications;
  Orgs;
  Pipelines;
  Profiles;
  Query;
  Records;
  RelatedLists;
  RelatedRecords;
  Roles;
  SendMail;
  ShareRecords;
  Tags;
  Taxes;
  Territories;
  Users;
  VariableGroups;
  Variables;
  Wizards;

  SDKException;

  DBBuilder;
  DBStore;
  FileStore;
  TokenStore;

  OAuthBuilder;
  OAuthToken;
  Token;

  APIHTTPConnector;
  APIResponse;

  AUDataCenter;
  CNDataCenter;
  DataCenter;
  Environment;
  EUDataCenter;
  INDataCenter;
  USDataCenter;
  JPDataCenter;

  LogBuilder;
  Logger;
  Levels;
  SDKLogger;

  CommonAPIHandler;

  HeaderMap;
  Header;
  InitializeBuilder;
  Initializer;
  Param;
  ParameterMap;
  ProxyBuilder;
  RequestProxy;
  SDKConfigBuilder;
  SDKConfig;
  UserSignature;

  Choice;
  Constants;
  Converter;
  DataTypeConverter;
  Downloader;
  FormDataConverter;
  HeaderParamValidator;
  JSONConverter;
  ModuleFieldsHandler;
  StreamWrapper;
  Utility;
  XMLConverter;

  constructor() {
    this.AssignmentRules = AssignmentRules;
    this.Attachments = Attachments;
    this.BluePrints = BluePrints;
    this.BulkRead = BulkRead;
    this.BulkWrite = BulkWrite;
    this.CancelMeeting = CancelMeeting;
    this.ContactRoles = ContactRoles;
    this.Currencies = Currencies;
    this.CustomViews = CustomViews;
    this.EmailTemplates = EmailTemplates;
    this.FieldAttachments = FieldAttachments;
    this.Fields = Fields;
    this.File = File;
    this.InventoryTemplates = InventoryTemplates;
    this.Layouts = Layouts;
    this.Modules = Modules;
    this.Notes = Notes;
    this.Notifications = Notifications;
    this.Orgs = Orgs;
    this.Pipelines = Pipelines;
    this.Profiles = Profiles;
    this.Query = Query;
    this.Records = Records;
    this.RelatedLists = RelatedLists;
    this.RelatedRecords = RelatedRecords;
    this.Roles = Roles;
    this.SendMail = SendMail;
    this.ShareRecords = ShareRecords;
    this.Tags = Tags;
    this.Taxes = Taxes;
    this.Territories = Territories;
    this.Users = Users;
    this.VariableGroups = VariableGroups;
    this.Variables = Variables;
    this.Wizards = Wizards;

    this.SDKException = SDKException;

    this.DBBuilder = DBBuilder;
    this.DBStore = DBStore;
    this.FileStore = FileStore;
    this.TokenStore = TokenStore;

    this.OAuthBuilder = OAuthBuilder;
    this.OAuthToken = OAuthToken;
    this.Token = Token;

    this.APIHTTPConnector = APIHTTPConnector;
    this.APIResponse = APIResponse;

    this.AUDataCenter = AUDataCenter;
    this.CNDataCenter = CNDataCenter;
    this.DataCenter = DataCenter;
    this.Environment = Environment;
    this.EUDataCenter = EUDataCenter;
    this.INDataCenter = INDataCenter;
    this.USDataCenter = USDataCenter;
    this.JPDataCenter = JPDataCenter;

    this.LogBuilder = LogBuilder;
    this.Logger = Logger;
    this.Levels = Levels;
    this.SDKLogger = SDKLogger;

    this.CommonAPIHandler = CommonAPIHandler;

    this.HeaderMap = HeaderMap;
    this.Header = Header;
    this.InitializeBuilder = InitializeBuilder;
    this.Initializer = Initializer;
    this.Param = Param;
    this.ParameterMap = ParameterMap;
    this.ProxyBuilder = ProxyBuilder;
    this.RequestProxy = RequestProxy;
    this.SDKConfigBuilder = SDKConfigBuilder;
    this.SDKConfig = SDKConfig;
    this.UserSignature = UserSignature;

    this.Choice = Choice;
    this.Constants = Constants;
    this.Converter = Converter;
    this.DataTypeConverter = DatatypeConverter;
    this.Downloader = Downloader;
    this.FormDataConverter = FormDataConverter;
    this.HeaderParamValidator = HeaderParamValidator;
    this.JSONConverter = JSONConverter;
    this.ModuleFieldsHandler = ModuleFieldsHandler;
    this.StreamWrapper = StreamWrapper;
    this.Utility = Utility;
    this.XMLConverter = XMLConverter;
  }
}
//
export default zohocrmsdk;
//
export {
  AssignmentRules,
  Attachments,
  BluePrints,
  BulkRead,
  BulkWrite,
  CancelMeeting,
  ContactRoles,
  Currencies,
  CustomViews,
  EmailTemplates,
  FieldAttachments,
  Fields,
  File,
  InventoryTemplates,
  Layouts,
  Modules,
  Notes,
  Notifications,
  Orgs,
  Pipelines,
  Profiles,
  Query,
  Records,
  RelatedLists,
  RelatedRecords,
  Roles,
  SendMail,
  ShareRecords,
  Tags,
  Taxes,
  Territories,
  Users,
  VariableGroups,
  Variables,
  Wizards,
  SDKException,
  DBBuilder,
  DBStore,
  FileStore,
  TokenStore,
  OAuthBuilder,
  OAuthToken,
  Token,
  APIHTTPConnector,
  APIResponse,
  AUDataCenter,
  CNDataCenter,
  DataCenter,
  Environment,
  EUDataCenter,
  INDataCenter,
  USDataCenter,
  JPDataCenter,
  LogBuilder,
  Logger,
  Levels,
  SDKLogger,
  CommonAPIHandler,
  HeaderMap,
  Header,
  InitializeBuilder,
  Initializer,
  Param,
  ParameterMap,
  ProxyBuilder,
  RequestProxy,
  SDKConfigBuilder,
  SDKConfig,
  UserSignature,
  Choice,
  Constants,
  Converter,
  DatatypeConverter,
  Downloader,
  FormDataConverter,
  HeaderParamValidator,
  JSONConverter,
  ModuleFieldsHandler,
  StreamWrapper,
  Utility,
  XMLConverter,
};

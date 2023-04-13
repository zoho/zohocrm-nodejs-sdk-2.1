import {Constants} from "../utils/util/constants.js";

import {Utility} from "../utils/util/utility.js";

import {RequestProxy} from "./request_proxy.js";

class ProxyBuilder {
    _host;

    _port;

    _user;

    _password = "";

    host(host) {
        Utility.assertNotNull(host, Constants.REQUEST_PROXY_ERROR, Constants.HOST_ERROR_MESSAGE);

        this._host = host;

        return this;
    }

    port(port) {
        Utility.assertNotNull(port, Constants.REQUEST_PROXY_ERROR, Constants.PORT_ERROR_MESSAGE);

        this._port = port;

        return this;
    }

    user(user) {
        this._user = user;

        return this;
    }

    password(password) {
        this._password = password;

        return this;
    }

    build() {
        Utility.assertNotNull(this._host, Constants.REQUEST_PROXY_ERROR, Constants.HOST_ERROR_MESSAGE);

        Utility.assertNotNull(this._port, Constants.REQUEST_PROXY_ERROR, Constants.PORT_ERROR_MESSAGE);

        return new RequestProxy(this._host, this._port, this._user, this._password);
    }
}

export {
    ProxyBuilder as ProxyBuilder,
    ProxyBuilder as MasterModel
}
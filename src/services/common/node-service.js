var common = require('../../common/common');

const CONFIG = {
    NODE_ENV: 'NODE_ENV',           // Application mode
    XG_CONFIG: 'XG_CONFIG'          // xG specific configs
};

const APP_MODE = {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    TEST: 'test'
};

module.exports = {
    getNodeEnv: function() {
        return process.env;
    },
    getNodeEnvByKey: function(key) {
        if (!key) throw new Error ('Key cannot be null/undefined');
        return this.getNodeEnv()[key];
    },
    getNodeEnvMode: function() {
        const mode = this.getNodeEnvByKey(CONFIG.NODE_ENV);
        if (common.__hasValue(mode)) {
            return mode;
        } else {
            // TODO: Set NODE_INV within Istanbul so this isn't necessary
            process.env[CONFIG.NODE_ENV] = APP_MODE.TEST;
            return process.env[CONFIG.NODE_ENV];
        }
    },
    getXgConfig: function() {
        return this.getNodeEnvByKey(CONFIG.XG_CONFIG);
    },
    hasXgConfig: function() {
        return common.__hasValue(
            this.getXgConfig()
        );
    },
    isProduction: function() {
        return this.getNodeEnvMode() === APP_MODE.PRODUCTION;
    },
    isDevelopment: function() {
        return this.getNodeEnvMode() === APP_MODE.DEVELOPMENT;
    },
    isTest: function() {
        return this.getNodeEnvMode() === APP_MODE.TEST;
    }
};

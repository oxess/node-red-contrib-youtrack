module.exports = function(RED) {
    function YouTrackServerNode(config) {
        RED.nodes.createNode(this, config);

        this.host = config.host;
        this.token = config.token;
    }

    RED.nodes.registerType("youtrack-server", YouTrackServerNode);
};

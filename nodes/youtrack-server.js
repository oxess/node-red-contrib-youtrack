module.exports = function(RED) {
    function YouTrackServerNode(config) {
        RED.nodes.createNode(this, config);

        this.host = n.host;
        this.token = n.token;
    }

    RED.nodes.registerType("youtrack-server", YouTrackServerNode);
};

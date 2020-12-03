module.exports = function(RED) {
    function IssuesSearchNode(config) {
        RED.nodes.createNode(this, config);
        var { Youtrack } = require('youtrack-rest-client');
        var node = this;

        this.server = RED.nodes.getNode(config.server);
        this.youtrack = new Youtrack({
            baseUrl: this.server.host,
            token: this.server.token
        });

        node.on('input', (msg) => {
            this.youtrack.issues.search(config.query).then(issues => {
                msg.issues = {issues};
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType("issues-search", IssuesSearchNode);
};

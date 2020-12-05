module.exports = function(RED) {
    function IssuesSearchNode(config) {
        RED.nodes.createNode(this, config);
        let { Youtrack } = require('youtrack-rest-client');

        this.server = RED.nodes.getNode(config.server);
        this.youtrack = new Youtrack({
            baseUrl: this.server.host,
            token: this.server.token
        });

        this.on('input', (msg) => {
            this.youtrack.issues.search(config.query).then(issues => {
                msg.issues = issues;
                this.send(msg);
            });
        });
    }

    RED.nodes.registerType("issues-search", IssuesSearchNode);
};

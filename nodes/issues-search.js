module.exports = function(RED) {
    function IssuesSearchNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        console.log(config.server);

        var { Youtrack } = require('youtrack-rest-client');
        var youtrack = new Youtrack({
            baseUrl: config.server.host,
            token: config.server.token
        });

        node.on('input', function(msg) {
            youtrack.issues.search(config.query).then(issues => {
                msg.issues = {issues};
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType("issues-search", IssuesSearchNode);
};

module.exports = function(RED) {
    function IssueCreateNode(config) {
        RED.nodes.createNode(this, config);
        let { Youtrack } = require('youtrack-rest-client');

        this.server = RED.nodes.getNode(config.server);
        this.youtrack = new Youtrack({
            baseUrl: this.server.host,
            token: this.server.token
        });

        this.on('input', (msg) => {
            if (!msg.hasOwnProperty('payload')) {
                this.state({ color: 'red', msg: 'Don\' payload send!' });
                return;
            }

            this.youtrack.issues.create(msg.payload).then(issue => {
                msg.issue = {issue};
                this.send(msg);
            });
        });
    }

    RED.nodes.registerType("issue-create", IssueCreateNode);
};

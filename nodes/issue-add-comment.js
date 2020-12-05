module.exports = function(RED) {
    function IssueAddCommentNode(config) {
        RED.nodes.createNode(this, config);
        let { Youtrack } = require('youtrack-rest-client');

        this.server = RED.nodes.getNode(config.server);
        this.youtrack = new Youtrack({
            baseUrl: this.server.host,
            token: this.server.token
        });

        this.on('input', (msg) => {
            if (!msg.hasOwnProperty('issueId')) {
                this.error("Node require msg.issueId");
                this.status({ fill: "red", shape: "ring", text: "Uncompleted request data"});

                return;
            }

            let issueId = msg.issueId;

            this.youtrack.comments.create(issueId, { text: msg.payload }).then(issue => {
                msg.issue = issue;
                this.send(msg);
            });
        });
    }

    RED.nodes.registerType("issue-add-comment", IssueAddCommentNode);
};
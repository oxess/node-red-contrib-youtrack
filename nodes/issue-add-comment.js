module.exports = function(RED) {
    function IssueAddCommentNode(config) {
        RED.nodes.createNode(this, config);
        let { Youtrack } = require('youtrack-rest-client');

        this.server = RED.nodes.getNode(config.server);
        this.youtrack = new Youtrack({
            baseUrl: this.server.host,
            token: this.server.token
        });

        this.on('input', (msg, send, done) => {
            if ('issueId' in msg) {
                this.youtrack.comments.create(msg.issueId, { text: msg.payload }).then(issue => {
                    send({ issue, ...msg });
                    done();
                }).catch(err => {
                    done(err);
                });
            } else {
                done('This node need to issue id in msg.issueId');
            }
        });
    }

    RED.nodes.registerType("issue-add-comment", IssueAddCommentNode);
};

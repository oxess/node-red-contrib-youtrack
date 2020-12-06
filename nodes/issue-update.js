module.exports = function(RED) {
    function IssueUpdateNode(config) {
        RED.nodes.createNode(this, config);
        let { Youtrack } = require('youtrack-rest-client');

        this.server = RED.nodes.getNode(config.server);
        this.youtrack = new Youtrack({
            baseUrl: this.server.host,
            token: this.server.token
        });

        this.on('input', (msg, send, done) => {
            if ('payload' in msg) {
                this.youtrack.issues.update(msg.payload).then(issue => {
                    send({ issue, ...msg });
                    done();
                }).catch(err => {
                    done(err);
                });
            } else {
                done({ msg: 'This node need to request data in payload' });
            }
        });
    }

    RED.nodes.registerType("issue-update", IssueUpdateNode);
};

module.exports = function(RED) {
    function IssuesSearchNode(config) {
        RED.nodes.createNode(this, config);
        let { Youtrack } = require('youtrack-rest-client');

        this.server = RED.nodes.getNode(config.server);
        this.youtrack = new Youtrack({
            baseUrl: this.server.host,
            token: this.server.token
        });

        this.on('input', (msg, send, done) => {
            let queryString = config.query || msg.payload;

            if (queryString) {
                this.youtrack.issues.search(queryString).then(issues => {
                    send({ ...msg, issues });
                    done();
                }).catch(err => {
                    done(err);
                });
            } else {
                done({ msg: 'This node require query from payload or config' });
            }
        });
    }

    RED.nodes.registerType("issues-search", IssuesSearchNode);
};

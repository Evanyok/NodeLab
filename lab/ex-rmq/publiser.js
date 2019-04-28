var rmq = require('amqplib/callback_api');
const topic = 'test';

var publisher = (conn, msg) => {
    conn.createChannel((err,ch) => {
        if (err != null) bail(err);
        ch.assertQueue(topic);
        ch.sendToQueue(topic,
            new Buffer.from(msg));
    });
};

rmq.connect(
    'amqp://localhost',
    (err, conn) => {
        publisher(conn, 'first time');
        publisher(conn, 'second time');
    }
);
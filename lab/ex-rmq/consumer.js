var rmq = require('amqplib/callback_api');
const topic = 'test';

var consumer = (conn) => {
    var ok = conn.createChannel((err, ch) => {
        if(err != null) {
            bail(err);
        }
        ch.assertQueue(topic);
        ch.consume(topic, (msg) => {
            if(msg != null) {
                console.log('consumer ', msg.content.toString());
                ch.ack(msg);
            }
        })
    });
};

rmq.connect(
    'amqp://localhost',
    (err, conn) => {
        consumer(conn);
    }
);
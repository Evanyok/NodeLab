var PROTO_PATH = __dirname + '/../ex-protos/template.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

var greet_proto = grpc.loadPackageDefinition(packageDefinition).template;

function start_up() {
    var client = new greet_proto.Greeter('localhost:9100',
        grpc.credentials.createInsecure());
    var user;
    if (process.argv.length >= 3) {
        user = process.argv[2];
    } else {
        user = 'world';
    }
    client.testGreeter({name: user}, (err, response) => {
        console.log('Greeting: ', response.message);
    });
}

start_up();
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

var greet_ptoto = grpc.loadPackageDefinition(packageDefinition).template;

function testGreeter(call, callback) {
    callback(
        null,
        {
            message: 'hi, ' + call.request.name
        }
    );
}

function start_up() {
    var server = new grpc.Server();
    server.addService(greet_ptoto.Greeter.service, {testGreeter: testGreeter});
    server.bind('0.0.0.0:9100', grpc.ServerCredentials.createInsecure());
    server.start();
}

start_up();
const services = require('./meter-usage_grpc_pb');
const messages = require('./meter-usage_pb');
const grpc = require('grpc');
var express = require("express");

const client = new services.MeterUsageClient('localhost:50051',
                                            grpc.credentials.createInsecure());

function runGetMeasurements(callback) {
    const measurements = [];
    const call = client.getMeasurements( new messages.GetMeasurementsRequest());
    call.on('data', function(measurement) {
        console.log('Found measurement:', measurement.getTimestamp(), measurement.getMetervalue())
        measurements.push(measurement);
    });
    call.on('end', () => callback(null, measurements));
    call.on('error', callback);
}

function main() {

    const app = express();

    app.use(express.static('dist'));

    app.get('/api/measurements', (req, res, next) => {
        runGetMeasurements((err, measurements) => {
            if (err) {
                next(err);
            } else {
                res.json(measurements.map((measurement) => ({ 
                    timestamp: measurement.getTimestamp(),
                    metervalue: measurement.getMetervalue(),
                })));
            }
        })
    });
    const port = process.env.PORT || 8080
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

main();
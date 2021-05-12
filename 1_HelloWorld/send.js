// import amqp from 'amqplib/callback_api'
var amqp = require('amqplib/callback_api');

// connect to amqp server
amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0){
        throw error0
    }

    // creates a channel
    connection.createChannel((error1, channel) => {
        if(error1){
            throw error1
        }

        // defines which queue to send to
        var queue = 'hello' // queue will only be created if it doesn't exist already
        var msg = 'Hello World'

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(msg))
        console.log(' [x] Sent %s', msg)
    })

    // closes connection after timeout
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
})
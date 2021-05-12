var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0){
        throw error0
    }

    connection.createChannel((error1, channel) => {
        if(error1){
            throw error1
        }

        var queue = 'task_queue'
        var msg = process.argv.slice(2).join(' ') || 'Hello World'

        channel.assertQueue(queue, {
            durable: true // if the queue will survive broker restarts
        })

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true // the message will survive broker restarts (if it is in a queue that also survives restart 'durable: true')
        })

        console.log(' [x] Sent %s', msg)
    })

    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)

})
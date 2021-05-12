var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0){
        throw error0
    }

    connection.createChannel((error1, channel) => {
        if(error1){
            throw error1
        }

        var queue = 'task_queue' // same as newTask(sender)

        // this makes sure the queue is declared before attempting to consume from it
        channel.assertQueue(queue, {
            durable: true
        })

        channel.prefetch(1) // rabbitMQ won't give more than one message to a worker at a time

        console.log(' [*] Waiting for messages. To exit press CTRL+C.')

        channel.consume(queue, (msg) => {
            var secs = msg.content.toString().split('.').length - 1 // every dot means one second (just to tutorial purposes)

            console.log(' [x] Received %s', msg.content.toString())
            setTimeout(() => {
                console.log(' [x] Done.')
                channel.ack(msg) // if noAck: false, we must send an ACK to inform the broker that the message was successfully delivered
            }, secs * 1000)

        }, {
            noAck: false // if true, the broker won't expect an acknowledgment of messages delivered to the consumer, in other words,
                        // it will dequeue messages as soon as they have been sent down the wire.
                        // If false, it will expected to ack messages.
        })


    })
})
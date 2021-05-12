var mqtt = require('mqtt')

const connectToMQTT = () => {
    const MQTT_URL = 'mqtt://test.mosquitto.org'
    var mqttConnection = mqtt.connect(MQTT_URL)
    return mqttConnection
}

const publishToMQTT = (topic, message) => {
    const data = message.toString()
    try {
        connectToMQTT().publish(topic, message)
    } catch(error){
        console.log(error)
    }
}

publishToMQTT('Fibo/HelloDarkness/Guilherme', JSON.stringify({
    name: 'Marcus Aurelius',
    book: 'Meditations',
    philosophy: 'stoic',
    country: 'Rome'
}))
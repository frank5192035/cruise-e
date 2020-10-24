let random = 0
pins.digitalWritePin(DigitalPin.P8, 0)
pins.digitalWritePin(DigitalPin.P11, 0)
pins.digitalWritePin(DigitalPin.P12, 0)
serial.writeLine("micro:bit Start ===>")
basic.showString("Hello!")
let stateEmit = 1
let gotSonic = 0
pins.servoSetPulse(AnalogPin.P13, 20000)
pins.servoSetPulse(AnalogPin.P15, 20000)
basic.forever(function () {
    if (stateEmit) {
        serial.writeValue("stateEmit", gotSonic)
        pins.digitalWritePin(DigitalPin.P2, 1)
        control.waitMicros(10)
        pins.digitalWritePin(DigitalPin.P2, 0)
        gotSonic = pins.pulseIn(DigitalPin.P1, PulseValue.High)
        while (gotSonic < 5) {
            gotSonic = pins.pulseIn(DigitalPin.P1, PulseValue.High)
        }
        stateEmit = 0
        control.waitMicros(300)
        if (gotSonic < 300) {
            random = randint(1, 10)
            if (random > 5) {
                pins.digitalWritePin(DigitalPin.P15, 0)
                control.waitMicros(500000)
                pins.servoSetPulse(AnalogPin.P16, 20000)
                control.waitMicros(3000000)
            } else {
                pins.digitalWritePin(DigitalPin.P13, 0)
                control.waitMicros(500000)
                pins.servoSetPulse(AnalogPin.P14, 20000)
                control.waitMicros(3000000)
            }
        }
    } else {
        serial.writeValue("stateEmit", 0)
        stateEmit = 1
        pins.digitalWritePin(DigitalPin.P14, 0)
        control.waitMicros(500000)
        pins.servoSetPulse(AnalogPin.P13, 20000)
        pins.digitalWritePin(DigitalPin.P16, 0)
        control.waitMicros(500000)
        pins.servoSetPulse(AnalogPin.P15, 20000)
    }
})

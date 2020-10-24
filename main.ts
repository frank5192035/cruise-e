let P12 = 0
let random = 0
let P11 = 0
serial.writeLine("micro:bit Start ===>")
pins.servoSetPulse(AnalogPin.P5, 1000000)
let stateEmit = 1
let gotSonic = 0
pins.servoSetPulse(AnalogPin.P13, 20000)
pins.servoSetPulse(AnalogPin.P15, 20000)
basic.showString("Hello!")
basic.forever(function () {
    if (stateEmit) {
        P11 = pins.digitalReadPin(DigitalPin.P11)
        serial.writeValue("P11", P11)
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
                images.arrowImage(ArrowNames.West).scrollImage(1, 200)
                control.waitMicros(3000000)
            } else {
                pins.digitalWritePin(DigitalPin.P13, 0)
                control.waitMicros(500000)
                pins.servoSetPulse(AnalogPin.P14, 20000)
                images.arrowImage(ArrowNames.East).scrollImage(1, 200)
                control.waitMicros(3000000)
            }
        }
    } else {
        P12 = pins.digitalReadPin(DigitalPin.P12)
        serial.writeValue("P12", P12)
        stateEmit = 1
        pins.digitalWritePin(DigitalPin.P14, 0)
        control.waitMicros(500000)
        pins.servoSetPulse(AnalogPin.P13, 20000)
        pins.digitalWritePin(DigitalPin.P16, 0)
        control.waitMicros(500000)
        pins.servoSetPulse(AnalogPin.P15, 20000)
        images.iconImage(IconNames.Chessboard).scrollImage(1, 100)
    }
})

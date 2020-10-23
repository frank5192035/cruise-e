serial.writeLine("micro:bit Start ===>")
basic.showString("Hello!")
let stateEmit = 1
let gotSonic = 0
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
    } else {
        serial.writeValue("stateEmit", 0)
        stateEmit = 1
    }
    control.waitMicros(100000)
})

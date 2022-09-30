input.onButtonPressed(Button.A, function () {
    pv += 10
})
input.onButtonPressed(Button.B, function () {
    pv += -10
})
let pidvalue2 = 0
let pidvalue = 0
let pv = 0.1
let pv2 = 0.1
let pid2 = pid.create(
    50,
    1.5,
    0.0001,
    0.04,
    100,
    -100
)
let pid22 = pid.create(
    50,
    1.5,
    0.0001,
    0.04,
    100,
    -100
)
basic.forever(function () {
    pidvalue = pid2.pid_value(pv)
    pv += -1 * pidvalue
    serial.writeValue("pv1", pv)
    pv += randint(-1, 1)
})
basic.forever(function () {
    pidvalue2 = pid22.pid_value(pv2)
    pv2 += -1 * pidvalue2
    serial.writeValue("pv2", pv2)
    pv2 += randint(-1, 1)
})

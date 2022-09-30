input.onButtonPressed(Button.A, function () {
    pv += 50
})
input.onButtonPressed(Button.B, function () {
    pv += -50
})
let pidvalue = 0
let pv = 50 + randint(-5, 5)
let pid2 = pid.create(
    50,
    0.999,
    0.0001,
    0.04,
    100,
    -100
)
basic.forever(function () {
    pidvalue = pid2.pid_value(pv)
    pv += -1 * pidvalue
    serial.writeValue("pv1", pv)
    pv += 10
    pv += randint(-10, 10)
})

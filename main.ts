input.touchD2.onEvent(ButtonEvent.Click, function () {
    starthue += 100
})
let endhue = 0
let hue = 0
let starthue = 0
let strip = light.createStrip(pins.D1, 2)
strip.setBrightness(255)
pixel.setColor(0x000000)
forever(function () {
    hue = starthue
    endhue = starthue + 42
    while (hue < endhue) {
        strip.setPixelColor(0, light.hsv(hue, 255, 255))
        strip.move(LightMove.Rotate, 1)
        pause(150)
        hue += 2
    }
    if (hue >= endhue) {
        hue = starthue
    }
    if (starthue >= 255) {
        starthue = 0
    }
})

input.touchD2.onEvent(ButtonEvent.Click, function () {
    starthue += 100
    mode = 0
})
input.touchD0.onEvent(ButtonEvent.Click, function () {
    mode = 1
})
let endhue = 0
let hue = 0
let mode = 0
let starthue = 0
let strip = light.createStrip(pins.D1, 2)
strip.setBrightness(255)
pixel.setColor(0x000000)
forever(function () {
    if (mode==0) {
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
    }
    if (mode == 1) {
        hue = 100
        encode()
        MorseLights()
        pause(5 * spaceLength)
    }
})

function showDot() {
    strip.setAll(light.hsv(hue, 255, 255))
    pause(dotLength)
    strip.setAll(light.hsv(hue, 0, 0))
    pause(dotLength)
}
function encode() {
    morseOut = ""
    for (let msgIndex = 0; msgIndex <= message.length; msgIndex++) {
        letter = message.charAt(msgIndex)
        for (let alphaIndex = 0; alphaIndex <= Alphabet.length; alphaIndex++) {
            if (Alphabet[alphaIndex] == letter) {
                newCode = Morse[alphaIndex]
                morseOut = "" + morseOut + newCode
                morseOut = "" + morseOut + " "
            }
        }
    }
}
function MorseLights() {
    for (let codeIndex = 0; codeIndex <= morseOut.length; codeIndex++) {
        code = morseOut.charAt(codeIndex)
        if (code == ".") {
            showDot()
        } else if (code == "-") {
            showDash()
        } else {
            if (code == " ") {
                showSpace()
            }
        }
    }
    showSpace()
}
function showSpace() {
    strip.setAll(light.hsv(hue, 0, 0))
    pause(spaceLength)
}
function showDash() {
    strip.setAll(light.hsv(hue, 255, 255))
    pause(dashLength)
    strip.setAll(light.hsv(hue, 0, 0))
    pause(dotLength)
}
let code = ""
let newCode = ""
let letter = ""
let morseOut = ""
let Morse: string[] = []
let Alphabet: string[] = []
let message = ""
let spaceLength = 0
let dashLength = 0
let dotLength = 0
hue = 100
dotLength = 100
dashLength = dotLength * 3
spaceLength = dotLength * 3
message = "JOE"
Alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]
Morse = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--.."
]

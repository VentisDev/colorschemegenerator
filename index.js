const generateColors = document.getElementById("generate-btn")
const colorContainer = document.getElementById("color-container")
const hexCodes = document.getElementById("hex-codes")
const colorScheme = document.getElementById("color-scheme")
const count = document.getElementById("count")
const source = document.querySelector('div.source');

//function to copy all the hexcode values on click
colorContainer.addEventListener("click", function() {
    const range = document.createRange()
    range.selectNode(document.getElementById("color-container"))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()
})


generateColors.addEventListener("click", function(event) {
    event.preventDefault()
    if (count.value < 1 || count.value > 10) {
        alert("The input must be between 1 and 10")
        return
    }
    getColors()
})

function getColors() {
    const color = document.getElementById("color")
    const hexValue = color.value.replace("#", "")

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${colorScheme.value}&count=${count.value}`)
    .then(response => response.json())
    .then(data => renderColors(data.colors))
}

function renderColors(colors) {

    const width = 100 / colors.length 
    
    const colorsHtml = colors.map(color => {
        const hexColor = color.hex.value
        return `
        <div class="background-div" style="width:${width}%">
            <div class="background-color" style="background-color: ${hexColor}"></div>
            <div class="hex-code"> ${hexColor}</div>
        </div>
        `
    }).join('')

    colorContainer.innerHTML = colorsHtml 
}






// https://www.thecolorapi.com/id?hex=${colorValue}&mode=monochrome&count=5`
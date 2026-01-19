const layout = document.querySelector('.layout')
const width = 80;
const height = 38;

for(let idx=0; idx<width*height; idx++){
    const square = document.createElement('div')
    layout.appendChild(square)
}
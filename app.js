const layout = document.querySelector('.layout')
const width = 70;
const height = 40;

for(let idx=0; idx<width*height; idx++){
    const square = document.createElement('div')
    layout.appendChild(square)
}
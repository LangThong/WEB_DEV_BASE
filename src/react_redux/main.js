import html from './core.js'

const cars = ['BMW','Porsche','Mercedes']

const isSuccess = false

const output = html `
    <h1>${true}</h1>
    <uL> 
        ${cars.map(car => `<li>${car}</li>`)}
    </ul>
`

console.log(output);
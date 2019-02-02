const SerialPort = require('serialport')


const fn = () => {
	console.log("-")
}

let interval = setInterval(fn, 1000)

let port = new SerialPort('/dev/USB1', {
		baudRate: 9600,
		dataBits: 8,
		parity:   'none',
		stopBits: 1
	})


port.on('error', (err) => {
	console.error(`error: ${err}`)
})


port.on('open', () => {
	console.log(`open`)
})


port.on('data', (data) => {
	clearInterval(interval)
	console.log(`${data}`)
	interval = setInterval(fn,1000)
})



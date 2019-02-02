const SerialPort = require('serialport')


const fn = () => {
	process.stdout.write("-");
}

let intervalTime = 100
let interval = setInterval(fn, intervalTime)

let port = new SerialPort('/dev/ttyUSB1', {
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
	//console.log(data[1])
	
	//data = new Buffer(data)

	for(let i=0; i<data.length;++i){
		let str = data[i].toString(16)
		str = str.length == 2 ? str : '0' + str

		process.stdout.write("["+str+"]")
	}
	
	clearInterval(interval)
	//console.log(`${data}`)
	interval = setInterval(fn, intervalTime)
})



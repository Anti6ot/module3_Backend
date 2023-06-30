const http = require('http')
const chalk = require('chalk')

const port = 3000

const server = http.createServer((reg, res) => {
    console.log('Server!')
    res.end('Hello from server')
})

server.listen(port, () => {
    console.log(chalk.bgGreen(`Server has been started on port ${port}`))
})
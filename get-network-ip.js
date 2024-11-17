'use strict'

import { networkInterfaces } from 'os'

const nets = networkInterfaces()
const results = new Set()

for (const name of Object.keys(nets)) {
  if (!nets[name]) {
    continue
  }

  for (const net of nets[name]) {
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4

    if (net.family === familyV4Value && !net.internal) {
      results.add(net.address)
    }
  }
}

console.log('Possible network locations:')
for (const result of results) {
  console.log(`- http://${result}:3000/`)
}
console.log('')

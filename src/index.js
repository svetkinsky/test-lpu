import {Xhr} from './xhr.js'

const requestUrl = './stub/lpu.json'


Xhr.sendRequest('GET', requestUrl)
    .then(data => console.log(data))
    .catch(err => console.log(err))

const body = {
    name: 'LPU № 1',
    phone: '123456789'
}






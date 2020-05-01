import {Xhr} from './xhr.js'
import {Lpu} from './lpu.js'

const requestUrl = './stub/lpu.json'

//получение данных с "бэка"
Xhr.sendRequest('GET', requestUrl)
    .then(data => run(data))
    .catch(err => console.log(err))



//функция запуска программы
const run = responseData => {
    let maxId = 0

    //массив данных по ЛПУ из заглушки
    const content = responseData.content || []
    const tableBody = document.querySelector('#table-body')

    // localStorage.clear()

    //функция вывода данных из LocalStorage в таблицу
    const addDataFromLS = () => {
        for(let key in localStorage) {
            if(!localStorage.hasOwnProperty(key)) {
                continue
            }
            if(key.indexOf('lpu') === -1) {
                continue
            }

            const lpu = JSON.parse(localStorage.getItem(key))

            if (lpu.id > maxId) {
                maxId = lpu.id
            }
            tableBody.append(Lpu.create(lpu.id, lpu.name, lpu.address, lpu.phone))

        }

    }


    //Кнопка добавления заглушки в LocalStorage
    const addDataButton = document.querySelector('.add-data-button')
    addDataButton.addEventListener('click', () => {
        console.log('PIU')
        localStorage.clear()
        content.forEach(item => {
            localStorage.setItem(`lpu${item.id}`, JSON.stringify(item))
        })
        addDataFromLS()
    })



    //перебор массива для заполнения таблицы
    addDataFromLS()



    //добавление нового элемента
    const addButton = document.querySelector('.add')
    addButton.addEventListener('click', () => {
        const newLpu = Lpu.create(++maxId)
        tableBody.append(newLpu)


        const newLpuObject = {
            id: maxId,
            name: '',
            address: '',
            phone: ''
        }
        localStorage.setItem(`lpu${newLpuObject.id}`, JSON.stringify(newLpuObject))
    })

}







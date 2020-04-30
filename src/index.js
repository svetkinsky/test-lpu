import {Xhr} from './xhr.js'
import {Lpu} from './lpu.js'

const requestUrl = './stub/lpu.json'

//получение данных с "бэка"
Xhr.sendRequest('GET', requestUrl)
    .then(data => run(data))
    .catch(err => console.log(err))




//функция запуска программы
const run = responseData => {
    console.log(responseData)

    //массив данных по ЛПУ
    const content = responseData.content || []
    const tableBody = document.querySelector('#table-body')

    let maxId = 0

    localStorage.clear()
    content.forEach(item => {
        localStorage.setItem(`lpu${item.id}`, JSON.stringify(item))
    })



    //перебор массива для заполнения таблицы
    for(let key in localStorage) {
        if(!localStorage.hasOwnProperty(key)) {
            continue
        }

        // console.log(key)
            const lpu = JSON.parse(localStorage.getItem(key))
            if (lpu.id > maxId) {
                maxId = lpu.id
            }
            tableBody.append(Lpu.create(lpu.id, lpu.name, lpu.address, lpu.phone))

    }



    //функция редактирования ячейки таблицы и "отправки запроса" на изменение
    const editRow = rowEdit => {
        const cellsEdit = rowEdit.getElementsByTagName('td')
        Array.from(cellsEdit).forEach(cellEdit => {
            cellEdit.addEventListener('dblclick', event => {
                let textArea = document.createElement('textarea');
                textArea.style.width = cellEdit.clientWidth + 'px';
                textArea.style.height = cellEdit.clientHeight + 'px';
                textArea.className = 'edit-area'

                textArea.value = cellEdit.innerHTML;
                cellEdit.innerHTML = '';
                cellEdit.appendChild(textArea);
                textArea.focus();

                console.log('cell ', cellEdit)

                textArea.addEventListener('blur', () => {
                    cellEdit.innerHTML = textArea.value
                    const key = cellEdit.getAttribute('data-type')
                    const lpuEdit = cellEdit.parentElement

                    console.log(lpuEdit)
                    console.log(lpuEdit.getAttribute('lpu-id'))

                    console.log(localStorage.getItem(`lpu${lpuEdit.getAttribute('lpu-id')}`))
                    // console.log(key)
                    // const body = {}
                    // body
                    // body[key] = cellEdit.innerHTML
                    //
                    // console.log(body)
                    //"запрос" на изменение данных

                })
            })
        })
    }

    const addButton = document.querySelector('.add')

    //добавление нового элемента
    addButton.addEventListener('click', () => {
        const newLpu = Lpu.create(++maxId)
        tableBody.append(newLpu)

        editRow(newLpu)
    })

    const allRows = document.querySelectorAll('tr')

    //редактирование ячеек таблицы

    allRows.forEach(row => {
        editRow(row)
    })



}





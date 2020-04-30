import {Xhr} from './xhr.js'
import {Lpu} from './lpu.js'

const requestUrl = './stub/lpu.json'

//получение данных с "бэка"
Xhr.sendRequest('GET', requestUrl)
    .then(data => run(data))
    .catch(err => console.log(err))

let maxId = 0

//функция запуска программы
const run = responseData => {
    console.log(responseData)

    //массив данных по ЛПУ
    const content = responseData.content || []
    const tableBody = document.querySelector('#table-body')



    // localStorage.clear()
    content.forEach(item => {
        localStorage.setItem(`lpu${item.id}`, JSON.stringify(item))
    })



    //перебор массива для заполнения таблицы
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

                    console.log(lpuEdit.firstChild.nextSibling.innerHTML)
                    const body = {
                        id: lpuEdit.getAttribute('lpu-id'),
                        name: lpuEdit.firstChild.innerHTML,
                        address: lpuEdit.firstChild.nextSibling.innerHTML,
                        phone: lpuEdit.lastChild.innerHTML
                    }



                    console.log(localStorage.getItem(`lpu${lpuEdit.getAttribute('lpu-id')}`))
                    //"запрос" на изменение данных
                    localStorage.removeItem(`lpu${lpuEdit.getAttribute('lpu-id')}`)
                    localStorage.setItem(`lpu${lpuEdit.getAttribute('lpu-id')}`, JSON.stringify(body))

                })
            })
        })

    }

    const removeLpu = row => {
        row.addEventListener('contextmenu', event => {
            event.preventDefault()
            const removeButton = document.createElement('a')
            removeButton.classList.add('waves-effect', 'waves-light', 'btn')
            removeButton.innerHTML = 'Удалить'

            row.style.position = 'relative'
            removeButton.style.position = 'absolute'
            removeButton.style.left = event.layerX + 'px'
            row.append(removeButton)

            removeButton.addEventListener('click', () => {
                console.log('CLICK')
                localStorage.removeItem(`lpu${row.getAttribute('lpu-id')}`)
                row.remove()
                removeButton.style.display = 'none'
            })

            removeButton.addEventListener('mouseout', () => {
                removeButton.style.display = 'none'
            })

        })
    }

    const addButton = document.querySelector('.add')

    //добавление нового элемента
    addButton.addEventListener('click', () => {
        const newLpu = Lpu.create(maxId++)
        tableBody.append(newLpu)

        editRow(newLpu)
        removeLpu(newLpu)

        const newLpuObject = {
            id: maxId++,
            name: '',
            address: '',
            phone: ''
        }
        localStorage.setItem(`lpu${newLpuObject.id}`, JSON.stringify(newLpuObject))
    })

    const allRows = document.querySelectorAll('tr')

    //редактирование ячеек таблицы

    allRows.forEach(row => {
        editRow(row)
        removeLpu(row)
    })





}







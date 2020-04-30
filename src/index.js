import {Xhr} from './xhr.js'
import {Lpu} from './lpu.js'

const requestUrl = './stub/lpu.json'

//получение данных с "бэка"
Xhr.sendRequest('GET', requestUrl)
    .then(data => run(data))
    .catch(err => console.log(err))

const body = {
    name: 'LPU № 1',
    phone: '123456789'
}

//функция запуска программы
const run = responseData => {
    console.log(responseData)

    //массив данных по ЛПУ
    const content = responseData.content || []
    const tableBody = document.querySelector('#table-body')

    let maxId = 0

    //перебор массива для заполнения таблицы
    content.forEach(lpu => {
        if (lpu.id > maxId) {
            maxId = lpu.id
        }
        tableBody.append(Lpu.create(lpu.id, lpu.name, lpu.address, lpu.phone))
    })

    const addButton = document.querySelector('.add')

    //добавление нового элемента
    addButton.addEventListener('click', () => {
        const newLpu = Lpu.create(maxId)
        tableBody.append(newLpu)
    })

    const allCells = document.querySelectorAll('td')
    allCells.forEach(cell => {
        cell.addEventListener('dblclick', event => {
            console.log('dblclick')
            let textArea = document.createElement('textarea');
            textArea.style.width = cell.clientWidth + 'px';
            textArea.style.height = cell.clientHeight + 'px';
            textArea.className = 'edit-area'

            textArea.value = cell.innerHTML;
            cell.innerHTML = '';
            cell.appendChild(textArea);
            textArea.focus();
        })
    })
}





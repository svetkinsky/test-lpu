export const Lpu = {
    create(id, name = '', address = '', phone = ''){
        const lpuRow = document.createElement('tr')
        const lpuNameCell = document.createElement('td')
        const lpuAddressCell = document.createElement('td')
        const lpuPhoneCell = document.createElement('td')

        lpuNameCell.setAttribute('data-type', 'name')
        lpuAddressCell.setAttribute('data-type', 'address')
        lpuPhoneCell.setAttribute('data-type', 'phone')

        lpuNameCell.innerHTML = name
        lpuAddressCell.innerHTML = address
        lpuPhoneCell.innerHTML = phone

        lpuRow.setAttribute('lpu-id', id)

        lpuRow.append(lpuNameCell)
        lpuRow.append(lpuAddressCell)
        lpuRow.append(lpuPhoneCell)

        Lpu.removeLpu(lpuRow)
        Lpu.editRow(lpuRow)

        return lpuRow
    },

    //функция удаления строки таблицы и "отправки запроса" на удаление
    removeLpu(row) {
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
    },

    //функция редактирования ячейки таблицы и "отправки запроса" на изменение
    editRow(rowEdit) {
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

}


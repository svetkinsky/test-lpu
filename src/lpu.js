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

        return lpuRow
    }
}


/*
3. Kaszkád legördülők
Adott egy legördülő menü, benne az opciók csoportosítva.
Alakítsd át ezt úgy, hogy két legördülő legyen: az elsőben a csoportok neve, majd abból választva a másodikban a csoporton belüli opciók jelenjenek meg!     
*/


class CascadeSelect{
    constructor(select){
        this.originalSelect = select;
    }
    init() {
        //adatok kigyűjtése
        this.collectOptions();
        console.log(this.dataGroups);
        this.createSelects();
        this.populate();
        //2 select létrehozása
        //eseméyn - >2. select töltése
        this.groupSelect.addEventListener('change', ()=> {
            this.populate();
        })
    }

    collectOptions(){
        const optGroups = this.originalSelect.querySelectorAll('optgroup');
        this.dataGroups = new Map();
        optGroups.forEach(optGroup => {
            const subOptions = [];
            optGroup.querySelectorAll('option').forEach(option => {
                subOptions.push({
                    text: option.innerText,
                    value: option.getAttribute('value')
                });
            })
            this.dataGroups.set(optGroup.getAttribute('label'), subOptions);
        })
    }

    createSelects() {
        this.originalSelect.style.display = 'none';

        this.groupSelect = document.createElement('select');
        this.itemSelect = document.createElement('select');

        this.originalSelect.insertAdjacentElement('afterend', this.groupSelect);
        this.groupSelect.insertAdjacentElement('afterend', this.itemSelect);

        const groupOptonsHtml = [...this.dataGroups.keys()]
            .map(
                groupLabel => `<option value="${groupLabel}">${groupLabel}</option>`
            )
            .join('');
        this.groupSelect.innerHTML = groupOptonsHtml;
    }

    populate() {
        const currentGroup = this.groupSelect.value;
        const groupItems = this.dataGroups.get(currentGroup);
        const itemsHtml = groupItems
            .map(
                item => `<option value="${item.value}">${item.text}</option>`
            )
            .join('');
        this.itemSelect.innerHTML = itemsHtml;
    }
}

const cascadeSelect = new CascadeSelect(
    document.querySelector('select')
);
cascadeSelect.init();
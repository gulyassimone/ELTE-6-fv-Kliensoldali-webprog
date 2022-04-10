class CascadeSelect extends HTMLElement {
    constructor() {
        super();
        const template = document.querySelector('template#cascade-select-template');
        const content = template.content.cloneNode(true);
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(content);
        this.populate = this.populate.bind(this);
    }

    connectedCallback() {
        this.collectOptions(); //adatok gyűjtése
        this.createSelects(); //select-ek létrehozása
        this.populate(); //2. select feltöltése
        //esemény -> 2. select feltöltése
        this.groupSelect.addEventListener('change', this.populate);
    }

    disconnectedCallback() {
        this.groupSelect.removeEventListener('change', this.populate);
    }

    collectOptions() {
        this.originalSelect = this.querySelector('select');
        const optGroups = this.originalSelect.querySelectorAll('optgroup');
        this.dataGroups = new Map();
        optGroups.forEach(optGroup => {
            const subOptions = [];
            optGroup.querySelectorAll('option').forEach(option => {
                subOptions.push({
                    text: option.innerText,
                    value: option.getAttribute('value')
                })
            });
            this.dataGroups.set(optGroup.getAttribute('label'), subOptions);
        });
    }

    createSelects() {
        const selects = this.shadowRoot.querySelectorAll('select');
        this.groupSelect = selects[0];
        this.itemSelect = selects[1];

        const groupOptionsHtml = [...this.dataGroups.keys()]
            .map(
                groupLabel => `<option value="${groupLabel}">${groupLabel}</option>`
            ).join('');
        this.groupSelect.innerHTML = groupOptionsHtml;
    }

    populate() {
        const currentGroup = this.groupSelect.value;
        const groupItems = this.dataGroups.get(currentGroup);
        const itemsHtml = groupItems
            .map(
                item => `<option value="${item.value}">${item.text}</option>`
            ).join('');
        this.itemSelect.innerHTML = itemsHtml;
    }
}

window.customElements.define(
    'cascade-select',
    CascadeSelect
);
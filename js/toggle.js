export default class {
    constructor(field){
        this.field = field;
        this.value = field.value;
        this.name = field.name;
        this.id = field.id.length ? field.id : `t${Math.random().toString().slice(-4)}`;
        this.toggle = this.#newToggle(this.id);


        // place the toggle into the DOM next to the Checkbox
        this.field.parentNode.insertBefore(this.toggle, this.field.nextSibling)
        // hide the checkbox from view
        this.field.style.display = 'none';

    }

    #newToggle(id){
        // create div/span element
        const result = Object.assign(document.createElement('div'), {
            id: `${id}-toggle`,
            className: "toggle",
            innerHTML: '<span></span>'
        });

        // set default state: on | off
        if(this.field.checked){
            result.classList.add('on');
        }

        // set disabled state 
        if(this.field.disabled){
            result.classList.add('disabled');
        }
        
        // add click listener
        else {
            result.addEventListener('click',this.#onClick.bind(this));
        }

        return result;
    }

    #onClick(){
        this.toggle.classList.toggle('on');
        this.field.checked = this.toggle.classList.contains('on');
        // pass through any event listeners that may have been applied to the checkbox
        this.field.dispatchEvent(new Event('click'));
        this.field.dispatchEvent(new Event('change'));
    }
}
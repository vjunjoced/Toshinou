/*
 Created by Freshek on 31.10.2017
 */

class SettingControlFactory {

    get categories() {
        return [
            {text: 'Appearance', id: 'appearance'},
            {text: 'Advanced (beginners, go away!)', id: 'advanced'},
            {text: 'Statistic window', id: 'statisticWindow'},
            {text: 'Windows / Tabs show', id: 'wtShow'},
        ];
    }

    get items() {
        return {
            headerColor: {
                type: 'color',
                category: 'appearance',
                label: 'Header color ',
                br: false,
                attrs: {
                    value: '#16262f'
                }
            },
            headerOpacity: {
                type: 'range',
                category: 'appearance',
                label: ' | opacity',
                attrs: {
                    min: 0,
                    max: 1,
                    value: '0.9',
                    step: '0.01',
                }
            },
            windowColor: {
                type: 'color',
                category: 'appearance',
                br: false,
                label: 'Window background color ',
                attrs: {
                    value: '#16262f',
                }
            },
            windowOpacity: {
                type: 'range',
                category: 'appearance',
                br: true,
                label: ' | opacity',
                attrs: {
                    min: 0,
                    max: 1,
                    value: '0.8',
                    step: '0.01',
                }
            },
            windowsToTabs: {
                type: 'checkbox',
                category: 'appearance',
                labelAfter: true,
                label: 'Tabs instead of windows ',
                attrs: {},
                props: {
                    checked: false
                }
            },
            timerTick: {
                type: 'number',
                category: 'advanced',
                label: 'Logic tick (ms) ',
                attrs: {
                    min: 50,
                    max: 20000,
                    value: 300,
                }
            },
            showRuntime: {
                type: 'checkbox',
                category: 'statisticWindow',
                labelAfter: true,
                label: 'Show runtime',
                attrs: {},
                props: {
                    checked: true
                }
            },
            speedFormat: {
                type: 'select',
                category: 'statisticWindow',
                label: 'Speed format ',
                attrs: {
                    name: ''
                },
                options: [
                    {value: 'min', text: 'uri/min.'},
                    {value: 'hour', text: 'uri/hour'},
                ],
            },
            minimapShow: {
                type: 'checkbox',
                category: 'wtShow',
                labelAfter: true,
                label: 'Minimap',
                attrs: {},
                props: {
                    checked: true
                }
            },
            attackDetailsShow: {
                type: 'checkbox',
                category: 'wtShow',
                labelAfter: true,
                label: 'Attack Details',
                attrs: {},
                props: {
                    checked: true
                }
            },
            generalSettingsShow: {
                type: 'checkbox',
                category: 'wtShow',
                labelAfter: true,
                label: 'General',
                attrs: {},
                props: {
                    checked: true
                }
            },
            autolockShow: {
                type: 'checkbox',
                category: 'wtShow',
                labelAfter: true,
                label: 'Autolocker',
                attrs: {},
                props: {
                    checked: true
                }
            },
            npcSettingsShow: {
                type: 'checkbox',
                category: 'wtShow',
                labelAfter: true,
                label: 'Exclude NPC to attack',
                attrs: {},
                props: {
                    checked: true
                }
            },
            statisticShow: {
                type: 'checkbox',
                category: 'wtShow',
                labelAfter: true,
                label: 'Statistic',
                attrs: {},
                props: {
                    checked: true
                }
            },
        };
    }

    get types() {
        return {
            number: 'value',
            color: 'value',
            select: 'value',
            range: 'value',
            checkbox: 'checked',
        };
    }

    setElValueByType(id, value){
        let setByType = {
            value: (elID, val)=> {$(`#${elID}`).val(val); },
            checked: (elID, val)=> { $(`#${elID}`).prop('checked', val); },
        };

        let item = this.items[id];
        let type = this.types[item.type];

        setByType[type](id, value);
    }

    getElValueByType(el){
        let getByType = {
            value: (elem)=> {
                return $(elem).val();
            },
            checked: (elem)=> {
                return $(elem).prop('checked');
            },
        };

        let item = this.items[el.id];

        let type = this.types[item.type];

        return getByType[type](el);

    }

    constructor() {

        this.createCategories();
        this.createControl();

        let submit = jQuery('<input>', {type: 'submit', value: 'save'}).appendTo($('form'));

        $("form").on("submit", this.saveOptions.bind(this));

        chrome.storage.local.get(Object.keys(this.items), this.onGet.bind(this));

    }

    onGet(items){
        Object.keys(items).forEach((name)=>{
            this.setElValueByType(name, items[name]);
        });
    }

    number(options, name) {
        return this._input(options, name);
    }

    color(options, name) {
        return this._input(options, name);
    }

    select(control, name) {
        let label = jQuery('<label>', {text: control.label, for: name});

        control.hasOwnProperty('labelAfter') ? '' : label.appendTo($(`#${control.category}`));

        control.attrs['id'] = name;
        control.attrs['data-settings'] = true;
        let input = jQuery('<select>', control.attrs).appendTo($(`#${control.category}`));
        control.hasOwnProperty('props') ? this._setProps(control.props, input) : '';

        control.options.forEach((option)=> {
            jQuery('<option>', option).appendTo(input);
        });

        control.hasOwnProperty('labelAfter') ? label.appendTo($(`#${control.category}`)) : '';
        control.hasOwnProperty('br') ? jQuery('<br>').appendTo($(`#${control.category}`)) : '';
        return input;
    }

    range(options, name) {
        return this._input(options, name);
    }

    checkbox(options, name) {
        return this._input(options, name);
    }

    createControl() {
        Object.keys(this.items).forEach((control)=> {
            let controlObj = this.items[control];
            this[controlObj.type](controlObj, control);
        });
    }

    createCategories() {
        this.categories.forEach((category)=> {
            let categoryContainer = jQuery('<div>', {id: category.id}).appendTo($('form'));
            jQuery('<h4>', {text: category.text}).appendTo(categoryContainer);
            jQuery('<hr>').appendTo($('form'));
        });
    }

    _setProps(props, el) {
        Object.keys(props).forEach((name)=> {
            $(el).prop(name, props[name]);
        });
    }

    _input(options, name) {

        let label = jQuery('<label>', {text: options.label, for: name});

        options.hasOwnProperty('labelAfter') ? '' : label.appendTo($(`#${options.category}`));

        options.attrs['id'] = name;
        options.attrs['type'] = options.type;
        options.attrs['data-settings'] = true;
        let input = jQuery('<input>', options.attrs).appendTo($(`#${options.category}`));
        //input.attr('id', name);

        options.hasOwnProperty('props') ? this._setProps(options.props, input) : '';

        options.hasOwnProperty('labelAfter') ? label.appendTo($(`#${options.category}`)) : '';
        options.hasOwnProperty('br') && options.br === false ? '' : jQuery('<br>').appendTo($(`#${options.category}`));
        return input;
    }

    saveOptions(e) {

        e.preventDefault();
        let elements = {};

        document.querySelectorAll('[data-settings="true"]').forEach((el)=>{
            elements[el.id] = this.getElValueByType(el);
        });

        chrome.storage.local.set(elements);
    }


}

$(document).ready(()=>{
    new SettingControlFactory();
});

import { Object as Mobject } from 'backbone.marionette'

export default Mobject.extend({
    initialize(type = 'local') {
        this.webStorage = {
            local: localStorage,
            session: sessionStorage
        }[type]
    },

    set(key, value) {
        if(!key) return null;

        if(typeof value == 'object')
            value = JSON.stringify(value);

        return this.webStorage.setItem(key, value);
    },

    get(key) {
        if(!key) return null;

        var value = this.webStorage.getItem(key);
        return this.parse(value);
    },

    remove(key) {
        var value = this.get(key);
        this.webStorage.removeItem(key);
        return value;
    },

    parse(string)
    {
        try {
            var object = JSON.parse(string);
            if(object && typeof object == 'object')
                return object;
        } catch(e) {}

        return string;
    }
})

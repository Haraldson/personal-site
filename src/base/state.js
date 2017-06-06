import { Model } from 'backbone'
import { Radio } from 'backbone'
import Storage from './storage'
import QueryString from 'query-string'
import { history } from 'backbone'
import { get, pick, keys, isEqual } from 'lodash'

const ls = new Storage('local')

export default Model.extend({
    defaults() {
        return get(Radio.request('global', 'config'), 'state.defaults', {})
    },

    initialize() {
        this.on('change reset', this.onStateChange)
        this.onStateChange()
    },

    onStateChange() {
        this.store()
        this.updateUrlQuery()
    },

    store() {
        ls.set('state', this.toJSON())
    },

    reset() {
        this.clear().set(this.defaults())
    }
})

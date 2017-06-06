import { Application } from 'backbone.marionette'
import { Radio } from 'backbone'
import Config from 'config.json'
import State from 'base/state'
import Layout from 'layout'
import Storage from 'base/storage'
import { get } from 'lodash'

export default Application.extend({
    el: '#hhb',
    region: '#hhb',

    initialize()
    {
        this.state = new State(get(Config, 'planner.defaults', {}))

        const gc = Radio.channel('global')
        gc.reply('state', this.state)
        gc.reply('config', Config)
    },

    onStart() {
        this.storage = new Storage('local')
        let state = this.storage.get('state') || {}
        this.state.set(state)

        // Render layout
        const layout = new Layout
        this.showView(layout)

        Backbone.history.start({ pushState: true })
    }
})

import { Collection } from 'backbone'
import { View } from 'backbone.marionette'
import { Radio } from 'backbone'
import template from './template.hbs'
import { get } from 'lodash'

const gc = Radio.channel('global')

export default View.extend({
    template,
    id: 'main',
    className: 'row',

    regions: {
        // steps: {
        //     el: '> [data-region="steps"]',
        //     replaceElement: true
        // }
    },

    onRender() {
        const State = gc.request('state')
        const Config = gc.request('config')
    }
})

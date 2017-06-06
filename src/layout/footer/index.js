import { View } from 'backbone.marionette'
import template from './template.hbs'

export default View.extend({
    tagName: 'footer',
    className: 'row shrink',
    template
})

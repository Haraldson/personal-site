import { View } from 'backbone.marionette'
import template from './template.hbs'

import Header from './header'
import Navigation from './navigation'
import Main from 'main'
import Footer from './footer'

export default View.extend({
    id: 'layout',
    className: 'rows',
    template,

    regions: {
        header: {
            el: '[data-region="header"]',
            replaceElement: true
        },
        navigation: {
            el: '[data-region="navigation"]',
            replaceElement: true
        },
        main: {
            el: '[data-region="planner"]',
            replaceElement: true
        },
        footer: {
            el: '[data-region="footer"]',
            replaceElement: true
        }
    },

    onRender() {
        this.showChildView('header', new Header)
        //this.showChildView('navigation', new Navigation)
        this.showChildView('planner', new Main)
        this.showChildView('footer', new Footer)
    }
})

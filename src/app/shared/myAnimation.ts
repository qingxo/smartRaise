import {trigger, state, style, animate, transition} from '@angular/animations'
let baseAnimation = []
export default baseAnimation = [trigger('newState', [
  state('inactive', style({
    backgroundColor: '#6A4307',
    transform: 'scale(1)'
  })),
  state('active', style({
    backgroundColor: '#472D05',
    transform: 'scale(1.1)'
  })),
  transition('inactive=>active', animate('100ms ease-in')),
  transition('active=>inactive', animate('100ms ease-out'))
])]

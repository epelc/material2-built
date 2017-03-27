import { Directive, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ScrollDispatcher } from './scroll-dispatcher';
import 'rxjs/add/observable/fromEvent';
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
export class Scrollable {
    /**
     * @param {?} _elementRef
     * @param {?} _scroll
     */
    constructor(_elementRef, _scroll) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._scroll.register(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._scroll.deregister(this);
    }
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    elementScrolled() {
        return Observable.fromEvent(this._elementRef.nativeElement, 'scroll');
    }
    /**
     * @return {?}
     */
    getElementRef() {
        return this._elementRef;
    }
}
Scrollable.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-scrollable]'
            },] },
];
/**
 * @nocollapse
 */
Scrollable.ctorParameters = () => [
    { type: ElementRef, },
    { type: ScrollDispatcher, },
];
function Scrollable_tsickle_Closure_declarations() {
    /** @type {?} */
    Scrollable.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Scrollable.ctorParameters;
    /** @type {?} */
    Scrollable.prototype._elementRef;
    /** @type {?} */
    Scrollable.prototype._scroll;
}
//# sourceMappingURL=scrollable.js.map
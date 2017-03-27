import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig, CompatibilityModule } from '../core';
import { MdSlideToggle } from './slide-toggle';
import { MdRippleModule } from '../core/ripple/index';
export class MdSlideToggleModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdSlideToggleModule,
            providers: []
        };
    }
}
MdSlideToggleModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule, MdRippleModule, CompatibilityModule],
                exports: [MdSlideToggle, CompatibilityModule],
                declarations: [MdSlideToggle],
                providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
            },] },
];
/**
 * @nocollapse
 */
MdSlideToggleModule.ctorParameters = () => [];
function MdSlideToggleModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSlideToggleModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSlideToggleModule.ctorParameters;
}
export { MD_SLIDE_TOGGLE_VALUE_ACCESSOR, MdSlideToggleChange, MdSlideToggle } from './slide-toggle';
//# sourceMappingURL=index.js.map
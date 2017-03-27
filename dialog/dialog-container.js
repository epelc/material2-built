import { Component, ViewChild, ViewEncapsulation, NgZone, Renderer, ElementRef, EventEmitter, } from '@angular/core';
import { animate, trigger, state, style, transition, } from '@angular/animations';
import { BasePortalHost, PortalHostDirective } from '../core';
import { MdDialogContentAlreadyAttachedError } from './dialog-errors';
import { FocusTrapFactory } from '../core/a11y/focus-trap';
import 'rxjs/add/operator/first';
/**
 * Internal component that wraps user-provided dialog content.
 * Animation is based on https://material.io/guidelines/motion/choreography.html.
 * \@docs-private
 */
export class MdDialogContainer extends BasePortalHost {
    /**
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    constructor(_ngZone, _renderer, _elementRef, _focusTrapFactory) {
        super();
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._elementFocusedBeforeDialogWasOpened = null;
        /** State of the dialog animation. */
        this._state = 'enter';
        /** Emits the current animation state whenever it changes. */
        this._onAnimationStateChange = new EventEmitter();
    }
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    attachComponentPortal(portal) {
        if (this._portalHost.hasAttached()) {
            throw new MdDialogContentAlreadyAttachedError();
        }
        let /** @type {?} */ attachResult = this._portalHost.attachComponentPortal(portal);
        this._trapFocus();
        return attachResult;
    }
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    attachTemplatePortal(portal) {
        if (this._portalHost.hasAttached()) {
            throw new MdDialogContentAlreadyAttachedError();
        }
        let /** @type {?} */ attachedResult = this._portalHost.attachTemplatePortal(portal);
        this._trapFocus();
        return attachedResult;
    }
    /**
     * Moves the focus inside the focus trap.
     * @return {?}
     */
    _trapFocus() {
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => {
            this._elementFocusedBeforeDialogWasOpened = (document.activeElement);
            this._focusTrap.focusFirstTabbableElement();
        });
    }
    /**
     * Kicks off the leave animation.
     * \@docs-private
     * @return {?}
     */
    _exit() {
        this._state = 'exit';
        this._onAnimationStateChange.emit('exit-start');
    }
    /**
     * Callback, invoked whenever an animation on the host completes.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    _onAnimationDone(event) {
        this._onAnimationStateChange.emit(/** @type {?} */ (event.toState));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // When the dialog is destroyed, return focus to the element that originally had it before
        // the dialog was opened. Wait for the DOM to finish settling before changing the focus so
        // that it doesn't end up back on the <body>. Also note that we need the extra check, because
        // IE can set the `activeElement` to null in some cases.
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => {
            let /** @type {?} */ toFocus = (this._elementFocusedBeforeDialogWasOpened);
            // We need to check whether the focus method exists at all, because IE seems to throw an
            // exception, even if the element is the document.body.
            if (toFocus && 'focus' in toFocus) {
                toFocus.focus();
            }
            this._onAnimationStateChange.complete();
        });
        this._focusTrap.destroy();
    }
}
MdDialogContainer.decorators = [
    { type: Component, args: [{selector: 'md-dialog-container, mat-dialog-container',
                template: "<ng-template cdkPortalHost></ng-template> ",
                styles: [".mat-dialog-container{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:block;padding:24px;border-radius:2px;box-sizing:border-box;overflow:auto;max-width:80vw;width:100%;height:100%}@media screen and (-ms-high-contrast:active){.mat-dialog-container{outline:solid 1px}}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto}.mat-dialog-title{font-size:20px;font-weight:700;margin:0 0 20px;display:block}.mat-dialog-actions{padding:12px 0;display:flex}.mat-dialog-actions:last-child{margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center} /*# sourceMappingURL=dialog.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                animations: [
                    trigger('slideDialog', [
                        state('void', style({ transform: 'translateY(25%) scale(0.9)', opacity: 0 })),
                        state('enter', style({ transform: 'translateY(0%) scale(1)', opacity: 1 })),
                        state('exit', style({ transform: 'translateY(25%)', opacity: 0 })),
                        transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
                    ])
                ],
                host: {
                    '[class.mat-dialog-container]': 'true',
                    '[attr.role]': 'dialogConfig?.role',
                    '[@slideDialog]': '_state',
                    '(@slideDialog.done)': '_onAnimationDone($event)',
                },
            },] },
];
/**
 * @nocollapse
 */
MdDialogContainer.ctorParameters = () => [
    { type: NgZone, },
    { type: Renderer, },
    { type: ElementRef, },
    { type: FocusTrapFactory, },
];
MdDialogContainer.propDecorators = {
    '_portalHost': [{ type: ViewChild, args: [PortalHostDirective,] },],
};
function MdDialogContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    MdDialogContainer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdDialogContainer.ctorParameters;
    /** @type {?} */
    MdDialogContainer.propDecorators;
    /**
     * The portal host inside of this container into which the dialog content will be loaded.
     * @type {?}
     */
    MdDialogContainer.prototype._portalHost;
    /**
     * The class that traps and manages focus within the dialog.
     * @type {?}
     */
    MdDialogContainer.prototype._focusTrap;
    /**
     * Element that was focused before the dialog was opened. Save this to restore upon close.
     * @type {?}
     */
    MdDialogContainer.prototype._elementFocusedBeforeDialogWasOpened;
    /**
     * The dialog configuration.
     * @type {?}
     */
    MdDialogContainer.prototype.dialogConfig;
    /**
     * State of the dialog animation.
     * @type {?}
     */
    MdDialogContainer.prototype._state;
    /**
     * Emits the current animation state whenever it changes.
     * @type {?}
     */
    MdDialogContainer.prototype._onAnimationStateChange;
    /** @type {?} */
    MdDialogContainer.prototype._ngZone;
    /** @type {?} */
    MdDialogContainer.prototype._renderer;
    /** @type {?} */
    MdDialogContainer.prototype._elementRef;
    /** @type {?} */
    MdDialogContainer.prototype._focusTrapFactory;
}
//# sourceMappingURL=dialog-container.js.map
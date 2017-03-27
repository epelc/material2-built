import { Subject } from 'rxjs/Subject';
/**
 * Reference to a dialog opened via the MdDialog service.
 */
export class MdDialogRef {
    /**
     * @param {?} _overlayRef
     * @param {?} _containerInstance
     */
    constructor(_overlayRef, _containerInstance) {
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this._afterClosed = new Subject();
        _containerInstance._onAnimationStateChange.subscribe((state) => {
            if (state === 'exit-start') {
                // Transition the backdrop in parallel with the dialog.
                this._overlayRef.detachBackdrop();
            }
            else if (state === 'exit') {
                this._overlayRef.dispose();
                this._afterClosed.next(this._result);
                this._afterClosed.complete();
                this.componentInstance = null;
            }
        });
    }
    /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    close(dialogResult) {
        this._result = dialogResult;
        this._containerInstance._exit();
    }
    /**
     * Gets an observable that is notified when the dialog is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
}
function MdDialogRef_tsickle_Closure_declarations() {
    /**
     * The instance of component opened into the dialog.
     * @type {?}
     */
    MdDialogRef.prototype.componentInstance;
    /**
     * Subject for notifying the user that the dialog has finished closing.
     * @type {?}
     */
    MdDialogRef.prototype._afterClosed;
    /**
     * Result to be passed to afterClosed.
     * @type {?}
     */
    MdDialogRef.prototype._result;
    /** @type {?} */
    MdDialogRef.prototype._overlayRef;
    /** @type {?} */
    MdDialogRef.prototype._containerInstance;
}
//# sourceMappingURL=dialog-ref.js.map
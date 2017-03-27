import { NgModule } from '@angular/core';
import { MdPlaceholder, MdInputContainer, MdHint, MdInputDirective } from './input-container';
import { MdTextareaAutosize } from './autosize';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatformModule } from '../core/platform/index';
export class MdInputModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdInputModule,
            providers: [],
        };
    }
}
MdInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MdPlaceholder,
                    MdInputContainer,
                    MdHint,
                    MdTextareaAutosize,
                    MdInputDirective
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    PlatformModule,
                ],
                exports: [
                    MdPlaceholder,
                    MdInputContainer,
                    MdHint,
                    MdTextareaAutosize,
                    MdInputDirective
                ],
            },] },
];
/**
 * @nocollapse
 */
MdInputModule.ctorParameters = () => [];
function MdInputModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdInputModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdInputModule.ctorParameters;
}
export { MdTextareaAutosize } from './autosize';
export { MdPlaceholder, MdHint, MdInputDirective, MdInputContainer } from './input-container';
export { MdInputContainerPlaceholderConflictError, MdInputContainerUnsupportedTypeError, MdInputContainerDuplicatedHintError, MdInputContainerMissingMdInputError } from './input-container-errors';
//# sourceMappingURL=index.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
export var MdOption = (function () {
    function MdOption(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._selected = false;
        /** Event emitted when the option is selected. */
        this.onSelect = new EventEmitter();
    }
    Object.defineProperty(MdOption.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         * TODO(kara): Add input property alternative for node envs.
         */
        get: function () {
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    MdOption.prototype.select = function () {
        this._selected = true;
        this.onSelect.emit();
    };
    /** Deselects the option. */
    MdOption.prototype.deselect = function () {
        this._selected = false;
    };
    /** Sets focus onto this option. */
    MdOption.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    };
    /** Ensures the option is selected when activated from the keyboard. */
    MdOption.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    MdOption.prototype._selectViaInteraction = function () {
        this._selected = true;
        this.onSelect.emit(true);
    };
    MdOption.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdOption.prototype, "value", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdOption.prototype, "onSelect", void 0);
    MdOption = __decorate([
        Component({selector: 'md-option',
            host: {
                'role': 'option',
                'tabindex': '0',
                '[class.md-selected]': 'selected',
                '[attr.aria-selected]': 'selected.toString()',
                '(click)': '_selectViaInteraction()',
                '(keydown)': '_handleKeydown($event)'
            },
            template: "<ng-content></ng-content> <div class=\"md-option-ripple\" md-ripple md-ripple-background-color=\"rgba(0,0,0,0)\" [md-ripple-trigger]=\"_getHostElement()\"></div>",
            styles: ["/** The mixins below are shared between md-menu and md-select */ /** * This mixin adds the correct panel transform styles based * on the direction that the menu panel opens. */ md-select { display: inline-block; outline: none; } .md-select-trigger { display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; cursor: pointer; } .md-select-placeholder { padding: 0 2px; transform-origin: left top; } [dir='rtl'] .md-select-placeholder { transform-origin: right top; } [aria-required=true] .md-select-placeholder::after { content: '*'; } .md-select-value { position: absolute; } .md-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; } .md-select-panel { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; transform-origin: top; } md-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; } md-option[disabled] { cursor: default; } md-option md-icon { margin-right: 16px; } [dir='rtl'] md-option md-icon { margin-left: 16px; } .md-option-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } /*# sourceMappingURL=select.css.map */ "],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], MdOption);
    return MdOption;
}());

//# sourceMappingURL=option.js.map

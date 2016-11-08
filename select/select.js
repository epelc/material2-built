var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Renderer, ViewEncapsulation, ViewChild } from '@angular/core';
import { MdOption } from './option';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { ListKeyManager } from '../core/a11y/list-key-manager';
import { Dir } from '../core/rtl/dir';
import { transformPlaceholder, transformPanel, fadeInContent } from './select-animations';
import { NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '../core/coersion/boolean-property';
export var MdSelect = (function () {
    function MdSelect(_element, _renderer, _dir, _control) {
        this._element = _element;
        this._renderer = _renderer;
        this._dir = _dir;
        this._control = _control;
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        /** Subscriptions to option events. */
        this._subscriptions = [];
        /** Whether filling out the select is required in the form.  */
        this._required = false;
        /** This position config ensures that the top left corner of the overlay
         * is aligned with with the top left of the origin (overlapping the trigger
         * completely). In RTL mode, the top right corners are aligned instead.
         */
        this._positions = [{
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top'
            }];
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this._control.valueAccessor = this;
    }
    Object.defineProperty(MdSelect.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    MdSelect.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._initKeyManager();
        this._listenToOptions();
        this._changeSubscription = this.options.changes.subscribe(function () {
            _this._dropSubscriptions();
            _this._listenToOptions();
        });
    };
    MdSelect.prototype.ngOnDestroy = function () {
        this._dropSubscriptions();
        this._changeSubscription.unsubscribe();
        this._tabSubscription.unsubscribe();
    };
    /** Toggles the overlay panel open or closed. */
    MdSelect.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    MdSelect.prototype.open = function () {
        this._panelOpen = true;
    };
    /** Closes the overlay panel and focuses the host element. */
    MdSelect.prototype.close = function () {
        this._panelOpen = false;
        this._focusHost();
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     */
    MdSelect.prototype.writeValue = function (value) {
        if (!this.options) {
            return;
        }
        this.options.forEach(function (option) {
            if (option.value === value) {
                option.select();
            }
        });
    };
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     */
    MdSelect.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     */
    MdSelect.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    Object.defineProperty(MdSelect.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdSelect.prototype, "selected", {
        /** The currently selected option. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    MdSelect.prototype._isRtl = function () {
        return this._dir ? this._dir.value === 'rtl' : false;
    };
    /** The width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    MdSelect.prototype._getWidth = function () {
        return this.trigger.nativeElement.getBoundingClientRect().width;
    };
    /** The animation state of the placeholder. */
    MdSelect.prototype._getPlaceholderState = function () {
        if (this.panelOpen || this.selected) {
            return this._isRtl() ? 'floating-rtl' : 'floating-ltr';
        }
        else {
            return 'normal';
        }
    };
    /** The animation state of the overlay panel. */
    MdSelect.prototype._getPanelState = function () {
        return this._isRtl() ? 'showing-rtl' : 'showing-ltr';
    };
    /** Ensures the panel opens if activated by the keyboard. */
    MdSelect.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.open();
        }
    };
    /**
     * When the panel is finished animating, emits an event and focuses
     * an option if the panel is open.
     */
    MdSelect.prototype._onPanelDone = function () {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    MdSelect.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    MdSelect.prototype._initKeyManager = function () {
        var _this = this;
        this._keyManager = new ListKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () {
            _this.close();
        });
    };
    /** Listens to selection events on each option. */
    MdSelect.prototype._listenToOptions = function () {
        var _this = this;
        this.options.forEach(function (option) {
            var sub = option.onSelect.subscribe(function (isUserInput) {
                if (isUserInput) {
                    _this._onChange(option.value);
                }
                _this._onSelect(option);
            });
            _this._subscriptions.push(sub);
        });
    };
    /** Unsubscribes from all option subscriptions. */
    MdSelect.prototype._dropSubscriptions = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._subscriptions = [];
    };
    /** When a new option is selected, deselects the others and closes the panel. */
    MdSelect.prototype._onSelect = function (option) {
        this._selected = option;
        this._updateOptions();
        this.close();
    };
    /** Deselect each option that doesn't match the current selection. */
    MdSelect.prototype._updateOptions = function () {
        var _this = this;
        this.options.forEach(function (option) {
            if (option !== _this.selected) {
                option.deselect();
            }
        });
    };
    /** Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     */
    MdSelect.prototype._focusCorrectOption = function () {
        if (this.selected) {
            this._keyManager.focusedItemIndex = this._getOptionIndex(this.selected);
            this.selected.focus();
        }
        else {
            this._keyManager.focusedItemIndex = 0;
            this.options.first.focus();
        }
    };
    /** Focuses the host element when the panel closes. */
    MdSelect.prototype._focusHost = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    /** Gets the index of the provided option in the option list. */
    MdSelect.prototype._getOptionIndex = function (option) {
        return this.options.reduce(function (result, current, index) {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    };
    __decorate([
        ViewChild('trigger'), 
        __metadata('design:type', ElementRef)
    ], MdSelect.prototype, "trigger", void 0);
    __decorate([
        ContentChildren(MdOption), 
        __metadata('design:type', QueryList)
    ], MdSelect.prototype, "options", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], MdSelect.prototype, "placeholder", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "required", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "onOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "onClose", void 0);
    MdSelect = __decorate([
        Component({selector: 'md-select',
            template: "<div class=\"md-select-trigger\" overlay-origin (click)=\"toggle()\" #origin=\"overlayOrigin\" #trigger> <span class=\"md-select-placeholder\" [@transformPlaceholder]=\"_getPlaceholderState()\"> {{ placeholder }} </span> <span class=\"md-select-value\" *ngIf=\"selected\"> {{ selected?.viewValue }} </span> <span class=\"md-select-arrow\"></span> </div> <template connected-overlay [origin]=\"origin\"  [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\" backdropClass=\"md-overlay-transparent-backdrop\" [positions]=\"_positions\" [width]=\"_getWidth()\"> <div class=\"md-select-panel\" [@transformPanel]=\"_getPanelState()\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_keyManager.onKeydown($event)\"> <div class=\"md-select-content\" [@fadeInContent]=\"'showing'\"> <ng-content></ng-content> </div> </div> </template> ",
            styles: ["/** The mixins below are shared between md-menu and md-select */ /** * This mixin adds the correct panel transform styles based * on the direction that the menu panel opens. */ md-select { display: inline-block; outline: none; } .md-select-trigger { display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; cursor: pointer; } .md-select-placeholder { padding: 0 2px; transform-origin: left top; } [dir='rtl'] .md-select-placeholder { transform-origin: right top; } [aria-required=true] .md-select-placeholder::after { content: '*'; } .md-select-value { position: absolute; } .md-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; } .md-select-panel { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; transform-origin: top; } md-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; } md-option[disabled] { cursor: default; } md-option md-icon { margin-right: 16px; } [dir='rtl'] md-option md-icon { margin-left: 16px; } .md-option-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } /*# sourceMappingURL=select.css.map */ "],
            encapsulation: ViewEncapsulation.None,
            host: {
                'role': 'listbox',
                'tabindex': '0',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-invalid]': '_control?.invalid || "false"',
                '(keydown)': '_handleKeydown($event)',
                '(blur)': '_onBlur()'
            },
            animations: [
                transformPlaceholder,
                transformPanel,
                fadeInContent
            ],
            exportAs: 'mdSelect',
        }),
        __param(2, Optional()),
        __param(3, Optional()), 
        __metadata('design:paramtypes', [ElementRef, Renderer, Dir, NgControl])
    ], MdSelect);
    return MdSelect;
}());

//# sourceMappingURL=select.js.map

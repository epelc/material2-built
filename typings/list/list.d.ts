import { QueryList, ElementRef, Renderer, AfterContentInit } from '@angular/core';
import { MdLine } from '../core';
export declare class MdListDivider {
}
export declare class MdList {
    private _disableRipple;
    /**
     * Whether the ripple effect should be disabled on the list-items or not.
     * This flag only has an effect for `md-nav-list` components.
     */
    disableRipple: boolean;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MdListCssMatStyler {
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MdNavListCssMatStyler {
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MdDividerCssMatStyler {
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MdListAvatarCssMatStyler {
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MdListIconCssMatStyler {
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export declare class MdListSubheaderCssMatStyler {
}
export declare class MdListItem implements AfterContentInit {
    private _renderer;
    private _element;
    private _list;
    private _lineSetter;
    private _disableRipple;
    private _isNavList;
    _hasFocus: boolean;
    /**
     * Whether the ripple effect on click should be disabled. This applies only to list items that are
     * part of a nav list. The value of `disableRipple` on the `md-nav-list` overrides this flag.
     */
    disableRipple: boolean;
    _lines: QueryList<MdLine>;
    _hasAvatar: MdListAvatarCssMatStyler;
    constructor(_renderer: Renderer, _element: ElementRef, _list: MdList, navList: MdNavListCssMatStyler);
    ngAfterContentInit(): void;
    /** Whether this list item should show a ripple effect when clicked.  */
    isRippleEnabled(): boolean;
    _handleFocus(): void;
    _handleBlur(): void;
}

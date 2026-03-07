import React, { Component } from 'react';
import MaskResolver from './mask-resolver';

export default class BaseTextComponent extends Component {
    constructor(props) {
        super(props);

        this._resolveMaskHandler(props.kind);
        const value = this._getDefaultMaskedValue(props.defaultValue);
        this.state = { value };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.kind !== nextProps.kind) {
            this._resolveMaskHandler(nextProps.kind);
        }
        return true;
    }

    updateValue(text) {
        let self = this;

        return new Promise((resolve, reject) => {
            let maskedText = self._getMaskedValue(text);
            if (self._isControlled()) {
                resolve(maskedText);
                return;
            }

            if (this.state.value == maskedText) {
                resolve(this.state.value);
                return;
            }

            self.setState({ value: maskedText }, () => resolve(maskedText));
        });
    }

    isValid() {
        const value = this._isControlled() ? this.props.value : this.state.value;
        return this._maskHandler.validate(
            this._getDefaultValue(value),
            this.state.options
        );
    }

    getRawValue() {
        const value = this._isControlled() ? this.props.value : this.state.value;
        return this._maskHandler.getRawValue(
            this._getDefaultValue(value),
            this.state.options
        );
    }

    _isControlled() {
        return this.props.value !== undefined;
    }

    _resolveMaskHandler(kind) {
        this._maskHandler = MaskResolver.resolve(kind);
    }

	_getDefaultMaskedValue(value) {
		if (this._getDefaultValue(value) === '') {
			return ''
		}

		return this._getMaskedValue(value)
	}

    _getMaskedValue(value) {
        let oldValue = this.state && this.state.value;

        return this._maskHandler.getValue(
            this._getDefaultValue(value),
            this.props.options,
            oldValue);
	}

    _getDefaultValue(value) {
		if(value === undefined || value === null) {
			return '';
		}

		return value;
	}
}

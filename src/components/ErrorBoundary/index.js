// Core
import React, { Component } from 'react';
// Instruments
import styled, { css } from 'styled-components';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('error', error);
        console.log('info:', errorInfo);
    }

    render() {
        const { hasError } = this.state;
        return (
            <>
                {hasError ? (
                    <>
                        <h1>Something went wrong.</h1>
                    </>
                ) : (
                    this.props.children
                )}
            </>
        );
    }
}

export default ErrorBoundary;

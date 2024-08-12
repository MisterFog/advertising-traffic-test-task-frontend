import * as Sentry from '@sentry/react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallbackComponent?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Sentry.FallbackRender
    | undefined;
}

interface State {
  hasError: boolean;
}

const FallbackContent = () => (
  <div style={{ textAlign: 'center' }}>
    <p>An error has occurred</p>
    <p>
      <a href="/">Reload page</a>
    </p>
  </div>
);

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error } as any);
    Sentry.captureException(error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Sentry.ErrorBoundary fallback={this.props.fallbackComponent || FallbackContent}>
          {this.props.children}
        </Sentry.ErrorBoundary>
      );
    }

    return this.props.children;
  }
}

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    retryCount: 0,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error intercepted by ErrorBoundary:", error, errorInfo);
    
    // Automatically attempt to repair immediately up to 3 times
    if (this.state.retryCount < 3) {
      setTimeout(() => {
        this.setState((prevState) => ({
          hasError: false,
          error: null,
          retryCount: prevState.retryCount + 1,
        }));
      }, 1500); // Wait 1.5 seconds so the auto-repair process is visible, then clear the error
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, retryCount: 0 });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const isAutoRepairing = this.state.retryCount < 3;
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
            {isAutoRepairing ? (
              <>
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-blue-50 animate-pulse">
                  <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Auto-Repairing...</h2>
                <p className="text-slate-500 mb-2 text-sm">
                  An error was detected. The AI watcher is immediately rewriting the state.
                </p>
                <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider">
                  Attempt {this.state.retryCount + 1} of 3
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Manual Override Required</h2>
                <p className="text-slate-500 mb-8 text-sm">
                  Auto-repair was unsuccessful after 3 attempts. Please initialize a hard reboot.
                </p>
                <Button onClick={this.handleReset} className="w-full h-12 text-base rounded-xl font-medium">
                  Hard Reboot
                </Button>
              </>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

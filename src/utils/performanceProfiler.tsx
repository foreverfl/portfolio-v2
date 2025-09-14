import React, { Profiler, ProfilerOnRenderCallback } from 'react';

// Performance metrics collection
interface RenderMetrics {
  id: string;
  phase: 'mount' | 'update' | 'nested-update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<any>;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: Map<string, RenderMetrics[]> = new Map();
  private enabled = process.env.NODE_ENV === 'development';

  onRender: ProfilerOnRenderCallback = (
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    if (!this.enabled) return;

    const metric: RenderMetrics = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions: new Set(),
      timestamp: Date.now(),
    };

    const existing = this.metrics.get(id) || [];
    existing.push(metric);
    this.metrics.set(id, existing);

    // Log significant re-renders
    if (actualDuration > 16) { // Over 1 frame (16ms)
      console.warn(`⚠️ Slow render: ${id} took ${actualDuration.toFixed(2)}ms`);
    }
  };

  getReport(componentId?: string) {
    if (componentId) {
      const metrics = this.metrics.get(componentId) || [];
      return this.analyzeMetrics(componentId, metrics);
    }

    const report: any = {};
    this.metrics.forEach((metrics, id) => {
      report[id] = this.analyzeMetrics(id, metrics);
    });
    return report;
  }

  private analyzeMetrics(id: string, metrics: RenderMetrics[]) {
    if (metrics.length === 0) return null;

    const durations = metrics.map(m => m.actualDuration);
    const updates = metrics.filter(m => m.phase === 'update');

    return {
      componentId: id,
      renderCount: metrics.length,
      mountCount: metrics.filter(m => m.phase === 'mount').length,
      updateCount: updates.length,
      averageDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      totalDuration: durations.reduce((a, b) => a + b, 0),
      unnecessaryRenders: updates.filter(m => m.actualDuration < 0.1).length,
    };
  }

  reset() {
    this.metrics.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();

// HOC for wrapping components with Profiler
export function withProfiler<P extends object>(
  Component: React.ComponentType<P>,
  id: string
) {
  const ProfiledComponent = React.forwardRef<any, P>((props, ref) => (
    <Profiler id={id} onRender={performanceMonitor.onRender}>
      <Component {...(props as P)} ref={ref} />
    </Profiler>
  ));

  ProfiledComponent.displayName = `Profiled(${Component.displayName || Component.name || id})`;
  return ProfiledComponent;
}

// Hook for manual performance tracking
export function useRenderTracking(componentName: string) {
  const renderCount = React.useRef(0);
  const renderStartTime = React.useRef(performance.now());

  React.useEffect(() => {
    renderCount.current++;
    const renderTime = performance.now() - renderStartTime.current;

    if (renderCount.current > 1 && renderTime > 16) {
      console.warn(`🔄 ${componentName} re-rendered (${renderCount.current}x, ${renderTime.toFixed(2)}ms)`);
    }

    renderStartTime.current = performance.now();
  });

  return renderCount.current;
}

// Export performance report to console
export function logPerformanceReport() {
  const report = performanceMonitor.getReport();
  console.group('📊 Performance Report');
  Object.entries(report).forEach(([id, data]) => {
    if (data) {
      console.log(`${id}:`, data);
    }
  });
  console.groupEnd();
  return report;
}

// Utility to detect why component re-rendered
export function useWhyDidYouUpdate(name: string, props: Record<string, any>) {
  const previousProps = React.useRef<Record<string, any> | undefined>(undefined);

  React.useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changedProps: Record<string, any> = {};

      allKeys.forEach(key => {
        if (previousProps.current![key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current![key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps);
      }
    }

    previousProps.current = props;
  });
}
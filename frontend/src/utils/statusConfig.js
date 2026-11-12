export const investigationStatusConfig = {
  NO_ISSUE_DETECTED: {
    label: 'No Issue Detected',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  EVENT_PATTERN_REVIEW: {
    label: 'Event Pattern Review',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  TIMING_INCONSISTENCY: {
    label: 'Timing Inconsistency',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
  },
};

export const journeyTypeConfig = {
  CONNECTING: {
    label: 'Connecting',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  DIRECT: {
    label: 'Direct',
    color: '#64748b',
    bgColor: '#f1f5f9',
    borderColor: '#cbd5e1',
  },
};

export const eventTypeIcons = {
  CHECK_IN: 'ClipboardCheck',
  SECURITY_SCAN: 'ShieldCheck',
  SORTED: 'ArrowDownUp',
  LOADED: 'PackagePlus',
  ARRIVED: 'PlaneLanding',
  UNLOADED: 'PackageMinus',
  TRANSFER: 'ArrowLeftRight',
  DELIVERED: 'PackageCheck',
};

export function getInvestigationStatusConfig(status) {
  return investigationStatusConfig[status] || {
    label: status || 'Unknown',
    color: '#64748b',
    bgColor: '#f1f5f9',
    borderColor: '#cbd5e1',
  };
}

export function getJourneyTypeConfig(type) {
  return journeyTypeConfig[type] || {
    label: type || 'Unknown',
    color: '#64748b',
    bgColor: '#f1f5f9',
    borderColor: '#cbd5e1',
  };
}

export const exceptionStatusConfig = {
  OPEN: {
    label: 'Open',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  RESOLVED: {
    label: 'Resolved',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
};

export const exceptionSeverityConfig = {
  HIGH: {
    label: 'High',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  MEDIUM: {
    label: 'Medium',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  LOW: {
    label: 'Low',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
};

export function getExceptionStatusConfig(status) {
  return exceptionStatusConfig[status] || {
    label: status || 'Unknown',
    color: '#64748b',
    bgColor: '#f1f5f9',
    borderColor: '#cbd5e1',
  };
}

export function getExceptionSeverityConfig(severity) {
  return exceptionSeverityConfig[severity] || {
    label: severity || 'Unknown',
    color: '#64748b',
    bgColor: '#f1f5f9',
    borderColor: '#cbd5e1',
  };
}

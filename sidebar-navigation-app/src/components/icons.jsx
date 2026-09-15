function iconProps(className) {
  return {
    className: className || 'size-5',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
}

export function SearchIcon({ className }) {
  return (
    <svg {...iconProps(className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export function ChevronDownIcon({ className }) {
  return (
    <svg {...iconProps(className)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function ChevronSelectorVerticalIcon({ className }) {
  return (
    <svg {...iconProps(className)}>
      <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
    </svg>
  )
}

export function AlertTriangleIcon({ className }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export function ArrowLeftIcon({ className }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

export function CheckIcon({ className }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function XIcon({ className }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function ArrowRightIcon({ className }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

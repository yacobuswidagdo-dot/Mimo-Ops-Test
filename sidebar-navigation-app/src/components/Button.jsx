function Button({ variant = 'secondary', className = '', children, ...props }) {
  const base =
    'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-semibold shadow-xs'
  const variants = {
    primary: 'bg-[#7f56d9] text-white',
    secondary: 'border border-[#d5d7da] bg-white text-[#414651]',
    'secondary-active': 'border border-[#d6bbfb] bg-white text-[#6941c6]',
  }

  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button

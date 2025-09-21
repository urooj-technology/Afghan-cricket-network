// RTL utility functions for consistent RTL/LTR handling
export const getTextAlign = (isRTL, defaultAlign = 'left') => {
  if (defaultAlign === 'center') return 'text-center'
  return isRTL ? 'text-right' : 'text-left'
}

export const getFlexDirection = (isRTL, reverse = false) => {
  if (reverse) return isRTL ? 'flex-row' : 'flex-row-reverse'
  return isRTL ? 'flex-row-reverse' : 'flex-row'
}

export const getSpacing = (isRTL, leftClass, rightClass) => {
  return isRTL ? rightClass : leftClass
}

export const getIconSpacing = (isRTL, position = 'left') => {
  if (position === 'left') {
    return isRTL ? 'ml-2' : 'mr-2'
  }
  return isRTL ? 'mr-2' : 'ml-2'
}

export const getFontClass = (isRTL) => {
  return isRTL ? 'font-arabic' : ''
}

export const getDirection = (isRTL) => {
  return isRTL ? 'rtl' : 'ltr'
}

export const getFloatClass = (isRTL, side = 'left') => {
  if (side === 'left') return isRTL ? 'float-right' : 'float-left'
  return isRTL ? 'float-left' : 'float-right'
}

export const getBorderClass = (isRTL, side = 'left') => {
  if (side === 'left') return isRTL ? 'border-r-4' : 'border-l-4'
  return isRTL ? 'border-l-4' : 'border-r-4'
}

export const getRoundedClass = (isRTL, side = 'left') => {
  if (side === 'left') return isRTL ? 'rounded-r-lg' : 'rounded-l-lg'
  return isRTL ? 'rounded-l-lg' : 'rounded-r-lg'
}

export const getPositionClass = (isRTL, side = 'left', value = '3') => {
  if (side === 'left') return isRTL ? `right-${value}` : `left-${value}`
  return isRTL ? `left-${value}` : `right-${value}`
}

export const getPaddingClass = (isRTL, side = 'left', value = '4') => {
  if (side === 'left') return isRTL ? `pr-${value}` : `pl-${value}`
  return isRTL ? `pl-${value}` : `pr-${value}`
}

export const getMarginClass = (isRTL, side = 'left', value = '4') => {
  if (side === 'left') return isRTL ? `mr-${value}` : `ml-${value}`
  return isRTL ? `ml-${value}` : `mr-${value}`
}
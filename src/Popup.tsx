import {
  useCallback,
  memo,
} from 'react'

import usePopup from 'store/usePopup'
import Notification from 'ui/Notification'
import Dots from 'ui/Dots'

const Popup = () => {
  const [popup] = usePopup()

  const {
    initial,
    error,
    waiting,
  } = popup

  const WrappedPopup = useCallback((props) => (
    <Notification
      {...props}
      noAnimation={initial}
    />
  ), [initial])

  if (error) {
    return (
      <WrappedPopup>
        {error}
      </WrappedPopup>
    )
  }

  if (waiting) {
    return (
      <WrappedPopup>
        wait
        <Dots
          initialNum={3}
          maxNum={3}
          interval={1000}
        />
      </WrappedPopup>
    )
  }
  return null
}

export default memo(Popup)

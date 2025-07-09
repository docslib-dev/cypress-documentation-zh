import React, { useEffect } from 'react'
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'
import IconMenu from '@theme/Icon/Menu'
export default function MobileSidebarToggle() {
  const { toggle, shown } = useNavbarMobileSidebar()

  return (
    <button
      onClick={toggle}
      aria-label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: '切换导航栏',
        description:
          '移动导航栏汉堡菜单按钮的ARIA标签',
      })}
      aria-expanded={shown}
      className="navbar__toggle clean-btn"
      type="button"
    >
      <IconMenu />
    </button>
  )
}
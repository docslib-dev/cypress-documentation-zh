import React from 'react'
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import IconClose from '@theme/Icon/Close'
import NavbarLogo from '@theme/Navbar/Logo'
import { SocialIcons } from '../../Content/SocialIcons'

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar()
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: '关闭导航栏',
        description: '移动端侧边栏关闭按钮的ARIA标签',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  )
}

export default function NavbarMobileSidebarHeader() {
  return (
    <div className="navbar-sidebar__brand">
      <NavbarLogo />
      <SocialIcons className="flex ml-[8px]" />
      <CloseButton />
    </div>
  )
}
import React from 'react'
import { IconChevronLeftSmall } from '@cypress-design/react-icon'
import { useThemeConfig } from '@docusaurus/theme-common'
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal'
import Translate from '@docusaurus/Translate'
function SecondaryMenuBackButton(
  props: Omit<React.ComponentProps<'button'>, 'type'>
) {
  return (
    <>
      <button
        {...props}
        type="button"
        className="flex items-center px-1 clean-btn navbar-sidebar__back gap-[4px] hover:text-teal-700 dark:hover:text-teal-100"
      >
        <IconChevronLeftSmall />
        <Translate
          id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
          description="移动导航栏侧边栏二级菜单中返回主菜单的按钮标签（主要用于显示文档侧边栏）"
        >
          返回主菜单
        </Translate>
      </button>
      <hr className="h-[1px] bg-gray-100 dark:bg-gray-800 mr-[16px]" />
    </>
  )
}
// 二级菜单从右侧滑出，显示上下文信息（如文档侧边栏）
export default function NavbarMobileSidebarSecondaryMenu() {
  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0
  const secondaryMenu = useNavbarSecondaryMenu()
  return (
    <>
      {/* 边界情况：当主菜单为空时防止返回 */}
      {!isPrimaryMenuEmpty && (
        <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
      )}
      <div className="my-[8px]">{secondaryMenu.content}</div>
    </>
  )
}
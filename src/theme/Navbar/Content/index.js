import React from 'react'
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common'
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal'
import NavbarItem from '@theme/NavbarItem'
import SearchBar from '@theme/SearchBar'
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle'
import NavbarLogo from '@theme/Navbar/Logo'
import NavbarSearch from '@theme/Navbar/Search'
import { SocialIcons } from './SocialIcons'
function useNavbarItems() {
  // TODO 临时类型转换，待ThemeConfig类型改进后移除
  return useThemeConfig().navbar.items
}

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `导航栏项目渲染失败。
请检查Docusaurus配置中的以下导航栏项目(themeConfig.navbar.items):
${JSON.stringify(item, null, 2)}`,
              { cause: error }
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  )
}

function NavbarContentLayout({ left, center, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items navbar__items--left">{left}</div>
      <div className="hidden navbar__items lg:flex">{center}</div>
      <div className="navbar__items navbar__items--right mr-[32px] lg:mr-0">
        {right}
      </div>
    </div>
  )
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar()
  const items = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems(items)
  const searchBarItem = items.find((item) => item.type === 'search')
  return (
    <NavbarContentLayout
      left={
        <>
          <NavbarMobileSidebarToggle
            className="navbar__toggle"
            sidebarShown={mobileSidebar.sidebarShown}
            setSidebarShown={mobileSidebar.setSidebarShown}
            aria-label="导航菜单"
          />
          <NavbarLogo
            className="navbar__brand"
            imageClassName="navbar__logo"
            titleClassName="navbar__title"
          />
        </>
      }
      center={<NavbarItems items={leftItems} />}
      right={
        // TODO 需要优化硬编码项目
        // 建议用户添加相应的导航栏项目以获得更灵活的配置
        <>
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
          <SocialIcons className="hidden sm:flex" />
        </>
      }
    />
  )
}
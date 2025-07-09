import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import E2EOnlyBadge from "@site/src/components/e2e-only-badge"
import ComponentOnlyBadge from "@site/src/components/component-only-badge"
import s from "./style.module.css";

/**
 标题可以在md内容中声明，也可以通过front matter手动添加。
 为了使这两种情况保持一致，添加的标题会被放在同一个div.markdown块下
 参见 https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 我们会在以下情况渲染"合成标题":
 - 用户没有通过front matter要求隐藏标题
 - markdown内容中尚未包含顶级h1标题
*/

function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}
export default function DocItemContent({children}: {children: React.ReactNode}) {

const syntheticTitle = useSyntheticTitle();
return (
  <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <div className={s.mainContentHeader}>
            <div className={s.headerWrapper}>
              <Heading as="h1">{syntheticTitle}</Heading>
            </div>
          </div>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
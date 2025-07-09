import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
export default function DocPaginator(props) {
  const {previous, next} = props;
  // 目前DS还没有提供隐藏这些内容的一流API，所以直接在这里屏蔽它们
  return null
}
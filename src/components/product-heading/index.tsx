import Icon from '@cypress-design/react-icon'
import Badge from "@site/src/components/badge"
import s from './style.module.css'
import {useDoc} from '@docusaurus/theme-common/internal';
import E2EOnlyBadge from "@site/src/components/e2e-only-badge";
import ComponentOnlyBadge from "@site/src/components/component-only-badge";

import React from 'react';

// 定义props的类型
interface ProductHeadingProps {
    product: 'app' | 'cloud' | 'accessibility' | 'ui-coverage'
    plan?: 'team' | 'business' | 'enterprise'
    badge?: React.ReactNode
}

// 使用指定props构建按钮组件
const DocProductHeading: React.FC<ProductHeadingProps> = ({ 
    product, // 要显示的产品
    plan, // 云产品的套餐类型
    badge, // 要显示的徽章
}) => {
    const productName = product === 'ui-coverage' ? 'UI覆盖率' : product === 'accessibility' ? 'Cypress无障碍测试' : product === 'cloud' ? 'Cypress云服务' : 'Cypress应用'
    const iconName = product === 'ui-coverage' ? 'technology-ui-coverage' : product === 'accessibility' ? 'cypress-accessibility-outline' : 'technology-cypress'
    const linkPath  = product === 'cloud' ? 'pricing' : product

    let badgeContent = product === 'cloud' ? '免费试用' : '高级解决方案'

    if (product === 'cloud' && plan) {
        badgeContent = plan === 'team' ? '团队套餐' : plan === 'business' ? '商业套餐' : '企业套餐'
    }

    return (
    <div className={s.productHeading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Icon 
            name={iconName} 
            className={s.productHeadingIcon}
        />
        <span className={s.productHeadingText}>
          {productName}
        </span>
        <a 
          href={`https://www.cypress.io/${linkPath}?utm_source=docs&utm_medium=product-heading-${product}&utm_content=${badgeContent}`}
          target="_blank"
          title="了解更多"
          className={s.productHeadingLink}
          >
            { product !== 'app' &&  <Badge type="success">{badgeContent}</Badge>}
        </a>
        <span className={s.productHeadingBadge}>{badge}</span>
    </div>
    )
}

const ProductHeading: React.FC<Omit<ProductHeadingProps, 'badge'>> = (props) => {
  const { frontMatter } = useDoc();
  const e2eSpecific = (frontMatter as any).e2eSpecific;
  const componentSpecific = (frontMatter as any).componentSpecific;
  const testTypePill = (e2eSpecific && <E2EOnlyBadge />) || (componentSpecific && <ComponentOnlyBadge />);
  return <DocProductHeading {...props} badge={testTypePill} />;
};

export default ProductHeading;
export { ProductHeading, DocProductHeading };
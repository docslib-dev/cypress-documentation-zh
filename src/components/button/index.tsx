import { 
    default as Button, 
    VariantClassesTable, 
} from '@cypress-design/react-button'
import Icon from '@cypress-design/react-icon'

import React from 'react';

// 定义props的类型
interface BtnProps {
    size?: 20 | 24 | 32 | 40 | 48
    variant?: keyof typeof VariantClassesTable
    block?: boolean;
    disabled?: boolean;
    target?: string;
    className?: string;
    href?: string;
    label?: string;
    icon?: string;
}

// 使用指定的props构建Button组件
const Btn: React.FC<BtnProps> = ({ 
    size = 32, // 按钮尺寸
    variant = 'outline-indigo', // 按钮变体
    disabled = false, // 是否禁用按钮
    target = '_self', // 按钮链接的打开目标
    className, // 按钮的自定义类名
    href, // 按钮跳转的URL
    label, // 按钮文本
    icon, // 按钮图标
}) => {
    return (
    <Button
        variant={variant}
        href={href}
        size={size}
        className={className}
        target={target}
        disabled={disabled}
    >
        {icon && 
            <Icon 
                className={'mr-1'}
                name={icon} 
            />
        }
        {label}
    </Button>
    )
}

export default Btn
import React from "react";
import s from "./style.module.css";
import { BadgeProps } from "./types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Badge({ type, path, children }: BadgeProps) {
  return (
    <>
      {path && (
        <a href={path} style={{ borderBottom: 'none' }}>
          <div className={classNames(`${s.badge}`, `${s[type]}`)}>
            {children}
          </div>
        </a>
      )}

      {!path && (
        // 简单的行内徽章（无链接）使用 span 标签，避免控制台报错"<div>不能作为<p>的子元素"
        <span className={classNames(`${s.badge}`, `${s[type]}`)}>{children}</span>
      )}
    </>
  );
}
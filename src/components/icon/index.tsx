import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps {
  name: string;
  color?: string;
  inline?: boolean;
  url?: string;
  callout?: string;
  contentType?: string;
  title?: string;
}

export default function Icon({ name, color, inline, url, callout, contentType, title }: IconProps) {
  const iconName = name === "github" ? ["fab", "github"] : name;
  const space = inline ? '.25rem' : '0.5rem'

  let content;

  if (callout) {
    content = callout;
  } else if (contentType === "lesson")  {
    content = '在GitHub上获取本课程的完整代码';
  } else if (contentType === "rwa") {
    content = '真实世界应用(RWA)'
    url = 'https://github.com/cypress-io/cypress-realworld-app'
  } else {
    content = url;
  }

  return (
    <>
      <FontAwesomeIcon icon={iconName} color={color} title={title}/>
      { url ? <a href={url} style={{ marginLeft: space }}>{ content }</a> : null}
    </>
  )
}
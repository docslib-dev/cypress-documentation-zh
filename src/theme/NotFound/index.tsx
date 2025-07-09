import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import s from "./style.module.css";

export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: '页面未找到',
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--offset-3">
              <h1 className="hero__title">
                <Translate
                  id="theme.NotFound.title"
                  description="404页面的标题">
                  404 页面未找到
                </Translate>
              </h1>
              <p className={s.content}>
                <Translate
                  id="theme.NotFound.p1"
                  description="404页面的第一段内容">
                  哎呀...我们找不到您要访问的页面。以下链接可能会对您有所帮助。
                </Translate>
              </p>
              <div className={s.listWrapper}>
                <ul>
                    <li>
                      <a href="/app/core-concepts/introduction-to-cypress">Cypress 简介</a>
                    </li>
                    <li>
                      <a href="/api">API 文档</a>
                    </li>
                    <li>
                      <a href="/examples/tutorials">教程</a>
                    </li>
                    <li>
                      <a href="/cloud/get-started/introduction">Cypress Cloud</a>
                    </li>
                  </ul>
              </div>
              <p className={s.ital}>
                <Translate
                  id="theme.NotFound.p2"
                  description="404页面的第二段内容">
                  试试使用顶部导航栏中的搜索功能吧。🔍
                </Translate>
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
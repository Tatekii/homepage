'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function SchemaOrg() {
  const pathname = usePathname()
  const baseUrl = 'https://siynspace.netlify.app' // 实际部署域名
  const url = `${baseUrl}${pathname}`

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Siyn Ma',
    url: baseUrl,
    jobTitle: 'Full Stack Developer',
    description: 'Experienced full-stack developer with 5+ years specializing in React, TypeScript, and Web3.',
    sameAs: [
      'https://github.com/Tatekii',
      'https://www.linkedin.com/in/%E6%80%9D%E5%BC%95-%E9%A9%AC-518a932a3/'
    ],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'React',
      'TypeScript',
      'Web3',
      'Blockchain',
      'Solidity'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shenzhen',
      addressCountry: 'China'
    },
    email: 'mrtatekii33@gmail.com'
  }

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Siyn Ma Portfolio',
    url: baseUrl,
    description: 'Portfolio website for Siyn Ma, a full stack developer specializing in React, TypeScript, and Web3',
    author: {
      '@type': 'Person',
      name: 'Siyn Ma'
    },
    keywords: 'web development, full stack developer, React, TypeScript, Web3, Blockchain, Solidity'
  }

  // 用于项目部分的Schema
  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SoftwareSourceCode',
        position: 1,
        name: 'MemeCoin众筹',
        description: '全栈meme币交易平台',
        programmingLanguage: ['Solidity', 'JavaScript'],
        codeRepository: 'https://github.com/Tatekii/fun-pump'
      },
      {
        '@type': 'SoftwareSourceCode',
        position: 2,
        name: 'jira克隆',
        description: '全栈项目管理工具，包含看板/日历/工作区/成员管理',
        programmingLanguage: ['JavaScript', 'TypeScript'],
        codeRepository: 'https://github.com/Tatekii/jiratata',
        url: 'https://jiratata.vercel.app'
      },
      {
        '@type': 'SoftwareSourceCode',
        position: 3,
        name: 'youtube克隆',
        description: '全栈视频分享平台，还原所有yt基础功能',
        programmingLanguage: ['JavaScript', 'TypeScript'],
        codeRepository: 'https://github.com/Tatekii/big-tube'
      }
    ]
  }

  const schemaData = JSON.stringify([personSchema, portfolioSchema, projectsSchema])

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaData }}
      strategy="afterInteractive"
    />
  )
}

export const parseBaiduPanText = (text) => {
  const result = {
    title: '',
    url: '',
    code: ''
  }

  const fileMatch = text.match(/通过网盘分享的文件：(.+)/)
  if (fileMatch) {
    result.title = fileMatch[1].trim()
  }

  const urlMatch = text.match(/链接:\s*`?([^`\s]+)`?/)
  if (urlMatch) {
    result.url = urlMatch[1].trim()
  }

  const codeMatch = text.match(/提取码:\s*(\w+)/)
  if (codeMatch) {
    result.code = codeMatch[1].trim()
  }

  return result
}

export const parseResources = (resources) => {
  return resources.map((text, index) => {
    const parsed = parseBaiduPanText(text)
    return {
      id: `res-${String(index + 1).padStart(3, '0')}`,
      title: parsed.title || '未知文件',
      url: parsed.url,
      code: parsed.code
    }
  }).filter(item => item.url)
}

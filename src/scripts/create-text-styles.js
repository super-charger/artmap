const fs = require('fs')
const path = require('path')

const TOKEN_NAME = 'textStyles'
const TOKEN_JSON_PATH = path.resolve(process.cwd(), 'public', 'token.json')
const OUTPUT_PATH = path.resolve(
  process.cwd(),
  'src',
  'generated',
  'tokens',
  'text-styles.ts',
)

function generateTextStyles() {
  if (!fs.existsSync(TOKEN_JSON_PATH)) {
    throw new Error('Token JSON file does not exist.')
  }
  // JSON 파일 읽기
  const tokenData = JSON.parse(fs.readFileSync(TOKEN_JSON_PATH, 'utf-8'))
  // 텍스트 스타일 객체 생성
  const textStyles = createTextStyles(tokenData.textStyles)
  // 출력할 TypeScript 코드 생성
  const output = `export const ${TOKEN_NAME} = ${JSON.stringify(textStyles, null, 2)}`
  // 출력 디렉토리 확인 및 생성
  const outputDir = path.dirname(OUTPUT_PATH)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  return { output, outputPath: OUTPUT_PATH }
}

/**
 * @param {*} str
 * @returns Noto Sans KR => Noto_Sans_KR
 */
function replaceSpacesWithUnderscore(str) {
  return str.replace(/\s+/g, '_')
}

/**
 * createTextStyles
 * @param {*} styles
 * @returns
 *
 * @example
 key가 "Button Large"인 경우
 결과는 ".button-large"가 됩니다.

 1. key.toLowerCase()
    - 모든 문자를 소문자로 변환합니다.
    - "Button Large" -> "button large"

 2. .replace(/\s+/g, '-')
    - 정규 표현식 /\s+/g를 사용하여 하나 이상의 연속된 공백을 찾습니다.
    - 찾은 모든 공백을 하이픈('-')으로 대체합니다.
    - "button large" -> "button-large"

 3. `.${...}`
    - 결과 문자열 앞에 점(.)을 추가하여 CSS 클래스 선택자로 만듭니다.
    - "button-large" -> ".button-large"
 */
function createTextStyles(styles) {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    const className = `.${key.toLowerCase().replace(/\s+/g, '-')}`
    acc[className] = {
      fontFamily: replaceSpacesWithUnderscore(value.fontFamily),
      fontSize: value.fontSize,
      lineHeight: value.lineHeight,
      fontWeight: String(value.fontWeight),
      textDecoration: value.textDecoration,
      letterSpacing: value.letterSpacing === '0%' ? '0' : value.letterSpacing,
    }
    return acc
  }, {})
}

module.exports = { generateTextStyles }

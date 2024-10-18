const fs = require('fs')
const { generateTextStyles } = require('./create-text-styles')

function generateTheme() {
  const textStyles = generateTextStyles()

  // 여기에 다른 스타일 생성 함수들을 추가할 수 있습니다.
  // const colors = generateColors();
  // const spacing = generateSpacing();

  // 각 스타일 파일 작성
  fs.writeFileSync(textStyles.outputPath, textStyles.output)
  // fs.writeFileSync(colors.outputPath, colors.output);
  // fs.writeFileSync(spacing.outputPath, spacing.output);

  console.log('All styles generated successfully.')
}

generateTheme()

import fs from 'fs'
import path from 'path'

import Image from 'next/image'

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles)
    } else if (/\.(png|jpe?g|svg|gif)$/.test(file)) {
      arrayOfFiles.push(filePath)
    }
  })

  return arrayOfFiles
}

export default function AllIconsPage() {
  const iconsDirectory = path.join(process.cwd(), 'public/icons')
  const iconFiles = getAllFiles(iconsDirectory).map((file) =>
    file.replace(path.join(process.cwd(), 'public'), ''),
  )

  return (
    <div className="grid w-full grid-cols-4 gap-4 bg-primary_sub p-4">
      {iconFiles.map((file, index) => (
        <div key={index}>
          <Image src={file} alt={path.basename(file)} width={50} height={50} />
          <p>
            {path.dirname(file)}/{path.basename(file)}
          </p>
        </div>
      ))}
    </div>
  )
}

import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'

function cleanHTML(content) {
    let text = content.replace(/&nbsp;/gi, ' ') // заменяем &nbsp; на пробел
    text = text.replace(/<div[^>]*>/gi, '\n') // div = перенос строки
    text = text.replace(/<br\s*\/?>/gi, '\n') // br = перенос строки
    text = text.replace(/<[^>]+>/g, '') // убираем все остальные теги
    return text.trim()
}

export function downloadTxt(title, content) {
    const blob = new Blob([cleanHTML(content)], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.txt`
    a.click()

    URL.revokeObjectURL(url)
}

export function downloadDocx(title, content) {
    const cleanedContent = cleanHTML(content);
  
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Заголовок
            new Paragraph({
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  font: "Cambria",
                  size: 48, // 24pt
                }),
              ],
            }),
            new Paragraph({ text: '' }),
            // Основной текст
            ...cleanedContent.split('\n').map(line =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                    font: "Calibri",
                    size: 32, // 16pt
                  }),
                ],
              })
            ),
          ],
        },
      ],
    })
  
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${title}.docx`)
    })
}

export function downloadJson(note) {
    const blob = new Blob([JSON.stringify(note, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${note.title || 'note'}.json`
    a.click()

    URL.revokeObjectURL(url)
}

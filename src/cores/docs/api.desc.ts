interface IApiDesc {
  title: string
  description: string
  content: string
}
export const apiDesc = ({ title, description, content }: IApiDesc) => {
  return `
## **${title}**
*${description}*

${content}
`
}

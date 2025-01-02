// eslint-disable-next-line no-shadow
import { Body, Button, Container, Hr, Html, Img, Section, Text } from '@react-email/components'
import * as React from 'react'

interface VerifyEmailProps {
  username: string
  url: string
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const hello = {
  fontSize: '20px',
  lineHeight: '30px',
  fontWeight: 'medium',
}
const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const buttonContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}

export const VerifyEmail = ({ username, url }: VerifyEmailProps) => (
  <Html>
    <Body style={main}>
      <Container style={container}>
        <Img src={`https://dev.image.lunas.vn/logo.png`} width="200" height="77" alt="Logo" style={logo} />
        <Text style={hello}>Chào {username},</Text>
        <Text style={paragraph}>
          Chào mừng đến với Lunas - trang web nơi bạn tìm thấy mọi phụ kiện anime mà bạn yêu thích.
        </Text>
        <Text style={paragraph}>
          Nếu như đúng là bạn đã đăng ký tài khoản, hãy nhấn vào nút bên dưới để xác nhận email của bạn.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={url}>
            Xác thực tài khoản
          </Button>
        </Section>
        <Text style={paragraph}>
          Thân,
          <br />
          Đội ngũ Lunas
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Đây là mail tự động gửi, vui lòng không phản hồi</Text>
      </Container>
    </Body>
  </Html>
)
export default VerifyEmail

import { Html } from '@react-email/components'
import React from 'react'

export default function ContactEmail({
  topic = 'Contact Email',
  content = 'Content',
  name = 'Name',
  phoneNumber = '0123456789',
  email = 'example@gmail.com',
}: {
  topic?: string
  content?: string
  name?: string
  phoneNumber?: string
  email?: string
}) {
  return (
    <Html
      style={{
        fontSize: '14px',
        lineHeight: '1.5',
      }}
    >
      <p>Kính gửi {name},</p>
      <p
        style={{
          margin: 0,
        }}
      >
        Cảm ơn bạn rất nhiều vì đã liên hệ với chúng tôi thông qua trang web Lunas Store
      </p>
      <br />
      <p
        style={{
          margin: 0,
        }}
      >
        Chúng tôi đã nhận được yêu cầu của bạn với các thông tin chi tiết sau:
      </p>
      <br />
      <p
        style={{
          margin: 0,
        }}
      >
        [Chi tiết yêu cầu]
      </p>
      <br />
      <p
        style={{
          margin: 0,
        }}
      >
        Name: {name}
      </p>
      <p
        style={{
          margin: 0,
        }}
      >
        Địa chỉ email: {email}
      </p>
      <p
        style={{
          margin: 0,
        }}
      >
        Số điện thoại: {phoneNumber}
      </p>
      <p
        style={{
          margin: 0,
        }}
      >
        Chủ đề: {topic}
      </p>
      <p
        style={{
          margin: 0,
        }}
      >
        Nội dung: <br />
        <span
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {content}
        </span>
      </p>
      <br />
      <p
        style={{
          margin: 0,
        }}
      >
        Một trong những đại diện của chúng tôi sẽ trả lời bạn trong vòng 3 ngày làm việc.
      </p>
      <p
        style={{
          margin: 0,
        }}
      >
        Trong trường hợp bạn không nhận được phản hồi từ chúng tôi sau 3 ngày làm việc, chúng tôi hi vọng bạn sẽ liên hệ
        lại với chúng tôi.
      </p>
      <br />
      <p
        style={{
          margin: 0,
        }}
      >
        Đối với những vấn đề khẩn cấp, vui lòng liên hệ trực tiếp với chúng tôi theo thông tin liên hệ bên dưới
      </p>
      <br />
      <p
        style={{
          margin: 0,
        }}
      >
        Cảm ơn bạn đã thông cảm.
      </p>
      <p>■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■</p>
      <p
        style={{
          margin: 0,
        }}
      >
        Lunas Store
      </p>
      <br />
      <a href="mailto:admin@lunas.vn" target="_blank">
        admin@lunas.vn
      </a>
      <p>038 3188 154 | +84 38 3188 154</p>
      <p> 64/17/38 Binh Phu Street, Tam Phu Ward, Thu Duc City, Ho Chi Minh City, Viet Nam</p>
      <p>■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■</p>
    </Html>
  )
}

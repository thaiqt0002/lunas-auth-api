import { HttpStatus } from '@nestjs/common'

const BAD_REQUEST = 'BAD_REQUEST'
const FORBIDDEN = 'FORBIDDEN'
const UNAUTHORIZED = 'UNAUTHORIZED'
const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
const VALIDATION_ERROR = 'VALIDATION_ERROR'
const NOT_FOUND = 'NOT_FOUND'
const ACCESS_TOKEN = 'ACCESS_TOKEN'
const REFRESH_TOKEN = 'REFRESH_TOKEN'

/**
 * FEATURE: Basic Authentication
 * - Sign in with email and password
 */
const EMAIL_OR_PASSWORD_IS_INCORRECT = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Email hoặc mật khẩu không chính xác',
}
const INVALID_TOKEN = {
  statusCode: 4001,
  message: 'Mã token không hợp lệ',
}
const USER_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Tài khoản không tồn tại',
}

const REFRESH_TOKEN_NOT_FOUND = {
  statusCode: 4003,
  message: 'Bạn chưa đăng nhập',
}
//////////////////////////////////////////

/**
 * FEATURE: User Management
 * - Sign up with email, password, and full name
 */
const EMAIL_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Email đã tồn tại',
}

const USERNAME_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Tên người dùng đã tồn tại',
}

const INVALID_NETWORK_TYPE = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Loại đăng nhập không hỗ trợ',
}

const USER_IS_NOT_ACTIVATED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Tài khoản chưa được kích hoạt',
}

const USER_IS_ACTIVATED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Tài khoản đã được kích hoạt',
}

const YOU_ALREADY_HAVE_AN_ACCOUNT_BY_BASIC = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Bạn đã có tài khoản bằng email',
}

const YOU_ALREADY_HAVE_AN_ACCOUNT_BY_GOOGLE = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Email đã được sử dụng để đăng nhập bằng Google',
}

const EMAIL_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Email không tồn tại',
}

const NOT_ALLOW_TO_RESET_OTP = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Không được phép gửi lại mã OTP',
}

const INVALID_OTP = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Mã OTP không hợp lệ',
}

const OTP_EXPIRED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Mã OTP đã hết hạn',
}

const WAIT_FOR_OTP_EXPIRED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Vui lòng chờ hết thời gian chờ để gửi lại mã OTP',
}

const EMAIL_IS_VERIFIED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'Email đã được xác thực',
}

const WARD_IS_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Dữ liệu phường/xã không tồn tại',
}

const USER_NOT_HAVE_THIS_EMAIL = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Người dùng không có email này',
}

const ADDRESS_IS_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'Dữ liệu địa chỉ không tồn tại',
}

//////////////////////////////////////////

/**
 * FEATURE: Role Management
 * - Create a new role
 * - Get all roles
 */
const ROLE_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_ROLE_NOT_FOUND',
}
const ROLE_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_ROLE_ALREADY_EXISTS',
}
//////////////////////////////////////////

export const ERRORS = {
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND,
  ACCESS_TOKEN,
  REFRESH_TOKEN,

  EMAIL_OR_PASSWORD_IS_INCORRECT,
  INVALID_TOKEN,
  USER_NOT_FOUND,
  REFRESH_TOKEN_NOT_FOUND,

  // User Management
  EMAIL_ALREADY_EXISTS,
  USERNAME_ALREADY_EXISTS,
  INVALID_NETWORK_TYPE,
  USER_IS_NOT_ACTIVATED,
  USER_IS_ACTIVATED,
  YOU_ALREADY_HAVE_AN_ACCOUNT_BY_BASIC,
  YOU_ALREADY_HAVE_AN_ACCOUNT_BY_GOOGLE,
  EMAIL_NOT_FOUND,
  NOT_ALLOW_TO_RESET_OTP,
  INVALID_OTP,
  OTP_EXPIRED,
  EMAIL_IS_VERIFIED,
  WAIT_FOR_OTP_EXPIRED,
  WARD_IS_NOT_FOUND,
  USER_NOT_HAVE_THIS_EMAIL,
  ADDRESS_IS_NOT_FOUND,

  // Role Management
  ROLE_NOT_FOUND,
  ROLE_ALREADY_EXISTS,
}

const description = `
Welcome to the **Lunas E-Commerce API**. This API is the backbone of our e-commerce platform's authentication and authorization system.

### Overview
The Lunas API enables secure user authentication, session management, and access control for our e-commerce services. All endpoints related to user operations, such as registration, login, and password management, are protected and require proper authentication.

### Authentication & Security
- **Authentication Method**: We employ **JWT (JSON Web Tokens)** for authentication. Upon successful login, a JWT is issued that must be included in the **Authorization** header of all subsequent requests.
- **Token Types**: We use two types of tokens:
  - **Access Token**: Short-lived token used for authenticating API requests.
  - **Refresh Token**: Longer-lived token used to obtain a new access token without re-authenticating.
- **Cookie-Based Authentication**: Tokens are stored in **HTTP-only** cookies to prevent cross-site scripting attacks.
- **Cookie Policy**: To ensure proper session management, cookies are used to store tokens. These cookies are set to **HTTP-only** to prevent client-side access.
- **Security Practices**: To ensure the security of user data, all API interactions should be conducted over **HTTPS**.

### API Structure
- **User Management**: Endpoints for registration, login, logout, and password management.
- **Token Management**: Endpoints for refreshing tokens, revoking tokens, and checking token validity.
- **Access Control**: Role-based access control to manage permissions across different user levels.

### Versioning
- **Current Version**: This documentation covers version **1.0** of the API. We maintain backward compatibility and version updates will be clearly documented.
- **Deprecation Notice**: Older versions of endpoints may be deprecated in future releases, with advance notice provided in the documentation.

### Support
- For any issues, please contact our [Support Team](mailto:support@lunas.com).
`
export default description

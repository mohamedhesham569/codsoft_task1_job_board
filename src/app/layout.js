
import "bootstrap/dist/css/bootstrap.css"
import "./global.css"
import "./locomotive-scroll.css"
export const metadata = {
    title: 'jobs',
    description: 'job board',
  }

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
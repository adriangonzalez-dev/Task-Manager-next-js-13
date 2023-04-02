import { AuthProvider } from '@/context/AuthContext'
import { TaskProvider } from '@/context/TaskContext'
import './globals.css'

export const metadata = {
  title: 'Task Manager',
  description: 'Task Manager created with next js 13 and tailwindcss',
  url: 'https://task-manager-next.vercel.app/',
}


export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className='min-w-full min-h-full'>
      <head>
        <link rel='shortcut icon' href='/favicon/favicon.ico'/>
      </head>
      <AuthProvider>
        <TaskProvider>
          <body className='w-full h-full bg-tasks bg-no-repeat bg-cover'>       
          {children}
          <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script>
          </body>
        </TaskProvider>
      </AuthProvider>

    </html>
  )
}

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
    <html lang="es-AR" className='w-screen h-screen'>
      <head>
        <link rel='shortcut icon' href='/favicon/favicon.ico'/>
      </head>
      <AuthProvider>
        <TaskProvider>
          <body className='w-full h-full bg-tasks'>       
          {children}
          </body>
        </TaskProvider>
      </AuthProvider>

    </html>
  )
}

import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import { Nunito } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

const inter = Inter({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone created using Typescript, React.JS, Next.JS and Tailwind',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}

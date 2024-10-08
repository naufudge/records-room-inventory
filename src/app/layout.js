import { Inter, Josefin_Sans, Poppins } from 'next/font/google'
import Image from 'next/image'
import './globals.css'
import recordsImg from '../../public/assets/archive.jpg'
import homeImg from '../../public/images/main.png'
import SearchPopup from "../components/SearchPopup";
import Link from 'next/link'
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: "400", subsets: ['latin'], variable: "--font-poppins" })
const josefin = Josefin_Sans({ weight: "300", subsets: ['latin'] })
const josefin_bold = Josefin_Sans({ weight: "600", subsets: ['latin'] })

const farumaFont = localFont({
  src: "../../public/assets/fonts/Faruma.otf",
  variable: "--font-faruma"
})

export const metadata = {
  title: 'Records Room Inventory',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${farumaFont.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&display=swap" rel="stylesheet" /> 
      </head>
      <body className={`py-9 ${josefin.className}`}>
        <SearchPopup />
        
        <div className={`mx-auto relative ${josefin_bold.className} w-fit py-1 text-center text-5xl lg:text-6xl`}>
        <Link href={"/"}>
          <h1 className='text-center text-gray-100 drop-shadow-md'>Records Room</h1>
          <h1 className='text-center text-[#D4A056] drop-shadow-md'>Inventory</h1>
        </Link>
        </div>
        {/* <Image src={homeImg} alt="records" className='records-img absolute mx-auto' /> */}
        {/* <Image src={recordsImg} alt="records" className='records-img mx-auto blur-sm' /> */}
        
        {children}
      </body>
    </html>
  )
}

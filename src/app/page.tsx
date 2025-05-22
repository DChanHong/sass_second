import Footer from '@/components/common/Footer'
import ServerHeader from '@/components/common/header/ServerHeader'
import MainContent from '@/components/main/MainContent'


export default async function Home() {
    return (
        <>
            <ServerHeader />
            <MainContent />
            <Footer />
        </>
    )
}

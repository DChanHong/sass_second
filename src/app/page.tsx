import ServerHeader from "@/components/common/header/ServerHeader";
import MainContent from "@/components/main/MainContent";
import Layout from "@/components/common/Layout/Layout";


export default async function Home() {
    return (
        <Layout>
            <ServerHeader />
            <MainContent />
        </Layout>
    );
}

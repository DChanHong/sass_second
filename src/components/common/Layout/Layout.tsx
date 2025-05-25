import { Fragment, ReactNode } from 'react'
import ServerHeader from '@/components/common/header/ServerHeader'
import ClientLayout from '@/components/common/Layout/ClientLayout'


interface LayoutProps {
    children: ReactNode;
    mainLayoutOption?: {
        className?: string;
        paddingTop?: boolean;
    }
}

export default function Layout({ children, mainLayoutOption = {} }: LayoutProps) {
    return (
        <Fragment>
            <ServerHeader />
            <ClientLayout mainLayoutOption={mainLayoutOption}>{children}</ClientLayout>
        </Fragment>
    )
}

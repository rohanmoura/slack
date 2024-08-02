import MainContent from '@/components/main-context'
import { ColorPrefrencesProvider } from '@/Providers/color-prefrences'
import QueryProviders from '@/Providers/queryprovider'
import { ThemeProvider } from '@/Providers/theme-provider'
import WebSocketProvider from '@/Providers/web-socket'
import React, { FC, ReactNode } from 'react'

const MailLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            <WebSocketProvider>
                <ColorPrefrencesProvider>
                    <MainContent>
                        <QueryProviders>
                            {children}
                        </QueryProviders>
                    </MainContent>
                </ColorPrefrencesProvider>
            </WebSocketProvider>
        </ThemeProvider>
    )
}

export default MailLayout

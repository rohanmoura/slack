import MainContent from '@/components/main-context'
import { ColorPrefrencesProvider } from '@/Providers/color-prefrences'
import { ThemeProvider } from '@/Providers/theme-provider'
import React, { FC, ReactNode } from 'react'

const MailLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider attribute="class"
            defaultTheme="default"
            enableSystem
            disableTransitionOnChange>
            <ColorPrefrencesProvider>
                <MainContent>
                    {children}
                </MainContent>
            </ColorPrefrencesProvider>
        </ThemeProvider>
    )
}

export default MailLayout

'use client'

import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider'

export function MinikitProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <MiniKitProvider>{children}</MiniKitProvider>
}

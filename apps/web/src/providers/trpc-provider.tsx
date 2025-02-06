'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink, loggerLink, getFetch } from '@trpc/client'
import { trpc } from '@web/utils/trpc'
import { useState } from 'react'
import superjson from 'superjson'

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 60 * 1000 } },
})

export default function TrpcProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const url = `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: () => true,
				}),
				httpBatchLink({
					url,
					fetch: async (input, init?) => {
						const fetch = getFetch()
						return fetch(input, {
							...init,
							// credentials: 'include',
						})
					},
					transformer: superjson,
				}),
			],
		})
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} client={queryClient} />
				{children}
			</QueryClientProvider>
		</trpc.Provider>
	)
}

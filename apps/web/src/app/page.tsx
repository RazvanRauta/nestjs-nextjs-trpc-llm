'use client'
import { trpc } from '@web/utils/trpc'

export default function Home() {
	const name = `Răzvan Răuță`
	const { isLoading, error, data } = trpc.iceBreaker.getIceBreaker.useQuery({
		name,
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	if (!data) {
		return <div>No data</div>
	}

	return (
		<div>
			<h3>{name}</h3>

			<h3>Ice Breaker</h3>

			<p> Summary</p>
			<p>{data.result.summary}</p>

			<ul>
				{data.result.facts.map((fact, index) => (
					<li key={index}>{fact}</li>
				))}
			</ul>
		</div>
	)
}

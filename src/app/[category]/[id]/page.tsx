
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'

interface Post {
    id: string
    title: string
    content: string
}

export const revalidate = 60

export const dynamicParams = true

export async function generateStaticParams() {
    let posts: Post[] = await fetch('https://tradeinformer.com/graphql').then((res) => 
    res.json())
    return posts.map((post) => ({
        id: post.id,
    }))
}

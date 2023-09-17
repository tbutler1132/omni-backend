import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-08-27', // use current date (YYYY-MM-DD) to target the latest API version
})

export const getPosts = async (req, res) => {
    const posts = await client.fetch('*[_type == "post"]')
    try {
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json('Error')
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params
    const post = await client.fetch(`*[_type == 'post' && _id == "${id}"]`)
    try {
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json('Error')
    }
}


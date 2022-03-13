import { createClient } from "contentful";

export async function getAboutUsData() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })

    return await client.getEntries({ content_type: 'aboutUs' });
}


export async function getWriteForUsData() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })

    return await client.getEntries({ content_type: 'writeForUs' });
}
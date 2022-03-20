import { createContentfulClient } from "./utils";

export async function getAboutUsData(){
    return await createContentfulClient().getEntries({ content_type: 'aboutUs' });
}

export async function getWriteForUsData(){
    return await createContentfulClient().getEntries({ content_type: 'writeForUs' });
}
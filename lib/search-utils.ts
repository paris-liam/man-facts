import Fuse from "fuse.js"
const FUSE_OPTIONS = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    findAllMatches: true,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
        "title",
        "authors",
        "tags",
    ]
}
export const performFuseSearch = (items: Array<any>, query: string) => {
    const fuse = new Fuse(items, FUSE_OPTIONS);
    return fuse.search(query);
}
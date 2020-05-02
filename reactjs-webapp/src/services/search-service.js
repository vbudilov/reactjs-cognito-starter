export class SearchService {

    podcastsMock = [{
        title: "Jordan Peterson",
        description: "A really engaging and indepth discussion about things of nature "
    },
        {
            title: "Jordan Peterson",
            description: "A really engaging and indepth discussion about things of nature "
        },
        {
            title: "Jordan Peterson",
            description: "A really engaging and indepth discussion about things of nature "
        },
        {
            title: "Jordan Peterson",
            description: "A really engaging and indepth discussion about things of nature "
        },
        {
            title: "Jordan Peterson",
            description: "A really engaging and indepth discussion about things of nature "
        },
        {
            title: "Jordan Peterson",
            description: "A really engaging and indepth discussion about things of nature "
        },
        {
            title: "Jordan Peterson",
            description: "A really engaging and indepth discussion about things of nature "
        },
        {
            title: "Jordan Peterson",
            description: "A really engaging and indepth discussion about things of nature "
        },
        {
            title: "Jordan Peterson",
            description: "A really engaging and indepth discussion about things of nature "
        },];

    getEpisodes(queryString) {

        return this.podcastsMock

    }

    getPodcasts(queryString) {
        return this.podcastsMock
    }

}

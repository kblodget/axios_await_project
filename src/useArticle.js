import axios from "axios";

// make fetchImages to return promise, so that invoking method can be
// traditional or async/await
const fetchImages = async(id) => {
    console.log("fetchImages");
    console.log(id);
    return axios
        .get(`https://www.aafnokatha.com/wp-json/wp/v2/media/${id}`)
        .then(res => {
            console.log("res");
            console.log(res);
            return res;
        })
        .catch(err => console.log("Error: ", err));
};

const fetchArticles = async () => {
    let articleArray = [];
    await (async () => {
        return axios
            .get(`https://www.aafnokatha.com/wp-json/wp/v2/posts`)
            .then(async response => {
                const res = response.data;
                console.log("FetchArticles: response.data");
                console.log(res);
                //let articleArray = [];
                Promise.all(
                    res.map(article =>
                        fetchImages(article.featured_media)
                            .then(image => ({
                                title: article.title.rendered,
                                content: article.content.rendered,
                                featuredImage: image.data.guid.rendered
                            }))
                            .catch(err => console.log("Error fetching image: ", err))
                    )
                )
                    .then(articles => {
                        console.log('PUSH articles');
                        console.log(articles);
                        articleArray.push({articles});
                    })
                    .catch(err => console.log("Error setting up articles: ", err))
                    .finally(() => {
                        // make map here
                        console.log("fetchArticles: articleArray");
                        console.log(articleArray);
                        console.log("articleArray[0].articles[8]");
                        console.log(articleArray[0].articles[8]);
                        return articleArray;
                    });
            });
    })();
    return articleArray;
};
export default { fetchArticles, fetchImages };
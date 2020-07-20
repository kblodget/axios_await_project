import React, {useState, useEffect} from 'react';
import useArticle from "./useArticle";
import './styles.css';

function App() {
    //const [articles, setArticles] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [articleArray, setArticleArray] = useState([]);
    const [globalData, setGlobalData] = useState([]);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const { fetchArticles } = useArticle;

    useEffect(() => {
      const getArticles = async () => {
            const globalData = await fetchArticles();
            await setGlobalData(globalData);
            await (setButtonEnabled(true));
            console.log("App: getArticles: articleArray");
            console.log(articleArray);
      };
      getArticles();
        // eslint-disable-next-line
    }, []);
    // To get rid of the eslint error  missing dependency warning
    // ESLint rule "react-hooks/exhaustive-deps" will always fail
    //on empty dependency lists.
    // useMount when your effect function needs something from props
    //but never needs to run again without linter warnig:
   // const useMountEffect = (func) => useEffect(func, []);
   // useMountEffect(getArticles);

    const displayArticles = () => {
        console.log("displayArticle: globalData");
        console.log(globalData);
        console.log(globalData.length);
        console.log(globalData[0].articles);
        //console.log("displayArticle: articleArray");
        //console.log(articleArray);
        /*
        return (
          <div>
            {articleArray.map((item, i) => (
              <p key={i}>Title: {item.featuredImage}</p>
            ))}
          </div>
        );
        */
    };

    return (
        <div className="App">
            <h1>Axios, Async, await Example</h1>
            { buttonEnabled
                ? <button onClick={displayArticles}>Click</button>
                : ''
            }
        </div>
    );
}

export default App;


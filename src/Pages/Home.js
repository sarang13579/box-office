import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';


const Home = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows';



    const onInputChange = (ev) => {
        setInput(ev.target.value);
        // console.log(ev.target.value);
    };

    const onSearch = () => {

        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
            // console.log(result);
        })     // Fetch promise so we need to Await


        // https://api.tvmaze.com/search/shows?q=girls

        // fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r => r.json()).then(result => {
        //     setResults(result);
        //     console.log(result);
        // })     // Fetch promise so we need to Await
    };



    const onKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            onSearch();
        }
        // console.log(ev.keyCode);
    };

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value)
    }

    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>No results</div>
        }
        if (results && results.length > 0) {
            return results[0].show ?
                //  results.map(item =>
                //     <div key={item.show.id}>{item.show.name}</div>) 
                <ShowGrid data={results} />
                :
                // results.map(item => (
                //     <div key={item.person.id}>{item.person.name}</div>
                // )          );
                <ActorGrid data={results} />;

        }
        return null;
    };

    return (
        <MainPageLayout>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input} placeholder="Search for something" />
            <div>
                <label htmlFor="shows-search">
                    Shows
                    <input id="shows-search" type="radio" value="shows" checked={isShowsSearch} onChange={onRadioChange} />
                </label>
                <label htmlFor="actors-search">
                    Actors
                    <input id="actors-search" type="radio" value="people" checked={!isShowsSearch} onChange={onRadioChange} />
                </label>
            </div>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home

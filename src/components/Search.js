import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../store/AuthContext';

const Search = () => {
    const [artists, setArtists] = useState([]);
    const [searchKey, setSearchkey] = useState('')
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext);

    const searchArtists = (e) => {
        setSearchkey(e.target.value)
        window.localStorage.setItem('searchVal', e.target.value)
    } 
    useEffect(() => {
        const searchVal = window.localStorage.getItem('searchVal')
        if (searchVal) {
            setSearchkey(searchVal)
            axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${authCtx.token}`
                },
                params: {
                    q: searchVal,
                    type: "artist"
                }
            }).then(function (response) {
                setArtists(response.data.artists.items)
            }).catch(function (error) {
                console.log(error.message);
            })
        } else {
            setArtists([])
            setSearchkey('')
        }
    }, [searchKey,authCtx.token])


    return (<div className="search-body">
        <div className='searchField'>
            <input type="text"
                onChange={searchArtists}
                value={searchKey}
                placeholder='Search for an artist...' />
                
            <FontAwesomeIcon icon={faSearch} size='xl' className='icon' />
        </div>
       {artists && <div className='grid-section'>
            {artists.map(artist => (
                <div key={artist.id} className='card' onClick={() => { navigate(`/Artist/${artist.id}`) }}>
                    {artist.images.length ? <img src={artist.images[0].url} alt="" /> : <div className='noImg'>No Image !</div>}
                    <div className='cardBody'>
                        <h3>{artist.name}</h3>
                        <span className='followers'>{artist.followers.total} followers</span>
                        <div className='rating'>
                            <ReactStars
                                count={5}
                                edit={false}
                                isHalf={true}
                                activeColor="#EFB64B"
                                value={(artist.popularity / 100) * 5}
                            />
                        </div>
                    </div>
                </div>))}
        </div>}
    </div>)
}
export default Search;

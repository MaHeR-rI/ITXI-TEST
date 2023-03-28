import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../store/AuthContext';

const Artist = () => {
    const [data, setData] = useState('')
    const [artist, setArtist] = useState('')
    const [notFounf,setNotFound]=useState(false)
    const { id } = useParams();
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`
            }
        }).then(function (response) {
            setArtist(response.data)
            setNotFound(false)

        }).catch(function (error) {
            console.log(error.message)
            setNotFound(true)
        })
        axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`
            }
        }).then(function (response) {
            setData(response.data.items)
        })
    }, [authCtx.token, id])

    return (<div className="album-body">
        {artist && <div className="head">
            <h1>{artist.name}</h1>
            <span>Albums</span>
        </div> }
       {notFounf && <h1>album not found !</h1>}
        <div className='grid-section'>
            {data && data.map(album => (
                <div className='card nopointer' key={album.id}>
                        {album.images.length ? <img src={album.images[0].url} alt={album.name} /> : <div className='noImg'>No Image !</div>}
                        <div className='cardBody'>
                            <h3>{album.name}</h3>
                            <ul>{(album.artists).map((artist) => (<li key={artist.id}>{artist.name}</li>))}</ul>
                            <span >{album.release_date}</span>
                            <span >{album.total_tracks} tracks</span>
                        </div>
                        <a className="preview" href={album.external_urls.spotify} target="_blank" rel="noreferrer">
                            preview on spotify
                    </a>
                </div>
            ))}
        </div>
    </div>

    )
}
export default Artist;
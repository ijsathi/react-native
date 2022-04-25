import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Tags() {

    const [tags, setTags] = useState([]);
    useEffect(() => {
        // fetch('https://api.newsbundle.com/news/listNews?from=0&size=20&site=BL')
        fetch('https://api.newsbundle.com/news/listNews?from=0&size=3&site=BL')
            .then(res => res.json())
            .then(data => data.map(x => setTags(x.tags_array)))
    }, [])
    console.log(tags);
    return (
        <ScrollView
            horizontal={true}
            data={tags}
            renderItem={({ item }) => {
                return (
                    <>
                        <Text>{item.name}</Text>
                    </>
                )
            }
            }
        />
    )
}

//------------------------------------------
<FlatList
    horizontal={false}
    // horizontal={true}
    data={totalServices}
    renderItem={({ item }) => {
        return (
            <ScrollView style={{ paddingLeft: 5, paddingRight: 5 }}>
                <View style={{
                    margin: 10,
                    borderRadius: 13, shadowRadius: 14, shadowColor: "rgb(160,160,160)"
                }} key={item.news_id}>
                    <View style={{}}>
                        <Card.Image
                            style={{ height: 200, borderTopLeftRadius: 13, borderTopRightRadius: 13 }}
                            source={item.urlToImage}
                        />
                        <View style={{ padding: 15 }}>
                            {/* tags */}
                            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                {
                                    item.tags_array.slice(0, moreTags).map(x => {
                                        return (
                                            <>
                                                <Text key={x.id} style={{ color: "#646363", borderRadius: 15, borderWidth: 1, borderColor: "#8e8d8d", padding: 2, fontSize: 12, textAlign: 'center', margin: 3 }}> {x.name} </Text>
                                            </>
                                        )
                                    })
                                }
                                {/* more tags */}
                                <Text onPress={() => handleMoreTags(item.news_id)} style={{ backgroundColor: "#3e4eb0", color: "#ffffff", borderRadius: 15, borderWidth: 1, borderColor: "#8e8d8d", padding: 4, fontSize: 12, textAlign: 'center', margin: 3 }} >More Tags</Text>
                            </View>
                            <Card.Divider />
                            <Text style={{ fontSize: 17, color: "#444444", fontWeight: 700, marginBottom: 9 }}>{item.title}</Text>
                            {/* <Card.Divider /> */}
                            {/* <Text style={{ marginBottom: 10, color: "#9f9595", fontFamily: "'Ubuntu', sans-serif", }}>
                                            {item.description.slice(0, 194)}...
                                        </Text> */}
                            <Button title='Read More' />
                            <Card.Divider />
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ color: "#aaaaaa", marginRight: 10, fontSize: 12 }}><Icon size={13} name="calendar" /> {item.publishedAt.slice(0, 10)}</Text>
                                    <Text style={{ color: "#7b88cc", fontSize: 12 }}>{item.source.name}</Text>
                                </View>
                                <Text style={{ color: "#aaaaaa" }}><Icon size={20} name="share-alt" /></Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }}
/>


// extra main code +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import React, { useState, useEffect } from 'react';

// import { Link as RouterLink, NavLink, useHistory } from 'react-router-dom';
// import Link from '@material-ui/core/Link';
// import ReactPlayer from 'react-player/lazy';

// import WifiOffIcon from '@material-ui/icons/WifiOff';

// import DateRangeIcon from '@material-ui/icons/DateRange';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import ShareIcon from '@material-ui/icons/Share';
// import Button from '@material-ui/core/Button';

// import { FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from 'react-share';
// import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton } from 'react-share';
// import { upvote } from '../services/apiService';
// import { auth } from '../firebase';
// import firebase from 'firebase';
// import MuiMenu from './MuiMenu';
// import MuiMenuItem from './MuiMenuItem';

// const NewsFeedCard = ({
//   id,
//   isUpvoted,
//   isVideo,
//   publishedAt,
//   tags_array,
//   link,
//   urlToImage,
//   urlToVideo,
//   title,
//   url,
//   desc,
//   source,
//   urlToSharedPost
// }) => {
//   const [menuList, setMenuList] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [tagsMenuList, setTagsMenuList] = useState([]);
//   const [upvoteFill, setUpvoteFill] = useState('');
//   const [user, setUser] = useState(false);
//   const [videoPlayer, setVideoPlayer] = useState(false);

//   const history = useHistory();

//   let fixDate = new Date(publishedAt);
//   let currDate = new Date();
//   const diff = currDate - fixDate;
//   const hours = Math.floor(diff / (60 * 60 * 1000));
//   const minutes = Math.floor(diff / (60 * 1000));

//   let timeFormat;

//   if (hours <= 1 && minutes < 60) {
//     timeFormat = `${minutes} minutes`;
//   } else if (hours >= 24 ) {
//     const days = Math.floor(hours / 24);
//     const hr = Math.floor(hours) % 24;
//     timeFormat = `${days} days ${hr} hrs `;
//   } else {
//     timeFormat = `${hours%24} hrs ${minutes%60} minutes`;
//   }

//   let tags = tags_array?.slice(0, 3).filter((tag) => tag !== null);

//   const handleTags = (event) => {
//     setTagsMenuList(tags_array?.slice(3).filter(tag => tag !== null));
//     setMenuList(event.currentTarget);
//   };

//   const handleUpvote = () => {
    
//     if (user) {
//       upvote(id)
//             .then((res) => {
//                 // console.log('news id: ', id);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 if (err?.status === 401) {
//                     history.push('/signin');
//                 }
//             });
//       setUpvoteFill(prev => prev === '' ? '#dc3545' : '');
//     } else {
//       history.push('/signin');
//     }
//   }

//   useEffect(() => {
//         const isActive = () => {
//             firebase.auth().onAuthStateChanged(currentUser => {
//                 if (currentUser != null) {
//                     setUser(true);
//                 } else {
//                     setUser(false);
//                 }
//             });
//         }

//         isActive();
//     }, []);

//   return (
//     <div>
//       <div className='news-feed-image'>
        
//         {urlToImage ? (
        
//           isVideo ?
//             <>

//               {
//                 videoPlayer ?
//                   <div
//                   id='react_player'
//                 style={{
//                       borderRadius: '1rem 1rem 0 0',
//                       maxWidth: '100%',
//                     height: '20rem',
//                       width: '100%'
//                     }}>
//                   <ReactPlayer
//                     id='player'
//                     url={urlToVideo}
//                     playing={true}
//                     width='100%'
//                     style={{
//                       borderRadius: '1rem 1rem 0 0',
//                       maxHeight: '100%',
//                       objectFit: 'cover',
//                       maxWidth: '100%',
//                     }}
//                     />
//                 </div>
//                   :
//                   <div style={{ position: 'relative' }}>
//                     <img src={urlToImage} alt={title} className='d-flex align-items-center justify-content-center' style={{ borderRadius: '1rem 1rem 0 0' }} />
//                     <i className="fab fa-youtube" style={{ position: 'absolute', top: '36%', left: '45%', fontSize: '6.8rem' }} onClick={() => setVideoPlayer(!videoPlayer)} />
//                   </div>
//               }
                
//             </>
//             :
//             <img src={urlToImage} alt={title} style={{ borderRadius: '1rem 1rem 0 0' }} />
          
//         ) : (
        
//             <div className='news-feed-image_default'>
//               <WifiOffIcon style={{ fontSize: '3rem' }} />
//               <h2>Image Unavailable</h2>
//             </div>
        
//         )}
        
//       </div>
//       <div className='tags m-1'>
        
//         <ul>
//           {tags?.map((tag) => (
//             <li key={tag.id}>
//               <Link
//                 activeClassName='active-tag'
//                 component={NavLink}
//                 style={{
//                   textDecoration: 'none',
//                 }}
//                 to={`/tag/${tag.id}`}
//               >
//                 {tag.name}
//               </Link>
//             </li>
//           ))}

//         <Button
//           className='moreTags-btn'
//           onClick={handleTags}
//         >
//           More Tags
//         </Button>

//         <MuiMenu
//           id="simple-menu"
//           anchorEl={menuList}
//           keepMounted
//           open={Boolean(menuList)}
//           onClose={() => setMenuList(null)}
//           style={{marginTop: '3.5rem', height: '33rem'}}
//         >
//           {
//             tagsMenuList?.length === 0 ?
//               <p
//                 style={{
//                   textAlign: 'center',
//                   fontSize: '1.4rem',
//                   textDecoration: 'none',
//                   textTransform: 'capitalize',
//                   color: '#404040',
//                   fontFamily: "'Ubuntu', sans-serif",
//                   fontWeight: '400',
//                   width: '20rem', wordWrap: 'break-word'
//                 }}>
//                 No More Tags.
//                 </p> :
//               tagsMenuList?.map(item => (
//           <MuiMenuItem>
//               <Link
//                  key={item.id}
//                   to={`/tag/${item.id}`}
//                   component={NavLink}
//                   activeClassName='active-tag'
//                   style={{
//                     fontSize: '1.4rem',
//                     textDecoration: 'none',
//                     textTransform: 'capitalize',
//                     color: '#404040',
//                     fontFamily: "'Ubuntu', sans-serif",
//                     fontWeight: '400',
//                     width: '20rem', wordWrap: 'break-word'
//                   }}
//                 >
//                   <span onClick={() => setMenuList(null)}>{item.name}</span>
//                 </Link>
//               </MuiMenuItem>
//               ))
//           }
//         </MuiMenu>
        
//         </ul>

//       </div>
//       <div className='news-feed-content mt-2'>
//         <div className='news-feed-title'>
//           {
//             isVideo ?
//               <span>
//                 <p className='fw-bold'>{title}</p>
//               </span> :
//               <a href={url} target='_blank' rel='noopener noreferrer'>
//                 <p className='fw-bold'>{title}</p>
//               </a>
//           }
//         </div>
//         <div className='news-feed-desc'>
//           <p>{ title?.length >= 70 ?  title?.length <=100 ? desc?.slice(0,140) : desc?.slice(0,60) : desc}...</p>
//         </div>
//         <div className='news-feed-footer'>
//           <div className='news-feed-footer_left'>
//             <DateRangeIcon fontSize='small' /> {timeFormat} <pre> </pre>
//             <Link component={RouterLink} to={`/source/${source?.id}`}>
//               {source?.name}
//             </Link>
//           </div>
//           <div className='news-feed-footer_right'>
            
//             {/* <ArrowUpwardIcon
//               style={{ fill: isUpvoted ? '#dc3545' : upvoteFill, fontSize: isUpvoted ? '2.8rem' : '2rem' }}
//               onClick={handleUpvote}
//             /> */}

//             <ShareIcon onClick={(event) => setAnchorEl(event.currentTarget)} style={{fontSize: '2rem'}} />

//             <MuiMenu
//               id="simple-menu"
//               anchorEl={anchorEl}
//               keepMounted
//               open={Boolean(anchorEl)}
//               onClose={() => setAnchorEl(null)}
//               PaperProps={{
//                 style: {
//                   // width: '20rem',
//                 },
//               }}
//             >
//               <MuiMenuItem>
//                 <FacebookShareButton url={urlToSharedPost}>
//                   <FacebookIcon size={32} round={true} className='mx-2' />
//                 </FacebookShareButton>

//                 <WhatsappShareButton url={urlToSharedPost}>
//                   <WhatsappIcon size={32} round={true} className='mx-2' />
//                 </WhatsappShareButton>

//                 <TwitterShareButton url={urlToSharedPost}>
//                   <TwitterIcon size={32} round={true} className='mx-2' />
//                 </TwitterShareButton>

//                 <LinkedinShareButton url={urlToSharedPost}>
//                   <LinkedinIcon size={32} round={true} className='mx-2' />
//                 </LinkedinShareButton>
//               </MuiMenuItem>
//             </MuiMenu>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsFeedCard;

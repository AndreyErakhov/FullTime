import React, { useEffect, useMemo, useState } from "react";
import Filter from "./Component/Filter/Filter";
import InlineBoard from "./Component/InlineBoard/InlineBoard";
import ButtonBoard from "./Component/ButtonBoard/ButtonBoard";
import ContentBlock from "../UI/ContentBlock/ContentBlock";
import ContentCenter from "./Component/Content/ContentCenter/ContentCenter";
import Form from "./Component/Form/Form";
import PostList from "./Component/Content/PostList/PostList";
import ContentBoxs from "./Component/Content/ContentBoxs/ContentBoxs";
import Header from "../UI/Header/Header";
import classes from "../BoardList/BoardList.module.css"
import GetCookie from "../cookieConroller/getCokie";
import { Navigate } from "react-router-dom";
import globalService from "../../API/PostService";
import Loading from "./Component/Loading/Loading";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const BoardList = () => {
    const [modalActive,setModalActive] = useState(false);
    const [posts, setPosts] = useState([]);
    const [serchQuery, setSerchQuery] = useState('')
    const [selectedSort, setSelectedSort] = useState('')
    const [postsLoading, setPostsLoading] = useState(false)
    //API data
    let token = GetCookie("token")
    let refreshToken = GetCookie('refreshToken')
    
useEffect(() => {

    const boarListDataAPI = async () => {
        setPostsLoading(true)
        const postsRequest = await globalService('BoardListRefresh');
        setPosts(postsRequest);
        setPostsLoading(false)
     }
     boarListDataAPI();
   }, []);
       
    const sortedPosts = useMemo( () => {
        if(selectedSort) {
        return [...posts].sort((a,b) => a[setSelectedSort].localeCompare(b[setSelectedSort]))
        }
        return posts
    }, [selectedSort, posts])

    const sortedSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(serchQuery.toLowerCase()))
    }, [serchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([newPost,...posts])
        setModalActive(false)

    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.boardId !== post.boardId))
    }

    const handleClear = (e) => {
        e.preventDefault()
        setSerchQuery('')
    }

    const modalActiveTrue = () => {
        setModalActive(true)
    }

    if(!refreshToken){
      return <Navigate to='/' replace={true}/>
    }else{
        return(
        <>
        <ReactNotifications/>
           <div className={classes.container}>
                <Header/>
                <main>
                    <Filter delete={handleClear}>
                        <input 
                        type="text" 
                        name="text" 
                        autoComplete="off"
                        value={serchQuery}
                        onChange={e => setSerchQuery(e.target.value) }
                        placeholder='поиск'/>
                    </Filter>
                    <InlineBoard/>
                    <ButtonBoard active={modalActiveTrue}/>
                    <ContentBlock>
                        <ContentBoxs/>
                        {posts.length
                            ? <PostList remove={removePost} post={sortedSearchedPosts}/>
                            : <ContentCenter active={modalActiveTrue}/>
                        }
                        <Form create={createPost}
                        post={sortedSearchedPosts}
                        active={modalActive} 
                        setActive={setModalActive} 
                        token={token} 
                        refreshToken={refreshToken}/>
                        <Loading postsLoading={postsLoading}/>
                    </ContentBlock>
                </main>
            </div>
        </>
        )
    }
}

export default BoardList
import {useEffect, useState} from "react";
import {getPost} from "../../API.jsx";
import Post from "../../components/Post/Post.jsx";

import {useParams} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner.jsx";

const PostDetail = (props) => {
    const [post, setPost] = useState(undefined)

    let {id} = useParams();

    useEffect(() => {
        loadPost()
    }, [])


    function loadPost() {
        getPost(id).then(setPost)
    }

    return <>
        {post && <Post loadPost={loadPost} post={post}/>}
        {!post && <Spinner/>}
    </>;
};

export default PostDetail;
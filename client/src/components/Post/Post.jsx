import Card from 'react-bootstrap/Card';
import {useEffect, useState} from "react";
import parse from 'html-react-parser'
import {Button} from "react-bootstrap";
import PostForm from "../Modals/Post/PostForm.jsx";
import ConfirmModal from "../Modals/Confirm/Confirm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {deletePost, updatePost} from "../../API.jsx";
import alert from 'alerts'


const Post = ({post, loadPost}) => {
    const [postData, setPostData] = useState(undefined)
    const [isConfirmModalShown, setConfirmModalShown] = useState(false)
    const [isEditModalShown, setEditModalShown] = useState(false)

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])


    const navigate = useNavigate()

    let {id} = useParams();
    const _onEdit = async (event, data) => {
        event.preventDefault()
        let res = await updatePost(id, data)
        loadPost && await loadPost()
        setEditModalShown(false)
        if (res.message) alert(res.message, {timeout: 4000, className: 'alert-error'});
        else alert('Post was updated', {timeout: 4000});
    }

    const onDeletePost = async () => {
        let res = await deletePost(id)
        navigate('/posts')
        if (res.message) alert(res.message, {timeout: 4000, className: 'alert-error'});
        else alert('Post was deleted', {timeout: 4000});
    }


    return <>
        {postData && <Card style={{margin: '5px 0px'}}>
            <Card.Body>
                <Card.Title>{postData.title}</Card.Title>
                {postData.link && <Card.Link href={postData.link}> Link</Card.Link>}
                {postData.description &&
                    <Card.Text style={{overflow: 'hidden'}}> {parse(postData.description)}</Card.Text>}
                {!!post?.category?.length &&
                    <Card.Text> <span>Category: </span> {post.category.map(item => <span>{item}, </span>)}</Card.Text>}
                {postData.pubDate && <Card.Text> {postData.pubDate} </Card.Text>}
                {postData["dc:creator"] && <Card.Text> {postData["dc:creator"]} </Card.Text>}
                <Button onClick={() => setEditModalShown(true)} variant="info">Edit</Button>
                <Button onClick={() => setConfirmModalShown(true)} variant="light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path
                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                </Button>
            </Card.Body>

        </Card>}
        {isConfirmModalShown &&
            <ConfirmModal
                onDeletePost={onDeletePost}
                modalContent={'The product will be deleted'}
                modalTitle={'Delete post'}
                isConfirmModalShown={isConfirmModalShown} setConfirmModalShown={setConfirmModalShown}
            />
        }
        {isEditModalShown &&
            <PostForm
                edit
                post={post}
                formTitle={'Edit Post'}
                onSave={_onEdit}
                isPostFormShown={isEditModalShown}
                setPostFormShown={setEditModalShown}/>}


    </>;
};

export default Post;
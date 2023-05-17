import {useEffect, useState} from "react";
import {createPost, getAllPosts} from "../../API.jsx";
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
import SearchPanel from "../../components/SearchPanel/SearchPanel.jsx";
import PostForm from "../../components/Modals/Post/PostForm.jsx";
import alert from "alerts";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [pageIndex] = useState(0)
    const [pageSize] = useState(6)
    const [active, setActive] = useState(1)
    const [isPaginationShown, setShowPagination] = useState(true)
    const [isPostFormShown, setPostFormShown] = useState(false)


    useEffect(() => {
        loadAllPosts()
    }, [])


    function loadAllPosts() {
        getAllPosts({
            pageInfo: {
                pageSize,
                pageIndex
            }
        }).then(setPosts)
    }

    async function onSave(event, data) {
        event.preventDefault()
        let res = await createPost(data)
        await loadAllPosts()
        setPostFormShown(false)
        if (res.message) alert(res.message, {timeout: 4000, className: 'alert-error'});
        else alert('Post was created', {timeout: 4000});
    }

    let items = [];

    const paginationBasic = (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    );

    let residual = posts.pageInfo && posts.pageInfo.total % pageSize
    let paginationIterator

    if (posts.pageInfo) {
        paginationIterator = residual ? Math.floor(posts.pageInfo.total / pageSize) + 1 : Math.floor(posts.pageInfo.total / pageSize)
    }

    if (posts?.itemList?.length) {
        for (let number = 1; number <= paginationIterator; number++) {

            items.push(
                <Pagination.Item onClick={(e) => {

                    let pageNum = e.target.text ? +e.target.text : 1
                    const pageInfo = {
                        pageSize: pageSize,
                        pageIndex: (pageNum * pageSize) - pageSize
                    }
                    setActive(pageNum)

                    getAllPosts({pageInfo}).then(setPosts)

                }} key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
    }

    const _onPostCreate = () => {
        setPostFormShown(true)
    }

    return <>
        <div style={{display: 'flex', alignItems: "center"}}>
            <Button onClick={_onPostCreate} style={{marginRight: '10px'}} variant="warning">Create&nbsp;post</Button>
            <SearchPanel setActive={setActive} setShowPagination={setShowPagination} loadAllPosts={loadAllPosts}
                         pageIndex={pageIndex} pageSize={pageSize} setPosts={setPosts}/>
        </div>
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        }}>
            {!!posts?.itemList?.length && posts.itemList.map(post =>
                <Card key={post.guid} border="dark" style={{width: '18rem', margin: ' 10px'}}>

                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                            <p>Author: {post['dc:creator']}</p>
                        </Card.Text>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Link to={`/post/${post._id}`}>
                                <Button variant="light"><span>more</span></Button>
                            </Link>
                        </div>
                    </Card.Body>

                </Card>
            )}
            {!posts?.itemList?.length && <h3>Nothing to show ...</h3>}

        </div>

        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        }}>
            {isPaginationShown && paginationBasic}
            {isPostFormShown &&
                <PostForm
                    formTitle={'Create Post'}
                    onSave={onSave}
                    isPostFormShown={isPostFormShown}
                    setPostFormShown={setPostFormShown}/>
            }
        </div>


    </>;
};

export default Posts;
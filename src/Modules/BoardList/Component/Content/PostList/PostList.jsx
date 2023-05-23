import { CSSTransition, TransitionGroup } from "react-transition-group";
import BoardContent from '../BoardContent/BoardContent'
import './../../../../../App.css'
import NoBoards from "../NoBoards/NoBoards";

const PostList = ({remove,post}) => {

    if(!post.length){
        return(
            <NoBoards/>
        )
    }
    return(
        <div style={{marginBottom: "72px"}} >
            <TransitionGroup>
                {post.map( post => 
                    <CSSTransition
                        key={post.boardId}
                        timeout={500}
                        classNames="post"
                    >
                    <BoardContent remove={remove} post={post} />
                </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    )
}

export default PostList
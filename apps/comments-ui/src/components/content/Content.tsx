import CTABox from './CTABox';
import Comment from './Comment';
import ContentTitle from './ContentTitle';
import MainForm from './forms/MainForm';
import Pagination from './Pagination';
import {ROOT_DIV_ID} from '../../utils/constants';
import {useAppContext} from '../../AppContext';
import {useEffect} from 'react';

const Content = () => {
    const {pagination, member, comments, commentCount, commentsEnabled, title, showCount, secundaryFormCount, postId, dispatchAction} = useAppContext();
    const commentsElements = comments.slice().reverse().map(comment => <Comment key={comment.id} comment={comment} />);

    const paidOnly = commentsEnabled === 'paid';
    const isPaidMember = member && !!member.paid;

    const setupSSECountEvents = () => {
        const events = new EventSource(`/members/api/comments/counts-events/?ids=${postId}`);
    
        events.onmessage = (event) => {
            const data = JSON.parse(event.data);
    
            console.log(data);
            if(data[postId] !== undefined) {
                dispatchAction('updateCount', data[postId])
            }
        };
    
        events.onerror = (error) => {
            console.log(error)
        };
    };

    useEffect(() => {
        const elem = document.getElementById(ROOT_DIV_ID);

        // Check scroll position
        if (elem && window.location.hash === `#ghost-comments`) {
            // Only scroll if the user didn't scroll by the time we loaded the comments
            // We could remove this, but if the network connection is slow, we risk having a page jump when the user already started scrolling
            if (window.scrollY === 0) {
                // This is a bit hacky, but one animation frame is not enough to wait for the iframe height to have changed and the DOM to be updated correctly before scrolling
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        elem.scrollIntoView();
                    });
                });
            }
        }

        setupSSECountEvents();
  
    }, []);

    const hasOpenSecundaryForms = secundaryFormCount > 0;

    return (
        <>
            <ContentTitle count={commentCount} showCount={showCount} title={title}/>
            <Pagination />
            <div className={!pagination ? 'mt-4' : ''} data-test="comment-elements">
                {commentsElements}
            </div>
            <div>
                {!hasOpenSecundaryForms
                    ? (member ? (isPaidMember || !paidOnly ? <MainForm commentsCount={commentCount} /> : <CTABox isFirst={pagination?.total === 0} isPaid={paidOnly} />) : <CTABox isFirst={pagination?.total === 0} isPaid={paidOnly} />)
                    : null
                }
            </div>
        </>
    );
};

export default Content;

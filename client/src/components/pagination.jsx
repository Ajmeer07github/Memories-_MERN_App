import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import Styles from './styles';
import { getPosts } from '../actions/posts';

const Paginate = ({ page }) => {

    const dispatch = useDispatch();
    const classes = Styles();
    
    const { numberOfPages } = useSelector((state) => state.posts);


    useEffect(() => {
        if (page){ 
            dispatch(getPosts(page));
        }
    }, [ page ]);

    return (
        
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1 } //the || is to ensure to load page 1 when we dont have any posts
            variant='outlined'
            color='primary'
            renderItem={(item) =>(
                <PaginationItem 
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />

    );
};

export default Paginate;

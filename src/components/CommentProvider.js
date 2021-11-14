import React from 'react';
import Button from '@material-ui/core/Button';
import { DeleteOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Typography, makeStyles, Avatar } from '@material-ui/core';
import { yellow, green, blue, pink } from '@material-ui/core/colors'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ChatIcon from '@material-ui/icons/Chat';
const useStyles = makeStyles({
    avatar: {
        backgroundColor: (product) => {
            if (product.price < 100) return yellow[700];
            if (product.price < 200 && product.price >100) return green[500];
            if (product.price < 500 && product.price >200) return pink[500];
            return blue[500];
        }
    },
    content: {
        paddingLeft: 5
    },
    button:{
        marginTop:5
    },
    contentText:{
        color: 'black'
    }
});

export default function CommentProvider({ comment, handleSubmit }) {
    const classes = useStyles(comment)


    return(
        <List className={classes.root}>
            <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ChatIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${comment.creator}`} secondary={`${comment.text}`} />
            </ListItem>
      </List>
    )
} 
import React from 'react';
import { makeStyles,Typography,Button,Card,CardActionArea,CardMedia,CardContent,CardActions} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    card: {
                width: 400,
                margin: 15,    
                  maxHeight:800, 
                boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' 
        },
    media: {
                 height: 250,
           },
           cardContentArea :{
                 height:"200px"
           }
            }));

const Cards = (props) => {
    
    const classes = useStyles();

    function loadWebPage(){
      window.open(
        props.web_page, "_blank");
    }

    const images = ["/images/image1.jpg","/images/image3.jpg",
    "/images/image4.jpg","/images/image5.jpg","/images/image6.jpg","/images/image7.jpg","/images/image8.jpg",
    "/images/image9.jpg","/images/image10.jpg","/images/image11.jpg","/images/image12.jpg"];

    const image =  images[Math.floor(Math.random() * images.length)];

    return (
    <Card className={classes.card}>
       <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent classes={{root:classes.cardContentArea}} >
          <Typography gutterBottom variant="h5" component="h2">
          {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.country}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.domain}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={loadWebPage}>
          Visit Website
        </Button>
      </CardActions>
    </Card>
);

}



export default Cards;
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useAppSelector } from 'utils/hooks';

const TradeDeletePhotos = (props: any) => {
  const photos: string[] = props.photos;
  //const photos = useAppSelector((state) => state.tradePost.photos);
  console.log(photos);
  return (
    <ImageList
      sx={{ width: 600, height: 450, ml: 15 }}
      cols={3}
      rowHeight={164}
    >
      {photos.map((item: any, index) => (
        <ImageListItem key={index}>
          <img
            src={`${item}?w=161&fit=crop&auto=format`}
            srcSet={`${item}?w=161&fit=crop&auto=format&dpr=2 2x`}
            alt={item}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default TradeDeletePhotos;

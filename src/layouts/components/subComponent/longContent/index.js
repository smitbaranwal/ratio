import { createContext, useState } from 'react'
import Typography from '@mui/material/Typography'
// import {useEffect} from 'react';

const LongText = ({ content,limit}) => {
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);

  if (content.length <= limit) {
    // there is nothing more to show
    return <div>{content}</div>
  }
  if (showAll) {
    // We show the extended text and a link to reduce it
    return <div> 
      {content} 
      <Typography sx={{cursor: "pointer", color: "success.main"}}  variant='caption' onClick={showLess}>Read less</Typography> 
    </div>
  }
  // In the final case, we show a text with ellipsis and a `Read more` button
  const toShow = content.substring(0, limit) + "...";
  
return (
  <div> 
    {toShow} 
    <Typography sx={{cursor: "pointer", color: "success.main"}}  variant='caption' onClick={showMore}>Read more</Typography>
  </div>)
} 

export default LongText;
import { Box, Typography } from "@mui/material";
import React from "react";

const HeroClients = () => {

    return (
        <Box sx={{width:{md:"96.5%", xs:"auto"}, bgcolor:"#333", borderRadius:5,mt:2,height:"30vh", alignContent:'center'}}>
            <Typography sx={{textTransform:'uppercase',ml:"20%",fontSize:{md:26, xs:"auto"},color:"#fff"}}>Tongasoa eto amin'ny tabilao</Typography>

        </Box>
    )
}

export default HeroClients;
import React, { useState, useEffect } from "react";
import sideImage from "../../Images/20943687-min.jpg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const SideImage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [pageHeight, setPageHeight] = useState(
    Math.max(document.documentElement.clientHeight, document.body.clientHeight)
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 577);
      setPageHeight(
        Math.max(
          document.documentElement.clientHeight,
          document.body.clientHeight
        )
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Grid item xs={false} sm={4} md={7} sx={{}}>
      <Grid
        container
        justifyContent="center"
        sx={{
          height: `${pageHeight}px`,
          pt: 6,
        }}
      >
        <Box
          component="img"
          sx={{
            backgroundImage: `url(${sideImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "120% 120%",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
        />
        <Grid item sx={{ position: "absolute", bottom: 0, mr: 8 }} xs={false}>
          {isMobile ? (
            <a
              href="http://www.freepik.com"
              style={{
                display: "none",
              }}
            >
              Designed by vectorjuice / Freepik
            </a>
          ) : (
            <a
              href="http://www.freepik.com"
              style={{
                display: "block",
              }}
            >
              Designed by vectorjuice / Freepik
            </a>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideImage;

"use client";

import { useCallback, useState } from "react";
import { Story } from "react-insta-stories/dist/interfaces";
import Box from "@mui/material/Box";
// LOCAL CUSTOM COMPONENTS
import StoryItem from "components/stories/story-item";
import StoryViewer from "components/stories/story-viewer";
import StoryContent from "components/stories/story-content";
// GLOBAL CUSTOM COMPONENTS
import { Carousel, CarouselArrows, useCarousel } from "components/slider";
// CUSTOM DATA MODEL
import StoryModel from "models/Story.model";

// ==============================================================
type Props = { stories: StoryModel[] };
// ==============================================================

export default function Section1({ stories }: Props) {
  const [open, setOpen] = useState(false);
  const [startStory, setStartStory] = useState(0);

  const { ref, api, arrows, options } = useCarousel({
    align: "start",
    slideSpacing: ".75rem",
    slidesToShow: { xs: 2, sm: 4, md: 5, lg: 6 }
  });

  // HANDLER CLOSE STORY
  const handleClose = useCallback(() => setOpen(false), []);

  // HANDLER OPEN STORY
  const handleOpenStory = useCallback((no: number) => {
    setOpen(true);
    setStartStory(no);
  }, []);

  // STORY CONTENT LIST
  const storiesContent: Story[] = stories.map(({ imageBig, url }) => ({
    content: () => <StoryContent image={imageBig} url={url} />
  }));

  return (
    <div className="mb-2">
      <Box position="relative">
        <Carousel ref={ref} api={api} options={options}>
          {stories.map(({ id, image }, index) => (
            <StoryItem image={image} key={id} handleClick={() => handleOpenStory(index)} />
          ))}
        </Carousel>

        <CarouselArrows
          onClickNext={arrows.onClickNext}
          onClickPrev={arrows.onClickPrev}
          disableNext={arrows.disableNext}
          disablePrev={arrows.disablePrev}
        />
      </Box>

      <StoryViewer
        open={open}
        stories={storiesContent}
        handleClose={handleClose}
        currentIndex={startStory}
      />
    </div>
  );
}

import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Dimensions, Image } from "react-native";
import Typography from "../../shared/typography/typography";

const width = Dimensions.get("window").width;

const Index = ({ route }: { route: any }) => {
  return (
    <MainWrapper
      showHeart={true}
      showSearch={false}
      title={route.params.data.name}
      type_of_header="withoutImage"
      fontStyle="normal"
    >
      <Stack px={15} gap={18}>
        <Image
          style={{ width: width - 30, borderRadius: 20 }}
          source={require("../../../assets/images/blog-image-detail.png")}
          alt=""
        />
        <Typography type="paragraph2">
          From the Zoom window in my laptop, I saw tears flowing from her eyes
          like a river passing the terrain of her cheeks and lips.  My eyes
          began to fill.  Love came alive in my chest like a flock of birds
          taking flight all at once.  I was guiding the client through a
          visualization in the final coaching session of her 4 month program. 
          We visited the key moments in her journey, honoring the lessons she
          learned, celebrating her wins, acknowledging her courage, and blessing
          her next adventure.  When my client opened her eyes, she said: “I
          couldn’t believe I did it.”  I said: “I knew you could right from the
          start. I’m so proud of you.”
        </Typography>
        <Typography type="paragraph2bold">
          I'm sharing this to show you that it’s possible.
        </Typography>
        <Typography type="paragraph2">
          From the Zoom window in my laptop, I saw tears flowing from her eyes
          like a river passing the terrain of her cheeks and lips.  My eyes
          began to fill.  Love came alive in my chest like a flock of birds
          taking flight all at once.  I was guiding the client through a
          visualization in the final coaching session of her 4 month program. 
          We visited the key moments in her journey, honoring the lessons she
          learned, celebrating her wins, acknowledging her courage, and blessing
          her next adventure.  When my client opened her eyes, she said: “I
          couldn’t believe I did it.”  I said: “I knew you could right from the
          start. I’m so proud of you.”
        </Typography>
      </Stack>
    </MainWrapper>
  );
};

export default Index;

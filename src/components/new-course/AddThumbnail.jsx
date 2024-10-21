import { Divider, Typography, Box } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
import { useSelector } from "react-redux";
import CourseThumbnail from "../course-product/CourseThumbnail";

/**
 * AddThumbnail component for adding thumbnail image of course
 *
 * @returns {React.ReactElement} Box component with children
 *   - IconWithTitle component with title and icon
 *   - Divider component
 *   - TextSection component with title and description
 *   - PhotoPreview component with icon .
 */
export default function AddThumbnail() {
  const course = useSelector((state) => state.course.courseData);
  let url;

  if (course) {
    url = course.thumbnailUrl;
    console.log("url", url);
  }

  return (
    <Box>
      <IconWithTitle
        title={"Add Thumbnail"}
        icon={<WallpaperOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Choose a feature image for your course"
        description="Most of customer will decided to buy a course based on an image"
      />
      <CourseThumbnail
        icon={<InsertPhotoIcon />}
        name="courseThumbnail"
        type="image"
        url={url}
      >
        <Typography color="gray">
          Upload Course thumbnail image, png, jpg, webp
        </Typography>
        <Typography color="gray">580 x 580 (Limit size: 1 MB)</Typography>
      </CourseThumbnail>
    </Box>
  );
}

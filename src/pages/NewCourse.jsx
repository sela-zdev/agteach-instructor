import { Box, Button } from "@mui/material";
import AboutCourse from "../components/new-course/AboutCourse";
import CourseContents from "../components/new-course/CourseContents";
import CoursePrice from "../components/new-course/CoursePrice";
import AddThumbnail from "../components/new-course/AddThumbnail";
import RelatedProduct from "../components/new-course/RelatedProduct";
import ButtonComponent from "../components/course-product/ButtonInBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { useAddCourseMutation } from "../services/api/courseApi";

// {
//   "courseName": "testing",
//   "description": "testing bulkCreate course",
//   "price": "12",
//   "courseObjective": "make sure it work",
//   "allSection": [
//     {
//       "sectionName": "testing",
//       "allLecture": [
//         { "lectureName": "lectureName" },
//         { "lectureName": "lectureName" },
//         { "lectureName": "lectureName" }
//       ]
//     },
//     {
//       "sectionName": "testing",
//       "allLecture": [{ "lectureName": "lectureName", "video": "123123123123" }]
//     },
//     {
//       "sectionName": "testing",
//       "allLecture": [{ "lectureName": "lectureName" }]
//     }
//   ]
// }

function NewCoursePage() {
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit } = methods;

  const [addCourse] = useAddCourseMutation();

  const submitHandler = async (data) => {
    console.log("formData", data);
    const {
      courseTitle,
      courseDescription,
      coursePrice,
      objective,
      allSection,
    } = data;

    const submitData = {
      courseName: courseTitle,
      description: courseDescription,
      price: coursePrice,
      courseObjective: objective,
      allSection: allSection.map((section) => ({
        sectionName: section.sectionName || "untitled section",
        allLecture: section.allLecture.map((lecture) => ({
          lectureName: lecture.lectureName,
          video: lecture.video ? lecture.video : null,
        })),
      })),
    };
    const formData = new FormData();


    // console.log(submitData.allSection,'allsection')
    // Append course details
    formData.append("courseName", courseTitle);
    formData.append("description", courseDescription);
    formData.append("price", coursePrice);
    formData.append("courseObjective", objective);
    formData.append("allSection", JSON.stringify(allSection));

    allSection.forEach((section) => {
      section.allLecture.forEach((lecture) => {
        formData.append("videos", lecture.video);
      });
    });

    console.log([...formData]);

    console.log("submitData", submitData);
    console.log("allSection", submitData.allSection);

    try {
      const response = await addCourse(formData).unwrap();
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "200px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Button
            variant="Text"
            startIcon={<ArrowBackIosIcon fontSize="small" color="dark.300" />}
            sx={{
              textDecoration: "underline",
              color: "dark.300",
              typography: "bmdr",
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <AboutCourse />
          <CourseContents />
          <CoursePrice />
          {/* <AddThumbnail /> */}
          <RelatedProduct />
          <ButtonComponent
            type={"submit"}
            text={"CREATE COURSE"}
            variant={"contained"}
            bgcolor={"purple.main"}
          />
        </form>
      </FormProvider>
    </Box>
  );
}

export default NewCoursePage;

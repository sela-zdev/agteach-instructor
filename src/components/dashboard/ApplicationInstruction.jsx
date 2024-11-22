import React from 'react';
import { Typography, Divider, List, ListItem, Stack } from '@mui/material';

/**
 * ApplicationInstruction component provides detailed instructions for verifying
 * eligibility and submitting an application. It includes sections on the steps
 * to verify eligibility, what follows after submission, and features accessible
 * upon approval. Each section is presented with a heading and a list of steps
 * or features.
 *
 * @returns {JSX.Element} A JSX element representing the ApplicationInstruction
 * component with instructions for the user.
 */
export const ApplicationInstruction = () => {
  return (
    <Stack p={3} gap={1}>
      {/* Title */}
      <Typography variant="blgsm">Last Step: Verify Eligibility</Typography>
      <Divider />
      {/* Intro */}
      <Typography sx={{ mb: 2 }}>
        To ensure your content aligns with our standards, we require you to
        answer a few questions for verification. Please read the instructions
        carefully before submitting, as you can only submit your application
        once.
      </Typography>
      <Divider />
      {/* Section 1: How to Verify */}
      <SimpleList
        data={eligibilitySteps}
        heading="How to Verify Your Eligibility?"
      />
      <Divider />
      {/* Section 2: What Happens After */}
      <SimpleList
        data={applicationSteps}
        heading="What Happens After Submitting Your Application?"
      />
      <Divider />
      {/* Section 3: Features */}
      <SimpleList
        data={features}
        heading="Once approved, you will gain access to features such as:"
      />
    </Stack>
  );
};

/**
 * SimpleList
 *
 * @description A simple list component that displays a given heading and data.
 * @param {string} heading - The heading to display above the list.
 * @param {string[]} data - An array of strings to display in the list.
 * @return {ReactElement} A simple list component with a heading and the given data.
 */
const SimpleList = ({ heading, data }) => {
  return (
    <Stack>
      <Typography>{heading}</Typography>
      <List sx={{ listStyleType: 'disc', listStylePosition: 'inside' }}>
        {data.map((item, index) => (
          <ListItem key={index} sx={{ display: 'list-item' }}>
            {item}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

const eligibilitySteps = [
  'Complete the required additional information.',
  'Submit your details for review by the AgTeach admin team.',
];

const applicationSteps = [
  'Your application will be reviewed by the AgTeach admin team.',
  'This process typically takes 24 hours but may extend to several days.',
  'You will receive an email either approved or rejected.',
];

const features = [
  'Creating and managing courses.',
  'Creating and listing products.',
  'Allowing customers to purchase your products.',
  'Enabling customers to enroll in your courses.',
  'Tracking your daily sales and more.',
];

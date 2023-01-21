import React from "react";
import {
  Box,
  Grid,
  FilledInput,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    // transition: ".3s",

    fontWeight: 600,
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const initState = {
  title: "",
  type: "Full time",
  companyName: "",
  companyUrl: "",
  locaton: "Remote",
  link: "",
  description: "",
  skills: [],
};

export default (props) => {
  const [loading, setloading] = useState(false);
  const [jobDetails, setjobDetails] = useState(initState);
  // {
  // title: "",
  // type: "Full time",
  // companyName: "",
  // companyUrl: "",
  // locaton: "Remote",
  // link: "",
  // description: "",
  // skills: [],
  //   }
  //   );

  const handleChange = (e) => {
    e.persist();
    setjobDetails((old) => ({ ...old, [e.target.name]: e.target.value }));
  };
  //   console.log(jobDetails);

  const addremoveSkill = (skill) =>
    jobDetails.skills.includes(skill)
      ? setjobDetails((old) => ({
          ...old,
          skills: old.skills.filter((s) => s !== skill),
        }))
      : setjobDetails((old) => ({
          ...old,
          skills: old.skills.concat(skill),
        }));

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) return;
    }
    if (!jobDetails.skills.length) return;
    // return console.log("validated");
    setloading(true);
    await props.postJob(jobDetails);
    // setloading(false);
    closeModal();
  };

  const closeModal = () => {
    setjobDetails(initState);
    setloading(false);
    props.closeModal();
  };

  const classes = useStyles();

  const skills = [
    "javaScript",
    "React",
    "Node",
    "VUE",
    "Firebase",
    "MongoDB",
    "SQL",
  ];

  return (
    <Dialog open={props.newJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="title"
              value={jobDetails.title}
              autoComplete="off"
              placeholder="Job Title *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="type"
              value={jobDetails.type}
              fullWidth
              disableUnderline
              variant="filled"
              //   defaultValue="Full time"
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyName"
              value={jobDetails.companyName}
              autoComplete="off"
              placeholder="Company name"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyUrl"
              value={jobDetails.companyUrl}
              autoComplete="off"
              placeholder="Company url"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="locaton"
              value={jobDetails.locaton}
              fullWidth
              disableUnderline
              variant="filled"
              //   defaultValue="Remote"
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-office">In-office</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="link"
              value={jobDetails.link}
              autoComplete="off"
              placeholder="Job link"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              name="description"
              value={jobDetails.description}
              autoComplete="off"
              placeholder="Job Description"
              disableUnderline
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>Skills *</Typography>
          <Box display="flex">
            {skills.map((skill) => (
              <Box
                onClick={() => addremoveSkill(skill)}
                className={`${classes.skillChip} ${
                  jobDetails.skills.includes(skill) && classes.included
                }`}
                key={skill}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">*Required Fields</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              " Post Job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

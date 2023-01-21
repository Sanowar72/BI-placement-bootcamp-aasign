import React from "react";
import {
  Box,
  MenuItem,
  Button,
  Select,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  wrapper: {
    // border: '1px solid red',
    backgroundColor: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    "& > *": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
});
export default (props) => {
  const [loading, setloading] = useState(false);
  const [jobSearch, setjobSearch] = useState({
    type: "Full time",
    locaton: "Remote",
  });

  const handleChange = (e) => {
    e.persist();
    setjobSearch((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  // console.log(jobSearch);
  const search = async () => {
    setloading(true);
    await props.fetchJobsCustom(jobSearch);
    setloading(false);
  };

  const classes = useStyles();
  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
      <Select
        value={jobSearch.type}
        name="type"
        disableUnderline
        variant="filled"
        onChange={handleChange}
      >
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Part time">Part time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select
        value={jobSearch.locaton}
        name="locaton"
        disableUnderline
        variant="filled"
        onChange={handleChange}
      >
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In-office">In-office</MenuItem>
      </Select>
      <Button
        onClick={search}
        disabled={loading}
        variant="contained"
        color="primary"
        disableElevation
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};

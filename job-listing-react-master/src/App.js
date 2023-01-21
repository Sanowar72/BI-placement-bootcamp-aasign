import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./component/Header/Index";
import SearchBar from "./component/SearchBar";
import JobCards from "./component/jobs/jobCards";
import NewJobModal from "./component/jobs/NewJobModal";
// import jobData from './dummyData';
import { useState } from "react";
import { firestore, app } from "./component/firebase/config";
import { useEffect } from "react";
import { Close as CloseIcon } from "@material-ui/icons";
import ViewJobModal from "./component/jobs/ViewJobModal";

export default () => {
  const [jobs, setjobs] = useState([]);
  const [loading, setloading] = useState(true);
  const [customSearch, setcustomSearch] = useState(false);
  const [newJobModal, setnewJobModal] = useState(false);
  const [viewJob, setviewJob] = useState({});

  const fetchjobs = async () => {
    setcustomSearch(false);
    setloading(true);
    const req = await firestore
      .collection("job collection")
      .orderBy("postedOn", "desc")
      .get();
    // console.log(req);
    const tempjobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    // console.log(tempjobs);
    setjobs(tempjobs);
    setloading(false);
  };

  const fetchJobsCustom = async (jobSearch) => {
    setloading(true);
    setcustomSearch(true);
    const req = await firestore
      .collection("job collection")
      .orderBy("postedOn", "desc")
      .where("locaton", "==", jobSearch.locaton)
      .where("type", "==", jobSearch.type)
      .get();
    const tempjobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setjobs(tempjobs);
    setloading(false);
  };

  const postJob = async (jobDetails) => {
    await firestore.collection("job collection").add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });
    fetchjobs();
  };

  useEffect(() => {
    fetchjobs();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={() => setnewJobModal(true)} />
      <NewJobModal
        closeModal={() => setnewJobModal(false)}
        newJobModal={newJobModal}
        postJob={postJob}
      />
      <ViewJobModal job={viewJob} closeModal={() => setviewJob({})} />
      <Grid container justify="center">
        <Grid item xs={10}>
          <SearchBar fetchJobsCustom={fetchJobsCustom} />

          {loading ? (
            <Box display="flex" justifyContent="center">
              {" "}
              <CircularProgress />
            </Box>
          ) : (
            <>
              {customSearch && (
                <Box my={2} display="flex" justifyContent="flex-end">
                  <Button onClick={fetchjobs}>
                    <CloseIcon size={20} />
                    Custom Search
                  </Button>
                </Box>
              )}
              {jobs.map((job) => (
                <JobCards open={() => setviewJob(job)} key={job.id} {...job} />
              ))}
            </>
          )}

          {/* {jobs.map(job => <JobCards key={job.id} {...job} />)} */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

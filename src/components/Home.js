import React, { useEffect, useState } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getJobs } from '../redux/HomeSlice';

const Home = () => {
  const { jobs, status, error } = useSelector((state) => state.jobs);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <section className="section loading">
        <h2>Loading...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2>{error}</h2>
      </section>
    );
  }

  if (jobs[value]) {
    const {
      company, dates, duties, title,
    } = jobs[value];
    // render the job information
    return (
      <section className="section">
        <div className="title">
          <h2>Experience</h2>
          <div className="underline" />
        </div>
        <div className="jobs-center">
          <div className="btn-container">
            {
                        jobs.map((item, index) => (
                          <button
                            type="button"
                            key={uuidv4()}
                            onClick={() => setValue(index)}
                            className={`job-btn ${index === value && 'active-btn'}`}
                          >
                            {item.company}
                          </button>
                        ))
                    }
          </div>
          <article className="job-info">
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className="job-date">{dates}</p>
            {
                    duties.map((duty) => (
                      <div key={uuidv4()} className="job-desc">
                        <FaAngleDoubleRight className="job-icon" />
                        <p>{duty}</p>
                      </div>
                    ))
                   }
          </article>
        </div>
      </section>
    );
  }
  return (
    <section className="section">
      <h3>{error}</h3>
    </section>
  );
  // handle the case where jobs[value] is undefined or falsy
};

export default Home;

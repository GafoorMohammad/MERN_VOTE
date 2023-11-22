import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import { vote } from '../store/actions';
import { color } from '../services/color';

const Poll = ({ poll, vote }) => {
  const answers =
    poll.options &&
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        className="button"
        key={option._id}>
        {option.option}
      </button>
    ));

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const data = {
      labels: poll.options.map(option => option.option),
      datasets: [
        {
          label: poll.question,
          backgroundColor: poll.options.map(option => color()),
          borderColor: '#323643',
          data: poll.options.map(option => option.votes),
        },
      ],
    };

    if (poll.options && poll.options.length > 0) {
      const newChart = new Chart(chartRef.current, {
        type: 'pie',
        data: data,
        options: {
          legend: {
            display: true,
            position: 'bottom',
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      chartRef.current = newChart;
    }
  }, [poll]);

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div className="buttons_center">{answers}</div>
      <Pie ref={chartRef} />
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
  }),
  { vote },
)(Poll);

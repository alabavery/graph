const express = require('express');
const resultsToNodesAndEdges = require('./translate-db');
const path = require('path');
const app = express();
const port = 3000;

async function getNewGraph(labSampleId) {
  const queryResults = await doQueries(labSampleId);
  const elements = resultsToNodesAndEdges(queryResults);
  return cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    layout: {
      name: 'dagre'
    },

    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#11479e'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 4,
          'target-arrow-shape': 'triangle',
          'line-color': '#9dbaea',
          'target-arrow-color': '#9dbaea',
          'curve-style': 'bezier'
        }
      },

      {
        selector: '.foo',
        style: {
          'background-color': 'red',
        }
      }
    ],

    elements,
  });
}

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/static', express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
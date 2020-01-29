import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import axios from 'axios';

cytoscape.use( dagre );

window.addEventListener('DOMContentLoaded', function(){
  var cy = window.cy = cytoscape({
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

    elements: { nodes: [], edges: [] },
  });

  document.getElementById('load').onclick= () => {
    // console.log('loading');
    // cy.destroy();
    // cy = window.cy = getNewGraph();
    console.log('called');
    axios.get('/').then(res => console.log(res));
  };

  document.getElementById('change').onclick=() => {
    console.log('changing');
    cy.elements().addClass('foo')
  }
});



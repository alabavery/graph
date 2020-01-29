module.exports = function ({ orders, orderSamples, samples, experiments, edges, assets, inputs, outputs }) {
  // const graphNodes = [];
  // const graphEdges = [];
  // // get nodes for orders, samples, experiments
  // graphNodes.push(...getNodesForArray(orders, []));
  // graphNodes.push(...getNodesForArray(samples, []));
  // graphNodes.push(...getNodesForArray(experiments, []));
  // // get edges for order-samples
  // graphEdges.push(...orderSamples.map(os => getEdge(os.order_id, os.sample_id)));
  // // get edges for EDGES
  // graphEdges.push(...edges.map(edge => getEdge(edge.parent_experiment_id, edge.child_experiment_id)));
  // // make one node for every output
  // const inputsAndOutputs = getInputsAndOutputs(inputs, outputs, assets, edges);
  // graphNodes.push(...inputsAndOutputs.nodes);
  // graphEdges.push(...inputsAndOutputs.edges);
  // return { nodes: graphNodes, edges: graphEdges };
  return {nodes: [
      { data: { id: 'n0' } },
      { data: { id: 'n1' } },
      { data: { id: 'n2' } },
      { data: { id: 'n3' } },
      { data: { id: 'n4' } },
      { data: { id: 'n5' } },
      { data: { id: 'n6' } },
      { data: { id: 'n7' } },
      { data: { id: 'n8' } },
      { data: { id: 'n9' } },
      { data: { id: 'n10' } },
      { data: { id: 'n11' } },
      { data: { id: 'n12' } },
      { data: { id: 'n13' } },
      { data: { id: 'n14' } },
      { data: { id: 'n15' } },
      { data: { id: 'n16' } }
    ],
    edges: [
      { data: { source: 'n0', target: 'n1' } },
      { data: { source: 'n1', target: 'n2' } },
      { data: { source: 'n1', target: 'n3' } },
      { data: { source: 'n4', target: 'n5' } },
      { data: { source: 'n4', target: 'n6' } },
      { data: { source: 'n6', target: 'n7' } },
      { data: { source: 'n6', target: 'n8' } },
      { data: { source: 'n8', target: 'n9' } },
      { data: { source: 'n8', target: 'n10' } },
      { data: { source: 'n11', target: 'n12' } },
      { data: { source: 'n12', target: 'n13' } },
      { data: { source: 'n13', target: 'n14' } },
      { data: { source: 'n13', target: 'n15' } },
    ]}
}

function getInputsAndOutputs(inputs, outputs, assets, edges) {
  const graphNodes = [];
  const graphEdges = [];

  for (let i = 0; i < outputs.length; i += 1) {
    const output = outputs[i];
    graphNodes.push(getNode(output,[{
      name: 'labAssetId',
      get: output => getAsset(output, assets).lab_asset_id,
    }]));
    // "output edge"
    graphEdges.push(getEdge(output.experiment_id, output.id));
    // find inputs such that the asset_id matches that of this output and
    // the experiment_id is that of the child_experiment_id of an edge
    // for the output's experiment... such inputs will effectively be the
    // same material as this output's material
    const childExperimentsOfOutputsExperiment = edges.filter(
      edge => edge.parent_experiment_id === output.experiment_id,
    );
    const inputEdges = inputs
      .filter(input => childExperimentsOfOutputsExperiment.includes(input.experiment_id))
      .map(input => getEdge(output.id, input.experiment_id));
    graphEdges.push(...inputEdges);
  }
  return { nodes: graphNodes, edges: graphEdges };
}

function getAsset(inputOrOutput, allAssets) {
  return allAssets.find(asset => asset.id === inputOrOutput.asset_id);
}

function getNodesForArray(items, propertyGetters) {
  return items.map(item => getNode(item, propertyGetters));
}

function getNode(item, propertyGetters = []) {
  const data = { id: item.id };
  propertyGetters.forEach(getter => {
    data[getter.name] = getter.get(item);
  });
  return { data };
}

function getEdge(sourceId, targetId) {
  const data = { source: sourceId, target: targetId };
  return { data };
}
